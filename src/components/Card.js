import React, { useRef, useEffect } from 'react';
import { useFormContext } from '../contexts/FormContext';

const Card = ({ icon, title, description, index, onClick }) => {
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
      cardRef.current.style.transition = 'opacity 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [index]);
  
  const handleCardClick = (e) => {
    // For RFC Exemption Request, prevent propagation to avoid conflict with button click
    if (title === 'RFC Exemption Request' && e.target.tagName !== 'BUTTON') {
      e.stopPropagation();
      openRFCForm();
    } else {
      onClick && onClick();
    }
  };
  
  return (
    <div 
      className="card" 
      ref={cardRef} 
      style={{ animationDelay: `${index * 0.1}s` }} 
      onClick={handleCardClick}
    >
      <div className="card-icon-wrapper">
        <div className="card-icon">
          <i className={icon}></i>
        </div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      
      {title === 'RFC Exemption Request' && (
        <button 
          className="btn btn-primary card-button" 
          onClick={(e) => {
            e.stopPropagation();
            openRFCForm();
          }}
        >
          Request Exemption
        </button>
      )}
      
      <div className="card-overlay"></div>
    </div>
  );
};

export default Card; 