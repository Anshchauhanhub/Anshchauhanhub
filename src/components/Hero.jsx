import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center z-10 relative px-4 overflow-hidden bg-black">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-orbitron leading-tight text-white tracking-tighter uppercase">
                        AI Developer & 
                        <span className="block mt-2 text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                            ML Engineer
                        </span>
                    </h2>
                </motion.div>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-4xl mx-auto mt-10 text-sm sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-400 font-medium italic opacity-80"
                >
                    Specializing in Artificial Intelligence and Machine Learning to create
                    intelligent, scalable solutions that transform the future.
                </motion.p>
            </div>

            {/* Subtle Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer group"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <p className="text-[10px] uppercase tracking-[0.6em] mb-3 font-black text-emerald-400">Scroll</p>
                <div className="w-[2px] h-12 bg-white/10 rounded-full relative overflow-hidden">
                    <motion.div 
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 w-full h-1/2 bg-emerald-400 shadow-[0_0_10px_#10b981]"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
