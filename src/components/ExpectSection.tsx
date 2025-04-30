
import React from 'react';
import { MessageSquare, Users, Wrench, Cuboid } from 'lucide-react';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';
import '../App.css';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card = ({ icon, title, description }: CardProps) => (
  <div className="scroll-snap-start min-w-[420px] h-auto bg-black text-white p-8 flex flex-col justify-between shrink-0">
    <div>
      <div className="text-white mb-10">
        {icon}
      </div>
      <h3 className="font-semibold text-2xl leading-tight text-white">{title}</h3>
      <p className="text-sm mt-4 font-mono opacity-70">{description}</p>
    </div>
  </div>
);

const expectCards = [
  {
    icon: <MessageSquare className="stroke-[1.5]" size={28} />,
    title: "Keynotes and conversations",
    description: "Hear the latest updates on AI, compute, and more."
  },
  {
    icon: <Users className="stroke-[1.5]" size={28} />,
    title: "Community sessions",
    description: "Get insights and lessons learned directly from experts and leading companies."
  },
  {
    icon: <Wrench className="stroke-[1.5]" size={28} />,
    title: "Hands-on workshops",
    description: "Bring your laptop for live sessions led by the creators of Next.js, v0, and Vercel."
  },
  {
    icon: <Cuboid className="stroke-[1.5]" size={28} />,
    title: "Interactive experiences",
    description: "Engage with our sponsors and try the v0 booth to build an app live."
  }
];

const ExpectSection = () => {
  return (
    <SectionContainer id="expect" className="bg-[#fcfcfc] py-28">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Title on the left */}
          <div className="md:col-span-4 pl-4 md:pl-12 lg:pl-24">
            <SectionTitle className="text-black">
              What you<br />can expect
            </SectionTitle>
          </div>
          
          {/* Cards on the right */}
          <div className="md:col-span-8 overflow-x-auto scroll-snap-x scrollbar-hide pb-10">
            <div className="flex space-x-6 pr-8">
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
