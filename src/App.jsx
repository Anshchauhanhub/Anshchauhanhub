import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Particles from './components/Particles'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <div className="relative min-h-screen">
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
