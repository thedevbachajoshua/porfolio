import { motion } from 'motion/react';
import { SectionHeader } from './Shared';
import { Video, Camera, Layout, Share2, Rocket, Brain, FastForward, Lightbulb } from 'lucide-react';

const CAPABILITIES = {
  creative: [
    { icon: Video, label: "Video Editing", desc: "Crafting narratives that hook and resonate." },
    { icon: Camera, label: "Cinematic Storytelling", desc: "Atmospheric visuals with artistic intent." },
    { icon: Layout, label: "Brand Content Strategy", desc: "Visual systems for ambitious businesses." },
    { icon: Share2, label: "Creative Direction", desc: "Leading the vision from concept to export." }
  ],
  builder: [
    { icon: Rocket, label: "Founder Mindset", desc: "Building from zero to scale with high agency." },
    { icon: Brain, label: "Systems Thinking", desc: "Optimizing execution workflows and logic." },
    { icon: FastForward, label: "Rapid Execution", desc: "Shipping quality at speed to gain momentum." },
    { icon: Lightbulb, label: "Technical Problems", desc: "Solving bottlenecks with technical acumen." }
  ]
};

export const WhatIBring = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader 
          number="04" 
          title="What I Bring" 
          subtitle="A rare mix of creative taste and technical execution. Focused on delivering momentum."
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
        {/* Creative Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-12 text-coal brutalist-block shadow-[3px_3px_0px_0px_rgba(241,119,32,0.3)] border-deep-orange/10"
        >
          <h3 className="text-4xl md:text-5xl mb-12 flex items-center justify-between">
            Creative 
            <span className="w-12 h-12 bg-amber/10 border border-deep-orange rounded-full" />
          </h3>
          <div className="flex flex-col gap-12">
            {CAPABILITIES.creative.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="pt-1 text-deep-orange">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-display uppercase tracking-tight group-hover:text-amber transition-colors font-black">{item.label}</h4>
                  <p className="text-coal/70 font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Builder Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-12 text-coal brutalist-block border-deep-blue/10"
        >
          <h3 className="text-4xl md:text-5xl mb-12 flex items-center justify-between">
            Builder
            <span className="w-12 h-12 bg-sky-blue/10 border border-deep-blue" />
          </h3>
          <div className="flex flex-col gap-12">
            {CAPABILITIES.builder.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="pt-1 text-deep-blue">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-display uppercase tracking-tight group-hover:text-sky-blue transition-colors font-black">{item.label}</h4>
                  <p className="text-coal/70 font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
