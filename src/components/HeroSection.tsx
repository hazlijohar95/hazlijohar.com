
import React from 'react';
import { BackgroundPaths } from './ui/background-paths';
import { BackgroundPathsProps } from '@/types';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heroProps: BackgroundPathsProps = {
    title: "ACME",
    subtitle: "Helping modern businesses in Malaysia grow with clarity and confidence.",
    ctaText: "BOOK A CALL",
    ctaLink: "/contact"
  };

  return (
    <div className="relative">
      <BackgroundPaths {...heroProps} />
      <div className="absolute bottom-12 left-0 w-full flex justify-center">
        <Link to={heroProps.ctaLink}>
          <Button variant="outline" className="bg-white text-black border-white hover:bg-black hover:text-white hover:border-white transition-colors">
            {heroProps.ctaText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
