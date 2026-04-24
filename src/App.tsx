import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { Hero } from './components/Hero';
import { ProofStrip } from './components/ProofStrip';
import { ProjectShowcase } from './components/ProjectShowcase';
import { TrackRecord } from './components/TrackRecord';
import { PersonalStory } from './components/PersonalStory';
import { WhatIBring } from './components/WhatIBring';
import { Collaboration, Footer } from './components/Collaboration';
import { GrainOverlay } from './components/Shared';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-coal text-offwhite font-sans selection:bg-brand-orange selection:text-coal antialiased overflow-x-hidden">
      <GrainOverlay />
      
      {/* Sticky Navbar - only shows after scroll past Hero */}
      <AnimatePresence>
        {scrolled && (
          <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 w-full z-[80] bg-offwhite/90 backdrop-blur-md py-4 text-coal border-b border-coal"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
              <div className="font-display text-2xl tracking-tighter uppercase">
                thebachajoshua™
              </div>

              <div className="hidden md:flex items-center gap-12 font-display uppercase tracking-widest text-xs font-black">
                {['Work', 'History', 'Story', 'Capabilities'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <a 
                  href="#contact"
                  className="px-6 py-2 bg-coal text-offwhite text-xs font-black hover:bg-brand-orange transition-all"
                >
                  CONTACT
                </a>
              </div>

              <button 
                className="md:hidden p-2 bg-coal text-offwhite"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 bg-brand-orange z-[70] flex flex-col items-center justify-center gap-8 p-6"
          >
            {['Work', 'History', 'Story', 'Capabilities'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-6xl font-display uppercase hover:text-offwhite"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <X 
              className="absolute top-8 right-6 w-12 h-12 cursor-pointer text-coal" 
              onClick={() => setIsMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />
        <ProofStrip />
        <div id="work">
          <ProjectShowcase />
        </div>
        <div id="history">
          <TrackRecord />
        </div>
        <div id="story">
          <PersonalStory />
        </div>
        <div id="capabilities">
          <WhatIBring />
        </div>
        <div id="contact">
          <Collaboration />
        </div>
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}
