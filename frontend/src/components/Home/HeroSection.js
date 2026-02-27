import React, { useState, useEffect, useRef } from 'react';
import HowItWorks from './HowItWorks';
import PricingCalculator from './PricingCalculator';
import Offerings from './Offerings';
import DesignMagazine from './DesignMagazine';
import Consultation from './Consultation';
import WhyChooseService from './WhyChooseService';
import '../../styles/HeroSection.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef(null);
  const isTransitioning = useRef(false);
  
  const slides = [
    {
      background: 'slide-1',
      title1: 'ELEVATE YOUR',
      title2: 'LIVING EXPERIENCE',
      badges: ['PREMIUM', 'LUXURY', 'BESPOKE', 'INNOVATIVE'],
      buttons: [
        { text: 'BOOK FREE CONSULTATION', href: '/consultation' },
        { text: 'EXPLORE DESIGNS', href: '/design-ideas' }
      ],
    },
    {
      background: 'slide-2',
      title1: 'WHERE CULINARY',
      title2: 'DREAMS COME ALIVE',
      badges: ['SMART', 'ERGONOMIC', 'SUSTAINABLE'],
      buttons: [
        { text: 'CALCULATE COST', href: '/pricing-calculator' },
        { text: 'VIEW PORTFOLIO', href: '/portfolio' }
      ],
      note: 'GERMAN ENGINEERED FITTINGS'
    },
    {
      background: 'slide-3',
      title1: 'SLEEP IN STYLE',
      title2: 'WAKE IN WONDER',
      badges: ['LUXURY', 'COMFORT', 'PERSONALIZED'],
      buttons: [
        { text: 'VIEW CATALOG', href: '/design-ideas' },
        { text: 'GET QUOTE', href: '/consultation' }
      ],
      note: 'EUROPEAN QUALITY STANDARDS'
    },
    {
      background: 'slide-4',
      title1: 'YOUR STYLE',
      title2: 'PERFECTLY ORGANIZED',
      badges: ['CONTEMPORARY', 'SPACIOUS', 'ACOUSTIC'],
      buttons: [
        { text: 'DESIGN IDEAS', href: '/design-ideas' },
        { text: 'CONSULT EXPERT', href: '/consultation' }
      ],
      note: 'CUSTOM AUDIO-VISUAL INTEGRATION'
    },
    {
      background: 'slide-5',
      title1: 'PROFESSIONAL SPACE',
      title2: 'PERSONAL TOUCH',
      badges: ['PRODUCTIVE', 'ERGONOMIC', 'INSPIRING'],
      buttons: [
        { text: 'OFFICE DESIGNS', href: '/portfolio' },
        { text: 'SCHEDULE VISIT', href: '/consultation' }
      ],
      note: 'ERGONOMIC CERTIFIED DESIGNS'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    
    setCurrentSlide((prev) => {
      const nextSlide = (prev + 1) % slides.length;
      
      if (nextSlide === 0) {
        setTimeout(() => {
          if (slidesRef.current) {
            slidesRef.current.style.transition = 'none';
            slidesRef.current.style.transform = `translateX(0%)`;
            
            void slidesRef.current.offsetWidth;
            
            setTimeout(() => {
              if (slidesRef.current) {
                slidesRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              }
              isTransitioning.current = false;
            }, 50);
          }
        }, 800);
      } else {
        setTimeout(() => {
          isTransitioning.current = false;
        }, 800);
      }
      
      return nextSlide;
    });
  };

  const handlePrev = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    
    setCurrentSlide((prev) => {
      const prevSlide = prev === 0 ? slides.length - 1 : prev - 1;
      
      if (prev === 0) {
        if (slidesRef.current) {
          slidesRef.current.style.transition = 'none';
          slidesRef.current.style.transform = `translateX(-${(slides.length - 1) * 20}%)`;
          
          void slidesRef.current.offsetWidth;
          
          setTimeout(() => {
            if (slidesRef.current) {
              slidesRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              setCurrentSlide(slides.length - 2);
              setTimeout(() => {
                isTransitioning.current = false;
              }, 800);
            }
          }, 50);
        }
        return prev;
      }
      
      setTimeout(() => {
        isTransitioning.current = false;
      }, 800);
      
      return prevSlide;
    });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-container">
        <div 
          ref={slidesRef}
          className="hero-slides" 
          style={{ 
            transform: `translateX(-${currentSlide * 20}%)`,
            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className={`hero-slide ${slide.background}`}>
              <div className="fade-left"></div>
              <div className="fade-bottom"></div>
              <div className="slide-content">
                <div className="title-container">
                  <h1 className="hero-title main-title">{slide.title1}</h1>
                  <h1 className="hero-title highlight-title">{slide.title2}</h1>
                </div>

                <div className="language-badges">
                  {slide.badges.map((badge, i) => (
                    <span key={i} className="language-badge">
                      <span className="checkmark"></span>
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="hero-buttons">
                  {slide.buttons.map((button, i) => (
                    <a key={i} href={button.href} className={`btn-hero ${i === 0 ? 'btn-primary' : 'btn-secondary'}`}>
                      {button.text}
                    </a>
                  ))}
                </div>

                {/* <div className="hero-note">
                  <span className="star">★</span>
                  {slide.note}
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="nav-arrows">
          <div className="arrow prev-arrow" onClick={handlePrev}>
            ‹
          </div>
          <div className="arrow next-arrow" onClick={handleNext}>
            ›
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <HowItWorks />
      <WhyChooseService />
      <Offerings />
      <PricingCalculator />
      <Consultation />
    </>
  );
};

export default HeroSection;