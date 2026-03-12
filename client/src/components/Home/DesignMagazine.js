import React from 'react';
import '../../styles/DesignMagazine.css';

const DesignMagazine = () => {
  const articles = [
    {
      id: 1,
      title: '2024 Interior Design Trends',
      description: 'Discover the latest trends shaping modern interior spaces this year.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Color Psychology in Design',
      description: 'Learn how colors influence mood and perception in interior spaces.',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded1027f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Maximizing Small Spaces',
      description: 'Smart design solutions to make the most of compact living areas.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      readTime: '6 min read'
    }
  ];

  return (
    <section id="magazine" className="py-5">
      <div className="container">
        <h2 className="section-title">DESIGN MAGAZINE</h2>
        <p className="text-center mb-5">
          Stay updated with the latest trends, tips, and inspiration from the world of interior design.
        </p>

        <div className="magazine-grid">
          {articles.map(article => (
            <div key={article.id} className="magazine-card">
              <img src={article.image} alt={article.title} className="magazine-image" />
              <div className="magazine-content">
                <h5>{article.title}</h5>
                <p>{article.description}</p>
                <small className="text-muted">{article.readTime}</small>
                <div className="mt-3">
                  <a href="#" className="btn btn-feature btn-sm">Read Article</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a href="#" className="btn btn-prime btn-lg">
            <i className="fas fa-book me-2"></i>VIEW ALL ARTICLES
          </a>
        </div>
      </div>
    </section>
  );
};

export default DesignMagazine;