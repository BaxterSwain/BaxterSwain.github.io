import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../components/Header';
import Lottie from 'lottie-react';
import helloAnimation from '../assets/hello-animation.json'; // make sure this path exists
import './PageStyles.css';
import StarParticles from '../components/StarParticles';
import { HashLink } from 'react-router-hash-link';


const sections = [
  {
    title: "👶 Where it Began",
    content: "I grew up playing games, the usual, I tried to break a lot of them, cheat them, hack them etc. I think it was then that I fell in love with software, years of tech class and then digital solutions led me to my firt code.",
    icon: "🧠",
  },
  {
    title: "💡 First Code",
    content: "Some of the first 'code' I wrote, was in Scratch, not really code but it helped create the building blocks. Soon came Python, I spent a while using the JetBrains IDE, still figuring it out. Then came some Arduino projects in tech class, the basics of c++, everyone does it. More recently in digital solutions it has been C#, SQLite and integrations of that in Unity.",
    icon: "💻",
  },
  {
    title: "🚀 Projects",
    content: "Ive got tons of projects, from games to tools. I’ve built a few games in Unity, some web apps with React and Firebase like this, and even a couple of fun little scripts to automate tasks. I love the challenge of turning ideas into reality. Honestly, I'm not the best at code itself, but I'm pretty good at researching and things, tutorials are my best friend a lot of the time, but I feel I've been slowly learning.",
    icon: "🛠️",
  },
  {
    title: "📈 Now",
    content: "I’m refining my skills in React, Firebase, and game dev. I'm currently looking into learning some Machine Learning and AI, getting further into some CyberSecurity and Ethical Hacking, and maybe even some more game dev. I’m also working on a few personal projects that I can’t wait to share on here.",
    icon: "⚙️",
  },
  {
    title: "🌌 Plans",
    content: "This is one of my biggest projects, I want to keep adding to it, and make it a portfolio of sorts. I'm trying to figure out what kinds of projects I want to do, and what I want to learn.",
    icon: "🌠",
  },
];

const About = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { scrollYProgress } = useScroll();
  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="scroll-journey">
        <StarParticles />

      {/* 🔥 Lottie Intro Animation */}
      <div className="intro-hero">
        <h1 className="glow">My Dev Journey</h1>
      </div>

      <div className="timeline">
        <motion.div className="timeline-line" style={{ height: heightTransform }} />

        {sections.map((sec, index) => {
            const isExpanded = expandedIndex === index;
            const bgClass = `timeline-bg-${index % 2 === 0 ? 'dark' : 'light'}`;


          return (
            <motion.section
              key={index}
              className={`timeline-section ${index % 2 === 0 ? 'left' : 'right'} ${isExpanded ? 'expanded' : ''} ${bgClass}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
            >
              <motion.div
                className="timeline-icon"
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {sec.icon}
              </motion.div>
              <motion.div
                className="timeline-content"
                animate={{ scale: isExpanded ? 1.03 : 1 }}
              >
                <h2>{sec.title}</h2>
                <p>{sec.content}</p>
                {isExpanded && (
                  <motion.p
                    className="details"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    More coming soon...
                  </motion.p>
                )}
              </motion.div>
            </motion.section>
          );
        })}
      </div>
        <div className="journey-end">
            <h2>🚀 Let's Work Together</h2>
            <p>
                Whether it's game dev, a tool, a startup idea or just experimenting — I’d love to connect.
            </p>
            <HashLink to="/#contact" smooth className="journey-button">
                Get in Touch →
            </HashLink>

        </div>
    </div>
  );
};

export default About;
