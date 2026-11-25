import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';

const HomePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            {/* 3D Hero Section */}
            <Hero />

            {/* About Me Section with 3D floating shapes */}
            <About />
        </motion.div>
    );
};

export default HomePage;
