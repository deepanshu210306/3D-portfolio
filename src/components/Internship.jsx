import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Swords } from 'lucide-react';
import SectionTitle from './SectionTitle';
import './Internship.css';

const internships = [
  {
    role: 'Software Engineering Intern',
    org: 'Mindcase',
    location: 'Gurgaon, Haryana',
    period: 'May 2026 - Jul 2026',
    intro: (
      <>
        Building <strong>DataSense</strong>—a chat interface that answers questions about Indian
        government open datasets, grounded in live rows from data.gov.in and streamed through Groq.
      </>
    ),
    highlights: [
      'Architected a RAG pipeline on Groq Llama 3.1 70B after benchmarking six LLM providers (OpenAI, Claude, Gemini, Mistral) on cost and latency—Groq\'s LPU inference runs ~5–10× faster than GPU-based options.',
      'Integrated the data.gov.in REST API to ground answers in live Census 2011 data, with a fallback fetch layer and context-window trimming to limit hallucinations.',
      'Shipped token-level SSE streaming with exponential-backoff retries so rate limits never break the chat flow.',
      'Built a full-stack Next.js + TypeScript app with server-side API key isolation and production cost/scaling modeled for up to 50K monthly users.',
    ],
    link: {
      label: 'DataSense',
      href: 'https://github.com/deepanshu210306/DataSense',
    },
  },
  {
    role: 'Game Development Intern',
    org: 'Department of Design, IIT Delhi',
    location: 'New Delhi',
    period: 'Dec 2025',
    intro: (
      <>
        Contributed to <strong>VR Miners</strong>—a Unity-based VR training game for novice mine workers,
        built around realistic task simulations and immersive onboarding.
      </>
    ),
    highlights: [
      'Worked on gameplay systems and UI in Unity using C#—menus, interaction prompts, and in-world interface elements.',
      'Designed and implemented multiple gameplay features to support guided VR task flows for training scenarios.',
      'Developed 3+ Unity prototypes to refine player controls, animations, camera systems, and overall game architecture.',
    ],
  },
];

const Internship = () => {
  return (
    <section id="internship" className="internship section-padding">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle icon={Swords} title="Shugyō" kicker="修行" />
        </motion.h2>

        <div className="internship-grid">
          {internships.map((item, index) => (
            <motion.div
              className="internship-card glass-panel"
              key={item.role + item.org}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 + index * 0.1 }}
            >
              <div className="internship-header">
                <div>
                  <h3 className="internship-role">{item.role}</h3>
                  <p className="internship-org">
                    {item.org}
                    {item.location ? ` · ${item.location}` : ''}{' '}
                    <span>[{item.period}]</span>
                  </p>
                </div>
                {item.link && (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="internship-repo interactive"
                  >
                    {item.link.label} <ArrowRight size={18} />
                  </a>
                )}
              </div>

              <div className="internship-card-body">
                <p className="internship-intro">{item.intro}</p>

                <ul className="internship-highlights">
                  {item.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Internship;
