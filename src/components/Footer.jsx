import React from 'react';
import './ContactPage.css';

const Footer = () => {
  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <footer>
      <div className="left-footer">
        <span>© Copyright 2025</span>
      </div>
      <div className="right-footer">
        <span>Follow us</span>
        <img className="icon" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" onClick={() => openLink('https://facebook.com')} />
        <img className="icon" src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" onClick={() => openLink('https://wa.me/')} />
        <img className="icon" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" onClick={() => openLink('https://linkedin.com')} />
        <img className="icon" src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" onClick={() => openLink('https://instagram.com')} />
      </div>
    </footer>
  );
};

export default Footer;
