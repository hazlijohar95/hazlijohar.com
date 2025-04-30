
import React from 'react';
import { BookText, BarChartBig, Wrench, Users } from 'lucide-react';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';
import { styles } from '@/styles/common-styles';
import { CardProps } from '@/types';
import '../App.css';

const Card = ({ icon, title, description }: CardProps) => (
  <div className="scroll-snap-start min-w-[440px] bg-black text-white p-12 flex flex-col justify-between shrink-0 h-[540px]">
    <div>
      <div className="text-white mb-16">
        {icon}
      </div>
      <h3 className="font-semibold text-4xl leading-tight text-white">{title}</h3>
      <p className="text-base mt-6 font-mono opacity-60">{description}</p>
    </div>
  </div>
);

const expectCards: CardProps[] = [
  {
    icon: <BookText className="stroke-[1.5]" size={36} />,
    title: "Expert-Led Advisory",
    description: "Partner directly with licensed professionals who understand your industry inside out."
  },
  {
    icon: <BarChartBig className="stroke-[1.5]" size={36} />,
    title: "Accurate, Real-Time Reporting",
    description: "We leverage cloud platforms to deliver reports you can act on — anytime, anywhere."
  },
  {
    icon: <Wrench className="stroke-[1.5]" size={36} />,
    title: "Workflow Automation",
    description: "From bookkeeping to payroll, we help eliminate manual work using the right tools."
  },
  {
    icon: <Users className="stroke-[1.5]" size={36} />,
    title: "Support That Grows With You",
    description: "Start as a small business, scale confidently — we'll grow your finance stack with you."
  }
];

const ExpectSection = () => {
  return (
    <SectionContainer id="expect" className="bg-[#fcfcfc] py-32">
      <div className="container mx-auto px-0">
        <div className="flex flex-col md:flex-row">
          {/* Title on the left */}
          <div className="md:w-1/3 pl-8 md:pl-24 lg:pl-36 mb-16 md:mb-0">
            <SectionTitle className="text-black">
              What you<br />can expect
            </SectionTitle>
          </div>
          
          {/* Cards on the right */}
          <div className="md:w-2/3 overflow-x-auto scroll-snap-x scrollbar-hide">
            <div className="flex space-x-6 pl-8 md:pl-0 pr-8 pb-12">
              {expectCards.map((card, index) => (
                <Card 
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ExpectSection;
