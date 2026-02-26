const homeController = {
  getHome: (req, res) => {
    res.json({ 
      message: 'Welcome to LivePace API',
      features: [
        'Interior Design Services',
        'Price Calculator',
        'Design Magazine',
        'Consultation Booking'
      ]
    });
  },

  getDesignIdeas: (req, res) => {
    const designIdeas = [
      {
        id: 1,
        title: 'Modern Living Room',
        category: 'Living Room',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
        description: 'Contemporary living room designs with modern furniture'
      },
      {
        id: 2,
        title: 'Minimalist Kitchen',
        category: 'Kitchen',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
        description: 'Clean and functional kitchen designs'
      }
    ];
    res.json({ 
      title: 'Design Ideas - LivePace',
      content: 'Get inspired by our collection of interior design ideas and trends.',
      ideas: designIdeas
    });
  },

  getMagazine: (req, res) => {
    const articles = [
      {
        id: 1,
        title: '2024 Interior Design Trends',
        excerpt: 'Discover the latest trends shaping modern interior spaces this year.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
        readTime: '5 min read'
      },
      {
        id: 2,
        title: 'Color Psychology in Design',
        excerpt: 'Learn how colors influence mood and perception in interior spaces.',
        image: 'https://images.unsplash.com/photo-1540518614846-7eded1027f2b',
        readTime: '7 min read'
      }
    ];
    res.json({ 
      title: 'Magazine - LivePace',
      content: 'Read our latest articles and stay updated with interior design trends.',
      articles: articles
    });
  },

  getCities: (req, res) => {
    const cities = [
      { name: 'Mumbai', projects: 150 },
      { name: 'Delhi', projects: 120 },
      { name: 'Bangalore', projects: 100 },
      { name: 'Chennai', projects: 80 },
      { name: 'Hyderabad', projects: 75 }
    ];
    res.json({ 
      title: 'Cities - LivePace',
      content: 'Find our services in cities across the country.',
      cities: cities
    });
  },

  getPortfolio: (req, res) => {
    const projects = [
      {
        id: 1,
        title: 'Luxury Apartment',
        type: 'Full Home',
        location: 'Mumbai',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
        area: '1800 sq.ft.'
      },
      {
        id: 2,
        title: 'Modern Kitchen',
        type: 'Kitchen',
        location: 'Delhi',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
        area: '250 sq.ft.'
      }
    ];
    res.json({ 
      title: 'Portfolio - LivePace',
      content: 'Browse through our completed projects and success stories.',
      projects: projects
    });
  },

  getConsultation: (req, res) => {
    res.json({ 
      title: 'Book Free Consultation - LivePace',
      content: 'Book your free consultation with our design experts.',
      contact: {
        phone: '+91 9876543210',
        email: 'consult@livepace.com'
      }
    });
  },

  submitConsultation: (req, res) => {
    const { name, email, phone, city, projectType, preferredDate } = req.body;
    
    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    // Here you would typically save to database
    console.log('Consultation request received:', req.body);
    
    // Simulate database save
    const consultationId = 'CONS' + Date.now();
    
    res.json({ 
      success: true,
      message: 'Consultation booked successfully! We will contact you soon.',
      consultationId: consultationId,
      data: {
        ...req.body,
        bookedAt: new Date().toISOString(),
        status: 'pending'
      }
    });
  },

  calculatePrice: (req, res) => {
    const { projectType, area, designStyle, additionalServices } = req.body;
    
    let basePrice = 0;

    // Base price per sq.ft. based on project type
    switch(projectType) {
      case 'full-home':
        basePrice = 250;
        break;
      case 'kitchen':
        basePrice = 300;
        break;
      case 'bedroom':
        basePrice = 200;
        break;
      case 'living':
        basePrice = 180;
        break;
      case 'office':
        basePrice = 220;
        break;
      default:
        basePrice = 250;
    }

    // Design style multiplier
    let styleMultiplier = 1;
    switch(designStyle) {
      case 'premium':
        styleMultiplier = 1.5;
        break;
      case 'luxury':
        styleMultiplier = 2;
        break;
      case 'custom':
        styleMultiplier = 2.5;
        break;
    }

    // Additional services cost
    let additionalCost = 0;
    if (additionalServices.smartHome) additionalCost += 50000;
    if (additionalServices.customFurniture) additionalCost += 75000;
    if (additionalServices.lightingDesign) additionalCost += 30000;

    // Calculate total
    let totalPrice = (basePrice * area * styleMultiplier) + additionalCost;

    res.json({
      success: true,
      estimatedPrice: totalPrice,
      breakdown: {
        baseCost: basePrice * area,
        styleMultiplier: styleMultiplier,
        additionalServices: additionalCost,
        total: totalPrice
      },
      currency: 'INR'
    });
  }
};

module.exports = homeController;