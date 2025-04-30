
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-16 px-4 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="text-2xl mb-4">▲</div>
        <h1 className="text-4xl font-semibold mb-6">
          Vercel Ship
          <sup className="inline-block bg-white text-black px-1.5 py-0.5 text-xs rounded align-super ml-1">25</sup>
        </h1>
        <nav className="flex justify-center flex-wrap gap-8 text-sm tracking-widest uppercase mb-6">
          <a href="#" className="hover:opacity-70 transition-opacity">ENTERPRISE</a>
          <a href="#" className="hover:opacity-70 transition-opacity">GET A DEMO</a>
          <a href="#" className="hover:opacity-70 transition-opacity">PRIVACY POLICY</a>
          <a href="#" className="hover:opacity-70 transition-opacity">EVENT T&CS</a>
        </nav>
        <p className="text-xs tracking-wider uppercase">© 2025 VERCEL. ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
};

export default Footer;
