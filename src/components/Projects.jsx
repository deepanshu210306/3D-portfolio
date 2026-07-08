import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, SwatchBook } from 'lucide-react';
import SectionTitle from './SectionTitle';
import './Projects.css';

const AUTO_ROTATE_MS = 4000;

const projects = [
  {
    title: '3D Portfolio',
    date: '2026',
    description:
      'Samurai-themed developer portfolio with a procedural 3D katana, React Three Fiber scene, and cinematic motion design.',
    tags: ['React', 'Three.js', 'Vite'],
    link: 'https://github.com/deepanshu210306/3D-portfolio',
  },
  {
    title: 'TrueFeedback',
    date: '2026',
    description:
      'Anonymous messaging platform where anyone can send honest feedback via your personal link. Email OTP auth, AI-suggested prompts, and a message dashboard.',
    tags: ['Next.js', 'MongoDB', 'NextAuth'],
    link: 'https://github.com/deepanshu210306/TrueFeedback',
  },
  {
    title: "It's A Cube Game",
    date: 'Dec 2025',
    description:
      'A forward-runner Unity game with C# scripting. Supports Keyboard, Touch, and Quest 3 VR Controllers via the Input System.',
    tags: ['Unity', 'C#', 'VR'],
    link: 'https://github.com/deepanshu210306',
  },
  {
    title: 'Real-Time Order Book Visualizer',
    date: 'Oct 2025 - Nov 2025',
    description:
      'Real-time UI streaming 100ms Binance WebSocket data handling 1k+ updates/sec.',
    tags: ['Next.js', 'TypeScript', 'WebSockets'],
    link: 'https://github.com/deepanshu210306',
  },
  {
    title: 'Energy Society Platform',
    date: 'Apr 2025 - Jun 2025',
    description:
      'Official web platform of the Energy Society, IIT Delhi. Deployed firmly on the institute server.',
    tags: ['React', 'Node.js', 'Express'],
    link: 'https://github.com/deepanshu210306',
  },
  {
    title: 'Information Retrieval Engine',
    date: 'Feb 2024 - Apr 2024',
    description:
      'Document engine modeled via Hash Maps & Tries. Supplies TF-IDF into a RAG pipeline.',
    tags: ['Python', 'TF-IDF', 'RAG'],
    link: 'https://github.com/deepanshu210306',
  },
];

const total = projects.length;

const getCircularOffset = (index, active) => {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
};

const cardVariant = (offset) => {
  const abs = Math.abs(offset);
  if (abs > 2) {
    return {
      x: `${offset > 0 ? 130 : -130}%`,
      scale: 0.55,
      opacity: 0,
      rotateY: 0,
      zIndex: 0,
    };
  }
  const map = {
    0: { x: '0%', scale: 1, opacity: 1, rotateY: 0, zIndex: 5 },
    1: { x: '58%', scale: 0.82, opacity: 0.5, rotateY: -22, zIndex: 3 },
    2: { x: '104%', scale: 0.66, opacity: 0.22, rotateY: -28, zIndex: 1 },
  };
  const base = map[abs];
  return {
    ...base,
    x: offset < 0 ? `-${base.x.replace('-', '')}` : base.x,
    rotateY: offset < 0 ? -base.rotateY : base.rotateY,
  };
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    setActiveIndex(((index % total) + total) % total);
  }, []);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

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
          <SectionTitle icon={SwatchBook} title="Senji" kicker="戦事" english="Campaigns" />
        </motion.h2>

        <motion.div
          className="coverflow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            className="carousel-btn carousel-btn-left"
            onClick={prev}
            aria-label="Previous project"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="coverflow-stage">
            {projects.map((project, index) => {
              const offset = getCircularOffset(index, activeIndex);
              const isActive = offset === 0;
              const variant = cardVariant(offset);
              return (
                <motion.div
                  key={project.title}
                  className={`coverflow-card ${isActive ? 'is-active' : ''}`}
                  animate={variant}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto' }}
                  onClick={() => !isActive && goTo(index)}
                >
                  <div className="glass-panel coverflow-inner">
                    <div className="project-cap"></div>
                    <div className="project-content">
                      <span className="project-index">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                      </span>
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
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn interactive"
                        tabIndex={isActive ? 0 : -1}
                        aria-label={`Open ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            type="button"
            className="carousel-btn carousel-btn-right"
            onClick={next}
            aria-label="Next project"
          >
            <ArrowRight size={20} />
          </button>
        </motion.div>

        <div className="carousel-dots">
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.title}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Go to ${project.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
