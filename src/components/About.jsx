import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Brain, LineChart, Code } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import RadarChart from './RadarChart';

const About = () => {
    // Official GitHub Contribution Graph Colors (Authentic Look)
    const githubTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section id="about" className="py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 lg:px-12">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="frost-card p-6 sm:p-8 lg:p-12"
                >
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center flex items-center justify-center gap-4">
                        <User className="text-blue-400" size={32} />
                        About Me
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-white/5 pb-12 mb-12">
                        <div>
                            <h4 className="text-xl sm:text-2xl font-bold mb-4 text-primary">Hi 👋🏻, I'm Ansh Chauhan</h4>
                            <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-6 text-slate-400">
                                An AI developer passionate about machine learning, deep learning, and artificial
                                intelligence. I specialize in creating intelligent systems that solve real-world problems through
                                data-driven solutions.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="text-center p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                                    <div className="text-2xl font-black text-emerald-400">15+</div>
                                    <div className="text-xs sm:text-sm text-slate-400">AI Projects</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                                    <div className="text-2xl font-black text-blue-400">3+</div>
                                    <div className="text-xs sm:text-sm text-slate-400">Years Experience</div>
                                </div>
                            </div>

                            <ul className="space-y-3 text-xs sm:text-sm lg:text-base">
                                <li className="flex items-center gap-3"><Cpu size={18} className="text-emerald-500/50" /> AI & Machine Learning Specialist</li>
                                <li className="flex items-center gap-3"><Brain size={18} className="text-blue-500/50" /> Deep Learning & Neural Networks</li>
                                <li className="flex items-center gap-3"><LineChart size={18} className="text-emerald-500/50" /> Data Science & Analytics</li>
                                <li className="flex items-center gap-3"><Code size={18} className="text-blue-500/50" /> Python, TensorFlow, PyTorch</li>
                            </ul>
                        </div>

                        <div className="text-center relative group">
                            <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all" />
                            <img 
                                src="https://media1.giphy.com/media/RbDKaczqWovIugyJmW/giphy.gif" 
                                alt="AI Development Animation" 
                                className="w-full max-w-sm mx-auto rounded-lg shadow-2xl border-2 border-white/10 relative z-10" 
                            />
                        </div>
                    </div>


                    {/* Engineering Pulse - GitHub Stats */}
                    <div className="mt-8">
                        <h4 className="text-xl font-bold mb-8 text-center text-white/80 uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                            <Code className="text-emerald-400" size={24} />
                            Code Connectivity
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Activity Radar Graph (Custom Component) */}
                            <div className="flex items-center justify-center h-full">
                                <RadarChart 
                                    data={[
                                        { label: 'Commits', value: 92 },
                                        { label: 'Pull Requests', value: 6 },
                                        { label: 'Issues', value: 2 },
                                        { label: 'Code Review', value: 5 }
                                    ]}
                                />
                            </div>

                            {/* Streak Stats */}
                            <div className="flex items-center justify-center h-full">
                                <img 
                                    src="https://github-readme-streak-stats.herokuapp.com/?user=Anshchauhanhub&theme=dark&background=030712&border=34d39915&stroke=34d399&ring=34d399&fire=34d399&currStreakNum=ffffff&sideNums=ffffff&sideLabels=ffffff&dates=ffffff&hide_border=false&border_radius=20" 
                                    alt="GitHub Streak" 
                                    className="w-full max-w-lg rounded-2xl border border-white/5 shadow-2xl hover:border-emerald-500/30 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* GitHub Contribution Graph */}
                        <div className="mt-12 flex flex-col items-center">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="w-full flex flex-col items-center"
                            >
                                <div className="p-4 sm:p-8 rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl hover:border-emerald-500/20 transition-all duration-500 w-full max-w-4xl overflow-hidden flex justify-center">
                                    <GitHubCalendar 
                                        username="Anshchauhanhub" 
                                        theme={githubTheme}
                                        colorScheme="dark"
                                        blockSize={12}
                                        blockMargin={4}
                                        fontSize={13}
                                    />
                                </div>
                                <p className="mt-4 text-[10px] sm:text-xs text-slate-500 uppercase tracking-[0.3em] font-bold opacity-40 text-center">
                                    Contribution Calendar
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
