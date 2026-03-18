import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Code } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <motion.div
          className="contact-wrapper glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="contact-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Forge a <br />New Legacy.
          </motion.h2>

          <motion.div
            className="contact-actions"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="contact-kicker">Summon communication</span>
            <a href="mailto:deepanshu210306@gmail.com" className="email-link">
              deepanshu210306@gmail.com <ArrowUpRight className="arrow" size={28} />
            </a>
          </motion.div>

          <motion.div
            className="social-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="https://github.com/deepanshu210306" target="_blank" rel="noopener noreferrer" className="social-item">
              <Github size={20} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/deephisariya/" target="_blank" rel="noopener noreferrer" className="social-item">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href="https://leetcode.com/u/deep_hisariya/" target="_blank" rel="noopener noreferrer" className="social-item">
              <Code size={20} /> LeetCode
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
