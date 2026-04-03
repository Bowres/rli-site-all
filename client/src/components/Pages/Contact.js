import React, { useState } from 'react';
import '../../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 5000);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast('Message sent successfully! We will respond within 24 hours.', 'success');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        showToast(data.error || 'Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      showToast('Network error. Please check your connection and try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification toast-${toast.type}`}>
          <div className="toast-content">
            <div className="toast-icon">
              {toast.type === 'success' && <i className="fas fa-check-circle"></i>}
              {toast.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
              {toast.type === 'info' && <i className="fas fa-info-circle"></i>}
            </div>
            <div className="toast-message">{toast.message}</div>
            <button 
              className="toast-close" 
              onClick={() => setToast({ show: false, message: '', type: '' })}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="toast-progress"></div>
        </div>
      )}

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Send us a message and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Info + Form Grid */}
      <section className="contact-grid-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left side: Contact Information */}
            <div className="contact-info-wrapper">
              <div className="info-card">
                <div className="info-header">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <h3>Contact Information</h3>
                </div>
                
                <div className="info-details">
                  <div className="info-item">
                    <div className="info-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Email</span>
                      <span className="info-item-value">rlhitechinteriors@gmail.com</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                        <line x1="12" y1="18" x2="12" y2="18" strokeWidth="3"/>
                      </svg>
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Phone</span>
                      <span className="info-item-value">+91 9941874830</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Showroom</span>
                      <span className="info-item-value">No 324, 18th Street, Ashok Nagar, Chennai - 83</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        <circle cx="12" cy="9" r="2.5"/>
                      </svg>
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Factory</span>
                      <span className="info-item-value">No 9&10, 2nd floor, Musthapha Salai, Vanagaram, Chennai - 95</span>
                    </div>
                  </div>
                </div>

                <div className="info-note">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>Response within 24 hours on business days</span>
                </div>
              </div>
            </div>

            {/* Right side: Form Card */}
            <div className="form-card">
              <h3 className="form-title">Send a Message</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <label className="form-label">
                    Full Name *
                    {errors.name && <span className="error-text"> - {errors.name}</span>}
                  </label>
                  <input 
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">
                    Email Address *
                    {errors.email && <span className="error-text"> - {errors.email}</span>}
                  </label>
                  <input 
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">
                    Message *
                    {errors.message && <span className="error-text"> - {errors.message}</span>}
                  </label>
                  <textarea 
                    name="message"
                    className={`form-control ${errors.message ? 'error' : ''}`}
                    placeholder="Tell us about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
              <p className="form-footer">
                <i className="fas fa-lock"></i>
                Your information is secure and will never be shared
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="locations-section">
        <div className="container">
          <h2 className="section-title">Our Locations</h2>
          <div className="locations-grid">
            <div className="location-card">
              <div className="location-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <h3>Showroom</h3>
              <p>No 324, 1/3, 18th street, 5th avenue<br />Ashok Nagar, Chennai - 83</p>
              <p className="location-phone">044 - 24743301</p>
            </div>
            <div className="location-card">
              <div className="location-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <h3>Factory</h3>
              <p>No 9 & 10, 2nd floor, Musthapha Salai<br />Vanagaram, Chennai - 95</p>
              <p className="location-phone">+91 8248651091</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="container">
          <h2>Ready to transform your space?</h2>
          <p>
            Let's discuss your interior design needs and create something beautiful together.
          </p>
          <a href="mailto:rlhitechinteriors@gmail.com" className="cta-button">
            rlhitechinteriors@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
};

export default Contact;
