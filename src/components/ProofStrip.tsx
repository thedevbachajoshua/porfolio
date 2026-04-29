import { motion } from 'motion/react';

const BADGES = [
  "Founder of Nova Genesis Studio",
  "Award Winning Innovator",
  "Ghana Based / Global Vision",
  "Self-Taught Builder",
  "Open to Collaboration",
  "Cinematic Taste",
  "Engineering Roots"
];

export const ProofStrip = () => {
  return (
    <div className="py-12 bg-white overflow-hidden border-y border-deep-blue/10">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap gap-12 items-center"
      >
        {[...BADGES, ...BADGES, ...BADGES].map((badge, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-4xl md:text-6xl font-display text-coal/10 hover:text-deep-blue transition-colors uppercase tracking-tighter">
              {badge}
            </span>
            <div className="w-3 h-3 bg-sky-blue/30 rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
