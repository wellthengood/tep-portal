import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with ${email}! You'll receive updates soon.`);
    setEmail('');
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-simplified">
          <div className="subscription">
            <h3>Subscribe for updates</h3>
            <form className="subscribe-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 TEP Platform. All rights reserved.</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-microsoft"></i></a>
            <a href="#"><i className="fab fa-gitlab"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 