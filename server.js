const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client/build')));

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.office365.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

// Twilio client
let twilioClient = null;
let whatsappEnabled = false;

if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  whatsappEnabled = true;
  console.log('✅ Twilio client initialized');
}

// ============================================================================
// API ENDPOINTS
// ============================================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Consultation endpoint
app.post('/api/consultation', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, city, projectType, preferredDate } = req.body;

    if (!fullName || !email || !phoneNumber || !city || !projectType) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const consultation = {
      id: 'CONS' + Date.now(),
      full_name: fullName,
      email: email,
      phone_number: phoneNumber,
      city: city,
      project_type: projectType,
      preferred_date: preferredDate || 'Not specified',
      created_at: new Date()
    };

    // Send email
    await sendConsultationEmail(consultation);
    
    // Send WhatsApp if enabled
    if (whatsappEnabled) {
      await sendConsultationWhatsApp(consultation).catch(console.error);
    }

    res.status(201).json({
      message: 'Consultation booked successfully!',
      success: true,
      consultationId: consultation.id
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Estimate Request endpoint
app.post('/api/estimate-request', async (req, res) => {
  try {
    const { floorplan, purpose, requirements, name, mobile, email, updatesOnWhatsapp, possession, location } = req.body;

    if (!floorplan || !purpose || !name || !mobile || !email || !location) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const estimateRequest = {
      id: 'EST' + Date.now(),
      floorplan, purpose, requirements, name, mobile, email,
      updates_on_whatsapp: updatesOnWhatsapp || false,
      possession, location,
      created_at: new Date()
    };

    await sendEstimateEmail(estimateRequest);
    
    if (whatsappEnabled && updatesOnWhatsapp) {
      await sendEstimateWhatsApp(estimateRequest).catch(console.error);
    }

    res.status(201).json({
      message: 'Estimate request submitted successfully!',
      success: true,
      requestId: estimateRequest.id
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const contact = {
      id: 'CONT' + Date.now(),
      name, email, message,
      created_at: new Date()
    };

    await sendContactEmail(contact);

    res.status(201).json({
      message: 'Message sent successfully!',
      success: true,
      contactId: contact.id
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================================
// EMAIL FUNCTIONS
// ============================================================================

async function sendConsultationEmail(consultation) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: consultation.email,
    cc: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: 'Consultation Booking Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Consultation Booking Confirmed</h2>
        <p><strong>Booking ID:</strong> ${consultation.id}</p>
        <p><strong>Name:</strong> ${consultation.full_name}</p>
        <p><strong>Email:</strong> ${consultation.email}</p>
        <p><strong>Phone:</strong> ${consultation.phone_number}</p>
        <p><strong>City:</strong> ${consultation.city}</p>
        <p><strong>Project Type:</strong> ${consultation.project_type}</p>
        <p><strong>Preferred Date:</strong> ${consultation.preferred_date}</p>
        <p>Our team will contact you within 24 hours.</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
}

async function sendEstimateEmail(estimate) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: estimate.email,
    cc: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: 'Your Estimate Request',
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Thank You for Your Estimate Request</h2>
        <p><strong>Request ID:</strong> ${estimate.id}</p>
        <p><strong>Name:</strong> ${estimate.name}</p>
        <p><strong>Email:</strong> ${estimate.email}</p>
        <p><strong>Mobile:</strong> ${estimate.mobile}</p>
        <p><strong>Location:</strong> ${estimate.location}</p>
        <p><strong>Floorplan:</strong> ${estimate.floorplan}</p>
        <p><strong>Purpose:</strong> ${estimate.purpose}</p>
        <p>We'll review your requirements and contact you shortly.</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
}

async function sendContactEmail(contact) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    replyTo: contact.email,
    subject: `New Contact Message from ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Contact ID:</strong> ${contact.id}</p>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
}

// ============================================================================
// WHATSAPP FUNCTIONS
// ============================================================================

async function sendConsultationWhatsApp(consultation) {
  if (!twilioClient || !process.env.ADMIN_WHATSAPP_NUMBER) return;
  
  const message = `
🚀 *New Consultation Booking*
ID: ${consultation.id}
Name: ${consultation.full_name}
Phone: ${consultation.phone_number}
Email: ${consultation.email}
City: ${consultation.city}
Project: ${consultation.project_type}
Date: ${consultation.preferred_date}
  `.trim();

  await twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: process.env.ADMIN_WHATSAPP_NUMBER
  });
}

async function sendEstimateWhatsApp(estimate) {
  if (!twilioClient || !process.env.ADMIN_WHATSAPP_NUMBER) return;
  
  const message = `
🏠 *New Estimate Request*
ID: ${estimate.id}
Name: ${estimate.name}
Mobile: ${estimate.mobile}
Email: ${estimate.email}
Location: ${estimate.location}
Floorplan: ${estimate.floorplan}
Purpose: ${estimate.purpose}
  `.trim();

  await twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: process.env.ADMIN_WHATSAPP_NUMBER
  });
}

// ============================================================================
// Serve React App
// ============================================================================

// All other GET requests not handled will return React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// ============================================================================
// Start Server
// ============================================================================

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`💬 WhatsApp: ${whatsappEnabled ? 'Enabled' : 'Disabled'}`);
  console.log(`🌐 http://localhost:${port}`);
});