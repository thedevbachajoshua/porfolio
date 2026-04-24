import { motion } from 'motion/react';
import { MagneticButton } from './Shared';
import { Instagram, Linkedin, Youtube, Mail, MapPin } from 'lucide-react';

export const Collaboration = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-coal text-offwhite text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-orange rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-8">
        <h2 className="text-6xl md:text-9xl font-display leading-[0.8]">
          IF YOU’RE BUILDING <br /> MEANINGFUL <br /> <span className="text-brand-orange">LET'S TALK</span>
        </h2>
        
        <p className="text-xl md:text-3xl font-medium tracking-tight opacity-70 max-w-2xl">
          Open to partnerships, projects, speaking opportunities, creative collaborations, and ambitious ideas.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <MagneticButton className="!bg-brand-orange !text-coal">Contact Me</MagneticButton>
          <a 
            href="mailto:mbabachajoshua@gmail.com" 
            className="flex items-center gap-2 font-display text-2xl uppercase hover:text-brand-blue transition-colors underline underline-offset-8"
          >
            Email Joshua
          </a>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-24 px-6 md:px-12 bg-offwhite text-coal border-t-2 border-coal">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-6 flex flex-col gap-6">
          <h2 className="text-5xl md:text-7xl font-display tracking-tighter">JOSHUA BACHA</h2>
          <div className="flex items-center gap-2 text-sm font-bold opacity-60">
            <MapPin className="w-4 h-4" />
            <span>ACCRA, GHANA</span>
          </div>
          <p className="text-lg font-medium max-w-xs opacity-70">
            Building stories, systems, and futures from the heart of Africa.
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest opacity-40">Contact</span>
          <a href="mailto:mbabachajoshua@gmail.com" className="text-xl font-bold hover:text-brand-orange transition-colors">
            mbabachajoshua@gmail.com
          </a>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/thebachajoshua/" target="_blank" className="p-3 bg-coal text-offwhite hover:bg-brand-orange transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/thebachajoshua/" target="_blank" className="p-3 bg-coal text-offwhite hover:bg-brand-blue transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@thebachajoshua" target="_blank" className="p-3 bg-coal text-offwhite hover:bg-red-600 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest opacity-40">Identity</span>
          <ul className="flex flex-col gap-2 font-display text-lg">
            <li className="hover:text-brand-orange cursor-pointer">Selected Work</li>
            <li className="hover:text-brand-blue cursor-pointer">Track Record</li>
            <li className="hover:text-brand-orange cursor-pointer">Engineering</li>
            <li className="hover:text-brand-blue cursor-pointer">Archive</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-coal/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold uppercase tracking-widest opacity-40">
        <span>&copy; {currentYear} JOSHUA BACHA. ALL RIGHTS RESERVED.</span>
        <span className="italic">Everything you see here is under construction... including me.</span>
        <span>Built with intent in Ghana.</span>
        <span className="flex gap-2 items-center">
            <span className="w-2 h-2 bg-brand-orange animate-pulse" />
            SYSTEM_ONLINE_v2.0
        </span>
      </div>
    </footer>
  );
};
