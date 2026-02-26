import React from 'react';
import '../../styles/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: 'fas fa-clipboard-list',
      title: 'Share Your Requirements',
      description: 'Tell us about your space, style preferences, and specific needs for your home or office project.',
    },
    {
      id: 2,
      icon: 'fas fa-file-invoice-dollar',
      title: 'Get Your Personalized Estimate',
      description: 'Receive a transparent, detailed estimate within 24 hours with no hidden costs.',
    },
    {
      id: 3,
      icon: 'fas fa-handshake',
      title: 'Book Free Consultation',
      description: 'Discuss your project with our expert designers and begin your transformation journey.',
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get Your Personalized Estimate in 3 Simple Steps</h2>
          <p className="section-subtitle">Our streamlined process makes it easy to transform your space from concept to completion.</p>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.id} className="step-card">
              <div className="how-it-works-step-number">{index + 1}</div>
              <div className="how-it-works-step-icon">
                <i className={step.icon}></i>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* <div className="cta-container">
          <h3>Ready to Transform Your Space?</h3>
          <p>Start your interior design journey today with our free consultation. No commitments, just expert advice.</p>
          <a href="#consultation" className="cta-button">
            <i className="fas fa-calendar-check"></i>
            Book Free Consultation
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorks;