import React, { useRef, useEffect } from 'react';
import { useFormContext } from '../contexts/FormContext';

const Card = ({ icon, title, description, index }) => {
  const cardRef = useRef();
  const { openRFCForm } = useFormContext();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = 1;
              entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger effect
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      cardRef.current.style.opacity = 0;
      cardRef.current.style.transform = 'translateY(30px)';
      cardRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [index]);
  
  return (
    <div className="card" ref={cardRef} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="card-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      
      {title === 'RFC Exemption Request' && (
        <button 
          className="btn btn-primary card-button" 
          onClick={openRFCForm}
        >
          Request Exemption
        </button>
      )}
    </div>
  );
};

export default Card; 