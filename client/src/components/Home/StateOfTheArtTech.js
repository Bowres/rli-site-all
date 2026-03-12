// StateOfTheArtTech.js
import React from 'react';
import '../../styles/StateOfTheArtTech.css';

const StateOfTheArtTech = () => {
  const techFeatures = [
    {
      icon: 'fas fa-cube',
      title: '3D Visualization',
      description: 'See your design come to life before implementation'
    },
    {
      icon: 'fas fa-vr-cardboard',
      title: 'Virtual Walkthrough',
      description: 'Explore your space in immersive virtual reality'
    },
    {
      icon: 'fas fa-swatchbook',
      title: 'Material Selection',
      description: 'Experiment with different materials and finishes'
    },
    {
      icon: 'fas fa-ruler-combined',
      title: 'Custom Design',
      description: 'Tailored solutions for your specific space and needs'
    }
  ];

  return (
    <section className="tech-section">
      <div className="container">
        <div className="section-header">
          <h2>State-of-the-Art Technology</h2>
          <p>Our design experts use advanced 3D design technology to visualize your space before making any commitments.</p>
        </div>
        <div className="tech-features-grid">
          {techFeatures.map((feature, index) => (
            <div className="tech-feature-card" key={index}>
              <div className="tech-icon">
                <i className={feature.icon}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="tech-description">
          <p>
            Our design experts use advanced 3D design technology, SpaceCraft, to ensure 
            that you get the perfect designs for your home. Visualize your space before 
            making any commitments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StateOfTheArtTech;