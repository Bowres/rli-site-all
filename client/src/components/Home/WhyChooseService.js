// WhyChooseService.js
import React from 'react';
import '../../styles/WhyChooseService.css';

const WhyChooseService = () => {
  const benefits = [
    {
      icon: 'fas fa-dollar-sign',
      title: 'No Hidden Costs',
    },
    {
      icon: 'fas fa-users',
      title: 'Expert Consultation',
    },
    {
      icon: 'fas fa-palette',
      title: 'Customized Solutions',
    },
    {
      icon: 'fas fa-clock',
      title: 'Quick Response',
    },
    {
      icon: 'fas fa-award',
      title: 'Professional Service',
    },
    {
      icon: 'fas fa-laptop-house',
      title: 'State-of-the-Art Technology',
    }
  ];

  return (
    <section className="why-choose-service-section">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Our Estimate Service?</h2>
          <p>We combine expertise, technology, and personalized service to deliver exceptional interior design solutions.</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div className="benefit-card" key={index}>
              <div className="benefit-icon">
                <i className={benefit.icon}></i>
              </div>
              <h3>{benefit.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseService;