"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, staggerContainer, staggerItem } from "@/src/lib/motion";

interface ProjectsProps {
  id: string;
}

export default function Projects({ id }: ProjectsProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section id={id} className="section-padding px-6 md:px-8 lg:px-12 bg-background relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-center mb-14 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="divider-gold" />
            <span className="label-sm text-primary">Our Portfolio</span>
            <div className="divider-gold" />
          </div>
          <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Featured <span className="text-gold-gradient">Projects</span>
          </h2>
          <p className="text-muted body-lg max-w-2xl mx-auto">
            A showcase of our finest work - each project a testament to our craft, precision, and relentless pursuit of architectural excellence
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className="group rounded-2xl overflow-hidden border border-border
                         bg-surface card-hover flex flex-col justify-between h-full"
            >
              <div>
                {/* Image Area */}
                <div className="relative h-52 sm:h-60 lg:h-64 overflow-hidden bg-surface-elevated">
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.category} construction project in ${project.location}`}
                    fill
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full
                                     bg-primary/90 text-btn-text text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-7 lg:p-8">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2.5 heading-md
                               group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted text-xs sm:text-sm body-relaxed mb-4 sm:mb-5 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-7 lg:px-8 pb-5 sm:pb-7 lg:pb-8">
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-muted min-w-0 pr-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-xs truncate">{project.location}</span>
                  </div>
                  <span className="text-xs font-medium text-primary flex-shrink-0">{project.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
