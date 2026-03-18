import React from 'react';
import { motion } from 'framer-motion';
import { Code2, MonitorPlay, ShieldCheck } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const categories = [
    {
      title: "Languages",
      icon: <Code2 size={24} />,
      items: ["C", "C++", "Python", "JavaScript", "SQL", "C#"]
    },
    {
      title: "Frameworks",
      icon: <MonitorPlay size={24} />,
      items: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"]
    },
    {
      title: "Developer Tools",
      icon: <ShieldCheck size={24} />,
      items: ["Git", "GitHub", "AutoCAD", "Figma", "Unity"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="skills" className="skills section-padding">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Arsenal
        </motion.h2>

        <motion.div
          className="skills-layout"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div className="skill-group glass-panel" key={index} variants={itemVariants}>
              <div className="group-header">
                <div className="group-icon">{category.icon}</div>
                <h3 className="group-title">{category.title}</h3>
              </div>
              <div className="skill-list">
                {category.items.map((skill, i) => (
                  <span className="skill-item" key={i}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
