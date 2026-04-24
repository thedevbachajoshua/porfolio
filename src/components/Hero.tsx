import { motion } from 'motion/react';
import { MagneticButton } from './Shared';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-coal p-3 md:p-6 grid grid-cols-1 lg:grid-cols-[300px_1fr_280px] grid-rows-[auto_1fr_80px] gap-3 md:gap-4 overflow-hidden">
      {/* Background Shapes for flair */}
      <div className="absolute top-1/4 -right-20 w-[40vw] h-[40vw] bg-brand-orange/5 rounded-full blur-[120px] -z-10" />

      {/* Header Nav */}
      <nav className="lg:col-span-3 bg-offwhite text-coal flex items-center px-5 py-3 font-black uppercase text-sm brutalist-border">
        <div className="tracking-tighter">thebachajoshua™</div>
      </nav>

      {/* Sidebar Left */}
      <aside className="hidden lg:flex flex-col gap-4">
        <div className="flex-1 bg-brand-orange p-6 flex flex-col justify-end relative overflow-hidden brutalist-border">
          <div className="absolute top-[10%] left-[10%] width-[80%] height-[70%] bg-coal border-4 border-offwhite -rotate-3 overflow-hidden">
             <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop" 
              alt="Joshua Bacha"
              className="w-full h-full object-cover grayscale brightness-75 contrast-125"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-4xl text-coal leading-[0.9] mt-auto relative z-10">JOSHUA<br />BACHA</h2>
          <div className="tag-strip mt-3 relative z-10">VISUAL STORYTELLER</div>
        </div>
        
        <div className="brutalist-block p-6">
          <p className="text-sm italic leading-relaxed opacity-80">
            "I blend cinematic storytelling, founder energy, and technical thinking to build what matters."
          </p>
          <a 
            href="#contact"
            className="mt-4 w-full py-3 bg-offwhite text-coal font-black uppercase text-center text-xs hover:bg-brand-orange transition-colors cursor-pointer"
          >
            WORK WITH ME
          </a>
        </div>
      </aside>

      {/* Hero Central Pane */}
      <main className="relative bg-coal brutalist-block p-8 md:p-12 flex flex-col justify-center overflow-hidden">
        <div className="scribble-box top-10 left-20" />
        <div className="roots-tag">ENGINEERING ROOTS // SYSTEMS THINKER</div>
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="text-[10vw] md:text-[110px] leading-[1] md:leading-[0.95] mb-8 font-display">
            Your Favourite<br />
            <span className="text-brand-blue">18 y/o</span><br />
            <span className="bg-brand-orange text-coal px-2 md:px-4 leading-normal inline-block mt-2">FAILING IN PUBLIC</span>
          </h1>
          
          <p className="max-w-md text-base md:text-lg opacity-80 leading-relaxed font-medium">
            A live record of ambition, mistakes, and everything in between.
          </p>

          <div className="flex gap-4 mt-8">
            <a href="https://www.instagram.com/thebachajoshua/" className="w-12 h-12 border-2 border-offwhite flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/thebachajoshua/" className="w-12 h-12 border-2 border-offwhite flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@thebachajoshua" className="w-12 h-12 border-2 border-offwhite flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </main>

      {/* Sidebar Right */}
      <aside className="hidden lg:flex flex-col gap-4">
        <div className="bg-offwhite text-coal p-6 brutalist-border">
          <h3 className="text-2xl mb-4 border-b-2 border-coal pb-2">TRACK RECORD</h3>
          <div className="flex flex-col gap-3">
             <div className="flex justify-between text-[11px] font-black italic">
               <span>WRO NATIONAL FINALIST</span>
               <span>'25</span>
             </div>
             <div className="flex justify-between text-[11px] font-black italic">
               <span>ACITY TECH EXPO WINNER</span>
               <span>'25</span>
             </div>
             <div className="flex justify-between text-[11px] font-black italic">
               <span>NOVA GENESIS FOUNDED</span>
               <span>'26</span>
             </div>
             <div className="flex justify-between text-[11px] font-black italic">
               <span>PRESEC ROBOTICS PRES.</span>
               <span>'24</span>
             </div>
          </div>
        </div>

        <div className="flex-1 bg-brand-blue text-coal p-6 flex flex-col justify-between brutalist-border overflow-hidden relative group cursor-pointer">
          <div>
            <h4 className="text-2xl">NOVA GENESIS</h4>
            <p className="text-[10px] mt-1 font-bold leading-tight opacity-70">PREMIUM CONTENT STUDIO FOR AMBITIOUS BRANDS.</p>
          </div>
          <div className="h-20 bg-coal/10 my-4 group-hover:bg-coal/20 transition-colors" />
          <span className="text-[10px] text-right font-black">VIEW CASE STUDY →</span>
        </div>

        <div className="flex-1 bg-offwhite text-coal p-6 flex flex-col justify-between brutalist-border overflow-hidden relative group cursor-pointer">
          <div>
            <h4 className="text-2xl">YOUTUBE</h4>
            <p className="text-[10px] mt-1 font-bold leading-tight opacity-70">DOCUMENTING AFRICAN INNOVATION & AMBITION.</p>
          </div>
          <span className="mt-auto text-[10px] text-right font-black">WATCH CHANNEL →</span>
        </div>
      </aside>

      {/* Signal Strip (Footer of Hero) */}
      <footer className="lg:col-span-3 bg-offwhite text-coal flex items-center overflow-hidden brutalist-block border-coal h-20">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-5xl md:text-[42px] font-display opacity-90 px-5"
        >
          {[...Array(20)].map((_, i) => (
            <span key={i} className="mr-20">FOUNDER. BUILDER. STORYTELLER. PROUD AFRICAN.</span>
          ))}
        </motion.div>
      </footer>
    </section>
  );
};
