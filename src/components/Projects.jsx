import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Network, AreaChart, Satellite, Film, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
    {
        title: "RL Radiologist",
        desc: "A multi-agent medical system that uses Reinforcement Learning to autonomously detect abnormalities in X-ray images.",
        image: "/projects/radiologist.png",
        link: "https://huggingface.co/spaces/Ansh99/X-Rays_Radiologist",
        icon: <Brain className="text-emerald-400" size={24} />
    },
    {
        title: "NeuroVaidya AI",
        desc: "Full-stack Ayurvedic platform bridging traditional medicine with modern Generative AI. Features a fine-tuned Medical LLM and a personalized health recommendation engine.",
        image: "/projects/neurovaidya.png",
        link: "https://github.com/Anshchauhanhub/NeuroVaidya",
        icon: <Brain className="text-emerald-400" size={24} />
    },
    {
        title: "Axiom AI",
        desc: "Next-gen agentic learning platform utilizing LangGraph for goal-tracking and mastery verification through AI-generated MCQ gates and Telegram integration.",
        image: "/projects/axiom.png",
        link: "https://github.com/Anshchauhanhub/Axiom",
        icon: <Network className="text-blue-400" size={24} />
    },
    {
        title: "Skin-Acne Analysis",
        desc: "AI-powered skincare tool providing personalized treatment recommendations based on image analysis.",
        image: "/projects/skin.png",
        link: "https://acne-analysis-model-adtzbokgpsv8gcnv6zhark.streamlit.app/",
        icon: <Network className="text-blue-400" size={24} />
    },
    {
        title: "Sentiment Analysis",
        desc: "Intelligent conversational AI system powered by large language models and natural language understanding.",
        image: "/projects/sentiment.png",
        link: "https://reviewradar-ansh.streamlit.app/",
        icon: <AreaChart className="text-purple-400" size={24} />
    },
    {
        title: "SpaceObject Detection",
        desc: "A real-time safety system for spacecraft environments to locate critical tools instantly.",
        image: "/projects/space.png",
        link: "https://github.com/Anshchauhanhub/SpaceObject-detection",
        icon: <Satellite className="text-emerald-400" size={24} />
    },
    {
        title: "Movie Recommender",
        desc: "Content-based recommendation engine for personalized movie discovery and suggestions.",
        image: "/projects/movie.png",
        link: "https://acne-analysis-model-adtzbokgpsv8gcnv6zhark.streamlit.app/",
        icon: <Film className="text-red-400" size={24} />
    }
];

const Projects = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection) => {
        const nextPage = (page + newDirection + projects.length) % projects.length;
        setPage([nextPage, newDirection]);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)"
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)"
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)"
        })
    };

    return (
        <section id="projects" className="relative h-screen bg-black flex flex-col items-center overflow-hidden py-12 md:py-20 lg:py-16">
            
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Section Header - Explicit spacing to guard against overlap */}
            <div className="pt-8 md:pt-6 pb-2 text-center z-[50] w-full shrink-0">
                <h3 className="text-3xl md:text-5xl font-black text-white font-orbitron tracking-tighter uppercase leading-none">
                    AI <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Portfolio</span>
                </h3>
            </div>

            {/* Carousel Container - Larger margin-top to separate cards from the title */}
            <div className="relative w-full max-w-7xl flex-1 flex items-center justify-center mt-12 mb-4 overflow-visible">
                
                {/* Side Navigation Arrows */}
                <ProjectArrow 
                    direction="left" 
                    onClick={() => paginate(-1)} 
                />
                
                <ProjectArrow 
                    direction="right" 
                    onClick={() => paginate(1)} 
                />

                <div className="w-full h-full relative flex items-center justify-center px-4">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 },
                                filter: { duration: 0.4 }
                            }}
                            className="absolute w-full max-w-6xl flex items-center justify-center p-2"
                        >
                            <ProjectDisplay project={projects[page]} index={page} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="z-20 flex gap-4 mt-4 mb-4 shrink-0">
                {projects.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage([i, i > page ? 1 : -1])}
                        className={`group relative h-2 transition-all duration-300 rounded-full ${i === page ? 'w-12 bg-emerald-400' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                    >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            0{i + 1}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
};

const ProjectArrow = ({ direction, onClick }) => {
    const isLeft = direction === "left";
    return (
        <button
            onClick={onClick}
            className={`absolute ${isLeft ? 'left-2 md:left-8' : 'right-2 md:right-8'} top-1/2 -translate-y-1/2 z-[100] p-4 md:p-6 rounded-full border border-white/5 bg-black/40 backdrop-blur-xl text-white/50 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group active:scale-95`}
        >
            {isLeft ? <ChevronLeft size={36} className="group-hover:-translate-x-1 transition-transform" /> : <ChevronRight size={36} className="group-hover:translate-x-1 transition-transform" />}
        </button>
    );
};

const ProjectDisplay = ({ project, index }) => {
    return (
        <div className="bg-[#0a0a0a] flex flex-col md:flex-row gap-8 items-stretch border border-white/10 rounded-[2.5rem] shadow-[0_0_120px_rgba(0,0,0,1)] w-full max-h-[65vh] md:max-h-[62vh] lg:max-h-[60vh] overflow-y-auto md:overflow-hidden backdrop-blur-2xl group relative">
            
            {/* Index Number Background */}
            <div className="absolute top-4 right-8 text-9xl font-black text-white/[0.02] select-none font-orbitron pointer-events-none">
                0{index + 1}
            </div>

            {/* Media Area */}
            <div className="w-full md:w-1/2 h-[300px] md:h-[500px] overflow-hidden relative">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Area */}
            <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative">
                <div className="mb-6">
                    <div className="inline-flex p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 text-emerald-400 mb-6 transition-transform duration-500 hover:scale-105">
                        {project.icon}
                    </div>
                    <h4 className="text-3xl md:text-5xl font-black text-white font-orbitron tracking-tight uppercase leading-tight">
                        {project.title}
                    </h4>
                </div>
                
                <div className="h-1 w-20 bg-emerald-500/40 mb-8 rounded-full" />

                <p className="mb-10 text-slate-300 leading-relaxed text-sm md:text-lg font-medium">
                    {project.desc}
                </p>

                <div className="flex flex-wrap gap-4 mt-auto">
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none"
                    >
                        <button className="cool-button group px-10 py-5 rounded-2xl text-primary hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(52,211,153,0.3)] transition-all flex items-center justify-center font-black text-lg md:text-xl uppercase tracking-widest border border-emerald-500/20 w-full">
                            Launch Project
                            <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={28} />
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Projects;
