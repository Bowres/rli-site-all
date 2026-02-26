// MultiStepEstimate.js
import React, { useState, useEffect } from 'react';
import '../../styles/Consultation.css';
import '../../styles/MultiStepEstimate.css';

const MultiStepEstimate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(33);
  const [formData, setFormData] = useState({
    // Step 1
    floorplan: '',
    purpose: '',
    
    // Step 2
    requirements: {
      wardrobe: 0,
      entertainmentUnit: 0,
      studyUnit: 0,
      crockeryUnit: 0,
      kitchenCabinets: 0,
      tvUnit: 0
    },
    
    // Step 3
    name: '',
    mobile: '',
    updatesOnWhatsapp: true,
    possession: '',
    location: '',
    email: ''
  });

  useEffect(() => {
    // Update progress bar based on current step
    const progress = (currentStep / 3) * 100;
    setProgressPercentage(progress);
  }, [currentStep]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      // Add smooth transition effect
      document.querySelector('.step-container').style.opacity = '0';
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setTimeout(() => {
          document.querySelector('.step-container').style.opacity = '1';
        }, 50);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      document.querySelector('.step-container').style.opacity = '0';
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setTimeout(() => {
          document.querySelector('.step-container').style.opacity = '1';
        }, 50);
      }, 300);
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google OAuth integration here
    alert('Google signup would be implemented here');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Send data to backend
    try {
      const response = await fetch('/api/estimate-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('✅ Estimate request submitted successfully! Our design expert will contact you shortly.');
        
        // Reset form
        setCurrentStep(1);
        setFormData({
          floorplan: '',
          purpose: '',
          requirements: {
            wardrobe: 0,
            entertainmentUnit: 0,
            studyUnit: 0,
            crockeryUnit: 0,
            kitchenCabinets: 0,
            tvUnit: 0
          },
          name: '',
          mobile: '',
          updatesOnWhatsapp: true,
          possession: '',
          location: '',
          email: ''
        });
      } else {
        alert('⚠️ Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('⚠️ Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step Progress Indicator
  const ProgressIndicator = () => (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      <div className="progress-steps">
        {[1, 2, 3].map(step => (
          <div 
            key={step} 
            className={`progress-step ${step === currentStep ? 'active' : step < currentStep ? 'completed' : ''}`}
            onClick={() => step < currentStep && setCurrentStep(step)}
          >
            {step < currentStep ? '✓' : step}
          </div>
        ))}
      </div>
      <div className="step-labels">
        <span>Select Plan</span>
        <span>Requirements</span>
        <span>Contact Info</span>
      </div>
    </div>
  );

  // Step 1: Floorplan and Purpose
  const Step1 = () => (
    <div className="step-container">
      <ProgressIndicator />
      
      <div className="step-header">
        <h1>🎨 Design Your Dream Home</h1>
        <h2>Let's Begin Your Interior Journey</h2>
        <p className="step-subtitle">Choose your floor plan and purpose to get started</p>
      </div>

      <div className="form-section">
        <h3><span className="step-icon">🏠</span> Your Floor Plan</h3>
        <p className="field-description">Select the type of apartment you own</p>
        <div className="options-grid">
          {[
            { value: '1 BHK', icon: '1️⃣', desc: 'Compact & Efficient' },
            { value: '2 BHK', icon: '2️⃣', desc: 'Perfect for Families' },
            { value: '3 BHK', icon: '3️⃣', desc: 'Spacious Living' },
            { value: '3+BHK', icon: '🏢', desc: 'Luxury Spaces' }
          ].map(option => (
            <div
              key={option.value}
              className={`option-card ${formData.floorplan === option.value ? 'selected' : ''}`}
              onClick={() => handleInputChange('floorplan', option.value)}
            >
              <div className="option-icon">{option.icon}</div>
              <div className="option-text">
                <div className="option-title">{option.value}</div>
                <div className="option-desc">{option.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3><span className="step-icon">🎯</span> Purpose of Interior</h3>
        <p className="field-description">What's your goal for this project?</p>
        <div className="options-grid purpose-options">
          {[
            { value: 'Move in', icon: '🏡', desc: 'New Home Setup' },
            { value: 'Rent Out', icon: '💰', desc: 'Increase Rental Value' },
            { value: 'Renovate', icon: '🔨', desc: 'Redesign Existing Space' }
          ].map(option => (
            <div
              key={option.value}
              className={`option-card ${formData.purpose === option.value ? 'selected' : ''}`}
              onClick={() => handleInputChange('purpose', option.value)}
            >
              <div className="option-icon">{option.icon}</div>
              <div className="option-text">
                <div className="option-title">{option.value}</div>
                <div className="option-desc">{option.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-card">
        <div className="info-icon">💡</div>
        <div className="info-content">
          <h4>Why Choose Us?</h4>
          <p>600+ design experts • 3D visualization technology • 3600+ happy customers • 1-year warranty</p>
        </div>
      </div>

      <button 
        className={`btn-next ${!formData.floorplan || !formData.purpose ? 'disabled' : ''}`}
        onClick={nextStep}
        disabled={!formData.floorplan || !formData.purpose}
      >
        Continue to Requirements <span className="arrow">→</span>
      </button>
    </div>
  );

  // Step 2: Requirements
  const Step2 = () => (
    <div className="step-container">
      <ProgressIndicator />
      
      <div className="step-header">
        <h1>📋 Customize Your Requirements</h1>
        <h2>Tell Us What You Need</h2>
        <p className="step-subtitle">Select the furniture pieces you want for your {formData.floorplan}</p>
      </div>

      <div className="requirements-section">
        <div className="requirements-list">
          {[
            { 
              key: 'wardrobe', 
              title: 'Wardrobe', 
              description: '(Max: Number of bedrooms)', 
              icon: '👔',
              tip: 'Great for bedroom storage with mirror options'
            },
            { 
              key: 'entertainmentUnit', 
              title: 'Entertainment Unit', 
              description: 'TV Unit & Media Storage', 
              icon: '📺',
              tip: 'Customizable with LED lighting'
            },
            { 
              key: 'studyUnit', 
              title: 'Study Unit', 
              description: 'Home Office Setup', 
              icon: '📚',
              tip: 'Ergonomic designs available'
            },
            { 
              key: 'crockeryUnit', 
              title: 'Crockery Unit', 
              description: 'Display & Storage', 
              icon: '🍽️',
              tip: 'Glass showcase options'
            },
            { 
              key: 'kitchenCabinets', 
              title: 'Kitchen Cabinets', 
              description: 'Modular Kitchen Units', 
              icon: '🔪',
              tip: 'Waterproof & termite-proof'
            },
            { 
              key: 'tvUnit', 
              title: 'TV Unit', 
              description: 'Wall-mounted or Standalone', 
              icon: '🎬',
              tip: 'Cable management included'
            }
          ].map(item => (
            <div key={item.key} className="requirement-item">
              <div className="requirement-icon">{item.icon}</div>
              <div className="requirement-info">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="requirement-tip">{item.tip}</div>
              </div>
              <div className="counter">
                <button 
                  className="counter-btn minus"
                  onClick={() => handleInputChange(`requirements.${item.key}`, Math.max(0, formData.requirements[item.key] - 1))}
                  disabled={formData.requirements[item.key] === 0}
                >
                  −
                </button>
                <div className="counter-value">
                  <span>{formData.requirements[item.key]}</span>
                  <div className="counter-label">Units</div>
                </div>
                <button 
                  className="counter-btn plus"
                  onClick={() => handleInputChange(`requirements.${item.key}`, formData.requirements[item.key] + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="total-summary">
        <div className="summary-item">
          <span>Total Items:</span>
          <span>{Object.values(formData.requirements).reduce((a, b) => a + b, 0)}</span>
        </div>
        <div className="summary-item">
          <span>Estimated Time:</span>
          <span>45-60 days</span>
        </div>
      </div>

      <div className="button-group">
        <button className="btn-back" onClick={prevStep}>
          <span className="arrow">←</span> Back
        </button>
        <button className="btn-next" onClick={nextStep}>
          Continue to Contact <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );

  // Step 3: Sign Up
  const Step3 = () => (
    <div className="step-container">
      <ProgressIndicator />
      
      <div className="step-header">
        <h1>📞 Almost There!</h1>
        <h2>Get Your Free Estimate</h2>
        <p className="step-subtitle">Share your details and receive a customized quote</p>
      </div>

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mobile Number *</label>
            <div className="input-with-icon">
              <span className="input-icon">📱</span>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                placeholder="Enter 10-digit mobile number"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <div className="input-with-icon">
              <span className="input-icon">📧</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Possession Timeline *</label>
            <div className="input-with-icon">
              <span className="input-icon">📅</span>
              <select 
                value={formData.possession} 
                onChange={(e) => handleInputChange('possession', e.target.value)}
                required
              >
                <option value="">When do you plan to start?</option>
                <option value="Immediate">Immediate (Within 1 month)</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months (Planning stage)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Property Location *</label>
            <div className="input-with-icon">
              <span className="input-icon">📍</span>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, Area, Project Name"
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <div className="checkbox-card">
              <input
                type="checkbox"
                id="whatsapp-updates"
                checked={formData.updatesOnWhatsapp}
                onChange={(e) => handleInputChange('updatesOnWhatsapp', e.target.checked)}
              />
              <label htmlFor="whatsapp-updates">
                <span className="checkbox-icon">💬</span>
                <div className="checkbox-text">
                  <div className="checkbox-title">Get updates on WhatsApp</div>
                  <div className="checkbox-desc">Receive design ideas, offers, and project updates</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className={`btn-submit ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
          {isLoading ? 'Processing...' : '🚀 Get Free Estimate'}
        </button>

        <div className="divider">
          <span>Or sign up faster with</span>
        </div>

        <button type="button" className="btn-google" onClick={handleGoogleSignup}>
          <span className="google-icon">G</span>
          Continue with Google
        </button>

        <div className="auth-links">
          <p>Already have an account? <a href="/login" className="auth-link">Log in here</a></p>
        </div>

        <div className="privacy-note">
          <p>By continuing, you agree to our <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Policy</a></p>
          <p className="small-text">We'll contact you within 24 hours</p>
        </div>
      </form>

      <div className="button-group">
        <button className="btn-back" onClick={prevStep}>
          <span className="arrow">←</span> Back to Requirements
        </button>
      </div>
    </div>
  );

  return (
    <div className="multistep-estimate">
      <div className="estimate-wrapper">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
      </div>
      
      <div className="floating-info">
        <div className="floating-card">
          <div className="floating-icon">🎯</div>
          <div className="floating-content">
            <h4>Quick Estimate</h4>
            <p>Get approximate cost in minutes</p>
          </div>
        </div>
        <div className="floating-card">
          <div className="floating-icon">🛡️</div>
          <div className="floating-content">
            <h4>100% Secure</h4>
            <p>Your data is protected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepEstimate;