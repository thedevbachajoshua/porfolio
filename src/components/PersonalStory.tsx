import { motion } from 'motion/react';
import { SectionHeader } from './Shared';

export const PersonalStory = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-orange text-coal overflow-hidden relative">
      <motion.div 
        initial={{ scale: 2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center font-display text-[30vw] select-none pointer-events-none"
      >
        AMBITION
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader 
          number="03" 
          title="Personal Story" 
          subtitle="Documenting the process, not just the outcome. Failure is part of the system."
          className="!mb-6 md:!mb-10 dark"
          numberColor="text-coal"
        />
        
        <h2 className="text-4xl md:text-[5.5rem] font-display leading-[1.1] md:leading-[1] mb-10">
          DOCUMENTING THE PROCESS, <br /> 
          <span className="text-offwhite text-[3.5rem] md:text-[5.5rem]">NOT JUST THE OUTCOME.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-5 flex flex-col gap-6 text-xl md:text-2xl font-bold leading-tight">
            <p>
              Young builder from Ghana. Driven by ambition, cinema, culture, and creation.
            </p>
            <p className="text-offwhite">
              Failure is part of the system. I'm building in public to show everything in between.
            </p>
          </div>
          <div className="md:col-span-7 flex flex-col gap-4 p-6 md:p-8 border-2 border-coal/20 bg-coal/5">
            <h3 className="text-2xl md:text-3xl font-display uppercase">The Foundation</h3>
            <p className="text-base md:text-lg leading-snug">
              Before media and brand building, I developed my execution mindset through robotics and technical problem solving. 
            </p>
            <p className="text-base md:text-lg leading-snug opacity-70">
              Developing hardware prototypes and autonomous systems taught me how to solve complex problems under constraints. That technical foundation now powers every story I tell.
            </p>
          </div>
        </div>

        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-px bg-coal mt-16 md:mt-20" 
        />
        
        <div className="flex justify-between mt-8 font-display uppercase tracking-widest text-sm">
          <span>Joshua Bacha</span>
          <span>Accra // 2026</span>
        </div>
      </div>
    </section>
  );
};
