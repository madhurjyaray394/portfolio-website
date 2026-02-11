'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard, { Project } from './ProjectCard';
import projectsData from '../data/projects-data.json';

// Type assertion for imported JSON
const projects = projectsData.projects as Project[];

export default function Projects() {
    return (
        <section
            id="projects"
            className="py-16 md:py-32 px-6 sm:px-8 lg:px-16 xl:px-24 bg-black text-white relative z-20"
        >
            <div className="max-w-[1400px] mx-auto">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-mono">
                        Selected Work
                    </h2>
                </motion.div>

                {/* Projects Grid - 2 columns on desktop, 1 on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

