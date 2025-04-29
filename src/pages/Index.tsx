
import React from 'react';
import HeroSection from '../components/HeroSection';
import ExpectSection from '../components/ExpectSection';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <div className="relative">
      {/* Navbar is now fixed position and appears above all content */}
      <Navbar />
      <HeroSection />
      <ExpectSection />
    </div>
  );
};

export default Index;
