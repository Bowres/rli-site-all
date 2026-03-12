import React from 'react';
import { Link } from 'react-router-dom';
import '../../../src/styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="livepace-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand-section">
              <div className="footer-brand">
                <Link to="/" className="footer-logo-link">
                  Rajalakshmi<br />Hi-Tech Interiors
                </Link>
                <p className="footer-tagline">
                  Trends with unique designs.
                </p>
              </div>
            
            <div className="footer-contact">
              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <span>+91 9941874830</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>rlhitechinteriors@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Chennai, India</span>
              </div>
            </div>

            {/*<div className="footer-social">
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
               <a href="#" className="social-link" aria-label="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a> 
            </div> */}
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h4 className="footer-heading">SERVICES</h4>
            <ul className="footer-links">
              <li><Link to="/portfolio?category=residential">Full Home</Link></li>
              <li><Link to="/portfolio?category=kitchen">Kitchen</Link></li>
              <li><Link to="/portfolio?category=bedroom">Bedroom</Link></li>
              <li><Link to="/portfolio?category=living">Living Room</Link></li>
              <li><Link to="/portfolio?category=wardrobe">Wardrobe</Link></li>
              <li><Link to="/portfolio?category=commercial">Commercial</Link></li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="footer-section">
            <h4 className="footer-heading">COMPANY</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/design-ideas">Design Ideas</Link></li>
              <li><Link to="/consultation">Book Consultation</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Optional: Newsletter Section - Commented out if not needed */}
          {/* <div className="footer-section footer-newsletter">
            <h4 className="footer-heading">NEWSLETTER</h4>
            <p className="newsletter-text">Subscribe for design inspiration</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div> */}
         
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} Rajalakshmi Hi-Tech Interiors. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="divider">|</span>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;