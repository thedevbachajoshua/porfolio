import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from './Shared';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

const INITIAL_SLIDES = [
  {
    id: 1,
    image: "/ACITY.png",
    title: "Most Impactful Award: Acity Tech Expo",
    aspect: "16/9",
    gradient: "from-amber-600 via-orange-600 to-red-700"
  },
  {
    id: 2,
    image: "/PRPC.jpg",
    title: "Last Speech as PRESEC Robotics President",
    aspect: "4/3",
    gradient: "from-blue-900 via-indigo-950 to-black"
  },
  {
    id: 3,
    image: "/WRO.png",
    title: "National Finalist: World Robotics Olympiad '25",
    aspect: "16/9",
    gradient: "from-emerald-800 via-teal-900 to-black"
  },
  {
    id: 4,
    image: "/COOLEST.jpg",
    title: "Participant: Coolest Projects Ghana",
    aspect: "16/9",
    gradient: "from-rose-600 via-pink-700 to-slate-900"
  },
  {
    id: 5,
    image: "/AIRTAD.JPG",
    title: "Quiz Team Volunteer: AIRTAD",
    aspect: "16/9",
    gradient: "from-teal-800 via-sky-900 to-slate-900"
  },
  {
    id: 6,
    image: "/CREATIVE.jpg",
    title: "2nd Runner Up: Acity Creativity Challenge",
    aspect: "16/9",
    gradient: "from-purple-800 via-violet-900 to-black"
  },
  {
    id: 7,
    image: "/MENTOR.png",
    title: "Honouring Mentors...",
    aspect: "16/9",
    gradient: "from-indigo-800 via-blue-900 to-slate-950"
  },
  {
    id: 8,
    image: "/SRC.jpg",
    title: "Chatting with the Boys",
    aspect: "16/9",
    gradient: "from-slate-800 via-zinc-900 to-neutral-900"
  },
  {
    id: 9,
    image: "/TECH.png",
    title: "Tech and Beyond Expo: Volunteer",
    aspect: "16/9",
    gradient: "from-cyan-800 via-sky-950 to-blue-950"
  },
  {
    id: 10,
    image: "/MC.jpg",
    title: "Co-MC at High School Event",
    aspect: "16/9",
    gradient: "from-fuchsia-800 via-pink-900 to-rose-950"
  }
];

export const TrackRecord = () => {
  const [slides] = useState(INITIAL_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isHovered, setIsHovered] = useState(false);

  // Eagerly preload all images on component mount to prime browser caches
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  // Autoplay effect that transitions slides every 3 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
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
          className="relative group/card w-full shadow-[8px_8px_0px_0px_#00A7E1] border-2 border-coal rounded-sm overflow-hidden bg-coal aspect-[16/9]"
        >
          
          {/* Continuous sliding track container ensuring all images remain mounted & fully decoded in DOM */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // High-performance hardware accelerated transition
              className="flex w-full h-full"
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="w-full h-full flex-shrink-0 flex items-center justify-center bg-coal relative"
                >
                  {imageErrors[slide.id] ? (
                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr ${slide.gradient || 'from-coal to-slate-900'} p-8 text-center select-none`}>
                      <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/10 mb-4 animate-pulse">
                        <span className="font-mono text-xs text-white uppercase tracking-wider font-extrabold">
                          {slide.aspect || "16:9"}
                        </span>
                      </div>
                      <p className="font-display text-lg sm:text-xl md:text-2xl font-black uppercase text-white/95 mb-4 max-w-2xl leading-tight tracking-tight">
                        {slide.title}
                      </p>
                      <span className="font-technical text-[10px] font-black uppercase tracking-[0.2em] text-white/45 mb-1">
                        IMAGE PATH: {slide.image}
                      </span>
                      <span className="font-mono text-[9px] text-white/30 max-w-xs leading-relaxed">
                        Place your high-res file in the public folder to display here.
                      </span>
                    </div>
                  ) : (
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      loading="eager"
                      decoding="async"
                      onError={() => setImageErrors(prev => ({ ...prev, [slide.id]: true }))}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full select-none ${
                        slide.aspect === "4/3" 
                          ? "object-contain max-h-full py-4 bg-coal" 
                          : "object-cover"
                      }`}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* High-quality dark overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none z-10" />

          {/* Side Nav Arrows (as seen in the reference) */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-12 bg-black/45 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 active:scale-95 transition-all outline-none rounded-r-md cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-12 bg-black/45 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 active:scale-95 transition-all outline-none rounded-l-md cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Card Copy (Overlay Layer) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col gap-3 md:gap-4 z-20 pointer-events-auto">
            
            {/* Heavy bold interactive title with a fast crossfade key transition */}
            <AnimatePresence mode="wait">
              <motion.h3 
                key={currentIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="text-lg sm:text-2xl md:text-3xl font-display font-medium text-white tracking-tight leading-tight max-w-4xl drop-shadow-sm line-clamp-3"
              >
                {currentSlide.title}
              </motion.h3>
            </AnimatePresence>

            {/* Footer Row (Progress Indicators Centered) */}
            <div className="flex items-center justify-center mt-3 pt-3 border-t border-white/10 w-full">
              
              {/* Precise Dynamic Progression Indicators (Dots with active pill bar) */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
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

