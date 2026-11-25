import { useRef, useState, useCallback } from 'react';

/**
 * Custom hook for 3D mouse-tilt effect on any element.
 * Returns a ref to attach to the element and event handlers.
 * 
 * @param {Object} options
 * @param {number} options.maxTilt - Max tilt angle in degrees (default: 15)
 * @param {number} options.scale - Scale on hover (default: 1.02)
 * @param {number} options.speed - Transition speed in ms (default: 400)
 * @param {boolean} options.glare - Enable glare effect (default: true)
 */
export const useTilt = ({
  maxTilt = 15,
  scale = 1.02,
  speed = 400,
  glare = true,
} = {}) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
    transition: `transform ${speed}ms cubic-bezier(0.03,0.98,0.52,0.99)`,
  });
  const [glareStyle, setGlareStyle] = useState({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    background: 'transparent',
    pointerEvents: 'none',
    zIndex: 10,
    transition: `opacity ${speed}ms ease`,
    opacity: 0,
  });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale},${scale},${scale})`,
      transition: `transform 100ms cubic-bezier(0.03,0.98,0.52,0.99)`,
    });

    if (glare) {
      const glareAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
      const glareOpacity = Math.min(
        (Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) / Math.max(centerX, centerY)) * 0.4,
        0.4
      );
      setGlareStyle((prev) => ({
        ...prev,
        background: `linear-gradient(${glareAngle}deg, rgba(255,255,255,${glareOpacity}) 0%, transparent 80%)`,
        opacity: 1,
      }));
    }
  }, [maxTilt, scale, glare]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: `transform ${speed}ms cubic-bezier(0.03,0.98,0.52,0.99)`,
    });
    if (glare) {
      setGlareStyle((prev) => ({
        ...prev,
        opacity: 0,
      }));
    }
  }, [speed, glare]);

  return {
    ref,
    tiltStyle: style,
    glareStyle,
    tiltHandlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
};

export default useTilt;
