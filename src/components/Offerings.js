import React, { useEffect, useRef } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import './Offerings.css';

const offeringsData = [
  {
    icon: 'fas fa-database fa-2x',
    title: 'Test Data Reservation',
    description: 'Reserve and manage test data efficiently for your development and testing needs.',
    path: '/test-data'
  },
  {
    icon: 'fas fa-file-alt fa-2x',
    title: 'RFC Exemption Request',
    description: 'Streamline your RFC exemption process with our integrated request system.',
    path: '/rfc-exemption'
  },
  {
    icon: 'fas fa-chart-line fa-2x',
    title: 'Metrics & Reporting',
    description: 'Access comprehensive metrics and reports to track performance and identify trends.',
    path: '/dashboards'
  },
  {
    icon: 'fas fa-tasks fa-2x',
    title: 'NPE Plan',
    description: 'Plan and manage your non-production environments with ease and precision.',
    path: '/npe-plan'
  },
  {
    icon: 'fas fa-tools fa-2x',
    title: 'Platform Tooling',
    description: 'Leverage our suite of tools designed to enhance your development workflow.',
    path: '/platform-tools'
  },
  {
    icon: 'fas fa-vial fa-2x',
    title: 'Synthetic Sanity',
    description: 'Sanity testing to monitor system health and performance for NPE.',
    path: '/synthetic-sanity'
  }
];

const Offerings = () => {
  const sectionRef = useRef();
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, offeringsData.length);
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('card-appear');
            }, index * 150);
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) {
        cardObserver.observe(card);
      }
    });

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach((card) => {
        if (card) {
          cardObserver.unobserve(card);
        }
      });
    };
  }, []);

  const handleCardClick = (title, path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <section className="offerings section" id="offerings" ref={sectionRef}>
      <div className="container">
        <div className="section-header text-center">
          <h2>What We Offer</h2>
          <p>Comprehensive platform capabilities to streamline your testing and development workflow</p>
        </div>
        <div className="offerings-grid">
          {offeringsData.map((offering, index) => (
            <div 
              className="card-wrapper"
              key={index}
              ref={el => cardsRef.current[index] = el}
            >
              <Card 
                icon={offering.icon}
                title={offering.title}
                description={offering.description}
                index={index}
                onClick={() => handleCardClick(offering.title, offering.path)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings; 