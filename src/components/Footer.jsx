import React from 'react';

const Footer = () => {
    return (
        <footer className="py-12 border-t-2 border-primary bg-gradient-to-br from-[#1a1a1a]/95 to-[#0a0a0a]/98 backdrop-blur-md text-center">
            <div className="container mx-auto px-4">
                <p className="text-sm sm:text-base font-bold text-primary">
                    © 2024 Ansh Chauhan - AI Developer Portfolio
                </p>
                <p className="text-xs sm:text-sm mt-2 text-emerald-400">
                    Building the future with artificial intelligence
                </p>
            </div>
        </footer>
    );
};

export default Footer;
