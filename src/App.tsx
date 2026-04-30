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
    <div className="relative bg-paper text-coal font-sans selection:bg-deep-orange selection:text-white antialiased overflow-x-hidden pt-16 md:pt-20">
      <GrainOverlay />
      
      {/* Sticky Persistent Navbar */}
      <nav className="fixed top-0 left-0 w-full z-[80] bg-white/95 backdrop-blur-md py-4 text-coal border-b border-deep-blue/10 shadow-sm">
        <div className="w-full px-6 flex justify-between items-center">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-xl md:text-2xl tracking-tighter uppercase font-black cursor-pointer hover:text-deep-orange transition-colors"
          >
            thebachajoshua™
          </a>

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
              className="px-6 py-2 bg-deep-orange text-white text-xs font-black hover:bg-coal transition-all shadow-[1.5px_1.5px_0px_0px_rgba(0,167,225,1)]"
            >
              CONTACT
            </a>
          </div>

          <button 
            className="md:hidden p-2 bg-deep-orange text-white shadow-[2px_2px_0px_0px_rgba(0,167,225,1)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-coal/60 backdrop-blur-sm z-[90]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-paper z-[100] border-l-4 border-deep-orange p-10 flex flex-col gap-6 shadow-2xl"
            >
              <div className="flex justify-end items-center mb-12">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-coal text-white rounded-none border border-deep-blue/20"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {['Work', 'History', 'Story', 'Capabilities'].map((item) => (
                  <motion.a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    className="text-3xl font-display font-black uppercase hover:text-deep-orange transition-colors text-coal border-b border-coal/5 pb-2"
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <a 
                  href="#contact"
                  className="mt-8 px-8 py-4 bg-deep-orange text-white text-sm font-black text-center shadow-[3px_3px_0px_0px_rgba(0,167,225,1)] uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Me
                </a>
              </div>

              <div className="mt-auto">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-30">thebachajoshua™ © 2026</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        <Hero />
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
