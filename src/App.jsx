import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Particles from './components/Particles';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

// Automatically scrolls to top or to target hash (#about) on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-black text-[#d1d5db] flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300">
        {/* Persistent 3D Starfield Background */}
        <Particles />

        {/* Persistent 3D Layered Glass Navbar */}
        <Navbar />

        {/* Multi-Page Routes */}
        <main className="relative z-10 flex-grow">
          <Routes>
            {/* Opening page combines 3D Hero and About Section */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            
            {/* Separate Dedicated Pages */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Persistent Footer */}
        <Footer />

        {/* Persistent AI RAG Chatbot */}
        <Chatbot />
      </div>
    </HashRouter>
  );
}

export default App;
