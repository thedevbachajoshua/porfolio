import { motion } from 'motion/react';
import { MagneticButton } from './Shared';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import assetsData from '../assets-data.json';

export const Hero = () => {
  const mainPic = assetsData.mainPic;
  return (
    <section className="relative min-h-screen bg-platinum p-3 md:p-6 grid grid-cols-1 lg:grid-cols-[225px_1fr] grid-rows-[auto_1fr_60px] gap-3 md:gap-4 overflow-hidden">
      {/* Background Shapes for flair */}
      <div className="absolute top-1/4 -right-20 w-[40vw] h-[40vw] bg-deep-orange/5 rounded-full blur-[120px] -z-10" />

      {/* Header Nav */}
      <nav className="lg:col-span-2 bg-white text-coal flex items-center px-5 py-3 font-black uppercase text-sm border border-deep-blue/10">
        <div className="tracking-tighter">thebachajoshua™</div>
      </nav>

      {/* Sidebar Left */}
      <aside className="hidden lg:flex flex-col gap-4">
        <div className="flex-1 bg-amber/10 p-6 flex flex-col justify-end relative overflow-hidden border border-deep-blue/10">
          <div className="absolute top-[10%] left-[10%] width-[80%] height-[70%] bg-white border border-deep-blue/20 -rotate-3 overflow-hidden shadow-sm">
             <img 
              src={mainPic} 
              alt="Joshua Bacha"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-4xl text-coal leading-[0.9] mt-auto relative z-10 font-black">JOSHUA<br />BACHA</h2>
          <div className="tag-strip mt-3 relative z-10 !bg-deep-orange">VISUAL STORYTELLER</div>
        </div>
        
        <div className="brutalist-block p-6 bg-white">
          <p className="text-sm italic leading-relaxed text-coal/70">
            "I blend cinematic storytelling, founder energy, and technical thinking to build what matters."
          </p>
        </div>
      </aside>

      {/* Hero Central Pane */}
      <main className="relative bg-white brutalist-block p-8 md:p-12 flex flex-col justify-center overflow-hidden">
        <div className="scribble-box top-10 left-20" />
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="text-[10vw] md:text-[82px] leading-[1] md:leading-[0.95] mb-8 font-display text-coal">
            Your Favourite<br />
            <span className="text-sky-blue">18 y/o</span><br />
            <span className="bg-deep-orange text-white px-2 md:px-4 leading-normal inline-block mt-2">FAILING IN PUBLIC</span>
          </h1>
          
          <div className="max-w-md">
            <p className="text-base md:text-lg text-coal/60 leading-relaxed font-medium">
              A live record of ambition, mistakes, and everything in between.
            </p>
          </div>

          <span className="absolute bottom-6 right-8 text-sm md:text-base font-black opacity-20 whitespace-nowrap tracking-tighter select-none">EST. 2008</span>

          <div className="flex gap-4 mt-8">
            <a href="https://www.instagram.com/thebachajoshua/" className="w-12 h-12 border border-deep-blue/20 flex items-center justify-center hover:bg-deep-orange hover:text-white transition-all shadow-sm">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/thebachajoshua/" className="w-12 h-12 border border-deep-blue/20 flex items-center justify-center hover:bg-deep-blue hover:text-white transition-all shadow-sm">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@thebachajoshua" className="w-12 h-12 border border-deep-blue/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-coal shadow-sm">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </main>

      {/* Signal Strip (Footer of Hero) */}
      <footer className="lg:col-span-2 bg-white text-coal flex items-center overflow-hidden brutalist-block h-20 shadow-none border-t border-deep-blue/10">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-5xl md:text-[32px] font-display opacity-80 px-5"
        >
          {[...Array(20)].map((_, i) => (
            <span key={i} className="mr-20">FOUNDER. BUILDER. STORYTELLER. PROUD AFRICAN.</span>
          ))}
        </motion.div>
      </footer>
    </section>
  );
};
