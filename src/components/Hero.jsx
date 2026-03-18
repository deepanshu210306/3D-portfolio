import React from 'react';
import { motion } from 'framer-motion';
import Avatar3D from './Avatar3D';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-layout">
        <div className="hero-text-block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="hero-kicker">IIT Delhi Engineer</div>
            <h1 className="hero-name">Deepanshu</h1>
            <p className="hero-subtext">
              Forging digital experiences with precision. Web Development, Game Engines, and Architectures.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary"><span>View Arsenal</span></a>
              <a href="#contact" className="btn-secondary">Unsheathe Code</a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-3d-block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <Avatar3D />
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-bar"></div>
      </div>
    </section>
  );
};

export default Hero;
