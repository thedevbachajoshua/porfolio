import { motion } from 'motion/react';

export const StatusBubble = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      className={`flex items-center bg-white border-2 border-coal p-2 px-4 md:p-1 md:pr-6 md:pl-4 rounded-full shadow-[4px_4px_0px_0px_rgba(4,116,186,1)] ${className}`}
    >
      <div className="flex flex-col">
        <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest opacity-40 leading-none">Currently</span>
        <span className="text-[9px] md:text-[10px] font-black tracking-tight text-coal leading-tight">Interning @ datamaker Ghana</span>
      </div>
    </motion.div>
  );
};
