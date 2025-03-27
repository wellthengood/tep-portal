import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const heroContentRef = useRef();
  const headingRef = useRef();

  useEffect(() => {
    // Simple fade-in animation for the content
    if (heroContentRef.current) {
      heroContentRef.current.style.opacity = '0';
      setTimeout(() => {
        heroContentRef.current.style.opacity = '1';
      }, 100);
    }
    
    // Simple animation for heading
    if (headingRef.current) {
      headingRef.current.style.opacity = '0';
      headingRef.current.style.transform = 'translateY(20px)';
      setTimeout(() => {
        headingRef.current.style.opacity = '1';
        headingRef.current.style.transform = 'translateY(0)';
      }, 300);
    }
  }, []);

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content" 
          ref={heroContentRef} 
          style={{ transition: 'opacity 0.8s ease-in-out' }}
        >
          <h2 
            ref={headingRef} 
            style={{ transition: 'opacity 0.8s ease, transform 0.8s ease' }}
          >
            Your Comprehensive Platform for Everything.
          </h2>
          
          <p className="hero-tagline">
            Streamline all your test data reservations, non-production environment planning, and performance metrics in one place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero; 