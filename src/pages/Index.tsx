
import React from 'react';
import HeroSection from '../components/HeroSection';
import ExpectSection from '../components/ExpectSection';
import FeaturedSpeakers from '../components/FeaturedSpeakers';
import FeaturedSessions from '../components/FeaturedSessions';
import GetTicketsCTA from '../components/GetTicketsCTA';
import FAQSection from '../components/FAQSection';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <div className="relative">
      {/* Navbar is now fixed position and appears above all content */}
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <ExpectSection />
      <div id="speakers">
        <FeaturedSpeakers />
      </div>
      <div id="sessions">
        <FeaturedSessions />
      </div>
      <GetTicketsCTA />
      <FAQSection />
    </div>
  );
};

export default Index;
