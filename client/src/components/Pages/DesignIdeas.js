import React, { useState, useEffect } from 'react';
import '../../styles/DesignIdeas.css';

const DesignIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const mockIdeas = [
        {
          id: 1,
          title: 'Modern Living Room Design',
          type: 'Living Room',
          image: '/images/design-ideas/living-room/contemporary/L1.jpg',
          category: 'living',
          description: 'Contemporary living space with clean lines and warm ambiance.',
          images: [
            '/images/design-ideas/living-room/contemporary/L1.jpg',
            '/images/design-ideas/living-room/contemporary/L2.jpg',
            '/images/design-ideas/living-room/contemporary/L3.jpg',
            '/images/design-ideas/living-room/contemporary/L4.jpg',
            '/images/design-ideas/living-room/contemporary/L5.jpg',
            '/images/design-ideas/living-room/contemporary/L6.jpg',
            '/images/design-ideas/living-room/contemporary/L7.jpg',
            '/images/design-ideas/living-room/contemporary/L8.jpg',
            '/images/design-ideas/living-room/contemporary/L9.jpg',
            '/images/design-ideas/living-room/contemporary/L10.jpg'
          ],
          tags: ['Contemporary', 'Warm', 'Elegant'],
          popularity: 234
        },
        {
          id: 2,
          title: 'Minimalist Kitchen Ideas',
          type: 'Kitchen',
          image: '/images/design-ideas/kitchen/modern-kitchen/K1.jpg',
          category: 'kitchen',
          description: 'Sleek modular kitchen designs with smart storage solutions.',
          images: [
            '/images/design-ideas/kitchen/modern-kitchen/K1.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K2.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K3.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K4.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K5.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K6.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K7.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K8.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K9.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K10.jpg'
          ],
          tags: ['Minimalist', 'Modular', 'Smart Storage'],
          popularity: 312
        },
        {
          id: 3,
          title: 'Home Office Inspiration',
          type: 'Office',
          image: '/images/design-ideas/commercial/office-space/Office1.jpg',
          category: 'office',
          description: 'Productive workspace designs for modern home offices.',
          images: [
            '/images/design-ideas/commercial/office-space/Office1.jpg',
            '/images/design-ideas/commercial/office-space/Office2.jpg',
            '/images/design-ideas/commercial/office-space/Office3.jpg',
            '/images/design-ideas/commercial/office-space/Office4.jpg',
            '/images/design-ideas/commercial/office-space/Office5.jpg',
            '/images/design-ideas/commercial/office-space/Office6.jpg',
            '/images/design-ideas/commercial/office-space/Office7.jpg',
            '/images/design-ideas/commercial/office-space/Office8.jpg',
            '/images/design-ideas/commercial/office-space/Office9.jpg'
          ],
          tags: ['Ergonomic', 'Modern', 'Productive'],
          popularity: 278
        },
        {
          id: 4,
          title: 'Luxury Bedroom Concepts',
          type: 'Bedroom',
          image: '/images/design-ideas/bedroom/master-suite/b1.jpg',
          category: 'bedroom',
          description: 'Elegant bedroom designs with custom storage and lighting.',
          images: [
            '/images/design-ideas/bedroom/master-suite/b1.jpg',
            '/images/design-ideas/bedroom/master-suite/B2.jpg',
            '/images/design-ideas/bedroom/master-suite/b3.jpg',
            '/images/design-ideas/bedroom/master-suite/b4.jpg',
            '/images/design-ideas/bedroom/master-suite/b5.jpg',
            '/images/design-ideas/bedroom/master-suite/b6.jpg',
            '/images/design-ideas/bedroom/master-suite/b7.jpg',
            '/images/design-ideas/bedroom/master-suite/b8.jpg',
            '/images/design-ideas/bedroom/master-suite/b9.jpg',
            '/images/design-ideas/bedroom/master-suite/b10.jpg',
            '/images/design-ideas/bedroom/master-suite/b11.jpg',
            '/images/design-ideas/bedroom/master-suite/b12.jpg'
          ],
          tags: ['Luxury', 'Comfort', 'Elegant'],
          popularity: 345
        },
        {
          id: 5,
          title: 'Custom Wardrobe Ideas',
          type: 'Wardrobe',
          image: '/images/design-ideas/wardrobe/custom-wardrobe/w1.jpg',
          category: 'wardrobe',
          description: 'Smart wardrobe designs with custom storage solutions.',
          images: [
            '/images/design-ideas/wardrobe/custom-wardrobe/w1.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w2.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w3.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w4.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w5.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w6.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w7.jpg'
          ],
          tags: ['Custom', 'Storage', 'Modern'],
          popularity: 189
        },
        {
          id: 6,
          title: 'Full Home Interior Concepts',
          type: 'Full Home',
          image: '/images/design-ideas/residential/full-home/Home1.jpg',
          category: 'fullhome',
          description: 'Complete home transformation ideas with cohesive design themes.',
          images: [
            '/images/design-ideas/living-room/contemporary/L1.jpg',
            '/images/design-ideas/living-room/contemporary/L2.jpg',
            '/images/design-ideas/living-room/contemporary/L3.jpg',
            '/images/design-ideas/living-room/contemporary/L4.jpg',
            '/images/design-ideas/living-room/contemporary/L5.jpg',
            '/images/design-ideas/living-room/contemporary/L6.jpg',
            '/images/design-ideas/living-room/contemporary/L7.jpg',
            '/images/design-ideas/living-room/contemporary/L8.jpg',
            '/images/design-ideas/living-room/contemporary/L9.jpg',
            '/images/design-ideas/living-room/contemporary/L10.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K1.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K2.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K3.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K4.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K5.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K6.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K7.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K8.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K9.jpg',
            '/images/design-ideas/kitchen/modern-kitchen/K10.jpg',
            '/images/design-ideas/bedroom/master-suite/b1.jpg',
            '/images/design-ideas/bedroom/master-suite/B2.jpg',
            '/images/design-ideas/bedroom/master-suite/b3.jpg',
            '/images/design-ideas/bedroom/master-suite/b4.jpg',
            '/images/design-ideas/bedroom/master-suite/b5.jpg',
            '/images/design-ideas/bedroom/master-suite/b6.jpg',
            '/images/design-ideas/bedroom/master-suite/b7.jpg',
            '/images/design-ideas/bedroom/master-suite/b8.jpg',
            '/images/design-ideas/bedroom/master-suite/b9.jpg',
            '/images/design-ideas/bedroom/master-suite/b10.jpg',
            '/images/design-ideas/bedroom/master-suite/b11.jpg',
            '/images/design-ideas/bedroom/master-suite/b12.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w1.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w2.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w3.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w4.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w5.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w6.jpg',
            '/images/design-ideas/wardrobe/custom-wardrobe/w7.jpg'
          ],
          tags: ['Complete', 'Cohesive', 'Themed'],
          popularity: 267
        }
      ];
      setIdeas(mockIdeas);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredIdeas = filter === 'all' 
    ? ideas 
    : ideas.filter(idea => idea.category === filter);

  const categories = [
    { value: 'all', label: 'All Ideas' },
    { value: 'fullhome', label: 'Full Home' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'office', label: 'Office' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'living', label: 'Living Room' },
    { value: 'wardrobe', label: 'Wardrobe' }
  ];

  const trendingTopics = [
    "Biophilic Design",
    "Smart Home Integration",
    "Sustainable Materials",
    "Multifunctional Spaces",
    "Bold Wallpaper",
    "Terrazzo Finishes",
    "Curved Furniture",
    "Home Wellness Zones"
  ];

  // Hero section background style
  const heroStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1618221195710-7a4d4e5c2c5d?w=1200&h=400&fit=crop') center/cover`,
    height: '300px',
    borderRadius: '16px',
    marginBottom: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white'
  };

  const openModal = (idea, index = 0) => {
    setSelectedIdea(idea);
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedIdea(null);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'auto';
  };

  const goToNextImage = () => {
    if (selectedIdea && selectedIdea.images) {
      setSelectedImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedIdea.images.length
      );
    }
  };

  const goToPrevImage = () => {
    if (selectedIdea && selectedIdea.images) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedIdea.images.length - 1 : prevIndex - 1
      );
    }
  };

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedIdea) return;
      
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
  }, [selectedIdea]);

  if (loading) {
    return (
      <div className="design-ideas-loading">
        <div className="spinner"></div>
        <p>Loading design ideas...</p>
      </div>
    );
  }

  return (
    <div className="design-ideas-page">
      <div className="design-ideas-container">
        {/* Hero Section */}
        <section style={heroStyle}>
          <div className="hero-overlay">
            <h1>Design Ideas & Inspiration</h1>
            <p>Explore trending concepts, styles, and creative solutions for your dream space</p>
          </div>
        </section>

        {/* Trending Topics Section */}
        <section className="trending-section">
          <div className="section-header">
            <h2>Trending & Popular Design Concepts</h2>
          </div>
          <div className="trending-tags">
            {trendingTopics.map((topic, index) => (
              <span key={index} className="trending-tag">{topic}</span>
            ))}
          </div>
        </section>

        {/* Mood Board Section */}
        <section className="mood-board-section">
          <div className="section-header">
            <h2>Mood Boards</h2>
            <p>Curated color palettes and style combinations</p>
          </div>
          <div className="mood-board-grid">
            <div className="mood-card">
              <div className="color-palette">
                <span style={{backgroundColor: '#F5E6D3'}}></span>
                <span style={{backgroundColor: '#8B7E6A'}}></span>
                <span style={{backgroundColor: '#2C3E50'}}></span>
                <span style={{backgroundColor: '#E67E22'}}></span>
              </div>
              <h4>Earth Tones</h4>
              <p>Warm, natural, grounding</p>
            </div>
            <div className="mood-card">
              <div className="color-palette">
                <span style={{backgroundColor: '#A9CCE3'}}></span>
                <span style={{backgroundColor: '#F7F9F9'}}></span>
                <span style={{backgroundColor: '#1B4F72'}}></span>
                <span style={{backgroundColor: '#D4AC0D'}}></span>
              </div>
              <h4>Coastal Vibes</h4>
              <p>Fresh, airy, serene</p>
            </div>
            <div className="mood-card">
              <div className="color-palette">
                <span style={{backgroundColor: '#17202A'}}></span>
                <span style={{backgroundColor: '#566573'}}></span>
                <span style={{backgroundColor: '#CACFD2'}}></span>
                <span style={{backgroundColor: '#D98880'}}></span>
              </div>
              <h4>Urban Modern</h4>
              <p>Sleek, sophisticated, bold</p>
            </div>
            <div className="mood-card">
              <div className="color-palette">
                <span style={{backgroundColor: '#D5D8DC'}}></span>
                <span style={{backgroundColor: '#F1948A'}}></span>
                <span style={{backgroundColor: '#A569BD'}}></span>
                <span style={{backgroundColor: '#F7DC6F'}}></span>
              </div>
              <h4>Playful Pastels</h4>
              <p>Soft, whimsical, cheerful</p>
            </div>
          </div>
        </section>

        {/* Header Section */}
        <header className="design-ideas-header">
          <h1 className="design-ideas-title">Design Ideas</h1>
          <p className="design-ideas-subtitle">
            Explore inspiring design concepts for your dream space
          </p>
        </header>

        {/* Filter Section */}
        <div className="design-ideas-filters">
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
        </div>

        {/* Ideas Grid */}
        <div className="ideas-grid">
          {filteredIdeas.map(idea => (
            <div key={idea.id} className="idea-card">
              <div className="idea-image-container">
                <img 
                  src={idea.image} 
                  alt={idea.title}
                  className="idea-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1618221195710-7a4d4e5c2c5d?w=400&h=300&fit=crop';
                  }}
                />
                <div className="idea-type">
                  <span>{idea.type}</span>
                </div>
                <div className="idea-overlay">
                  <button 
                    onClick={() => openModal(idea)}
                    className="view-gallery-btn"
                  >
                    View Gallery
                  </button>
                </div>
              </div>
              <div className="idea-content">
                <h3 className="idea-title">{idea.title}</h3>
                <p className="idea-description">{idea.description}</p>
                <div className="idea-tags">
                  {idea.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation CTA */}
        <section className="ideas-cta-section">
          <div className="cta-content">
            <h2>Love an idea? Let's make it yours!</h2>
            <p>Our designers can customize any concept to match your space and style</p>
            {/* <button className="cta-button">BOOK FREE CONSULTATION</button> */}
            <a href="/consultation" className="cta-button">
              <span>BOOK FREE CONSULTATION</span>
            </a>
          </div>
        </section>
      </div>

      {/* Image Gallery Popup */}
      {selectedIdea && (
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
            {selectedIdea.images && selectedIdea.images.length > 1 && (
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
                src={selectedIdea.images[selectedImageIndex]} 
                alt={`${selectedIdea.title} - Image ${selectedImageIndex + 1}`}
                className="popup-main-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1618221195710-7a4d4e5c2c5d?w=1200&h=800&fit=crop';
                }}
              />
            </div>
            
            {/* Image Counter */}
            <div className="popup-counter">
              <span>{selectedImageIndex + 1} / {selectedIdea.images.length}</span>
            </div>
            
            {/* Project Title */}
            <div className="popup-title">
              <span>{selectedIdea.title}</span>
            </div>
            
            {/* Thumbnails */}
            {selectedIdea.images && selectedIdea.images.length > 1 && (
              <div className="popup-thumbnails">
                {selectedIdea.images.map((img, index) => (
                  <button
                    key={index}
                    className={`popup-thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                    onClick={() => selectImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1618221195710-7a4d4e5c2c5d?w=100&h=70&fit=crop';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignIdeas;