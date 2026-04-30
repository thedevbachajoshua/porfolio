import { motion } from 'motion/react';
import { SectionHeader } from './Shared';

export const PersonalStory = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white text-coal overflow-hidden relative border-y border-deep-blue/5">
      <motion.div 
        initial={{ scale: 2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center font-display font-black text-[30vw] select-none pointer-events-none text-deep-orange"
      >
        AMBITION
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <SectionHeader 
          number="03" 
          title="Personal Story" 
          subtitle=""
          className="!mb-6 md:!mb-10"
          numberColor="text-deep-orange"
        />
        
        <h2 className="flex flex-col gap-2 mb-12">
          <span className="text-2xl md:text-4xl font-display font-black leading-[0.9] text-deep-blue uppercase tracking-tighter">
            Documenting the process,
          </span>
          <span className="text-xl md:text-3xl font-display font-black leading-[0.9] text-deep-blue/40 uppercase tracking-tighter md:translate-x-12">
            not just the outcome.
          </span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          <div className="lg:col-span-5 flex flex-col gap-8 text-2xl md:text-4xl font-black leading-[0.9] tracking-tighter uppercase italic py-4">
            <p className="text-coal">
              Young builder from Ghana. Driven by ambition, cinema, culture, and creation.
            </p>
            <p className="text-deep-orange/60">
              Failure is part of the system. I'm building in public to show everything in between.
            </p>
          </div>
          
          <div className="lg:col-span-7 flex flex-col gap-10 p-8 md:p-16 brutalist-block bg-[#FDFCFB] shadow-[4px_4px_0px_0px_rgba(241,119,32,0.15)] border-amber/10 relative group">
            
            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-deep-blue/40 block mb-6">Execution Mindset</span>
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase text-coal leading-[0.85] mb-8">The<br />Foundation</h3>
            </div>
            
            <div className="flex flex-col gap-8 border-l-2 border-deep-orange/20 pl-8">
              <p className="text-xl md:text-2xl leading-tight font-bold text-coal/80 tracking-tight">
                Before media and brand building, I developed my execution mindset through robotics and technical problem solving. 
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-coal/50 font-medium">
                Developing hardware prototypes through collaboration taught me how to solve complex problems under constraints. That technical foundation now powers what I do.
              </p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-px bg-deep-blue/10 mt-16 md:mt-20" 
        />
        
        <div className="flex justify-between mt-8 font-display uppercase tracking-widest text-sm">
          <span>Joshua Bacha</span>
          <span>Accra // 2026</span>
        </div>
      </motion.div>
    </section>
  );
};
