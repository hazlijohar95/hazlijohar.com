
import React from 'react';
import HeroSection from '../components/HeroSection';
import ExpectSection from '../components/ExpectSection';
import FeaturedSpeakers from '../components/FeaturedSpeakers';
import FeaturedSessions from '../components/FeaturedSessions';
import GetTicketsCTA from '../components/GetTicketsCTA';
import FAQSection from '../components/FAQSection';
import LastYearSection from '../components/LastYearSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="relative">
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
      <div id="tickets">
        <GetTicketsCTA />
      </div>
      <FAQSection />
      <LastYearSection />
      <Footer />
    </div>
  );
};

export default Index;
