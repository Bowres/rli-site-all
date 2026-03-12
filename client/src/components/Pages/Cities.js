import React, { useState, useEffect } from 'react';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCities = [
        { name: 'Mumbai', projects: 150, image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c' },
        { name: 'Delhi', projects: 120, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5' },
        { name: 'Bangalore', projects: 100, image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2' },
        { name: 'Chennai', projects: 80, image: 'https://images.unsplash.com/photo-1595669169523-4c6c5c6b6c6f' },
        { name: 'Hyderabad', projects: 75, image: 'https://images.unsplash.com/photo-1595669169523-4c6c5c6b6c6f' },
        { name: 'Pune', projects: 60, image: 'https://images.unsplash.com/photo-1595669169523-4c6c5c6b6c6f' },
        { name: 'Kolkata', projects: 55, image: 'https://images.unsplash.com/photo-1595669169523-4c6c5c6b6c6f' },
        { name: 'Ahmedabad', projects: 45, image: 'https://images.unsplash.com/photo-1595669169523-4c6c5c6b6c6f' }
      ];
      setCities(mockCities);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Cities We Serve</h1>
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <p className="lead text-center">
            Find our services in cities across the country. We bring beautiful interiors to your doorstep.
          </p>
        </div>
      </div>
      
      <div className="row">
        {cities.map((city, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="city-card feature-card">
              <img 
                src={city.image} 
                alt={city.name}
                className="img-fluid rounded mb-3"
                style={{ height: '150px', width: '100%', objectFit: 'cover' }}
              />
              <h5 className="text-center">{city.name}</h5>
              <p className="text-center text-muted">{city.projects}+ Projects Completed</p>
              <div className="text-center">
                <a href={`/cities/${city.name.toLowerCase()}`} className="btn btn-feature btn-sm">
                  View Projects
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <div className="alert alert-info">
          <h5>Not in your city?</h5>
          <p>We're expanding! Contact us to bring LivePace to your city.</p>
          <a href="/consultation" className="btn btn-prime">
            Request Service in Your City
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cities;