import React, { useState } from 'react';
import '../../styles/ConsultationPage.css';

const ConsultationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    projectType: '',
    preferredDate: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Get API URL from environment variables
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const projectTypes = [
    'Residential Interior',
    'Commercial Space',
    'Office Design',
    'Kitchen Renovation',
    'Bedroom Design',
    'Living Room',
    'Full Home',
    'Bathroom Design',
    'Exterior Design',
    'Other'
  ];

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 5000); // Hide after 5 seconds
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    } else if (formData.phoneNumber.replace(/[\s\-\(\)]/g, '').length < 10) {
      newErrors.phoneNumber = 'Phone number must be at least 10 digits';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'Please enter a valid city name';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (formData.preferredDate) {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.preferredDate = 'Preferred date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
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
     const response = await fetch(`${API_URL}/api/consultation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast('Consultation booked successfully! We will contact you within 24 hours.', 'success');
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          city: '',
          projectType: '',
          preferredDate: ''
        });
        setErrors({});
      } else {
        if (response.status === 409) {
          showToast('You have already booked a consultation with this email/phone. We will contact you soon.', 'info');
        } else {
          showToast(data.error || 'Something went wrong. Please try again.', 'error');
        }
      }
    } catch (error) {
      showToast('Network error. Please check your connection and try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const phone = value.replace(/\D/g, '');
    
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    if (phone.length <= 10) return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    handleChange({
      target: {
        name: 'phoneNumber',
        value: formattedPhone
      }
    });
  };

  return (
    <div className="consultation-page">
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

      <div className="container">
        <div className="consultation-header">
          <h1>Book Your Free Design Consultation</h1>
          <p>Let's discuss your project and bring your design dreams to life with our expert interior designers</p>
        </div>

        <div className="consultation-content">
          
          {/* LEFT COLUMN - Form */}
          <div className="consultation-form-container">
            <form onSubmit={handleSubmit} className="consultation-form" noValidate>
              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name *
                  {errors.fullName && <span className="error-text"> - {errors.fullName}</span>}
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'error' : ''}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address *
                  {errors.email && <span className="error-text"> - {errors.email}</span>}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={errors.email ? 'error' : ''}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">
                  Phone Number *
                  {errors.phoneNumber && <span className="error-text"> - {errors.phoneNumber}</span>}
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(123) 456-7890"
                  className={errors.phoneNumber ? 'error' : ''}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">
                  City *
                  {errors.city && <span className="error-text"> - {errors.city}</span>}
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className={errors.city ? 'error' : ''}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectType">
                  Project Type *
                  {errors.projectType && <span className="error-text"> - {errors.projectType}</span>}
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={errors.projectType ? 'error' : ''}
                  required
                >
                  <option value="">Select Project Type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="preferredDate">
                  Preferred Consultation Date
                  {errors.preferredDate && <span className="error-text"> - {errors.preferredDate}</span>}
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={errors.preferredDate ? 'error' : ''}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>
                    Booking Consultation...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calendar-check me-2"></i>
                    BOOK FREE CONSULTATION
                  </>
                )}
              </button>
              
              <p className="form-note">
                <i className="fas fa-lock me-2"></i>
                Your information is secure and will never be shared with third parties
              </p>
            </form>
          </div>

          {/* RIGHT COLUMN - Info Cards Sidebar */}
          <div className="sidebar">
            {/* Why Choose Us Card */}
            <div className="why-choose-card">
              <div className="card-header">
                <i className="fas fa-star"></i>
                <h3>Why Choose LivePace?</h3>
              </div>
              
              <div className="benefit-grid">
                {/* Left Column */}
                <div className="benefit-column">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-user-tie"></i>
                    </div>
                    <div className="benefit-content">
                      <h4>Expert Designers</h4>
                    </div>
                  </div>
                  
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-paint-brush"></i>
                    </div>
                    <div className="benefit-content">
                      <h4>Custom Solutions</h4>
                    </div>
                  </div>
                  
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="benefit-content">
                      <h4>On-Time Delivery</h4>
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="benefit-column">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <div className="benefit-content">
                      <h4>Transparent Pricing</h4>
                    </div>
                  </div>
                  
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="benefit-content">
                      <h4>Quality Assurance</h4>
                    </div>
                  </div>
                  
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-comments"></i>
                    </div>
                    <div className="benefit-content">
                      <h4>Free Consultation</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Need Help Card */}
            <div className="need-help-card">
              <div className="card-header">
                <i className="fas fa-headset"></i>
                <h3>Need Immediate Help?</h3>
              </div>
              
              <ul className="contact-list">
                <li className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="contact-content">
                    <h4>Call Us</h4>
                    <p>+91 9941874830</p>
                  </div>
                </li>
                
                <li className="contact-item">
                  <div className="contact-icon">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div className="contact-content">
                    <a href="https://wa.me/919941874830" className="whatsapp-link" target="_blank" rel="noopener noreferrer">
                      WhatsApp Chat
                    </a>
                  </div>
                </li>
                
                <li className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-content">
                    <h4>Email Us</h4>
                    <a href="mailto:rlhitechinteriors@gmail.com" className="email-link">rlhitechinteriors@gmail.com</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
