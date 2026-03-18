import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <span className="logo-text">Deepanshu</span>
          <span className="logo-dot">.</span>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Deepanshu. Forged with React & Passion.
        </p>
        <div className="footer-links">
          <a href="https://github.com/deepanshu" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/deepanshu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:deepanshu210306@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
