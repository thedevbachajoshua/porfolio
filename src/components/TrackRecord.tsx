import { motion } from 'motion/react';
import { SectionHeader } from './Shared';
import { Trophy, Briefcase, Award } from 'lucide-react';

const TRACK_RECORDS = {
  awards: [
    { title: "Most Impactful Project", meta: "Acity Tech Expo 2025" },
    { title: "National Finalist", meta: "World Robotics Olympiad 2025" },
    { title: "2nd Runner up", meta: "Acity Creativity Challenge 2025" }
  ],
  roles: [
    { title: "Founder", meta: "Nova Genesis Studio (2026-Present)" },
    { title: "Video Editor", meta: "Freelance (Present)" },
    { title: "President", meta: "PRESEC Robotics Club (2024-2025)" },
    { title: "Visual Storyteller", meta: "YouTube (Creative Direction)" }
  ]
};

const TrackSection = ({ title, items, colorClass }: { title: string, items: { title: string, meta: string }[], colorClass: string }) => (
  <div className="flex flex-col gap-8">
    <div className={`flex items-center gap-4 ${colorClass}`}>
      <h3 className="text-3xl tracking-widest font-display">{title}</h3>
    </div>
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between items-end border-b border-deep-blue/10 pb-2 hover:border-deep-orange transition-colors group">
          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-wider text-coal group-hover:text-deep-orange transition-colors">{item.title}</h4>
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
    <section className="py-24 px-6 md:px-12 bg-platinum text-coal">
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
          subtitle="Milestones, roles, recognitions, and proof of execution."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <TrackSection title="Awards" items={TRACK_RECORDS.awards} colorClass="text-deep-orange" />
          <TrackSection title="Roles" items={TRACK_RECORDS.roles} colorClass="text-deep-blue" />
        </div>
      </motion.div>
    </section>
  );
};
