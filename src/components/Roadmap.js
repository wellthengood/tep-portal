import React, { useEffect, useRef } from 'react';

const roadmapData = [
  {
    quarter: 'Q1 2025',
    title: 'Enhanced Data Reservation',
    description: 'Improved data reservation system with AI-driven recommendations.'
  },
  {
    quarter: 'Q2 2025',
    title: 'Advanced Analytics Dashboard',
    description: 'Comprehensive dashboard for real-time monitoring and analytics.'
  },
  {
    quarter: 'Q3 2025',
    title: 'Integration Hub',
    description: 'Seamless integration with third-party tools and platforms.'
  },
  {
    quarter: 'Q4 2025',
    title: 'Automated Environment Provisioning',
    description: 'One-click environment setup and configuration.'
  }
];

const Roadmap = () => {
  const roadmapRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    roadmapRef.current.forEach(item => {
      if (item) {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
      }
    });

    return () => {
      roadmapRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section className="roadmap" id="roadmap">
      <div className="container">
        <h2 className="section-title">2025 Roadmap</h2>
        <div className="roadmap-timeline">
          {roadmapData.map((item, index) => (
            <div 
              className="roadmap-item" 
              key={index}
              ref={el => roadmapRef.current[index] = el}
            >
              <div className="quarter">{item.quarter}</div>
              <div className="milestone">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 