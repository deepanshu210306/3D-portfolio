import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="nav-brand">
          <span className="brand-d">D</span>
          <span className="brand-dot">.</span>
        </a>
        <div className="nav-menu">
          <a href="#about" className="nav-item">Michi</a>
          <a href="#internship" className="nav-item">Shugyō</a>
          <a href="#skills" className="nav-item">Buki</a>
          <a href="#projects" className="nav-item">Senji</a>
          <a href="#contact" className="nav-item">Renraku</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
