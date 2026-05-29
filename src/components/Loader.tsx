import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [phase, setPhase] = useState<'canvas' | 'sweep' | 'complete'>('canvas');

  useEffect(() => {
    // Lock scrolling on mount during the loading experience
    document.body.style.overflow = 'hidden';

    // Phase 1 is 1.2 seconds: canvas/monogram fading in, pulsing/glowing, fading out
    const sweepTimer = setTimeout(() => {
      setPhase('sweep');
    }, 1200);

    return () => {
      clearTimeout(sweepTimer);
    };
  }, []);

  const handleSweepComplete = () => {
    // Standard scroll unlock when fully complete
    document.body.style.overflow = '';
    onComplete();
    setPhase('complete');
  };

  // Ultra-premium timing cubic bezier [0.76, 0, 0.24, 1]
  const cubicEasing = [0.76, 0, 0.24, 1];

  return (
    <AnimatePresence mode="wait">
      {phase !== 'complete' && (
        <div id="app-loader" className="fixed inset-0 z-[9999] pointer-events-none select-none">
          
          {/* Phase 1: The Dark Canvas & Monogram */}
          {phase === 'canvas' && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black flex items-center justify-center pointer-events-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={[
                  { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
                  { scale: 1.015, transition: { duration: 0.4, ease: 'easeInOut', delay: 0.4 } },
                  { opacity: 0, y: -4, transition: { duration: 0.4, ease: 'easeIn', delay: 0.8 } }
                ]}
                className="font-display text-2xl sm:text-3xl font-black text-[#F5F5F7] tracking-widest uppercase text-center"
              >
                CREATING ART...
              </motion.div>
            </motion.div>
          )}

          {/* Phase 2: The Basquiat Paint Sweep */}
          {phase === 'sweep' && (
            <div className="absolute inset-0 w-full h-full pointer-events-auto">
              
              {/* Sibling Panel 1: Cyan/Sky-Blue (#00A7E1) on Top Layer */}
              <motion.div
                initial={{ x: '0%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 0.8,
                  ease: cubicEasing,
                  delay: 0,
                }}
                className="absolute inset-0 bg-[#00A7E1] w-full h-full z-30 origin-right shadow-2xl"
              />

              {/* Sibling Panel 2: Deep Orange (#F17720) in Middle Layer */}
              <motion.div
                initial={{ x: '0%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 0.8,
                  ease: cubicEasing,
                  delay: 0.2, // Offset of 0.2 seconds
                }}
                className="absolute inset-0 bg-[#F17720] w-full h-full z-20 origin-right shadow-2xl"
              />

              {/* Sibling Panel 3: Coal Grey (#1a1a1a) on Bottom Layer */}
              <motion.div
                initial={{ x: '0%' }}
                animate={{ x: '100%' }}
                onAnimationComplete={handleSweepComplete}
                transition={{
                  duration: 0.8,
                  ease: cubicEasing,
                  delay: 0.4, // Offset of 0.4 seconds
                }}
                className="absolute inset-0 bg-[#1a1a1a] w-full h-full z-10 origin-right shadow-2xl flex flex-col justify-center items-center"
              >
                {/* AKWAABA Text: fading in and out dynamically on the final panel */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={[
                    { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut', delay: 0.1 } },
                    { opacity: 0, scale: 1.05, transition: { duration: 0.35, ease: 'easeIn', delay: 0.45 } }
                  ]}
                  className="font-display text-4xl sm:text-6xl text-[#F5F5F7] font-black tracking-widest select-none uppercase"
                >
                  AKWAABA
                </motion.div>
              </motion.div>
            </div>
          )}

        </div>
      )}
    </AnimatePresence>
  );
};
