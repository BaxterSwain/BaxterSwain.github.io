import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './pages/About';
import Projects from './pages/Projects';

const App = () => {
  return (
    <Router basename="/">


      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
};

export default App;
