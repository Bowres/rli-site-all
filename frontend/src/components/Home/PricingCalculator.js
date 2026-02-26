// Updated PricingCalculator.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HowItWorks from './HowItWorks';
import PricingModules from './PricingModules';
import WhyChooseService from './WhyChooseService';
import StateOfTheArtTech from './StateOfTheArtTech';
import '../../styles/PricingCalculator.css';

const PricingCalculator = () => {
  const navigate = useNavigate();
  const [projectType, setProjectType] = useState('full-home');

  const projectCards = [
    {
      type: 'full-home',
      icon: 'fas fa-home',
      title: 'Full Home Interior',
      description: 'Know the estimate price for your full home interiors'
    },
    {
      type: 'kitchen',
      icon: 'fas fa-utensils',
      title: 'Kitchen',
      description: 'Get an approximate costing for your kitchen interior'
    },
    {
      type: 'wardrobe',
      icon: 'fas fa-tshirt',
      title: 'Wardrobe',
      description: 'Our estimate for your dream wardrobe'
    }
  ];

  const handleCalculateClick = () => {
    navigate('/consultation', { 
      state: { selectedModule: projectType } 
    });
  };

  return (
    <div>

      {/* Pricing Modules Section */}
      <PricingModules />
      

      <footer>
        <div className="container">
          <p>&copy; 2024 Interior Design Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PricingCalculator;