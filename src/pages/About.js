import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import Slider from 'react-slick';
import './PageStyles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const About = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 160, friction: 20 },
    delay: 200
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  };

  return (
    <div className="page about-section">
      {/* 🔥 Intro Animated Section */}
      <header className="custom-header">
        <nav className="custom-nav">
          <a href="/" className="nav-link">About</a>
          <a href="/projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </header>

      <animated.div style={fadeIn}>
        <h2 className="glow">Hi, I'm Baxter 👋</h2>
        <p className="typewriter">
          Creative Developer. Visual Thinker. Code Adventurer.
        </p>
        <img
  src={`${process.env.PUBLIC_URL}/images/me.jpg`}
  alt="Baxter"
  className="profile-img"
  onError={(e) => { e.target.style.display = 'none'; }}
/>

        <p className="bio">
          I blend clean code with creative thinking. From brain training apps to real-time animation, I build things that are both functional and delightful.
        </p>
        <p className="quote">“Creativity is intelligence having fun.”</p>
      </animated.div>

      {/* 🧠 Skills + Interests */}
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



      {/* 🌟 Carousel */}
      <div className="carousel-section">
        <h3 className="glow">🌟 Featured Projects</h3>
        <Slider {...sliderSettings}>
          <div className="carousel-slide">
            <h4>🧩 Memory Trainer Game</h4>
            <p>A Unity-based cognitive game to improve memory recall.</p>
          </div>
          <div className="carousel-slide">
            <h4>🎬 Video Editing Portfolio</h4>
            <p>Creative edits and short films with a unique style.</p>
          </div>
          <div className="carousel-slide">
            <h4>🧠 Brain Training Web App</h4>
            <p>React + Firebase app to test and visualize memory span.</p>
          </div>
        </Slider>
      </div>
      <div className="contact-section" id="contact">
  <h3>👋 Let's Connect</h3>
  <p>Whether it’s collaboration, freelance work, or just a chat — I’m all ears.</p>

  <div className="contact-links">
        <a href="mailto:your.email@example.com" target="_blank" rel="noreferrer">
          <i className="fas fa-envelope"></i> Email
        </a>
        <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noreferrer">
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
        <path fill="#00ffe7" fillOpacity="0.05" d="M0,192L30,213.3C60,235,120,277,180,272C240,267,300,213,360,208C420,203,480,245,540,240C600,235,660,181,720,165.3C780,149,840,171,900,197.3C960,224,1020,256,1080,256C1140,256,1200,224,1260,208C1320,192,1380,192,1410,192L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
      </svg>

    </div>

    </div>
  );
 

};

export default About;
