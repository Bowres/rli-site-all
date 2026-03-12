import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import '../../../src/styles/globals.css';

const Layout = ({ children }) => {
  const whatsappNumber = "919941874830"; // Update with your number (remove + and 0)
  const phoneNumber = "+919941874830"; // Update with your number

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };
  
  const handleCallClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <div className="layout">
      <Navigation />
      <main>{children}</main>
      
      {/* Floating WhatsApp & Call Buttons */}
      <div className="floating-contact-buttons">
        {/* WhatsApp Button */}
        <button 
          onClick={handleWhatsAppClick}
          className="floating-btn whatsapp-btn"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </button>
        
        {/* Call Button */}
        <button 
          onClick={handleCallClick}
          className="floating-btn call-btn"
          aria-label="Call Us"
          title="Call Us"
        >
          <i className="fas fa-headset"></i>
        </button>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;