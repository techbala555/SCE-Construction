"use client";

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
            A showcase of our finest work — each project a testament to our craft, precision, and relentless pursuit of architectural excellence
          </p>
        </motion.div>

        {/* Projects Grid — gap-8 (32px) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className="group rounded-2xl overflow-hidden border border-border
                         bg-surface dark:bg-surface card-hover"
            >
              {/* Image Area */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-secondary dark:bg-surface-elevated">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/50 dark:from-primary/5 dark:to-[#08111F]/50" />

                {/* Project visual placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/20">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M2 14l5-5 3 3 4-4 8 8" />
                    </svg>
                    <p className="text-xs">{project.title}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full
                                   bg-primary/90 text-[#0B1F3A] text-[11px] font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10
                              transition-all duration-500" />

                {/* Zoom effect */}
                <div className="absolute inset-0 scale-100 group-hover:scale-110
                              transition-transform duration-700 ease-out
                              bg-gradient-to-t from-secondary/60 via-transparent to-transparent
                              dark:from-[#08111F]/60" />
              </div>

              {/* Content */}
              <div className="p-7 sm:p-8">
                <h3 className="text-lg font-semibold text-foreground mb-3 heading-md
                             group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted text-sm body-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-border">
                  <div className="flex items-center gap-1.5 text-muted">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-xs">{project.location}</span>
                  </div>
                  <span className="text-xs font-medium text-primary">{project.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
