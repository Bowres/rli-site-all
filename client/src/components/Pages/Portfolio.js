import React, { useState, useEffect } from 'react';
import '../../styles/Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const mockProjects = [
        {
          id: 1,
          title: 'Luxury Apartment - Marine Drive',
          type: 'Full Home',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
          category: 'residential',
          description: 'A complete home transformation with modern aesthetics and luxury finishes.',
          images: [
            '/images/portfolio/living-room/contemporary/L1.jpg',
            '/images/portfolio/living-room/contemporary/L2.jpg',
            '/images/portfolio/living-room/contemporary/L3.jpg',
            '/images/portfolio/living-room/contemporary/L4.jpg',
            '/images/portfolio/living-room/contemporary/L5.jpg',
            '/images/portfolio/living-room/contemporary/L6.jpg',
            '/images/portfolio/living-room/contemporary/L7.jpg',
            '/images/portfolio/living-room/contemporary/L8.jpg',
            '/images/portfolio/living-room/contemporary/L9.jpg',
            '/images/portfolio/living-room/contemporary/L10.jpg',
            '/images/portfolio/living-room/contemporary/L11.jpg',
            '/images/portfolio/living-room/contemporary/L12.jpg',
            '/images/portfolio/living-room/contemporary/L13.jpg',
            '/images/portfolio/living-room/contemporary/L14.jpg',
            '/images/portfolio/living-room/contemporary/L15.jpg',
            '/images/portfolio/living-room/contemporary/L16.jpg',
            '/images/portfolio/wardrobe/custom-wardrobe/W1.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K1.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K2.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K3.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K4.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K5.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K6.jpg',
            '/images/portfolio/bedroom/master-suite/b1.jpg',
            '/images/portfolio/bedroom/master-suite/B2.jpg',
            '/images/portfolio/bedroom/master-suite/b3.jpg',
            '/images/portfolio/bedroom/master-suite/b4.jpg',
            '/images/portfolio/bedroom/master-suite/b5.jpg',
            '/images/portfolio/bedroom/master-suite/b6.jpg',
            '/images/portfolio/bedroom/master-suite/b7.jpg',
            '/images/portfolio/bedroom/master-suite/b8.jpg',
            '/images/portfolio/bedroom/master-suite/b9.jpg'
          ]
        },
        {
          id: 2,
          title: 'Modern Kitchen Design',
          type: 'Kitchen',
          image: '/images/portfolio/kitchen/modern-kitchen/K1.jpg',
          category: 'kitchen',
          description: 'Smart kitchen with ergonomic design and premium materials.',
          images: [
            '/images/portfolio/kitchen/modern-kitchen/K1.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K2.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K3.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K4.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K5.jpg',
            '/images/portfolio/kitchen/modern-kitchen/K6.jpg'
          ]
        },
        {
          id: 3,
          title: 'Corporate Office Space',
          type: 'Office',
          image: '/images/portfolio/commercial/office-space/Office1.jpg',
          category: 'commercial',
          description: 'Contemporary office design focusing on productivity and employee comfort.',
          images: [
              '/images/portfolio/commercial/office-space/Office1.jpg',
              '/images/portfolio/commercial/office-space/Office2.jpg',
              '/images/portfolio/commercial/office-space/Office3.jpg',
              '/images/portfolio/commercial/office-space/Office4.jpg',
              '/images/portfolio/commercial/office-space/Office5.jpg',
              '/images/portfolio/commercial/office-space/Office6.jpg',
              '/images/portfolio/commercial/office-space/Office7.jpg',
              '/images/portfolio/commercial/office-space/Office8.jpg',
              '/images/portfolio/commercial/office-space/Office9.jpg',
              '/images/portfolio/commercial/office-space/Office10.jpg',
              '/images/portfolio/commercial/office-space/Office11.jpg',
              '/images/portfolio/commercial/office-space/Office12.jpg',
              '/images/portfolio/commercial/office-space/Office13.jpg',
              '/images/portfolio/commercial/office-space/Office14.jpg'
          ]
        },
        {
          id: 4,
          title: 'Master Bedroom Suite',
          type: 'Bedroom',
          image: '/images/portfolio/bedroom/master-suite/b1.jpg',
          category: 'bedroom',
          description: 'Luxurious bedroom with custom storage and elegant lighting.',
          images: [
              '/images/portfolio/bedroom/master-suite/b1.jpg',
              '/images/portfolio/bedroom/master-suite/B2.jpg',
              '/images/portfolio/bedroom/master-suite/b3.jpg',
              '/images/portfolio/bedroom/master-suite/b4.jpg',
              '/images/portfolio/bedroom/master-suite/b5.jpg',
              '/images/portfolio/bedroom/master-suite/b6.jpg',
              '/images/portfolio/bedroom/master-suite/b7.jpg',
              '/images/portfolio/bedroom/master-suite/b8.jpg',
              '/images/portfolio/bedroom/master-suite/b9.jpg'
          ]
        },
        {
          id: 5,
          title: 'Contemporary Living Room',
          type: 'Living Room',
          image: '/images/portfolio/living-room/contemporary/L1.jpg',
          category: 'living',
          description: 'Warm and inviting living space with custom furniture.',
          images: [
              '/images/portfolio/living-room/contemporary/L1.jpg',
              '/images/portfolio/living-room/contemporary/L2.jpg',
              '/images/portfolio/living-room/contemporary/L3.jpg',
              '/images/portfolio/living-room/contemporary/L4.jpg',
              '/images/portfolio/living-room/contemporary/L5.jpg',
              '/images/portfolio/living-room/contemporary/L6.jpg',
              '/images/portfolio/living-room/contemporary/L7.jpg',
              '/images/portfolio/living-room/contemporary/L8.jpg',
              '/images/portfolio/living-room/contemporary/L9.jpg',
              '/images/portfolio/living-room/contemporary/L10.jpg',
              '/images/portfolio/living-room/contemporary/L11.jpg',
              '/images/portfolio/living-room/contemporary/L12.jpg',
              '/images/portfolio/living-room/contemporary/L13.jpg',
              '/images/portfolio/living-room/contemporary/L14.jpg',
              '/images/portfolio/living-room/contemporary/L15.jpg',
              '/images/portfolio/living-room/contemporary/L16.jpg'
          ]
        },
        {
          id: 6,
          title: 'Custom Wardrobe Design',
          type: 'Wardrobe',
          image: '/images/portfolio/wardrobe/custom-wardrobe/W1.jpg',
          category: 'wardrobe',
          description: 'Custom-built wardrobe with smart storage solutions and premium finishes.',
          images: [
              '/images/portfolio/wardrobe/custom-wardrobe/W1.jpg'
          ]
        }
      ];
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'living', label: 'Living Room' },
    { value: 'wardrobe', label: 'Wardrobe' }
  ];

  const openModal = (project, index = 0) => {
    setSelectedProject(project);
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'auto';
  };

  const goToNextImage = () => {
    if (selectedProject && selectedProject.images) {
      setSelectedImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedProject.images.length
      );
    }
  };

  const goToPrevImage = () => {
    if (selectedProject && selectedProject.images) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="portfolio-loading">
        <div className="spinner"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <div className="portfolio-container">
        {/* Header Section */}
        <header className="portfolio-header">
          <h1 className="portfolio-title">Our Portfolio</h1>
          <p className="portfolio-subtitle">
            Browse through our completed projects and success stories.
          </p>
        </header>

        {/* Filter Section - Commented out */}
        {/* <div className="portfolio-filters">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.value}
                className={`filter-btn ${filter === category.value ? 'active' : ''}`}
                onClick={() => setFilter(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div> */}

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-type">
                  <span>{project.type}</span>
                </div>
                <div className="project-overlay">
                  <button 
                    onClick={() => openModal(project)}
                    className="view-gallery-btn"
                  >
                    View Gallery
                  </button>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimalist Image Gallery Popup */}
      {selectedProject && (
        <div className="gallery-popup">
          <div className="popup-overlay" onClick={closeModal}></div>
          
          <div className="popup-container">
            {/* Close Button */}
            <button className="popup-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Navigation Arrows */}
            {selectedProject.images.length > 1 && (
              <>
                <button className="popup-nav popup-nav-prev" onClick={goToPrevImage}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button className="popup-nav popup-nav-next" onClick={goToNextImage}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </>
            )}
            
            {/* Main Image */}
            <div className="popup-image-container">
              <img 
                src={selectedProject.images[selectedImageIndex]} 
                alt={`${selectedProject.title} - Image ${selectedImageIndex + 1}`}
                className="popup-main-image"
              />
            </div>
            
            {/* Image Counter */}
            <div className="popup-counter">
              <span>{selectedImageIndex + 1} / {selectedProject.images.length}</span>
            </div>
            
            {/* Project Title (Minimal) */}
            <div className="popup-title">
              <span>{selectedProject.title}</span>
            </div>
            
            {/* Thumbnails */}
            <div className="popup-thumbnails">
              {selectedProject.images.map((img, index) => (
                <button
                  key={index}
                  className={`popup-thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                  onClick={() => selectImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;