const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter - Using Outlook/Office365 configuration
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

// Test email configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to take messages');
  }
});

// Twilio client for WhatsApp
let twilioClient = null;
let whatsappEnabled = false;
let usingSandbox = false;

if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  whatsappEnabled = true;
  
  // Determine if we're using sandbox or production
  const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;
  usingSandbox = twilioNumber && twilioNumber.includes('14155238886');
  
  console.log('✅ Twilio client initialized for WhatsApp');
  console.log(`📱 Twilio WhatsApp Number: ${process.env.TWILIO_WHATSAPP_NUMBER}`);
  console.log(`👤 Admin WhatsApp Number: ${process.env.ADMIN_WHATSAPP_NUMBER}`);
  console.log(`🔄 Using Sandbox: ${usingSandbox}`);
  
  if (usingSandbox) {
    console.log('💡 SANDBOX SETUP REQUIRED:');
    console.log('   1. Send "join [sandbox-word]" to +14155238886 from your admin number');
    console.log('   2. Replace [sandbox-word] with the word from your Twilio console');
  }
} else {
  console.log('⚠️  Twilio notifications disabled - missing credentials');
}

// ============================================================================
// ESTIMATE REQUEST ENDPOINTS
// ============================================================================

// Estimate Request endpoint
app.post('/api/estimate-request', async (req, res) => {
  try {
    const { 
      floorplan, 
      purpose, 
      requirements, 
      name, 
      mobile, 
      email, 
      updatesOnWhatsapp, 
      possession, 
      location 
    } = req.body;

    console.log('Received estimate request:', req.body);

    // Validate required fields
    if (!floorplan || !purpose || !name || !mobile || !email || !location) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Create request object
    const estimateRequest = {
      id: 'EST' + Date.now(),
      floorplan,
      purpose,
      requirements,
      name,
      mobile,
      email,
      updates_on_whatsapp: updatesOnWhatsapp || false,
      possession,
      location,
      created_at: new Date()
    };

    console.log('Processing estimate request:', estimateRequest.id);

    // Send email notification
    try {
      await sendEstimateEmailNotification(estimateRequest);
      console.log('✅ Estimate email notification sent');
    } catch (emailError) {
      console.error('❌ Estimate email notification failed:', emailError);
      return res.status(500).json({ error: 'Failed to send email notification' });
    }
    
    // Send WhatsApp notification if enabled and requested
    if (whatsappEnabled && updatesOnWhatsapp) {
      try {
        await sendEstimateWhatsAppNotification(estimateRequest);
        console.log('✅ Estimate WhatsApp notification sent');
      } catch (whatsappError) {
        console.error('❌ Estimate WhatsApp notification failed:', whatsappError.message);
        // Don't fail the request if WhatsApp fails
      }
    }

    res.status(201).json({
      message: 'Estimate request submitted successfully! We will contact you shortly.',
      success: true,
      requestId: estimateRequest.id,
      timestamp: estimateRequest.created_at
    });

  } catch (error) {
    console.error('Error processing estimate request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Email notification for estimate requests
async function sendEstimateEmailNotification(estimateRequest) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: estimateRequest.email, // Send to customer
    cc: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Copy to admin
    subject: 'Your Estimate Request - HomeLane Style',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Thank You for Your Estimate Request
        </h2>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Request Confirmation</h3>
          <p><strong>Request ID:</strong> ${estimateRequest.id}</p>
          <p><strong>Submitted:</strong> ${estimateRequest.created_at.toLocaleString()}</p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Your Information</h3>
          <p><strong>Name:</strong> ${estimateRequest.name}</p>
          <p><strong>Email:</strong> ${estimateRequest.email}</p>
          <p><strong>Mobile:</strong> ${estimateRequest.mobile}</p>
          <p><strong>Location:</strong> ${estimateRequest.location}</p>
          ${estimateRequest.possession ? `<p><strong>Possession:</strong> ${estimateRequest.possession}</p>` : ''}
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Project Details</h3>
          <p><strong>Floorplan:</strong> ${estimateRequest.floorplan}</p>
          <p><strong>Purpose:</strong> ${estimateRequest.purpose}</p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Your Requirements</h3>
          <p><strong>Wardrobes:</strong> ${estimateRequest.requirements?.wardrobe || 'Not specified'}</p>
          <p><strong>Entertainment Units:</strong> ${estimateRequest.requirements?.entertainmentUnit || 'Not specified'}</p>
          <p><strong>Study Units:</strong> ${estimateRequest.requirements?.studyUnit || 'Not specified'}</p>
          <p><strong>Crockery Units:</strong> ${estimateRequest.requirements?.crockeryUnit || 'Not specified'}</p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px;">
          <h3 style="color: #2c3e50; margin-top: 0;">What Happens Next?</h3>
          <ul style="color: #2c3e50;">
            <li>Our team will review your requirements within 24 hours</li>
            <li>We'll contact you to discuss your project in detail</li>
            <li>You'll receive a customized estimate based on your needs</li>
          </ul>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 5px; border-left: 4px solid #007bff;">
          <p style="margin: 0; color: #333;">
            <strong>Need immediate assistance?</strong><br>
            Call us at: <strong>+91 9876543210</strong><br>
            Email: <strong>support@livepace.com</strong>
          </p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

// WhatsApp notification for estimate requests
async function sendEstimateWhatsAppNotification(estimateRequest) {
  if (!whatsappEnabled || !twilioClient) {
    console.log('⚠️  WhatsApp notification skipped - Twilio not configured');
    return;
  }

  if (!process.env.ADMIN_WHATSAPP_NUMBER || !process.env.TWILIO_WHATSAPP_NUMBER) {
    console.log('⚠️  WhatsApp notification skipped - Missing WhatsApp numbers');
    return;
  }

  const message = `
🏠 *New Estimate Request - HomeLane Style*

*Customer Information:*
Name: ${estimateRequest.name}
Email: ${estimateRequest.email}
Mobile: ${estimateRequest.mobile}
Location: ${estimateRequest.location}
${estimateRequest.possession ? `Possession: ${estimateRequest.possession}\n` : ''}
WhatsApp Updates: ${estimateRequest.updates_on_whatsapp ? 'Yes' : 'No'}

*Project Details:*
Floorplan: ${estimateRequest.floorplan}
Purpose: ${estimateRequest.purpose}

*Requirements:*
Wardrobes: ${estimateRequest.requirements?.wardrobe || 'Not specified'}
Entertainment Units: ${estimateRequest.requirements?.entertainmentUnit || 'Not specified'}
Study Units: ${estimateRequest.requirements?.studyUnit || 'Not specified'}
Crockery Units: ${estimateRequest.requirements?.crockeryUnit || 'Not specified'}

*Request ID:* ${estimateRequest.id}
*Submitted:* ${estimateRequest.created_at.toLocaleString()}

Please contact the customer within 24 hours to provide the estimate.
  `.trim();

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.ADMIN_WHATSAPP_NUMBER
    });
    
    console.log(`✅ Estimate WhatsApp message sent successfully!`);
    console.log(`📨 Message SID: ${result.sid}`);
    
  } catch (error) {
    console.error('❌ Twilio WhatsApp error:', error.message);
    throw error;
  }
}

// ============================================================================
// CONSULTATION ENDPOINTS
// ============================================================================

// Consultation endpoint
app.post('/api/consultation', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, city, projectType, preferredDate } = req.body;

    console.log('Received consultation request:', req.body);

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !city || !projectType) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create consultation object
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

    console.log('Processing consultation:', consultation.id);

    // Send email notification
    try {
      await sendEmailNotification(consultation);
      console.log('✅ Consultation email notification sent');
    } catch (emailError) {
      console.error('❌ Consultation email notification failed:', emailError);
      return res.status(500).json({ error: 'Failed to send email notification' });
    }
    
    // Send WhatsApp notification
    try {
      await sendWhatsAppNotification(consultation);
      console.log('✅ Consultation WhatsApp notification sent');
    } catch (whatsappError) {
      console.error('❌ Consultation WhatsApp notification failed:', whatsappError.message);
      // Don't fail the request if WhatsApp fails
    }

    res.status(201).json({
      message: 'Consultation booked successfully!',
      success: true,
      consultationId: consultation.id,
      data: consultation
    });

  } catch (error) {
    console.error('Error booking consultation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Email notification function
async function sendEmailNotification(consultation) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: consultation.email, // Send to customer
    cc: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Copy to admin
    subject: 'Consultation Booking Confirmation - LivePace',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          Consultation Booking Confirmation
        </h2>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Booking Details</h3>
          <p><strong>Booking ID:</strong> ${consultation.id}</p>
          <p><strong>Status:</strong> Confirmed</p>
          <p><strong>Booked On:</strong> ${consultation.created_at.toLocaleString()}</p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Your Information</h3>
          <p><strong>Name:</strong> ${consultation.full_name}</p>
          <p><strong>Email:</strong> ${consultation.email}</p>
          <p><strong>Phone:</strong> ${consultation.phone_number}</p>
          <p><strong>City:</strong> ${consultation.city}</p>
          <p><strong>Project Type:</strong> ${consultation.project_type}</p>
          <p><strong>Preferred Date:</strong> ${consultation.preferred_date}</p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px;">
          <h3 style="color: #2c3e50; margin-top: 0;">Next Steps</h3>
          <ul style="color: #2c3e50;">
            <li>Our design expert will contact you within 24 hours</li>
            <li>We'll schedule a convenient time for your consultation</li>
            <li>Prepare any questions or inspiration images you have</li>
          </ul>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 5px; border-left: 4px solid #3498db;">
          <p style="margin: 0; color: #333;">
            <strong>Need to reschedule?</strong><br>
            Call us at: <strong>+91 9876543210</strong><br>
            Email: <strong>consultation@livepace.com</strong>
          </p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

// WhatsApp notification function
async function sendWhatsAppNotification(consultation) {
  if (!whatsappEnabled || !twilioClient) {
    console.log('⚠️  WhatsApp notification skipped - Twilio not configured');
    return;
  }

  if (!process.env.ADMIN_WHATSAPP_NUMBER || !process.env.TWILIO_WHATSAPP_NUMBER) {
    console.log('⚠️  WhatsApp notification skipped - Missing WhatsApp numbers');
    return;
  }

  const message = `
🚀 *New Consultation Booking - LivePace*

*Booking Details:*
Booking ID: ${consultation.id}
Status: Confirmed
Booked On: ${consultation.created_at.toLocaleString()}

*Client Information:*
Name: ${consultation.full_name}
Email: ${consultation.email}
Phone: ${consultation.phone_number}
City: ${consultation.city}
Project Type: ${consultation.project_type}
Preferred Date: ${consultation.preferred_date}

Please contact the client within 24 hours.
  `.trim();

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.ADMIN_WHATSAPP_NUMBER
    });
    
    console.log(`✅ Consultation WhatsApp message sent successfully!`);
    console.log(`📨 Message SID: ${result.sid}`);
    console.log(`📊 Message Status: ${result.status}`);
    
  } catch (error) {
    console.error('❌ Twilio WhatsApp error:', error.message);
    
    if (error.code === 63007) {
      console.log('💡 SOLUTION: Your Twilio number is not enabled for WhatsApp.');
      console.log('💡 Follow these steps:');
      console.log('   1. Go to Twilio Console → Messaging → Try it out → Try WhatsApp');
      console.log('   2. Use the sandbox number: whatsapp:+14155238886');
      console.log('   3. Send "join [sandbox-word]" to the sandbox from your admin number');
      console.log('   4. Update TWILIO_WHATSAPP_NUMBER in .env to: whatsapp:+14155238886');
    }
    
    throw error;
  }
}

// ============================================================================
// UTILITY ENDPOINTS
// ============================================================================

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Test email connection
    let emailStatus = 'Unknown';
    try {
      await transporter.verify();
      emailStatus = 'Connected';
    } catch (emailError) {
      emailStatus = 'Disconnected';
    }
    
    // Check WhatsApp status
    const whatsappStatus = whatsappEnabled ? 'Configured' : 'Not configured';
    
    res.json({ 
      status: 'OK',
      email: emailStatus,
      whatsapp: whatsappStatus,
      usingSandbox: usingSandbox,
      timestamp: new Date().toISOString(),
      mode: 'No-Database (Direct Email Mode)'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error',
      email: 'Unknown',
      whatsapp: 'Unknown',
      error: error.message 
    });
  }
});

// Test WhatsApp endpoint (for testing)
app.post('/api/test-whatsapp', async (req, res) => {
  try {
    if (!whatsappEnabled) {
      return res.status(400).json({ error: 'WhatsApp is not configured' });
    }

    const testConsultation = {
      id: 'TEST-' + Date.now(),
      full_name: 'Test User',
      email: 'test@example.com',
      phone_number: '+1234567890',
      city: 'Test City',
      project_type: 'Residential Interior',
      preferred_date: '2024-12-25',
      created_at: new Date()
    };

    await sendWhatsAppNotification(testConsultation);
    res.json({ 
      message: 'Test WhatsApp message sent successfully',
      testId: testConsultation.id 
    });
  } catch (error) {
    console.error('Test WhatsApp error:', error);
    res.status(500).json({ 
      error: error.message,
      code: error.code,
      solution: 'Use Twilio WhatsApp sandbox number: whatsapp:+14155238886'
    });
  }
});

// Test Estimate WhatsApp endpoint
app.post('/api/test-estimate-whatsapp', async (req, res) => {
  try {
    if (!whatsappEnabled) {
      return res.status(400).json({ error: 'WhatsApp is not configured' });
    }

    const testEstimateRequest = {
      id: 'TEST-EST-' + Date.now(),
      name: 'Test User',
      email: 'test@example.com',
      mobile: '+1234567890',
      location: 'Test City',
      possession: 'Immediate',
      updates_on_whatsapp: true,
      floorplan: '2 BHK',
      purpose: 'Move in',
      requirements: {
        wardrobe: 2,
        entertainmentUnit: 1,
        studyUnit: 1,
        crockeryUnit: 1
      },
      created_at: new Date()
    };

    await sendEstimateWhatsAppNotification(testEstimateRequest);
    res.json({ 
      message: 'Test Estimate WhatsApp message sent successfully',
      testId: testEstimateRequest.id 
    });
  } catch (error) {
    console.error('Test Estimate WhatsApp error:', error);
    res.status(500).json({ 
      error: error.message,
      code: error.code,
      solution: 'Use Twilio WhatsApp sandbox number: whatsapp:+14155238886'
    });
  }
});

// Test Email endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    const { toEmail } = req.body;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail || process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'Test Email from LivePace Server',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            Test Email Successful
          </h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Status:</strong> ✅ Email system is working correctly</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Server:</strong> LivePace Backend API</p>
            <p><strong>Mode:</strong> Direct Email (No Database)</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #d4edda; border-radius: 5px;">
            <p style="margin: 0; color: #155724;">
              <strong>Success!</strong> Your email configuration is working properly.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true,
      message: 'Test email sent successfully',
      to: mailOptions.to,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test Email error:', error);
    res.status(500).json({ 
      error: 'Failed to send test email',
      details: error.message 
    });
  }
});



// WhatsApp setup instructions endpoint
app.get('/api/whatsapp-setup', (req, res) => {
  const setupInstructions = {
    sandbox: {
      steps: [
        '1. Go to Twilio Console → Messaging → Try it out → Try WhatsApp',
        '2. Note the "Sandbox word" shown on the page',
        '3. From your admin WhatsApp (+919789976263), send "join [sandbox-word]" to +14155238886',
        '4. Update your .env file with: TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886',
        '5. Restart your server and test'
      ],
      currentNumber: process.env.TWILIO_WHATSAPP_NUMBER,
      recommendedNumber: 'whatsapp:+14155238886'
    },
    email: {
      currentEmail: process.env.EMAIL_USER,
      adminEmail: process.env.ADMIN_EMAIL
    }
  };
  
  res.json(setupInstructions);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'LivePace Backend API',
    version: '2.0.0',
    mode: 'No Database - Direct Email Mode',
    description: 'All data is sent directly via email/WhatsApp without database storage',
    endpoints: {
      health: '/api/health',
      consultation: '/api/consultation',
      estimateRequest: '/api/estimate-request',
      testEmail: '/api/test-email',
      testWhatsApp: '/api/test-whatsapp',
      testEstimateWhatsApp: '/api/test-estimate-whatsapp',
      whatsappSetup: '/api/whatsapp-setup'
    },
    features: [
      'Consultation booking with email confirmation',
      'Estimate requests with email confirmation',
      'Admin notifications via email',
      'Optional WhatsApp notifications',
      'No database required'
    ]
  });
});

// ============================================================================
// CONTACT FORM ENDPOINT
// ============================================================================

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('Received contact form submission:', req.body);

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create contact object
    const contact = {
      id: 'CONT' + Date.now(),
      name: name,
      email: email,
      message: message,
      created_at: new Date()
    };

    console.log('Processing contact form:', contact.id);

    // Send email notification
    try {
      await sendContactEmailNotification(contact);
      console.log('✅ Contact email notification sent');
    } catch (emailError) {
      console.error('❌ Contact email notification failed:', emailError);
      return res.status(500).json({ error: 'Failed to send email notification' });
    }

    res.status(201).json({
      message: 'Message sent successfully! We will respond within 24 hours.',
      success: true,
      contactId: contact.id,
      timestamp: contact.created_at
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Email notification for contact form
async function sendContactEmailNotification(contact) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Send to admin
    replyTo: contact.email, // Allow replying directly to the user
    subject: `New Contact Form Message from ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2a574d; padding-bottom: 20px;">
          <h1 style="color: #2a574d; margin: 0; font-size: 28px;">📬 New Contact Form Submission</h1>
          <p style="color: #777; margin-top: 10px;">Received on ${contact.created_at.toLocaleString()}</p>
        </div>
        
        <!-- Contact ID -->
        <div style="background: #f8f5f2; padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center; border-left: 4px solid #2a574d;">
          <p style="margin: 0; color: #2a574d; font-weight: bold;">Contact ID: ${contact.id}</p>
        </div>

        <!-- Sender Information -->
        <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: #2a574d; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
            <span style="margin-right: 10px;">👤</span> Sender Information
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #555; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; color: #333;">${contact.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #555;"><strong>Email:</strong></td>
              <td style="padding: 10px 0;">
                <a href="mailto:${contact.email}" style="color: #2a574d; text-decoration: none; font-weight: 500;">
                  ${contact.email}
                </a>
              </td>
            </tr>
          </table>
        </div>

        <!-- Message -->
        <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: #2a574d; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
            <span style="margin-right: 10px;">💬</span> Message
          </h3>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2a574d;">
            <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${contact.message}</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: #2a574d; margin-top: 0; margin-bottom: 15px;">⚡ Quick Actions</h3>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="mailto:${contact.email}?subject=Re: Your message to Rajalakshmi Hi-Tech Interiors" 
               style="display: inline-block; background: #2a574d; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">
              ✉️ Reply to Sender
            </a>
          </div>
        </div>

        <!-- Summary -->
        <div style="background: #f8f5f2; padding: 15px; border-radius: 8px;">
          <h3 style="color: #2a574d; margin-top: 0; margin-bottom: 10px;">📋 Summary</h3>
          <ul style="margin: 0; padding-left: 20px; color: #555;">
            <li style="margin-bottom: 5px;">New contact inquiry from ${contact.name}</li>
            <li style="margin-bottom: 5px;">Response needed within 24 hours</li>
            <li style="margin-bottom: 5px;">Contact ID: ${contact.id}</li>
          </ul>
        </div>

        <!-- Footer -->
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #777; font-size: 12px;">
          <p style="margin: 0;">This is an automated message from Rajalakshmi Hi-Tech Interiors</p>
          <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Rajalakshmi Hi-Tech Interiors. All rights reserved.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📧 Email configured: ${process.env.EMAIL_USER ? 'Yes' : 'No'}`);
  console.log(`💬 WhatsApp configured: ${whatsappEnabled ? 'Yes' : 'No'}`);
  if (whatsappEnabled) {
    console.log(`📱 Twilio WhatsApp: ${process.env.TWILIO_WHATSAPP_NUMBER}`);
    console.log(`👤 Admin WhatsApp: ${process.env.ADMIN_WHATSAPP_NUMBER}`);
    if (!process.env.TWILIO_WHATSAPP_NUMBER.includes('14155238886')) {
      console.log('💡 TIP: Use sandbox for testing: whatsapp:+14155238886');
    }
  }
  console.log(`📋 Mode: Direct Email (No Database Storage)`);
  console.log(`📨 Consultation endpoint: POST /api/consultation`);
  console.log(`📊 Estimate endpoint: POST /api/estimate-request`);
  console.log(`🩺 Health check: GET /api/health`);
});