import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { Volume2, VolumeX } from 'lucide-react';

function App() {
  const bgmRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Try to auto-play or play on first interaction
    const handleFirstInteraction = () => {
      if (bgmRef.current && !isPlaying) {
        bgmRef.current.volume = 0.4;
        bgmRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.log("Audio autoplay blocked by browser"));
      }
      // Remove listener after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    if (bgmRef.current) {
      if (isPlaying) {
        bgmRef.current.pause();
        setIsPlaying(false);
      } else {
        bgmRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="app-container">
      {/* Background Music Player */}
      <audio ref={bgmRef} src="/kaze-no-kata.mp3" loop />
      
      {/* Floating Audio Toggle */}
      <button 
        onClick={toggleMusic} 
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
          background: 'rgba(10,10,10,0.6)', border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff', padding: '1rem', borderRadius: '50%', cursor: 'pointer',
          backdropFilter: 'blur(10px)', transition: 'all 0.3s ease'
        }}
        className="interactive audio-toggle"
      >
        {isPlaying ? <Volume2 size={24} color="#d90429" /> : <VolumeX size={24} />}
      </button>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
