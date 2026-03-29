import React from 'react';
import { motion } from 'framer-motion';

const RadarChart = ({ 
    data = [
        { label: 'Commits', value: 92 },
        { label: 'Pull Requests', value: 65 },
        { label: 'Issues', value: 45 },
        { label: 'Code Review', value: 30 }
    ],
    color = "rgba(52, 211, 153, 0.4)", // emerald-400 with opacity
    strokeColor = "rgb(52, 211, 153)",
    size = 500 // Increased from 400
}) => {
    const padding = 100; // Increased from 60
    const center = size / 2;
    const radius = center - padding;
    const numAxes = data.length;

    // Helper to calculate coordinates from value and index
    const getCoordinates = (value, index, max = 100) => {
        const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
        const normalizedValue = (value / max) * radius;
        return {
            x: center + normalizedValue * Math.cos(angle),
            y: center + normalizedValue * Math.sin(angle)
        };
    };

    // Build the data path string
    const dataPoints = data.map((d, i) => {
        const coords = getCoordinates(d.value, i);
        return `${coords.x},${coords.y}`;
    }).join(' ');

    const dataPath = `M ${data.map((d, i) => {
        const coords = getCoordinates(d.value, i);
        return `${coords.x} ${coords.y}`;
    }).join(' L ')} Z`;

    return (
        <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center p-4">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <svg 
                viewBox={`0 0 ${size} ${size}`} 
                className="w-full h-full drop-shadow-[0_0_15px_rgba(52,211,153,0.1)] overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Radar Grid Circles/Polygons */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, sIndex) => (
                    <polygon
                        key={sIndex}
                        points={data.map((_, i) => {
                            const coords = getCoordinates(100 * scale, i);
                            return `${coords.x},${coords.y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="1"
                    />
                ))}

                {/* Axis Lines */}
                {data.map((_, i) => {
                    const coords = getCoordinates(100, i);
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={coords.x}
                            y2={coords.y}
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Data Area with Animation */}
                <motion.path
                    initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                    whileInView={{ pathLength: 1, opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d={dataPath}
                    fill={color}
                    stroke={strokeColor}
                    strokeWidth="2"
                    className="backdrop-blur-sm"
                    style={{ filter: "drop-shadow(0 0 8px rgba(52, 211, 153, 0.3))" }}
                />

                {/* Data Points */}
                {data.map((d, i) => {
                    const coords = getCoordinates(d.value, i);
                    return (
                        <motion.circle
                            key={i}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                            cx={coords.x}
                            cy={coords.y}
                            r="4"
                            fill={strokeColor}
                            className="drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]"
                        />
                    );
                })}

                {/* Labels */}
                {data.map((d, i) => {
                    const coords = getCoordinates(115, i); // Offset labels slightly outside
                    const textAnchor = coords.x > center ? "start" : coords.x < center ? "end" : "middle";
                    const dy = coords.y > center ? "1em" : coords.y < center ? "-0.5em" : "0.33em";

                    return (
                        <text
                            key={i}
                            x={coords.x}
                            y={coords.y}
                            textAnchor={textAnchor}
                            dy={dy}
                            fill="#94a3b8" // slate-400
                            className="text-[14px] font-medium tracking-wider uppercase font-sans pointer-events-none"
                            style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }}
                        >
                            {d.label}
                            {/* <tspan x={coords.x} dy="1.2em" fill={strokeColor} opacity="0.8" fontSize="12px">
                                {d.value}%
                            </tspan> */}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

export default RadarChart;
