import { motion } from 'motion/react';
import { MagneticButton } from './Shared';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import assetsData from '../assets-data.json';

export const Hero = () => {
  const mainPic = assetsData.mainPic;
  return (
    <section className="relative min-h-screen bg-platinum p-3 md:p-6 grid grid-cols-1 lg:grid-cols-[300px_1fr_280px] grid-rows-[auto_1fr_80px] gap-3 md:gap-4 overflow-hidden">
      {/* Background Shapes for flair */}
      <div className="absolute top-1/4 -right-20 w-[40vw] h-[40vw] bg-deep-orange/5 rounded-full blur-[120px] -z-10" />

      {/* Header Nav */}
      <nav className="lg:col-span-3 bg-white text-coal flex items-center px-5 py-3 font-black uppercase text-sm border border-deep-blue/10">
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
          <a 
            href="#contact"
            className="mt-4 w-full py-3 bg-coal text-white font-black uppercase text-center text-xs hover:bg-deep-orange transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(4,116,186,1)]"
          >
            WORK WITH ME
          </a>
        </div>
      </aside>

      {/* Hero Central Pane */}
      <main className="relative bg-white brutalist-block p-8 md:p-12 flex flex-col justify-center overflow-hidden">
        <div className="scribble-box top-10 left-20" />
        <div className="roots-tag bg-deep-blue text-platinum">ENGINEERING ROOTS // SYSTEMS THINKER</div>
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="text-[10vw] md:text-[110px] leading-[1] md:leading-[0.95] mb-8 font-display text-coal">
            Your Favourite<br />
            <span className="text-sky-blue">18 y/o</span><br />
            <span className="bg-deep-orange text-white px-2 md:px-4 leading-normal inline-block mt-2">FAILING IN PUBLIC</span>
          </h1>
          
          <p className="max-w-md text-base md:text-lg text-coal/60 leading-relaxed font-medium">
            A live record of ambition, mistakes, and everything in between.
          </p>

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

      {/* Sidebar Right */}
      <aside className="hidden lg:flex flex-col gap-4">
        <div className="bg-white text-coal p-6 border border-deep-blue/10">
          <h3 className="text-2xl mb-4 border-b border-muted pb-2">TRACK RECORD</h3>
          <div className="flex flex-col gap-3">
             <div className="flex justify-between text-[11px] font-black italic text-coal/80">
               <span>WRO NATIONAL FINALIST</span>
               <span>'25</span>
             </div>
             <div className="flex justify-between text-[11px] font-black italic text-coal/80">
               <span>ACITY TECH EXPO WINNER</span>
               <span>'25</span>
             </div>
             <div className="flex justify-between text-[11px] font-black italic text-coal/80">
               <span>NOVA GENESIS FOUNDED</span>
               <span>'26</span>
             </div>
             <div className="flex justify-between text-[11px] font-black italic text-coal/80">
               <span>PRESEC ROBOTICS PRES.</span>
               <span>'24</span>
             </div>
          </div>
        </div>

        <div className="flex-1 bg-sky-blue/5 text-coal p-6 flex flex-col justify-between border border-deep-blue/10 overflow-hidden relative group cursor-pointer hover:bg-sky-blue/10 transition-colors">
          <div>
            <h4 className="text-2xl">NOVA GENESIS</h4>
            <p className="text-[10px] mt-1 font-bold leading-tight text-coal/60">PREMIUM CONTENT STUDIO FOR AMBITIOUS BRANDS.</p>
          </div>
          <div className="h-20 bg-sky-blue/10 my-4 group-hover:bg-sky-blue/20 transition-colors" />
          <span className="text-[10px] text-right font-black">VIEW CASE STUDY →</span>
        </div>

        <div className="flex-1 bg-white text-coal p-6 flex flex-col justify-between border border-deep-blue/10 overflow-hidden relative group cursor-pointer hover:shadow-md transition-all">
          <div>
            <h4 className="text-2xl">YOUTUBE</h4>
            <p className="text-[10px] mt-1 font-bold leading-tight text-coal/60">DOCUMENTING AFRICAN INNOVATION & AMBITION.</p>
          </div>
          <span className="mt-auto text-[10px] text-right font-black">WATCH CHANNEL →</span>
        </div>
      </aside>

      {/* Signal Strip (Footer of Hero) */}
      <footer className="lg:col-span-3 bg-white text-coal flex items-center overflow-hidden brutalist-block h-20 shadow-none border-t border-deep-blue/10">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-5xl md:text-[42px] font-display opacity-80 px-5"
        >
          {[...Array(20)].map((_, i) => (
            <span key={i} className="mr-20">FOUNDER. BUILDER. STORYTELLER. PROUD AFRICAN.</span>
          ))}
        </motion.div>
      </footer>
    </section>
  );
};
