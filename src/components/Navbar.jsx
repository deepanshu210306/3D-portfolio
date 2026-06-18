import React, { useState, useEffect } from 'react';
import HoverTooltip from './HoverTooltip';
import './Navbar.css';

const navLinks = [
  { href: '#about', label: 'Michi', english: 'The Path' },
  { href: '#internship', label: 'Shugyō', english: 'Training' },
  { href: '#skills', label: 'Buki', english: 'Arsenal' },
  { href: '#projects', label: 'Senji', english: 'Campaigns' },
  { href: '#contact', label: 'Renraku', english: 'Contact' },
];

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
          {navLinks.map((item) => (
            <a href={item.href} className="nav-item" key={item.href}>
              <HoverTooltip label={item.english}>{item.label}</HoverTooltip>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
