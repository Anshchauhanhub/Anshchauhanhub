import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Brain, Send } from 'lucide-react';

const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} className="mr-3" /> },
    { name: 'Projects', path: '/projects', icon: <Brain size={18} className="mr-3" /> },
    { name: 'Contact', path: '/contact', icon: <Send size={18} className="mr-3" /> },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const closeMenu = () => {
        if (isOpen) {
            setIsOpen(false);
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isOpen) {
                closeMenu();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, item) => {
        closeMenu();
        if (item.name === 'Home' && location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const isItemActive = (item) => {
        if (item.name === 'Projects') return location.pathname === '/projects';
        if (item.name === 'Contact') return location.pathname === '/contact';
        if (item.name === 'Home') return location.pathname === '/';
        return false;
    };

    return (
        <>
            <header 
                className={`fixed top-0 left-0 right-0 z-[100] py-3 transition-all duration-500 border-b ${
                    scrolled 
                        ? 'bg-[#0a0a0a]/90 border-emerald-500/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(52,211,153,0.05)]' 
                        : 'bg-black/60 border-white/5 backdrop-blur-md'
                }`}
                style={{
                    transform: 'perspective(1000px) translateZ(20px)',
                    transformStyle: 'preserve-3d',
                }}
            >
                <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center">
                    <Link 
                        to="/" 
                        onClick={() => {
                            closeMenu();
                            if (location.pathname === '/') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="flex flex-col group cursor-pointer"
                        style={{ transform: 'translateZ(10px)' }}
                    >
                        <h1 className="text-xl font-orbitron font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight">
                            Ansh Chauhan
                        </h1>
                        <p className="text-[0.6rem] sm:text-xs text-slate-400 group-hover:text-slate-300 transition-colors mt-0.5">
                            AI Developer & ML Engineer
                        </p>
                    </Link>

                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
                            {navItems.map((item) => {
                                const active = isItemActive(item);
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={(e) => handleNavClick(e, item)}
                                        className={`relative font-orbitron text-xs lg:text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 ${
                                            active
                                                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                                                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                                        }`}
                                        style={{ transform: 'translateZ(5px)' }}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <button 
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            className="md:hidden flex items-center justify-center w-10 h-10 bg-black/90 border border-secondary rounded-xl text-primary hover:bg-zinc-900 transition-all z-[150]"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Slide Menu */}
            <div className={`fixed top-0 right-0 w-[280px] h-screen bg-gradient-to-br from-slate-900/98 to-zinc-950/98 z-[200] transition-all duration-400 border-l border-zinc-700 backdrop-blur-2xl ${isOpen ? 'translate-x-0 shadow-[-10px_0_40px_rgba(0,0,0,0.8)]' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-5 bg-zinc-900/50 border-b border-zinc-800">
                    <h3 className="font-orbitron font-bold text-lg text-white">Navigation</h3>
                    <button onClick={toggleMenu} className="w-10 h-10 bg-zinc-800/80 border border-zinc-700 rounded-xl text-white flex items-center justify-center hover:bg-zinc-700 transition-all">
                        <X size={20} />
                    </button>
                </div>
                <nav className="p-6 flex flex-col gap-3">
                    {navItems.map((item) => {
                        const active = isItemActive(item);
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={(e) => handleNavClick(e, item)}
                                className={`flex items-center text-sm font-orbitron font-semibold p-4 rounded-xl border transition-all ${
                                    active
                                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.15)] translate-x-1'
                                        : 'bg-zinc-900/30 border-zinc-800 text-slate-300 hover:bg-zinc-800/50 hover:text-white hover:translate-x-1'
                                }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Overlay */}
            <div 
                onClick={closeMenu}
                className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[180] transition-all duration-400 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
            />
        </>
    );
};

export default Navbar;
