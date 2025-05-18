import React, { useEffect, useStatem, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { db } from '../Firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import './PageStyles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../components/Header';

const Home = () => {
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(
        collection(db, 'projects'),
        orderBy('timestamp', 'desc'),
        limit(3)
        
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentProjects(data);
      console.log("Fetched projects:", data);
      data.forEach((project, i) => {
        console.log(`Project ${i}:`, project);
      });


    };
    fetchProjects();
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 160, friction: 20 },
    delay: 200
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };


  const location = useLocation();
  const contactRef = useRef(null);

  useEffect(() => {
  if (location.hash === '#contact') {
    const scroll = () => {
      const el = contactRef.current;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Delay ensures page has mounted and painted
    const timeout = setTimeout(scroll, 300);

    return () => clearTimeout(timeout);
  }
}, [location]);





  return (
    <div className="page about-section">
      <animated.div style={fadeIn}>
        <h2 className="glow">Hi, I'm Baxter 👋</h2>
        <p className="typewriter">
          Creative Developer. Visual Thinker. Code Adventurer.
        </p>
        <p className="bio">
          I blend clean code with creative thinking. From brain training apps to real-time animation, I build things that are both functional and delightful.
        </p>
        <p className="quote">“Creativity is intelligence having fun.”</p>
      </animated.div>

      <section className="gallery-section">
        <h3 className="glow">📸 Me!</h3>
        <div className="gallery-grid">
          {["/images/me.jpg", "/images/me2.jpg", "/images/me4.jpg", "/images/me5.jpg", "/images/me6.jpg"].map((src, idx) => (
            <motion.img
              key={idx}
              src={process.env.PUBLIC_URL + src}
              alt={`Gallery ${idx}`}
              className="gallery-img"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            />
          ))}
        </div>
      </section>

      <div className="info-section">
        {[
          {
            title: "💻 Skills",
            content: ["C++", "JavaScript", "Unity + C#", "SQL", "Python"],
            variant: "one"
          },
          {
            title: "🎯 Focus",
            content: ["UX Engineering", "Game Mechanics", "AI & Logic"],
            variant: "two"
          },
          {
            title: "📚 Learning/Want to Learn",
            content: ["JavaScript", "Machine Learning", "", ""],
            variant: "three"
          },
          {
            title: "🧠 Philosophy",
            content: ["Code with purpose", "Design with empathy", "Learn relentlessly"],
            variant: "four"
          },
          {
            title: "💯 Current Goals",
            content: ["Build up portfolio", "Create a long-term code project", "Work further with AI"],
            variant: "five"
          },
          {
            title: "📷 Passion Projects",
            content: ["Short film", "Photography", "Automated Home System? (maybe)"],
            variant: "six"
          }
        ].map((box, i) => (
          <div
            key={i}
            className={`flip-card flip-${box.variant}`}
            onClick={(e) => {
              e.currentTarget.classList.toggle("flipped");
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>{box.title}</h3>
              </div>
              <div className="flip-card-back">
                <ul>
                  {box.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-section">
        <h3 className="glow">🌟 Featured Projects</h3>
        <Slider {...sliderSettings}>
          {recentProjects.map((project, i) => {
            // Defensive check for essential fields
            if (!project || !project.title || !project.timestamp) return null;

            return (
              <div key={project.id || i}>
                <div className="carousel-slide">
                  <h4>{project.title}</h4>
                  <p>{project.description || "No description provided."}</p>

                  {project.video && (
                    <iframe
                      width="100%"
                      height="300"
                      src={project.video}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        marginTop: '1rem',
                        color: '#00ffe7',
                        textDecoration: 'none',
                        borderBottom: '1px dashed #00ffe7',
                      }}
                    >
                      View on GitHub →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </Slider>

      </div>

      <div className="contact-section" id="contact" ref={contactRef}>
        <h3>👋 Let's Connect</h3>
        <p>Whether it’s collaboration, freelance work, or just a chat — I’m all ears.</p>
        <div className="contact-links">
          <a href="mailto:baxman2008.swain@gmail.com" target="_blank" rel="noreferrer">
            <i className="fas fa-envelope"></i> Email
          </a>
          <a href="https://www.linkedin.com/in/baxter-swain-982001366/" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin-in"></i> LinkedIn
          </a>
          <a href="https://github.com/BaxterSwain" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i> GitHub
          </a>
        </div>
        <p className="contact-quote typewriter-quote">
          Let’s build something incredible together.
        </p>
        <svg className="contact-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#00ffe7" fillOpacity="0.05"
            d="M0,192L30,213.3C60,235,120,277,180,272C240,267,300,213,360,208C420,203,480,245,540,240C600,235,660,181,720,165.3C780,149,840,171,900,197.3C960,224,1020,256,1080,256C1140,256,1200,224,1260,208C1320,192,1380,192,1410,192L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
          </path>
        </svg>
      </div>
    </div>
  );
};

export default Home;
