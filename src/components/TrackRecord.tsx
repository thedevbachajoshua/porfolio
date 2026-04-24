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
      <h3 className="text-3xl tracking-widest">{title}</h3>
    </div>
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between items-end border-b border-offwhite/10 pb-2 hover:border-brand-orange transition-colors group">
          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-wider group-hover:text-brand-orange transition-colors">{item.title}</h4>
            <span className="text-[10px] opacity-40 uppercase font-black">{item.meta.split('(')[0]}</span>
          </div>
          <span className="text-xs font-display opacity-80">{item.meta.match(/'\d+|20\d+/)?.[0] || "'XX"}</span>
        </div>
      ))}
    </div>
  </div>
);

export const TrackRecord = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-coal text-offwhite">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          number="02" 
          title="Track Record" 
          subtitle="Milestones, roles, recognitions, and proof of execution."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <TrackSection title="Awards" items={TRACK_RECORDS.awards} colorClass="text-brand-orange" />
          <TrackSection title="Roles" items={TRACK_RECORDS.roles} colorClass="text-brand-blue" />
        </div>
      </div>
    </section>
  );
};
