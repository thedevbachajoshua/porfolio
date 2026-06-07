import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from './Shared';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

const INITIAL_SLIDES = [
  {
    id: 1,
    image: "/ACITY.png",
    title: "Most Impactful Award: Acity Tech Expo",
    aspect: "16/9"
  },
  {
    id: 2,
    image: "/PRPC.jpg",
    title: "Last Speech as PRESEC Robotics President",
    aspect: "4/3"
  },
  {
    id: 3,
    image: "/WRO.png",
    title: "National Finalist: World Robotics Olympiad 25'",
    aspect: "16/9"
  },
  {
    id: 4,
    image: "/COOLEST.jpg",
    title: "Participant: Coolest Projects Ghana",
    aspect: "16/9"
  },
  {
    id: 5,
    image: "/AIRTAD.JPG",
    title: "Quiz Team Volunteer: AIRTAD",
    aspect: "16/9"
  },
  {
    id: 6,
    image: "/CREATIVE.jpg",
    title: "2nd Runner Up: Acity Creativity Challenge",
    aspect: "16/9"
  },
  {
    id: 7,
    image: "/MENTOR.png",
    title: "Honouring Mentors...",
    aspect: "16/9"
  },
  {
    id: 8,
    image: "/SRC.jpg",
    title: "Chatting with the Boys",
    aspect: "16/9"
  },
  {
    id: 9,
    image: "/TECH.png",
    title: "Tech and Beyond Expo: Volunteer",
    aspect: "16/9"
  },
  {
    id: 10,
    image: "/MC.jpg",
    title: "Co-MC at High School Event",
    aspect: "16/9"
  }
];

export const TrackRecord = () => {
  const [slides] = useState(INITIAL_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isHovered, setIsHovered] = useState(false);

  // Preload all slide images on mount
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: "0%",
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="py-24 px-6 md:px-12 bg-paper text-coal">
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <SectionHeader 
          number="02" 
          title="Track Record" 
        />

        {/* Tactical Image Slideshow Card Frame */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group/card w-full shadow-[8px_8px_0px_0px_#00A7E1] border-2 border-coal rounded-sm overflow-hidden bg-coal aspect-video"
        >
          
          {/* Animate-Presence for sliding transitions */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-coal"
              >
                {imageErrors[currentSlide.id] ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-coal border border-[#00A7E1]/10 p-4 text-center select-none">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 mb-2 animate-pulse">
                      <span className="font-mono text-xs text-[#00A7E1] font-bold">
                        {currentSlide.aspect === "4/3" ? "4:3" : "16:9"}
                      </span>
                    </div>
                    <p className="font-technical text-[10px] font-black uppercase tracking-[0.2em] text-[#F5F5F7]/30 mb-1">
                      Image Slot: {currentSlide.image}
                    </p>
                    <p className="font-mono text-[9px] text-white/20 max-w-xs leading-relaxed">
                      Upload your high-res image named "{currentSlide.image.replace('/', '')}" to public folder to replace this placeholder.
                    </p>
                  </div>
                ) : (
                  <img 
                    src={currentSlide.image} 
                    alt={currentSlide.title}
                    onError={() => setImageErrors(prev => ({ ...prev, [currentSlide.id]: true }))}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full select-none ${
                      currentSlide.aspect === "4/3" 
                        ? "object-contain max-h-full py-4 bg-coal" 
                        : "object-cover"
                    }`}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* High-quality dark overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none z-10" />

          {/* Side Nav Arrows (as seen in the reference) */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-10 sm:w-10 sm:h-12 bg-black/45 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 active:scale-95 transition-all outline-none rounded-r-md cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-10 sm:w-10 sm:h-12 bg-black/45 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 active:scale-95 transition-all outline-none rounded-l-md cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Bottom Card Copy (Overlay Layer) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 flex flex-col gap-2 sm:gap-3 md:gap-4 z-20 pointer-events-auto">
            
            {/* Heavy bold interactive title */}
            <h3 className="text-sm xs:text-base sm:text-2xl md:text-3xl font-display font-medium text-white tracking-tight leading-tight max-w-4xl drop-shadow-sm line-clamp-2 md:line-clamp-3">
              {currentSlide.title}
            </h3>

            {/* Footer Row (Progress Indicators Centered) */}
            <div className="flex items-center justify-center mt-2 pt-2 sm:mt-3 sm:pt-3 border-t border-white/10 w-full">
              
              {/* Precise Dynamic Progression Indicators (Dots with active pill bar) */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 transition-all duration-200 rounded-full cursor-pointer outline-none ${
                      idx === currentIndex 
                        ? "w-8 bg-white" 
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Fun static CV download section with high-contrast tactile layout */}
        <div className="mt-20 flex flex-col items-end justify-end border-t border-deep-blue/10 pt-16 text-right">
          <span className="font-technical text-xs font-black uppercase tracking-[0.2em] text-coal/40 mb-4 animate-pulse">
            Want more?
          </span>
          <a
            href="/CV.pdf"
            download="Joshua_Mba_Bacha_CV.pdf"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-coal text-[#F5F5F7] font-display font-black uppercase text-xs tracking-wider transition-all duration-150 hover:bg-deep-orange hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 shadow-[4px_4px_0px_0px_#00A7E1]"
          >
            My life in PDF
            <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

