import React, { useEffect, useState } from 'react';

const Particles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const createParticles = () => {
            const count = window.innerWidth <= 768 ? 20 : 50; 
            const newParticles = Array.from({ length: count }).map((_, i) => ({
                id: i,
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                delay: Math.random() * 5 + "s",
                duration: (Math.random() * 10 + 10) + "s",
                size: (Math.random() * 2 + 1) + "px"
            }));
            setParticles(newParticles);
        };

        createParticles();
        window.addEventListener('resize', createParticles);
        return () => window.removeEventListener('resize', createParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute bg-emerald-500/20 rounded-full animate-float opacity-0 translate-z-0"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                        willChange: 'transform, opacity'
                    }}
                />
            ))}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float {
                    0%, 100% { transform: translateY(0px); opacity: 0; }
                    50% { transform: translateY(-50px); opacity: 0.5; }
                }
                .animate-float { animation: float infinite ease-in-out; }
            `}} />
        </div>
    );
};

export default Particles;
