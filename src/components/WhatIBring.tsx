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
      <SectionHeader 
        number="04" 
        title="What I Bring" 
        subtitle="A rare mix of creative taste and technical execution. Focused on delivering momentum."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-coal border-2 border-coal">
        {/* Creative Column */}
        <div className="bg-offwhite p-12 text-coal">
          <h3 className="text-4xl md:text-5xl mb-12 flex items-center justify-between">
            Creative 
            <span className="w-12 h-12 bg-brand-orange rounded-full" />
          </h3>
          <div className="flex flex-col gap-12">
            {CAPABILITIES.creative.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="pt-1 text-brand-orange">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-display uppercase tracking-tight group-hover:text-brand-orange transition-colors">{item.label}</h4>
                  <p className="opacity-70 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Builder Column */}
        <div className="bg-offwhite p-12 text-coal">
          <h3 className="text-4xl md:text-5xl mb-12 flex items-center justify-between">
            Builder
            <span className="w-12 h-12 bg-brand-blue" />
          </h3>
          <div className="flex flex-col gap-12">
            {CAPABILITIES.builder.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="pt-1 text-brand-blue">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-display uppercase tracking-tight group-hover:text-brand-blue transition-colors">{item.label}</h4>
                  <p className="opacity-70 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
