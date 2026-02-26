// Offerings.js
import React from 'react';
import '../../styles/Offerings.css';

const Offerings = () => {
  const offerings = [
    {
      icon: 'home',
      title: 'Residential Design',
      description: 'Complete home transformation from concept to completion. We design living spaces that are both beautiful and functional.'
    },
    {
      icon: 'building',
      title: 'Commercial Design',
      description: 'Office, retail, and hospitality spaces designed to enhance productivity, customer experience, and brand identity.'
    },
    {
      icon: 'fill-drip',
      title: 'Color Consultation',
      description: 'Expert guidance on color selection, paint finishes, and creating harmonious color schemes throughout your space.'
    }
  ];

  return (
    <section className="offerings-section" id="services">
      <div className="container">
        <div className="section-header">
          <h2>Our Design Services</h2>
          <p>Comprehensive interior design solutions for residential, commercial, and specialized needs.</p>
        </div>
        <div className="services-overview">
          {offerings.map((offering, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                <i className={`fas fa-${offering.icon}`}></i>
              </div>
              <h3>{offering.title}</h3>
              <p>{offering.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;