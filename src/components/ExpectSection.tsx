
import React from 'react';
import { MessageSquare, Users, Wrench, Cuboid } from 'lucide-react';
import { SectionContainer } from './ui/section-container';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card = ({ icon, title, description }: CardProps) => (
  <div className="snap-start min-w-[300px] h-[340px] bg-black text-white p-6 flex flex-col justify-between shrink-0">
    <div>
      <div className="text-white text-2xl mb-6">
        {icon}
      </div>
      <h3 className="font-semibold text-white text-2xl leading-snug">{title}</h3>
      <p className="text-[#CCCCCC] text-sm mt-4 font-mono">{description}</p>
    </div>
  </div>
);

const expectCards = [
  {
    icon: <MessageSquare className="stroke-[1.5]" />,
    title: "Keynotes and conversations",
    description: "Hear the latest updates on AI, compute, and more."
  },
  {
    icon: <Users className="stroke-[1.5]" />,
    title: "Community sessions",
    description: "Get insights and lessons learned directly from experts and leading companies."
  },
  {
    icon: <Wrench className="stroke-[1.5]" />,
    title: "Hands-on workshops",
    description: "Bring your laptop for live sessions led by the creators of Next.js, v0, and Vercel."
  },
  {
    icon: <Cuboid className="stroke-[1.5]" />,
    title: "Interactive experiences",
    description: "Engage with our sponsors and try the v0 booth to build an app live."
  }
];

const ExpectSection = () => {
  return (
    <SectionContainer id="expect" bgColor="white" className="pt-[100px] min-h-screen">
      <div className="container mx-auto pb-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Title on the left */}
          <div className="md:col-span-4 md:sticky md:top-32">
            <h2 className="text-black font-semibold text-5xl md:text-6xl leading-tight">
              What you<br />can expect
            </h2>
          </div>
          
          {/* Cards on the right */}
          <div className="md:col-span-8 overflow-auto whitespace-nowrap scrollbar-hide">
            <div className="flex space-x-6 pb-10">
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
