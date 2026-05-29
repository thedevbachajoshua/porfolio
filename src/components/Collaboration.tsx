import { useState } from 'react';
import { motion } from 'motion/react';
import { MagneticButton } from './Shared';
import { Instagram, Linkedin, Youtube, Mail, MapPin, Copy, Check } from 'lucide-react';

export const Collaboration = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-paper text-coal text-center relative overflow-hidden border-t border-deep-blue/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-deep-orange/10 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-8"
      >
        <h2 className="text-6xl md:text-8xl font-display font-black leading-[0.8] mb-4">
          IF YOU’RE BUILDING <br /> <span className="text-deep-orange italic">LEGACY</span> <br /><br /> LET'S TALK
        </h2>
        
        <p className="text-xl md:text-3xl font-medium tracking-tight text-coal/60 max-w-2xl">
          Open to partnerships, projects, and ambitious ideas.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <MagneticButton 
            className="!bg-deep-orange !text-white !shadow-[3px_3px_0px_0px_rgba(4,116,186,1)]"
            onClick={() => document.getElementById('site-footer')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('mbabachajoshua@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  return (
    <footer id="site-footer" className="py-24 px-6 md:px-12 bg-amber/10 text-coal border-t border-deep-blue/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-deep-orange">JOSHUA MBA BACHA</h2>
          <div className="flex items-center gap-2 text-sm font-bold opacity-60">
            <MapPin className="w-4 h-4" />
            <span>ACCRA, GHANA</span>
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6 items-start md:items-end">
          <span className="text-xs font-bold uppercase tracking-widest opacity-40">Get in touch</span>
          <div className="flex items-center gap-2 max-w-full">
            <a href="mailto:mbabachajoshua@gmail.com" className="text-xl md:text-2xl font-bold hover:text-deep-orange transition-colors whitespace-nowrap">
              mbabachajoshua@gmail.com
            </a>
            <button
              onClick={handleCopy}
              className="p-1.5 border border-deep-blue/10 bg-white hover:bg-deep-orange hover:text-white hover:border-deep-orange text-coal rounded transition-all flex items-center justify-center cursor-pointer shadow-sm relative group shrink-0"
              title="Copy email to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600 group-hover:text-white" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-coal text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/thebachajoshua/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-deep-blue/10 text-coal hover:bg-deep-orange hover:text-white transition-all shadow-sm">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/thebachajoshua/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-deep-blue/10 text-coal hover:bg-deep-blue hover:text-white transition-all shadow-sm">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@thebachajoshua" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-deep-blue/10 text-coal hover:bg-red-500 hover:text-white transition-all shadow-sm">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-deep-blue/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold uppercase tracking-widest opacity-40">
        <span>&copy; {currentYear} JOSHUA MBA BACHA. ALL RIGHTS RESERVED.</span>
        <span className="italic">Everything you see here is under construction... including me.</span>
        <span>Built with intent in Ghana.</span>
      </div>
    </footer>
  );
};
