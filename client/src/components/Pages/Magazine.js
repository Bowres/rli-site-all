import React, { useState, useEffect } from 'react';

const Magazine = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockArticles = [
        {
          id: 1,
          title: '2024 Interior Design Trends',
          excerpt: 'Discover the latest trends shaping modern interior spaces this year.',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
          category: 'Trends',
          readTime: '5 min read',
          date: '2024-01-15'
        },
        {
          id: 2,
          title: 'Color Psychology in Design',
          excerpt: 'Learn how colors influence mood and perception in interior spaces.',
          image: 'https://images.unsplash.com/photo-1540518614846-7eded1027f2b',
          category: 'Psychology',
          readTime: '7 min read',
          date: '2024-01-10'
        },
        {
          id: 3,
          title: 'Maximizing Small Spaces',
          excerpt: 'Smart design solutions to make the most of compact living areas.',
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
          category: 'Space Planning',
          readTime: '6 min read',
          date: '2024-01-05'
        },
        {
          id: 4,
          title: 'Sustainable Interior Design',
          excerpt: 'Eco-friendly materials and practices for modern interiors.',
          image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
          category: 'Sustainability',
          readTime: '8 min read',
          date: '2024-01-01'
        }
      ];
      setArticles(mockArticles);
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
      <h1 className="text-center mb-5">Design Magazine</h1>
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <p className="lead text-center">
            Read our latest articles and stay updated with interior design trends.
          </p>
        </div>
      </div>
      
      <div className="row">
        {articles.map(article => (
          <div key={article.id} className="col-lg-6 mb-4">
            <div className="magazine-card h-100">
              <img 
                src={article.image} 
                alt={article.title}
                className="magazine-image"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="magazine-content">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-primary">{article.category}</span>
                  <small className="text-muted">{article.readTime}</small>
                </div>
                <h5>{article.title}</h5>
                <p>{article.excerpt}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{new Date(article.date).toLocaleDateString()}</small>
                  <a href={`/magazine/article/${article.id}`} className="btn btn-feature btn-sm">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Magazine;