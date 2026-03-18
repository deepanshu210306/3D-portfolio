import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Flag, SquareTerminal } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SquareTerminal className="title-icon" size={32} /> The Path
        </motion.h2>

        <div className="about-grid">
          <motion.div
            className="about-block glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="block-header">
              <BookOpen size={24} className="block-icon" />
              <h3>Education</h3>
            </div>
            <p className="block-body">
              I am currently pursuing a <strong>B.Tech in Energy Engineering</strong> at the <strong>Indian Institute of Technology Delhi</strong>. Through unyielding discipline, I secured a <strong>99.607 percentile in JEE Main (2023)</strong>—standing out among over 1.4 million candidates. I have also cleared the NDA Examination (2022) and the Haryana State Talent Search Examination (HSTSE) (2021).
            </p>
          </motion.div>

          <motion.div
            className="about-block glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="block-header">
              <Flag size={24} className="block-icon" />
              <h3>Leadership</h3>
            </div>
            <div className="leadership-item">
              <h4>Design and Operations Coordinator</h4>
              <p className="leadership-meta">Energy Society, IIT Delhi <span>[Jun 2025 - Present]</span></p>
            </div>
            <div className="leadership-item">
              <h4>Operations Executive</h4>
              <p className="leadership-meta">Energy Society, IIT Delhi <span>[Jul 2024 - Jun 2025]</span></p>
            </div>
            <p className="leadership-summary">
              Commanding cross-functional teams and orchestrating large-scale events with precision.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
