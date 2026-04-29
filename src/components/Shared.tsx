import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  numberColor?: string;
}

export const SectionHeader = ({ number, title, subtitle, className = "", numberColor = "text-deep-orange" }: SectionHeaderProps) => {
  return (
    <div className={`mb-12 md:mb-24 flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-4">
        <span className={`font-display text-2xl md:text-4xl leading-none ${numberColor}`}>{number}</span>
        <div className="h-px flex-1 bg-deep-blue/10" />
      </div>
      <h2 className="text-5xl md:text-9xl font-display leading-[0.8] text-coal">{title}</h2>
      {subtitle && (
        <p className="max-w-md text-sm md:text-base text-coal/60 mt-4 font-medium uppercase tracking-widest border-l-2 border-deep-blue/30 pl-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: -2, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative px-8 py-4 bg-coal text-white font-black uppercase text-xs border border-deep-blue/20 shadow-[3px_3px_0px_0px_rgba(4,116,186,1)] hover:bg-deep-orange transition-all duration-300 cursor-pointer ${className}`}
    >
      <span className="flex items-center gap-2">
        {children}
        <ArrowUpRight className="w-5 h-5" />
      </span>
    </motion.button>
  );
};

export const GrainOverlay = () => {
  return <div className="grain fixed inset-0 pointer-events-none z-[100]" />;
};
