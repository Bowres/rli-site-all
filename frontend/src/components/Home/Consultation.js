import React from 'react';
import '../../styles/Consultation.css';

const ConsultationSection = () => {
  return (
    <section className="consultation-section">
      <div className="container">
        <div className="consultation-card">
          <div className="consultation-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          
          <h2 className="consultation-title">
            <span className="title-gradient">Free Consultation</span>
            Get Expert Design Advice
          </h2>
          
          <p className="consultation-subtitle">
            Start Your Project With Confidence
          </p>
          
          <p className="consultation-description">
            Get personalized design advice from our experts. Discuss your project requirements, 
            budget, and timeline absolutely free. No commitment required.
          </p>
          
          <div className="consultation-highlights">
            <div className="highlight-item">
              <i className="fas fa-check-circle"></i>
              <span>No commitment required</span>
            </div>
            <div className="highlight-item">
              <i className="fas fa-clock"></i>
              <span>30-minute session</span>
            </div>
            <div className="highlight-item">
              <i className="fas fa-user-tie"></i>
              <span>Expert design advice</span>
            </div>
            <div className="highlight-item">
              <i className="fas fa-lightbulb"></i>
              <span>Practical solutions</span>
            </div>
          </div>
          
          <div className="consultation-button">
            <a href="/consultation" className="btn-consultation-primary">
              <span>BOOK FREE CONSULTATION</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          
          </div>
          
          <div className="consultation-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24h</div>
              <div className="stat-label">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;