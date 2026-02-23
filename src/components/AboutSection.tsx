"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import '../styles/AboutSection.css';

interface AnimatedCardProps {
    children: React.ReactNode;
    rotateStart?: number;
    rotateEnd?: number;
}

const AnimatedCard = ({ children, rotateStart = -5, rotateEnd = 5 }: AnimatedCardProps) => {
    const cardRef = useRef(null);

    // Track scroll progress of this specific card
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"] // From when card enters bottom to when it exits top
    });

    // Map scroll progress to rotation
    // When card is at center of viewport (0.5), rotation is 0
    // When entering/exiting, rotation is tilted
    const rotate = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [rotateStart, 0, 0, rotateEnd]
    );

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.6, 1, 1, 0.6]
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0.96, 1, 1, 0.96]
    );

    return (
        <motion.div
            ref={cardRef}
            style={{ rotate, opacity, scale }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
};

const AboutSection = () => {
    return (
        <section className="about-section">

            <div className="about-cards-container">
                {/* Bio Card */}
                <AnimatedCard rotateStart={-10} rotateEnd={10}>
                    <SpotlightCard className="about-card about-card-bio">
                        <div className="card-content">
                            <h3 className="card-title">Bio</h3>
                            <p className="card-text">
                                21 years old
                                Frontend-Focused Full Stack Developer,Building digital products
                                at the intersection of
                                Design & Code.
                            </p>
                            <p className="card-text">
                                Based in Assam, India
                            </p>
                        </div>
                    </SpotlightCard>
                </AnimatedCard>

                {/* Personal Story Card - Wider */}
                <AnimatedCard rotateStart={5} rotateEnd={-5}>
                    <SpotlightCard className="about-card about-card-story">
                        <div className="card-content">
                            <h3 className="card-title">Personal Story</h3>
                            <p className="card-text">
                                I first discovered web development around 2023, but fully committed to it in July 2025. I began actively contributing on GitHub in January 2026 and have since focused on building real projects to strengthen my fundamentals and practical skills.</p>

                            <p className="card-text">
                                My primary stack includes React, Next.js, JavaScript, and Tailwind CSS. I'm actively improving my TypeScript and backend development skills, working with authentication systems, Supabase, Prisma, and secure API integrations.</p>

                            <p className="card-text">I'm looking for an internship or junior role where I can contribute, learn fast, and grow within a product-focused engineering team.</p>

                        </div>
                    </SpotlightCard>
                </AnimatedCard>

                {/* Connect Card */}
                <AnimatedCard rotateStart={-4} rotateEnd={4}>
                    <SpotlightCard className="about-card about-card-connect">
                        <div className="card-content">
                            <h3 className="card-title">Connect</h3>
                            <p className="card-text">
                                I'm always open to interesting projects and collaborations.
                            </p>
                            <div className="connect-links">
                                <a href="mailto:madhurjyaray.business@gmail.com" className="connect-link">madhurjyaray.business@gmail.com</a>
                                <a href="https://github.com/madhurjyaray394" className="connect-link">GitHub</a>
                                <a href="https://www.linkedin.com/in/madhurjya-ray-93a880268" className="connect-link">LinkedIn</a>
                                <a href="https://www.instagram.com/madhurjya.dev/" className="connect-link">Instagram</a>
                            </div>
                        </div>
                    </SpotlightCard>
                </AnimatedCard>
            </div>
        </section>
    );
};

export default AboutSection;
