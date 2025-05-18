import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const fetchedProjects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const clearTags = () => {
    setSelectedTags([]);
  };

  const allTags = [...new Set(projects.flatMap((project) => project.tags || []))];

  const filteredProjects =
    selectedTags.length === 0
      ? projects
      : projects.filter((project) =>
          (project.tags || []).some((tag) => selectedTags.includes(tag))
        );

  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.4 } },
    transition: { duration: 0.4, ease: 'easeInOut' }
  };


  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition.transition}
      variants={pageTransition}
      className="page about-section"
    >
      <div
        style={{
          padding: '3rem 2rem',
          minHeight: '100vh',
          background: 'radial-gradient(circle at top, #0f0f0f 0%, #050505 100%)',
          color: '#eaeaea',
        }}
      >
        <h2
          style={{
            color: '#00ffe7',
            marginBottom: '1rem',
            textAlign: 'center',
            textShadow: '0 0 10px #00ffe7',
          }}
        >
          📁 My Projects
        </h2>

        {/* Filter Bar */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            gap: '0.5rem',
            marginBottom: '2rem',
            scrollbarWidth: 'thin',
          }}
        >
          <div className='tag-scrollbar'>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                background: selectedTags.includes(tag) ? '#00ffe7' : '#222',
                color: selectedTags.includes(tag) ? '#000' : '#00ffe7',
                border: '1px solid #00ffe7',
                borderRadius: '20px',
                margin: '0.25rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                minWidth: '80px',
              }}
            >
              {tag}
            </button>
          ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          key={selectedTags.join(',')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#aaa' }}>
              No projects match those tags.
            </p>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
                style={{
                  background: '#181818',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  borderRadius: '10px',
                  border: '1px solid #333',
                  boxShadow: '0 0 25px rgba(0,255,231,0.06)',
                  position: 'relative',
                }}
              >
                {/* Title & Date */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}
                >
                  <h3 style={{ color: '#00ffe7', margin: 0 }}>{project.title}</h3>
                  {project.timestamp && (
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>
                      {new Date(project.timestamp.seconds * 1000).toLocaleDateString(
                        'en-AU',
                        { year: 'numeric', month: 'short', day: 'numeric' }
                      )}
                    </span>
                  )}
                </div>

                {/* Tag Chips */}
                <div style={{ marginBottom: '0.75rem' }}>
                  {(project.tags || []).map((tag) => (
                    <motion.span
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: 'inline-block',
                        background: selectedTags.includes(tag) ? '#00ffe7' : '#222',
                        color: selectedTags.includes(tag) ? '#000' : '#00ffe7',
                        fontSize: '0.8rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '20px',
                        marginRight: '0.5rem',
                        marginTop: '0.25rem',
                        border: '1px solid #00ffe7',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Description */}
                <p style={{ margin: '0.5rem 0', color: '#ccc' }}>
                  {project.description}
                </p>

                {/* Video */}
                {project.video && (
                  <div
                    style={{
                      margin: '1rem 0',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      width="100%"
                      height="315"
                      src={project.video}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: 'none' }}
                    ></iframe>
                  </div>
                )}

                {/* GitHub Link */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#00ffe7',
                      textDecoration: 'none',
                      borderBottom: '1px dashed #00ffe7',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    View on GitHub →
                  </a>
                )}

                {/* Clear All Tags Button */}
                {selectedTags.length > 0 && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={clearTags}
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      background: 'transparent',
                      border: '1px dashed #00ffe7',
                      color: '#00ffe7',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Clear All
                  </motion.button>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
