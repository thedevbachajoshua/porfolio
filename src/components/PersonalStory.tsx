import { motion } from 'motion/react';

export const PersonalStory = () => {
  return (
    <section id="story" className="py-24 md:py-32 px-6 md:px-12 bg-amber/10 text-coal overflow-hidden relative border-y border-coal/5">
      {/* Background Word */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex items-center justify-center font-display font-black text-[25vw] leading-[0.7] select-none pointer-events-none text-coal tracking-tighter"
      >
        EXECUTION
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Left-Aligned Header Section */}
        <div className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-display text-2xl md:text-4xl font-black text-deep-orange">03</span>
            <div className="h-1 flex-1 bg-deep-blue/50" />
          </div>
          <h2 className="text-5xl md:text-9xl font-display font-black uppercase tracking-tighter leading-[0.8]">
            My Story
          </h2>
        </div>
        
        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-24">
          
          {/* Left Column: Manifesto */}
          <div className="lg:col-span-6 flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
                Think Deeply.<br />
                Build Fast.<br />
                Show The Process.
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xl md:text-3xl font-display font-black uppercase tracking-tight text-deep-orange leading-[1.1]">
                Failure is not the opposite of building.<br />
                It is part of the process.<br />
                So I document all of it.
              </p>
            </div>
          </div>

          {/* Right Column: Technical Credibility */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-8 md:mt-2">
             <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-coal/40">
                  Where Execution Began
                </h4>
                <div className="flex flex-col gap-6 text-lg md:text-xl font-medium tracking-tight text-coal leading-snug">
                  <p>
                    Before cameras, brands, or storytelling, I was building robots, prototyping hardware, and solving technical problems under real constraints.
                  </p>
                  <p>
                    That engineering mindset shaped how I work today.
                  </p>
                </div>
             </div>

             <div className="mt-12 pt-12 border-t border-coal/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-coal/30">
                  
                </span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
