
import React from 'react';

const Footer = () => {
  // Minimalist HJ Logo component
  const MinimalistHJLogo = ({ className = "" }) => (
    <div className={`font-mono font-bold ${className}`}>
      <span className="tracking-tighter">H</span>
      <span className="tracking-tighter">J</span>
    </div>
  );

  return (
    <footer className="bg-black text-white text-center py-16 px-4 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-4">
          <MinimalistHJLogo className="text-5xl" />
        </div>
        <h1 className="text-3xl font-semibold mb-6">
          Hazli Johar & Co. Chartered Accountants
          <sup className="inline-block bg-white text-black px-1.5 py-0.5 text-xs rounded align-super ml-1">NF1932</sup>
        </h1>
        <nav className="flex justify-center flex-wrap gap-8 text-sm tracking-widest uppercase mb-6">
          <a href="#" className="hover:opacity-70 transition-opacity">ACCOUNTING</a>
          <a href="#" className="hover:opacity-70 transition-opacity">TECH</a>
          <a href="#" className="hover:opacity-70 transition-opacity">ADVISORY</a>
        </nav>
        <p className="text-xs tracking-wider uppercase">© 2025 HAZLI JOHAR & CO. — ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
};

export default Footer;
