import { motion } from 'motion/react';
import { SectionHeader } from './Shared';
import { Play, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    id: "nova-genesis",
    title: "Nova Genesis Studio",
    category: "Media Production",
    desc: "A creative vehicle for high-impact visual storytelling. We craft cinematic narratives for ambitious African brands seeking to redefine their market presence.",
    image: "https://images.unsplash.com/photo-1492691523319-a74b455cddea?q=80&w=2940",
    tags: ["Brand Visuals", "Cinematography", "Creative Direction"],
    color: "bg-deep-orange"
  },
  {
    id: "youtube",
    title: "YouTube Channel",
    category: "Content Creation",
    desc: "Cinematic documentation of innovation and ambition. Exploring Africa's future through the lens of technology and human potential.",
    image: "https://images.unsplash.com/photo-1542204111-970c97b0a79a?q=80&w=2835",
    tags: ["Storytelling", "Editing", "Knowledge Sharing"],
    color: "bg-sky-blue",
    link: "https://www.youtube.com/@thebachajoshua",
    embed: "https://www.youtube.com/embed/o6mOGJRhqLI"
  }
];

export const ProjectShowcase = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader 
          number="01" 
          title="Selected Work" 
          subtitle="Premium project showcase where cinematic vision meets strategic execution."
        />
      </motion.div>

      <div className="flex flex-col gap-32">
        {PROJECTS.map((project: any, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className={`lg:col-span-7 relative group ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <motion.div 
                whileHover={!project.embed ? { scale: 0.98, x: -2, y: -2 } : undefined}
                className="relative aspect-video overflow-hidden border border-deep-blue/10 bg-muted shadow-[6px_6px_0px_0px_rgba(4,116,186,0.3)] transition-all"
              >
                {project.embed ? (
                  <iframe 
                    src={project.embed}
                    title={project.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-coal/5 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-deep-orange text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-500 shadow-xl">
                      <Play className="w-8 h-8 fill-current" />
                    </div>
                  </>
                )}
              </motion.div>
              {/* Decorative square */}
              <div className={`absolute -bottom-4 -right-4 w-16 h-16 ${project.color} opacity-10 -z-10`} />
            </div>

            <div className={`lg:col-span-5 flex flex-col gap-6 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-blue">{project.category}</span>
                <h3 className="text-5xl md:text-7xl leading-[1] md:leading-[0.9] text-coal font-black">{project.title}</h3>
              </div>
              <p className="text-lg text-coal/80 leading-relaxed font-bold">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag: any) => (
                  <span key={tag} className="px-3 py-1 bg-deep-blue/5 text-[10px] font-black uppercase border border-deep-blue/10 text-deep-blue/80">{tag}</span>
                ))}
              </div>
              <a 
                href={project.link || "#"} 
                target={project.link ? "_blank" : undefined}
                rel={project.link ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 text-xl font-display uppercase group mt-6 w-fit bg-coal text-white px-8 py-3 hover:bg-deep-orange transition-colors shadow-[4px_4px_0px_0px_rgba(4,116,186,1)]"
              >
                Explore 
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
