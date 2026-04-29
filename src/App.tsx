import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    <div className="relative bg-paper text-coal font-sans selection:bg-deep-orange selection:text-white antialiased overflow-x-hidden">
      <GrainOverlay />
      
      {/* Sticky Navbar - only shows after scroll past Hero */}
      <AnimatePresence>
        {scrolled && (
          <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 w-full z-[80] bg-white/95 backdrop-blur-md py-4 text-coal border-b border-deep-blue/10 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
              <div className="font-display text-2xl tracking-tighter uppercase font-black">
                thebachajoshua™
              </div>

              <div className="hidden md:flex items-center gap-12 font-display uppercase tracking-widest text-xs font-black">
                {['Work', 'History', 'Story', 'Capabilities'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-deep-orange transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <a 
                  href="#contact"
                  className="px-6 py-2 bg-coal text-white text-xs font-black hover:bg-deep-orange transition-all shadow-[1.5px_1.5px_0px_0px_rgba(0,167,225,1)]"
                >
                  CONTACT
                </a>
              </div>

              <button 
                className="md:hidden p-2 bg-coal text-white shadow-[2px_2px_0px_0px_rgba(241,119,32,1)]"
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
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-platinum z-[70] flex flex-col items-center justify-center gap-8 p-6"
          >
            {['Work', 'History', 'Story', 'Capabilities'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-6xl font-display uppercase hover:text-deep-orange transition-colors text-coal"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <X 
              className="absolute top-8 right-6 w-12 h-12 cursor-pointer text-deep-blue/40 hover:text-deep-orange transition-colors" 
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
    </div>
  );
}
