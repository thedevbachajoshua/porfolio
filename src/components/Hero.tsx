import { motion } from 'motion/react';
import { MagneticButton } from './Shared';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import assetsData from '../assets-data.json';

export const Hero = () => {
  const mainPic = assetsData.mainPic;
  return (
    <section className="relative min-h-screen bg-platinum p-3 md:p-6 grid grid-cols-1 lg:grid-cols-[225px_1fr] lg:grid-rows-[1fr_auto] gap-3 md:gap-4 overflow-hidden">
      {/* Background Shapes for flair */}
      <div className="absolute top-1/4 -right-20 w-[40vw] h-[40vw] bg-deep-orange/5 rounded-full blur-[120px] -z-10" />

      {/* Sidebar Left */}
      <aside className="flex flex-col gap-4">
        <div className="flex-1 bg-amber/10 p-6 flex flex-col justify-center items-center relative overflow-hidden border border-deep-blue/10">
          <div className="w-1/2 lg:w-full aspect-[4/5] bg-white border border-deep-blue/20 overflow-hidden shadow-sm relative">
             <img 
              src={mainPic} 
              alt="Joshua Bacha"
              className="w-full h-full object-cover scale-x-[-1]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col items-center gap-2 mt-8 relative z-10 w-full">
            <span className="text-3xl lg:text-2xl text-coal leading-tight font-technical lowercase font-black text-center px-2">hey there</span>
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
              className="text-3xl inline-block"
            >
              👋
            </motion.span>
          </div>
        </div>
        
        <div className="brutalist-block p-6 bg-white">
          <p className="text-lg italic font-semibold leading-relaxed text-coal/70">
            "High agency collaborative problem-solver"
          </p>
        </div>
      </aside>

      {/* Hero Central Pane */}
      <main className="relative bg-white brutalist-block p-8 md:p-12 flex flex-col justify-center overflow-hidden">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="text-[10vw] md:text-[82px] leading-[1] md:leading-[0.95] mb-8 font-display font-black text-coal">
            Your Favourite<br />
            <span className="text-sky-blue">18 y/o</span><br />
            <span className="bg-deep-orange text-white px-2 md:px-4 leading-normal inline-block mt-2">FAILING IN PUBLIC</span>
          </h1>
          
          <div className="max-w-md">
            <p className="text-base md:text-lg text-coal/70 leading-relaxed font-bold">
              A live record of ambition, mistakes, and everything in between.
            </p>
          </div>

          <span className="absolute bottom-6 right-8 text-sm md:text-base font-black opacity-20 whitespace-nowrap tracking-tighter select-none">EST. 2008</span>

          <div className="flex gap-4 mt-8">
            <a href="https://www.instagram.com/thebachajoshua/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-deep-blue/20 flex items-center justify-center hover:bg-deep-orange hover:text-white transition-all shadow-sm">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/thebachajoshua/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-deep-blue/20 flex items-center justify-center hover:bg-deep-blue hover:text-white transition-all shadow-sm">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@thebachajoshua" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-deep-blue/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-coal shadow-sm">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </main>

      {/* Signal Strip (Footer of Hero) */}
      <footer className="lg:col-span-2 bg-white text-coal flex items-center overflow-hidden brutalist-block h-20 shadow-none border border-deep-blue/10">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-5xl md:text-[32px] font-display font-black opacity-80 px-5"
        >
          {[...Array(20)].map((_, i) => (
            <span key={i} className="mr-20">FOUNDER. BUILDER. STORYTELLER. PROUD AFRICAN.</span>
          ))}
        </motion.div>
      </footer>
    </section>
  );
};
