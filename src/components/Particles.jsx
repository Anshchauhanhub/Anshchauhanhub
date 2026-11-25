import React, { Suspense, useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';

function Starfield({ count = 2000 }) {
    const pointsRef = useRef();

    // Generate ~count points spread in [-50, 50] on each axis
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            arr[i3] = (Math.random() - 0.5) * 100;
            arr[i3 + 1] = (Math.random() - 0.5) * 100;
            arr[i3 + 2] = (Math.random() - 0.5) * 100;
        }
        return arr;
    }, [count]);

    // Emerald-ish white colors (mix of crisp diamond white and delicate emerald tints)
    const colors = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const rand = Math.random();
            if (rand < 0.40) {
                // Crisp white with faint emerald hint
                arr[i3] = 0.94 + Math.random() * 0.06;
                arr[i3 + 1] = 1.0;
                arr[i3 + 2] = 0.95 + Math.random() * 0.05;
            } else if (rand < 0.70) {
                // Soft pale emerald (mint white)
                arr[i3] = 0.80 + Math.random() * 0.12;
                arr[i3 + 1] = 0.98 + Math.random() * 0.02;
                arr[i3 + 2] = 0.88 + Math.random() * 0.08;
            } else if (rand < 0.88) {
                // Glowing emerald accent
                arr[i3] = 0.35 + Math.random() * 0.20;
                arr[i3 + 1] = 0.92 + Math.random() * 0.08;
                arr[i3 + 2] = 0.65 + Math.random() * 0.20;
            } else {
                // Pure diamond white
                arr[i3] = 1.0;
                arr[i3 + 1] = 1.0;
                arr[i3 + 2] = 1.0;
            }
        }
        return arr;
    }, [count]);

    // Varying particle sizes stored in a dedicated size attribute buffer
    const sizes = useMemo(() => {
        const arr = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const rand = Math.random();
            if (rand < 0.70) {
                // Fine celestial dust / small stars
                arr[i] = 0.08 + Math.random() * 0.12;
            } else if (rand < 0.93) {
                // Medium stars
                arr[i] = 0.20 + Math.random() * 0.15;
            } else {
                // Prominent glowing stars
                arr[i] = 0.35 + Math.random() * 0.25;
            }
        }
        return arr;
    }, [count]);

    // Slow gentle drift and 3D rotation of the entire star group
    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.02;
            pointsRef.current.rotation.x += delta * 0.008;
            pointsRef.current.rotation.z += delta * 0.004;
        }
    });

    // Custom shader modification:
    // 1. Reads per-particle `size` attribute instead of single uniform size
    // 2. Soft anti-aliased circular point rendering instead of square pixels
    const onBeforeCompile = useCallback((shader) => {
        shader.vertexShader = shader.vertexShader
            .replace('uniform float size;', 'attribute float size;')
            .replace(
                '#include <logdepthbuf_vertex>',
                `gl_PointSize = clamp(gl_PointSize, 0.8, 20.0);
                #include <logdepthbuf_vertex>`
            );

        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <color_fragment>',
            `#include <color_fragment>
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            float r = dot(cxy, cxy);
            if (r > 1.0) discard;
            float mask = 1.0 - smoothstep(0.2, 1.0, r);
            diffuseColor.a *= mask;`
        );
    }, []);

    const customProgramCacheKey = useCallback(() => 'starfield-point-material-v1', []);

    return (
        <points key={count} ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={sizes.length}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={1.0}
                vertexColors
                transparent
                depthWrite={false}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                onBeforeCompile={onBeforeCompile}
                customProgramCacheKey={customProgramCacheKey}
            />
        </points>
    );
}

const Particles = () => {
    const [particleCount, setParticleCount] = useState(() => {
        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
            return 1000;
        }
        return 2000;
    });

    useEffect(() => {
        // Detect once on mount
        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
            setParticleCount(1000);
        }
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black" aria-hidden="true">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 200 }}
                gl={{
                    antialias: false,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
            >
                <color attach="background" args={['#000000']} />
                <fogExp2 attach="fog" args={['#000000', 0.015]} />
                <Suspense fallback={null}>
                    <Starfield count={particleCount} />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Particles;
