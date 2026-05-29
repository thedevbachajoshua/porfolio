import { motion } from 'motion/react';
import { SectionHeader } from './Shared';
import { Trophy, Briefcase, Award, Download } from 'lucide-react';

const TRACK_RECORDS = {
  awards: [
    { title: "Most Impactful Project", meta: "Acity Tech Expo 2025" },
    { title: "National Finalist", meta: "World Robotics Olympiad 2025" },
    { title: "2nd Runner up", meta: "Acity Creativity Challenge 2025" }
  ],
  roles: [
    { title: "Founder", meta: "Nova Genesis Studio (2026-Present)" },
    { title: "President", meta: "PRESEC Robotics Club (2024-2025)" },
    { title: "Visual Storyteller", meta: "YouTube (Creative Direction)" }
  ]
};

const TrackSection = ({ title, items, colorClass, hoverBorderClass }: { title: string, items: { title: string, meta: string }[], colorClass: string, hoverBorderClass: string }) => (
  <div className="flex flex-col gap-8">
    <div className={`flex items-center gap-4 ${colorClass}`}>
      <h3 className="text-3xl tracking-widest font-display font-black uppercase">{title}</h3>
    </div>
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div key={i} className={`flex justify-between items-end border-b border-deep-blue/10 pb-2 ${hoverBorderClass} transition-colors group`}>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-wider text-coal transition-colors">{item.title}</h4>
            <span className="text-[10px] text-coal/40 uppercase font-black">{item.meta.split('(')[0]}</span>
          </div>
          <span className="text-xs font-display text-coal/60">{item.meta.match(/'\d+|20\d+/)?.[0] || "'XX"}</span>
        </div>
      ))}
    </div>
  </div>
);

export const TrackRecord = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-paper text-coal">
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <SectionHeader 
          number="02" 
          title="Track Record" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <TrackSection 
            title="Awards" 
            items={TRACK_RECORDS.awards} 
            colorClass="text-deep-orange" 
            hoverBorderClass="hover:border-deep-orange"
          />
          <TrackSection 
            title="Roles" 
            items={TRACK_RECORDS.roles} 
            colorClass="text-deep-blue" 
            hoverBorderClass="hover:border-deep-blue"
          />
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
