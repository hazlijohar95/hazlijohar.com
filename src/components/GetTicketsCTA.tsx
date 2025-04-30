
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const GetTicketsCTA = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = 50 * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Wave properties - simplified on mobile for better performance
    const waves = {
      y: canvas.height / (2 * (window.devicePixelRatio || 1)),
      length: isMobile ? 0.015 : 0.01,
      amplitude: isMobile ? 8 : 12,
      frequency: isMobile ? 0.015 : 0.01
    };
    
    let increment = waves.frequency;
    let animationFrameId: number;
    let lastTimestamp: number;
    
    // Optimized animation function with throttling for mobile
    const animate = (timestamp: number) => {
      // Skip frames on mobile for better performance
      if (isMobile && lastTimestamp && timestamp - lastTimestamp < 32) { // ~30fps on mobile
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      lastTimestamp = timestamp;
      
      // Throttle animation when not visible
      if (document.visibilityState === 'hidden' || !document.contains(canvas)) {
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the waves - simplified on mobile
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      // First wave
      const step = isMobile ? 2 : 1; // Less detailed on mobile
      for (let i = 0; i <= canvas.offsetWidth; i += step) {
        ctx.lineTo(
          i, 
          waves.y + Math.sin(i * waves.length + increment) * waves.amplitude
        );
      }
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Second wave - slightly offset (skip on low-end devices)
      if (!isMobile || window.deviceMemory === undefined || window.deviceMemory > 2) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let i = 0; i <= canvas.offsetWidth; i += step) {
          ctx.lineTo(
            i, 
            waves.y + Math.sin(i * waves.length + increment * 1.5) * waves.amplitude * 0.8
          );
        }
        
        // Fill the area below the wave
        ctx.lineTo(canvas.offsetWidth, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
      }
      
      // Moving the waves
      increment += waves.frequency;
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);
  
  return (
    <section id="contact" className="bg-black py-16 sm:py-20 md:py-32 px-4 md:px-8 flex justify-center items-center">
      <div className="max-w-[720px] w-full relative overflow-hidden group">
        <div className="text-white text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-3 sm:mb-4">Let's get started</h2>
          <p className="text-base sm:text-lg opacity-80 font-mono">👋 Begin your journey with ACME — no hard sell, just good advice.</p>
        </div>
        <Link 
          to="/contact" 
          className="bg-white text-black text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-semibold tracking-tight px-6 py-4 sm:px-8 sm:py-6 md:px-16 md:py-8 w-full inline-flex items-center justify-between hover:scale-[1.03] transition-transform duration-300 ease-in-out mobile-tap-target"
          aria-label="Book a free call"
        >
          Book A Free Call
          <span className="text-[28px] sm:text-[36px] md:text-[48px]">→</span>
        </Link>
        <div className="absolute -bottom-[10px] left-0 w-full h-[50px] overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full absolute bottom-0 left-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100 mobile-optimize" 
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default GetTicketsCTA;
