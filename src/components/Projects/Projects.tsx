"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Camera, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/src/data/content";
import { useScrollAnimation } from "@/src/lib/useScrollAnimation";
import { fadeUp, staggerContainer, staggerItem } from "@/src/lib/motion";

const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

const filterTabs = [
  { id: "all", label: "All Projects" },
  { id: "residential", label: "Residential Construction" },
  { id: "layout", label: "Layout & Survey" },
  { id: "elevation", label: "Elevation & Design" },
] as const;

interface ProjectsProps {
  id: string;
}

export default function Projects({ id }: ProjectsProps) {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.filterCategory === activeFilter);
  }, [activeFilter]);

  const handleInquire = () => {
    setSelectedProject(null);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id={id} className="section-padding px-6 md:px-8 lg:px-12 bg-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-center mb-10 lg:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="divider-gold" />
            <span className="label-sm text-primary">OUR PORTFOLIO</span>
            <div className="divider-gold" />
          </div>
          <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Featured <span className="text-gold-gradient">Projects</span>
          </h2>
          <p className="text-muted body-lg max-w-2xl mx-auto leading-relaxed">
            Explore our residential construction, architectural elevation, and land development projects across Tamil Nadu.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.1}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-primary text-btn-text shadow-md shadow-primary/20 scale-105"
                  : "bg-surface border border-border text-muted hover:text-foreground hover:border-primary/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={staggerItem}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="group rounded-2xl sm:rounded-3xl overflow-hidden border border-border
                           bg-surface-elevated hover:border-primary/50 shadow-sm hover:shadow-xl
                           hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  {/* Image Area with consistent aspect ratio */}
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-surface">
                    <Image
                      src={project.image}
                      alt={`${project.title} - ${project.category} in ${project.location}`}
                      fill
                      quality={85}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectPosition: project.objectPosition || "center center" }}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full
                                       bg-surface/90 backdrop-blur-sm border border-border text-foreground text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Gallery Photos Count Badge */}
                    {project.gallery && new Set(project.gallery).size > 1 && (
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                                         bg-black/70 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-bold shadow-sm">
                          <Camera className="w-3 h-3 text-primary" />
                          {new Set(project.gallery).size} Photos
                        </span>
                      </div>
                    )}

                    {/* Quick View Hover Indicator */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-btn-text text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span>View Project Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Soft gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-7">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2.5 heading-md
                                 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-secondary text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 font-normal">
                      {project.description}
                    </p>

                    {/* Features Chips */}
                    {project.features && project.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.features.slice(0, 2).map((feat) => (
                          <span
                            key={feat}
                            className="inline-block px-2.5 py-0.5 rounded-md bg-surface border border-border/80 text-muted text-[11px] font-medium"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="px-5 sm:px-7 pb-5 sm:pb-6">
                  <div className="flex items-center justify-between pt-4 border-t border-border/80">
                    <div className="flex items-center gap-1.5 text-muted min-w-0 pr-2">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" strokeWidth={1.8} aria-hidden="true" />
                      <span className="text-xs font-medium text-foreground truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary flex-shrink-0">
                      <Calendar className="w-3 h-3" />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Project Details & Gallery Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquire}
      />
    </section>
  );
}

