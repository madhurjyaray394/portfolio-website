'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KanbanSquare, MessageSquare, Box } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const steps = [
    {
        id: "01",
        title: "Queueing",
        description: "Add your requests to Trello. We focus on one major feature or page at a time.",
        icon: <KanbanSquare className="w-12 h-12" />,
        tools: ["Trello"],
        theme: "yellow",
        gradient: "from-yellow-300 to-orange-400",
        textColor: "text-neutral-900",
        descriptionColor: "text-neutral-800/80",
        badgeColor: "bg-black/10 text-black border-black/10"
    },
    {
        id: "02",
        title: "Real-time Comms",
        description: "Standard generic updates via Slack. We keep the project moving efficiently.",
        icon: <MessageSquare className="w-12 h-12" />,
        tools: ["Slack", "Figma"],
        theme: "purple",
        gradient: "from-indigo-500 via-purple-500 to-indigo-600",
        textColor: "text-white",
        descriptionColor: "text-white/80",
        badgeColor: "bg-white/10 text-white border-white/20"
    },
    {
        id: "03",
        title: "Delivery",
        description: "Code is pushed to a staging environment (Vercel) for your review.",
        icon: <Box className="w-12 h-12" />,
        tools: ["Vercel", "Next.js"],
        theme: "rose",
        gradient: "from-rose-500 via-pink-500 to-red-500",
        textColor: "text-white",
        descriptionColor: "text-white/80",
        badgeColor: "bg-white/10 text-white border-white/20"
    }
];

export default function Collaboration() {
    return (
        <section className="py-24 md:py-32 px-8 lg:px-24 bg-black text-white relative border-t border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-20 space-y-6 max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-7xl font-serif italic tracking-tight"
                    >
                        Hire as Freelancer?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-neutral-400 font-light max-w-2xl leading-relaxed"
                    >
                        One active request at a time to ensure 100% focus and high-end output.
                    </motion.p>
                </div>

                {/* Steps Grid - Designjoy Style Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <CollabCard key={step.id} step={step} index={i} total={steps.length} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 flex justify-center"
                >
                    <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-3xl font-bold text-lg hover:bg-neutral-200 transition-all">
                        <span>Book a call</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

// Mobile-only sticky card component — preserves all original content/structure
function CollabCard({ step, index, total }: { step: any, index: number, total?: number }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const top = `calc(100px + ${index * 30}px)`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full rounded-[2.5rem] bg-gradient-to-br ${step.gradient} p-6 md:p-10 flex flex-col justify-between overflow-hidden group hover:scale-[1.02] transition-transform duration-500 ${isMobile ? 'h-[360px]' : 'aspect-[4/5]'}`}
            style={{
                position: isMobile ? 'sticky' : undefined,
                top: isMobile ? top : undefined,
                zIndex: isMobile ? index + 1 : undefined
            }}
        >
            {/* Keep all original markup and classes exactly as before */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
                <span className={`text-lg font-bold font-mono ${step.badgeColor.replace('bg-', 'text-').split(' ')[1] || step.textColor}`}>
                    {step.id}
                </span>

                <div className={`w-20 h-20 rounded-2xl ${step.badgeColor} backdrop-blur-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
                    <div className={step.textColor}>
                        {step.icon}
                    </div>
                </div>
            </div>

            <div className="relative z-10">
                <h3 className={`text-3xl lg:text-4xl font-bold mb-4 ${step.textColor} tracking-tight leading-none`}>
                    {step.title}
                </h3>
                <p className={`text-lg leading-relaxed ${step.descriptionColor} font-medium`}>
                    {step.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                    {step.tools.map((tool: string) => (
                        <span key={tool} className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${step.badgeColor}`}>
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
