import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Download, Handshake, User } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 lg:px-12">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="frost-card p-6 sm:p-10 lg:p-12"
                >
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center flex items-center justify-center gap-4 text-primary">
                        <User className="text-emerald-400" size={32} />
                        Connect With Me
                    </h3>

                    <div className="bg-blue-500/10 border-2 border-slate-500/30 rounded-2xl p-8 text-center mb-12 shadow-xl">
                        <h4 className="text-lg sm:text-xl font-bold mb-4 text-zinc-400 flex items-center justify-center gap-2">
                            <Download size={24} />
                            Download My Resume
                        </h4>
                        <p className="mb-6 text-sm sm:text-base text-slate-300">Get a detailed overview of my AI development experience and projects</p>
                        <a 
                            href={`${import.meta.env.BASE_URL || '/'}Ansh-CV.pdf`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="cool-button group inline-flex items-center gap-4 px-10 py-5 rounded-2xl text-primary hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(52,211,153,0.3)] transition-all font-black text-lg md:text-xl uppercase tracking-widest border border-emerald-500/30"
                        >
                            Download CV
                            <Download className="group-hover:translate-y-1 transition-transform" size={24} />
                        </a>
                    </div>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-xl font-bold mb-6 text-primary flex items-center gap-3">
                                <Mail className="text-red-400" size={24} />
                                Get In Touch
                            </h4>
                            <div className="space-y-4">
                                <a href="mailto:chauhanansh289@gmail.com" className="flex items-center gap-4 p-4 bg-red-400/5 border border-red-500/20 rounded-xl hover:bg-red-400/10 hover:translate-x-1 transition-all">
                                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                                        <Mail className="text-red-500" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Email</div>
                                        <div className="text-xs opacity-75">chauhanansh289@gmail.com</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold mb-6 text-primary flex items-center gap-3">
                                <Handshake className="text-blue-400" size={24} />
                                Follow Me
                            </h4>
                            <div className="space-y-4">
                                {[
                                    { icon: <Github size={20} />, label: 'GitHub', sub: 'View my code repositories', link: 'https://github.com/Anshchauhanhub', color: 'bg-white/10 text-white' },
                                    { icon: <Linkedin size={20} />, label: 'LinkedIn', sub: 'Professional network', link: 'https://www.linkedin.com/in/ansh-chauhan-a0b42a28b/', color: 'bg-blue-600/10 text-blue-500' },
                                    { icon: <Twitter size={20} />, label: 'Twitter', sub: 'Latest updates & thoughts', link: 'https://x.com/AnshChauhan9333', color: 'bg-sky-500/10 text-sky-400' }
                                ].map((social) => (
                                    <a key={social.label} href={social.link} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 border border-white/10 rounded-xl hover:bg-white/5 hover:translate-x-1 transition-all`}>
                                        <div className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center`}>
                                            {social.icon}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{social.label}</div>
                                            <div className="text-xs opacity-75">{social.sub}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center max-w-2xl mx-auto">
                        <h4 className="text-lg font-bold mb-4 text-zinc-400 flex items-center justify-center gap-2">
                            <Handshake size={20} />
                            Let's Collaborate
                        </h4>
                        <p className="text-sm sm:text-base leading-relaxed text-slate-400">
                            Interested in AI development, machine learning projects, or collaboration opportunities?
                            Feel free to reach out. I'm always excited to discuss innovative AI solutions and cutting-edge technology.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
