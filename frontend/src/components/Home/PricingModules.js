import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PricingModules.css';

const PricingModules = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState('full-home');

  const modules = [
    {
      id: 'full-home',
      icon: 'fas fa-home',
      title: 'Full Home Interior',
      description: 'Know the estimate price for your full home interiors',
      features: [
        'Living Room Design',
        'Bedroom Design',
        'Kitchen Design',
        'Wardrobe Design',
        'Complete 3D Visualization'
      ],
      ctaText: 'Get Full Home Estimate'
    },
    {
      id: 'kitchen',
      icon: 'fas fa-utensils',
      title: 'Kitchen Interior',
      description: 'Get an approximate costing for your kitchen interior',
      features: [
        'Modular Kitchen Design',
        'Cabinet & Storage Solutions',
        'Countertop Selection',
        'Lighting Design',
        'Appliance Integration'
      ],
      ctaText: 'Get Kitchen Estimate'
    },
    {
      id: 'wardrobe',
      icon: 'fas fa-tshirt',
      title: 'Wardrobe Design',
      description: 'Our estimate for your dream wardrobe',
      features: [
        'Custom Storage Design',
        'Material Selection',
        'Lighting Integration',
        'Mirror & Accessories',
        'Finishing & Detailing'
      ],
      ctaText: 'Get Wardrobe Estimate'
    }
  ];

  const handleModuleSelect = (moduleId) => {
    setSelectedModule(moduleId);
  };

  const handleGetEstimate = (moduleId, e) => {
    if (e) e.stopPropagation();
    navigate('/consultation', { 
      state: { 
        selectedModule: moduleId,
        moduleData: modules.find(m => m.id === moduleId)
      } 
    });
  };

  return (
    <section className="pricing-modules-section" id="pricing-modules">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">CHOOSE YOUR PROJECT</h2>
          <p className="section-subtitle">Select a project type to get your personalized estimate</p>
        </div>
        
        <div className="modules-container">
          {modules.map((module) => (
            <div 
              key={module.id}
              className={`module-card ${selectedModule === module.id ? 'selected' : ''}`}
              onClick={() => handleModuleSelect(module.id)}
            >
              <div className="module-header">
                <div className="module-icon">
                  <i className={module.icon}></i>
                </div>
                <h3 className="module-title">{module.title}</h3>
                <p className="module-description">{module.description}</p>
              </div>
              
              <div className="module-features">
                <h4>Included Features:</h4>
                <ul>
                  {module.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="module-actions">
                <button 
                  className={`btn-get-estimate-module ${selectedModule === module.id ? 'selected' : ''}`}
                  onClick={(e) => handleGetEstimate(module.id, e)}
                >
                  <i className="fas fa-calculator"></i>
                  {module.ctaText}
                </button>
              </div>
              
              <div className="selection-indicator">
                <i className="fas fa-check"></i>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PricingModules;