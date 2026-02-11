"use client";

import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import MediaGrid, { MediaItem } from './MediaGrid';
import './ProjectCard.css';

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    media: MediaItem[];
    projectUrl?: string; // for future routing
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Spotlight effect - track mouse position
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            cardRef.current.style.setProperty('--mouse-x', `${x}px`);
            cardRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="project-card"
        >
            {/* Arrow Button - Top Right Corner */}
            {project.projectUrl && (
                <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-arrow"
                    aria-label={`Visit ${project.title}`}
                >
                    <ArrowUpRight className="arrow-icon" />
                </a>
            )}

            {/* Project Info Section */}
            <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Tech Stack Tags */}
                <div className="tech-stack">
                    {project.techStack.map((tech, index) => (
                        <span key={index} className="tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Media Grid Section */}
            <div className="project-media">
                <MediaGrid media={project.media} />
            </div>
        </div>
    );
};

export default ProjectCard;
