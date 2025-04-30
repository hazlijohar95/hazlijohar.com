
import React from 'react';
import { BackgroundPaths } from './ui/background-paths';
import { BackgroundPathsProps } from '@/types';

const HeroSection = () => {
  const heroProps: BackgroundPathsProps = {
    title: "Hazli Johar & Co.",
    subtitle: "Helping modern businesses in Malaysia grow with clarity and confidence.",
    ctaText: "BOOK A CALL",
    ctaLink: "/contact"
  };

  return <BackgroundPaths {...heroProps} />;
};

export default HeroSection;
