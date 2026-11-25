import React, { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Neural network wireframe globe component
function NeuralGlobe({ count = 200, radius = 2.2, mouseRef }) {
    const groupRef = useRef();
    const instancedMeshRef = useRef();

    // Generate points on sphere using Fibonacci distribution & calculate connections
    const { points, lineGeometry, pointsGeometry } = useMemo(() => {
        const pts = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2;
            const r = Math.sqrt(Math.max(0, 1 - y * y));
            const theta = phi * i;

            const x = Math.cos(theta) * r;
            const z = Math.sin(theta) * r;

            pts.push(new THREE.Vector3(x * radius, y * radius, z * radius));
        }

        // Distance threshold for neural network connections
        const maxDist = (radius * 4.4) / Math.sqrt(count);
        const lineCoords = [];

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = pts[i].distanceTo(pts[j]);
                if (dist < maxDist) {
                    lineCoords.push(
                        pts[i].x, pts[i].y, pts[i].z,
                        pts[j].x, pts[j].y, pts[j].z
                    );
                }
            }
        }

        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute(
            'position',
            new THREE.BufferAttribute(new Float32Array(lineCoords), 3)
        );

        const pointCoords = new Float32Array(count * 3);
        pts.forEach((p, idx) => {
            pointCoords[idx * 3] = p.x;
            pointCoords[idx * 3 + 1] = p.y;
            pointCoords[idx * 3 + 2] = p.z;
        });

        const ptsGeo = new THREE.BufferGeometry();
        ptsGeo.setAttribute('position', new THREE.BufferAttribute(pointCoords, 3));

        return {
            points: pts,
            lineGeometry: lineGeo,
            pointsGeometry: ptsGeo,
        };
    }, [count, radius]);

    // Position small spheres at each vertex using InstancedMesh for performance
    useEffect(() => {
        if (!instancedMeshRef.current) return;
        const dummy = new THREE.Object3D();
        points.forEach((pos, i) => {
            dummy.position.copy(pos);
            dummy.scale.setScalar(1);
            dummy.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
        });
        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }, [points]);

    // React to mouse movement: smoothly tilt toward cursor
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        mouseRef.current.x = THREE.MathUtils.damp(
            mouseRef.current.x,
            mouseRef.current.targetX,
            4,
            delta
        );
        mouseRef.current.y = THREE.MathUtils.damp(
            mouseRef.current.y,
            mouseRef.current.targetY,
            4,
            delta
        );

        groupRef.current.rotation.x = -mouseRef.current.y * 0.35;
        groupRef.current.rotation.z = -mouseRef.current.x * 0.25;
    });

    // Cleanup geometries on unmount / change
    useEffect(() => {
        return () => {
            lineGeometry.dispose();
            pointsGeometry.dispose();
        };
    }, [lineGeometry, pointsGeometry]);

    return (
        <group ref={groupRef}>
            {/* Subtle inner wireframe sphere */}
            <mesh>
                <sphereGeometry args={[radius * 0.99, 16, 16]} />
                <meshBasicMaterial
                    wireframe
                    color="rgb(52, 211, 153)"
                    transparent
                    opacity={0.06}
                    depthWrite={false}
                />
            </mesh>

            {/* Neural network lines connecting nearby vertices */}
            <lineSegments geometry={lineGeometry}>
                <lineBasicMaterial
                    color="rgb(52, 211, 153)"
                    transparent
                    opacity={0.32}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>

            {/* Small solid spheres at each vertex */}
            <instancedMesh
                ref={instancedMeshRef}
                args={[null, null, points.length]}
            >
                <sphereGeometry args={[radius > 2 ? 0.035 : 0.028, 12, 12]} />
                <meshBasicMaterial
                    color="rgb(52, 211, 153)"
                    toneMapped={false}
                />
            </instancedMesh>

            {/* Glowing emerald halos at each vertex */}
            <points geometry={pointsGeometry}>
                <pointsMaterial
                    size={radius > 2 ? 0.12 : 0.09}
                    color="rgb(52, 211, 153)"
                    transparent
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    sizeAttenuation={true}
                />
            </points>
        </group>
    );
}

const Hero = () => {
    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseRef.current.targetX = (clientX / innerWidth) * 2 - 1;
            mouseRef.current.targetY = -(clientY / innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const vertexCount = isMobile ? 100 : 200;
    const globeRadius = isMobile ? 1.7 : 2.2;

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center z-10 relative px-4 overflow-hidden bg-black">
            {/* 3D Rotating Wireframe / Neural Network Globe */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Suspense fallback={<div className="w-full h-full bg-black" />}>
                    <Canvas
                        camera={{ position: [0, 0, 5.5], fov: 45 }}
                        dpr={[1, 2]}
                        gl={{ antialias: true, alpha: true }}
                        className="w-full h-full"
                    >
                        <ambientLight intensity={0.5} />
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            enableRotate={false}
                            autoRotate
                            autoRotateSpeed={0.8}
                        />
                        <NeuralGlobe
                            count={vertexCount}
                            radius={globeRadius}
                            mouseRef={mouseRef}
                        />
                    </Canvas>
                </Suspense>
            </div>

            <div className="container mx-auto relative z-10 pointer-events-auto">
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
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer group z-20 pointer-events-auto"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <p className="text-[10px] uppercase tracking-[0.6em] mb-2 font-black text-emerald-400">Explore</p>
                <div className="w-[2px] h-10 bg-white/10 rounded-full relative overflow-hidden">
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
