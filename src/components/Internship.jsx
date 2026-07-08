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
        Building <strong>DataSense</strong>—an AI chat interface over India's open government data
        portal (data.gov.in, 236K+ datasets) that turns plain-English questions into answers grounded
        in live Census, agriculture, and price data.
      </>
    ),
    highlights: [
      'Built an AI chat interface over India\'s open government data portal (data.gov.in, 236K+ datasets) using Next.js and TypeScript, enabling plain-English queries against live Census, agriculture, and price data.',
      'Designed a dynamic dataset resolution pipeline where users connect any dataset at runtime via URL or resource ID, eliminating code changes or redeployments for onboarding new data sources.',
      'Evaluated 6 LLM providers on latency, cost, and structured-data accuracy; selected Groq (Llama 3.1 70B) achieving sub-500ms first-token response at 1/8th the cost of GPT-4o-class models.',
      'Implemented JWT authentication (NextAuth.js), MongoDB persistence for conversation history, token-level SSE streaming, and a mode-classified prompt system routing queries across CASUAL, META, and ANALYSIS response formats.',
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
          <SectionTitle icon={Swords} title="Shugyō" kicker="修行" english="Training" />
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
