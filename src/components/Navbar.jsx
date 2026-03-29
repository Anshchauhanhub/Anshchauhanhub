import React, { useState, useEffect } from 'react';
import { Menu, X, User, Shield } from 'lucide-react'; // Using lucide for clean modern icons

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isOpen) {
                setIsOpen(false);
                document.body.style.overflow = 'auto';
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[100] py-2 bg-gradient-to-br from-[#1a1a1a]/95 to-[#0a0a0a]/98 border-b-2 border-primary backdrop-blur-md">
                <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-orbitron font-bold text-primary">Ansh Chauhan</h1>
                        <p className="text-[0.6rem] sm:text-xs text-secondary mt-0.5">AI Developer & ML Engineer</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex gap-6">
                            {['Projects', 'About', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-primary hover:text-secondary font-semibold text-sm transition-all duration-300 px-3 py-1 hover:bg-zinc-900/20 rounded"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>

                        <button 
                            onClick={toggleMenu}
                            className="md:hidden flex items-center justify-center w-10 h-10 bg-black/90 border border-secondary rounded-md text-primary hover:bg-zinc-900 transition-all z-[150]"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Slide Menu */}
            <div className={`fixed top-0 right-0 w-[280px] h-screen bg-gradient-to-br from-slate-900/98 to-zinc-950/95 z-[200] transition-all duration-400 border-l-2 border-zinc-700 backdrop-blur-xl ${isOpen ? 'translate-x-0 shadow-[-5px_0_25px_rgba(0,0,0,0.5)]' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 bg-zinc-900/30 border-b border-zinc-700/30">
                    <h3 className="font-orbitron font-bold text-lg text-white">Menu</h3>
                    <button onClick={toggleMenu} className="w-10 h-10 bg-zinc-800/80 border border-zinc-400/80 rounded-md text-white flex items-center justify-center hover:bg-zinc-700 transition-all">
                        <X size={20} />
                    </button>
                </div>
                <nav className="p-8 flex flex-col gap-3">
                    {[
                        { name: 'Projects', icon: <Menu size={18} className="mr-3" />, id: '#projects' },
                        { name: 'About', icon: <User size={18} className="mr-3" />, id: '#about' },
                        { name: 'Contact', icon: <Shield size={18} className="mr-3" />, id: '#contact' }
                    ].map((item) => (
                        <a
                            key={item.name}
                            href={item.id}
                            onClick={toggleMenu}
                            className="flex items-center text-primary font-semibold text-lg p-4 bg-zinc-900/10 border border-zinc-700/20 rounded-xl hover:bg-zinc-800/30 hover:translate-x-2 transition-all"
                        >
                            {item.icon}
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Overlay */}
            <div 
                onClick={toggleMenu}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[180] transition-all duration-400 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
            />
        </>
    );
};

export default Navbar;
