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
      <div className="flex items-center gap-4 relative">
        <span className={`font-display text-2xl md:text-4xl leading-none font-black ${numberColor}`}>{number}</span>
        <div className="h-1 flex-1 bg-deep-blue/50" />
        
        {/* Decorative Crown for every section */}
        <div className="absolute -top-12 right-0 w-12 h-12 text-coal/20 rotate-[15deg] select-none pointer-events-none hidden md:block">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M10,40 L30,20 L50,40 L70,20 L90,40 L90,80 L10,80 Z" />
          </svg>
        </div>
      </div>
      <h2 className="text-5xl md:text-9xl font-display leading-[0.8] text-coal font-black">{title}</h2>
      {subtitle && (
        <p className="max-w-md text-sm md:text-base text-coal/60 mt-4 font-bold uppercase tracking-widest border-l-2 border-deep-blue/30 pl-4 italic">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const MagneticButton = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: -2, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
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
