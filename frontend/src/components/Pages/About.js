import React from 'react';
import '../../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">Crafting Spaces That Tell Your Story</h1>
          <p className="about-subtitle">
            At LivePace, we believe that your space should be a true reflection of who you are – 
            a place where every detail tells your unique story.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2a574d" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To transform ordinary spaces into extraordinary living experiences by making 
                exceptional interior design accessible to everyone in India.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2a574d" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To become India's most trusted interior design partner, revolutionizing how 
                people create and experience their dream homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <h2 className="section-title">Our Story</h2>
            <div className="story-text">
              <p>
                Founded in 2018, LivePace began with a simple yet powerful idea: everyone deserves 
                to live in a beautifully designed space. What started as a small studio in Mumbai 
                has grown into a nationwide design collective serving thousands of happy families.
              </p>
              <p>
                We've learned that great design isn't about following trends – it's about understanding 
                people. Our team of passionate designers, architects, and craftsmen work together 
                to create spaces that are not only visually stunning but also deeply personal and 
                functional.
              </p>
              <p>
                Today, we've completed over 500+ projects across India, from cozy Mumbai apartments 
                to sprawling Bangalore villas, each telling its own unique story through design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Personalization</h3>
              <p>
                Every design is tailored to your lifestyle, preferences, and personality. 
                We listen first, design second.
              </p>
            </div>
            <div className="value-card">
              <h3>Quality Craftsmanship</h3>
              <p>
                We work with the finest materials and skilled artisans to ensure every 
                detail meets our high standards.
              </p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>
                Clear communication, honest pricing, and no hidden surprises. We believe 
                in complete transparency.
              </p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>
                We prioritize eco-friendly materials and practices to create beautiful 
                spaces responsibly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Approach */}
      <section className="approach-section">
        <div className="container">
          <div className="approach-content">
            <h2 className="section-title">Our Design Approach</h2>
            <div className="approach-steps">
              <div className="step">
                <span className="step-number">01</span>
                <div className="step-content">
                  <h3>Discovery & Consultation</h3>
                  <p>We begin by understanding your vision, needs, and lifestyle through detailed conversations.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">02</span>
                <div className="step-content">
                  <h3>Concept & Planning</h3>
                  <p>Our designers create personalized concepts with 3D visualizations and detailed plans.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">03</span>
                <div className="step-content">
                  <h3>Execution & Craftsmanship</h3>
                  <p>Our skilled team brings designs to life with precision and attention to detail.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">04</span>
                <div className="step-content">
                  <h3>Final Reveal & Support</h3>
                  <p>We present your transformed space and provide ongoing support for your peace of mind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Transform Your Space?</h2>
          <p>
            Let's create something beautiful together. Our design team is ready to 
            bring your vision to life.
          </p>
          <a href="/consultation" className="cta-button">
            BOOK FREE CONSULTATION
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;