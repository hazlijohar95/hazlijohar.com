
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const GetTicketsCTA = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 50; // Height of the water animation
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
    };
    
    window.addEventListener('resize', resize);
    
    // Wave properties
    const waves = {
      y: canvas.height / 2,
      length: 0.01,
      amplitude: 12,
      frequency: 0.01
    };
    
    let increment = waves.frequency;
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Throttle animation to improve performance
      if (document.visibilityState === 'hidden') return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      
      // Draw the waves
      ctx.moveTo(0, canvas.height);
      
      // First wave - slower
      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(
          i, 
          waves.y + Math.sin(i * waves.length + increment) * waves.amplitude
        );
      }
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Second wave - faster, slightly offset
      ctx.beginPath();
      ctx.moveTo(0, canvas.width);
      
      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(
          i, 
          waves.y + Math.sin(i * waves.length + increment * 1.5) * waves.amplitude * 0.8
        );
      }
      
      // Fill the area below the wave
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fill();
      
      // Moving the waves
      increment += waves.frequency;
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <section id="contact" className="bg-black py-32 px-8 flex justify-center items-center">
      <div className="max-w-[720px] w-full relative overflow-hidden group">
        <div className="text-white text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Let's get started</h2>
          <p className="text-lg opacity-80 font-mono">👋 Begin your journey with Hazli Johar & Co. — no hard sell, just good advice.</p>
        </div>
        <Link 
          to="/contact" 
          className="bg-white text-black text-[48px] md:text-[64px] font-semibold tracking-tight px-16 py-8 w-full inline-flex items-center justify-between hover:scale-[1.03] transition-transform duration-300 ease-in-out"
          aria-label="Book a free call"
        >
          Book A Free Call
          <span className="text-[48px]">→</span>
        </Link>
        <div className="absolute -bottom-[10px] left-0 w-full h-[50px] overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full absolute bottom-0 left-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100" 
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default GetTicketsCTA;
