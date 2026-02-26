import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../src/styles/Navigation.css';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="livepace-navbar">
      <div className="nav-container">
        <Link className="nav-brand" to="/" onClick={closeMobileMenu}>
          <img 
            src='images/BrandImages/BrandLogo.png'
            alt="Rajalakshmi Hi-Tech Interiors" 
            className="brand-logo"
          />
        </Link>
        
        <button 
          className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`nav-menu ${isMobileMenuOpen ? 'show' : ''}`}>
          <div className="nav-content">
            <ul className="nav-links">
              <li className="nav-item">
                <Link className="nav-link" to="/design-ideas" onClick={closeMobileMenu}>
                  Design Ideas
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/magazine" onClick={closeMobileMenu}>
                  Magazine
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/portfolio" onClick={closeMobileMenu}>
                  Portfolio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={closeMobileMenu}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={closeMobileMenu}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-actions">
            <Link to="/consultation" className="btn-primary" onClick={closeMobileMenu}>
              BOOK FREE CONSULTATION
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;