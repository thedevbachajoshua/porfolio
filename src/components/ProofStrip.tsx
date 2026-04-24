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
    <div className="py-12 bg-coal overflow-hidden border-y-2 border-coal">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap gap-12 items-center"
      >
        {[...BADGES, ...BADGES, ...BADGES].map((badge, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-4xl md:text-6xl font-display text-offwhite uppercase tracking-tighter">
              {badge}
            </span>
            <div className="w-4 h-4 bg-brand-orange rotate-45" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
