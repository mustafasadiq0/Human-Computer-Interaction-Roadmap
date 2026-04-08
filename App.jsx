import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Header from './components/Header'
import Hero from './components/Hero'
import AboutBCI from './components/AboutBCI'
import PathQuiz from './components/PathQuiz'
import LearningPaths from './components/LearningPaths'
import Resources from './components/Resources'
import PracticalProject from './components/PracticalProject'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  const [currentSection, setCurrentSection] = useState('home')

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground arabic-text">
        <Header scrollToSection={scrollToSection} currentSection={currentSection} />
        
        <Routes>
          <Route path="/" element={
            <main>
              <section id="home">
                <Hero scrollToSection={scrollToSection} />
              </section>
              
              <section id="about" className="py-20">
                <AboutBCI />
              </section>
              
              <section id="quiz" className="py-20 bg-muted/30">
                <PathQuiz />
              </section>
              
              <section id="paths" className="py-20">
                <LearningPaths />
              </section>
              
              <section id="resources" className="py-20 bg-muted/30">
                <Resources />
              </section>
              
              <section id="project" className="py-20">
                <PracticalProject />
              </section>
              
              <section id="faq" className="py-20 bg-muted/30">
                <FAQ />
              </section>
            </main>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App

