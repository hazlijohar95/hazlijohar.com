
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

// Particle system for turbulence effect
const ParticleField = ({ count = 1000, speed = 0.03, size = 0.015, color = '#ffffff' }) => {
  const isMobile = useIsMobile();
  const mesh = useRef<THREE.Points>(null!);
  const particleCount = isMobile ? Math.floor(count / 2) : count; // Reduce particles on mobile
  
  // Create particles once
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 2;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [particleCount]);

  // Animation logic - subtle turbulence
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (mesh.current) {
      // Subtle rotation
      mesh.current.rotation.x = Math.sin(time / 20) * 0.1;
      mesh.current.rotation.y = Math.cos(time / 15) * 0.05;
      
      // Access the geometry's attributes to create the turbulence effect
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Apply subtle noise-based movement to each particle
        const ix = i;
        const iy = i + 1;
        const iz = i + 2;
        
        const x = positions[ix];
        const y = positions[iy];
        const z = positions[iz];
        
        // Turbulence effect using sine waves with different frequencies
        positions[iy] = y + Math.sin(time * speed + x * 0.5) * 0.01;
        positions[iz] = z + Math.cos(time * speed + y * 0.5) * 0.01;
        positions[ix] = x + Math.sin(time * speed * 0.5 + z) * 0.01;
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          // Fix: In React Three Fiber, we need to use only args for buffer attributes
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        args={[{
          size: size,
          color: color,
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
        }]}
      />
    </points>
  );
};

const TurbulenceBackground: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        style={{ background: 'black' }}
        dpr={[1, isMobile ? 1.5 : 2]} // Lower DPR on mobile for better performance
      >
        <ParticleField 
          count={isMobile ? 800 : 1600} 
          speed={0.02}
          size={0.012}
          color="#ffffff"
        />
      </Canvas>
    </div>
  );
};

export default TurbulenceBackground;
