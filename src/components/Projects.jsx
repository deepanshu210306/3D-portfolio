import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, SwatchBook } from 'lucide-react';
import './Projects.css';

const projects = [
  {
    title: "It's A Cube Game",
    date: "Dec 2025",
    description: "A forward-runner Unity game with C# scripting. Supports Keyboard, Touch, and Quest 3 VR Controllers via the Input System.",
    tags: ["Unity", "C#", "VR"],
    link: "https://github.com/deepanshu210306"
  },
  {
    title: "Real-Time Order Book Visualizer",
    date: "Oct 2025 - Nov 2025",
    description: "Real-time UI streaming 100ms Binance WebSocket data handling 1k+ updates/sec.",
    tags: ["Next.js", "TypeScript", "WebSockets"],
    link: "https://github.com/deepanshu210306"
  },
  {
    title: "Energy Society Platform",
    date: "Apr 2025 - Jun 2025",
    description: "Official web platform of the Energy Society, IIT Delhi. Deployed firmly on the institute server.",
    tags: ["React", "Tailwind CSS"],
    link: "https://github.com/deepanshu210306"
  },
  {
    title: "Flight Route Planner",
    date: "Nov 2024",
    description: "Flight route optimizer applying BFS & Dijkstra's algorithms. Engineered with relaxation logic.",
    tags: ["Python", "Algorithms"],
    link: "https://github.com/deepanshu210306"
  },
  {
    title: "Information Retrieval Engine",
    date: "Feb 2024 - Apr 2024",
    description: "Document engine modeled via Hash Maps & Tries. Supplies TF-IDF into a RAG pipeline.",
    tags: ["Python", "TF-IDF", "RAG"],
    link: "https://github.com/deepanshu210306"
  },
  {
    title: "HygroHalt ESP8266",
    date: "Feb 2024 - Apr 2024",
    description: "IoT Compact Dehumidifier. Programmed an Arduino Uno interfacing a DHT11 sensor.",
    tags: ["Arduino", "C/C++", "IoT"],
    link: "https://github.com/deepanshu"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects section-padding">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SwatchBook className="title-icon" size={32} /> Campaigns
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card glass-panel interactive"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="project-cap"></div>
              <div className="project-content">
                <span className="project-date">{project.date}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>

              <div className="project-footer">
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span className="project-tag" key={i}>{tag}</span>
                  ))}
                </div>
                <button className="project-link-btn">
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
