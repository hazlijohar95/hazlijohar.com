
import React from 'react';
import { BookText, BarChartBig, Wrench, Users } from 'lucide-react';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';
import { styles } from '@/styles/common-styles';
import { CardProps } from '@/types';
import '../App.css';

const Card = ({ icon, title, description }: CardProps) => (
  <div className="scroll-snap-start min-w-[460px] bg-black text-white p-12 flex flex-col justify-between shrink-0 h-[580px] group hover:bg-[#111] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5">
    <div>
      <div className="text-white mb-20 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
      <h3 className="font-semibold text-4xl leading-tight text-white mb-6 transition-colors duration-300 group-hover:text-white/90">
        {title}
      </h3>
      <p className="text-base font-mono opacity-70 leading-relaxed transition-opacity duration-300 group-hover:opacity-90">
        {description}
      </p>
    </div>
    
    {/* Subtle accent line that appears on hover */}
    <div className="w-12 h-px bg-white/20 mt-8 transition-all duration-500 group-hover:w-20 group-hover:bg-white/40"></div>
  </div>
);

const expectCards: CardProps[] = [
  {
    icon: <BookText className="stroke-[1.5]" size={40} />,
    title: "Expert-Led Advisory",
    description: "Work directly with licensed professionals who understand your industry's unique challenges and opportunities. Get strategic insights that drive real business growth."
  },
  {
    icon: <BarChartBig className="stroke-[1.5]" size={40} />,
    title: "Real-Time Financial Intelligence",
    description: "Access cloud-based reporting that provides actionable insights whenever you need them. Make informed decisions with accurate, up-to-date financial data."
  },
  {
    icon: <Wrench className="stroke-[1.5]" size={40} />,
    title: "Smart Process Automation",
    description: "Streamline your operations from bookkeeping to payroll with intelligent automation tools. Focus on growing your business while we handle the routine tasks."
  },
  {
    icon: <Users className="stroke-[1.5]" size={40} />,
    title: "Scalable Partnership",
    description: "Whether you're a startup or scaling enterprise, our services grow with your ambitions. Get the right level of support at every stage of your journey."
  }
];

const ExpectSection = () => {
  return (
    <SectionContainer id="expect" className="bg-[#fcfcfc] py-32 overflow-hidden">
      <div className="container mx-auto px-0">
        <div className="flex flex-col lg:flex-row">
          {/* Enhanced title section with proper spacing */}
          <div className="lg:w-1/3 pl-8 md:pl-24 lg:pl-36 mb-20 lg:mb-0 flex-shrink-0">
            <div className="animate-fade-in-up sticky top-32">
              <SectionTitle className="text-black mb-8 pr-8">
                What you<br />can expect
              </SectionTitle>
              <div className="max-w-sm">
                <p className="font-mono text-sm text-[#666] leading-relaxed mb-6">
                  Professional services designed to transform how you manage your business finances and operations.
                </p>
                <div className="w-16 h-px bg-black/20"></div>
              </div>
            </div>
          </div>
          
          {/* Enhanced cards section with proper margin */}
          <div className="lg:w-2/3 overflow-x-auto scroll-snap-x scrollbar-hide lg:ml-8">
            <div className="flex space-x-6 pl-8 lg:pl-0 pr-8 pb-12">
              {expectCards.map((card, index) => (
                <div 
                  key={index}
                  className="animate-fade-in-up"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <Card 
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced bottom section with stats */}
        <div className="mt-20 px-8 md:px-24 lg:px-36">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              <div className="font-mono text-3xl font-bold text-black mb-2">98%</div>
              <div className="font-mono text-xs text-[#666] uppercase tracking-wide">Client Satisfaction</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <div className="font-mono text-3xl font-bold text-black mb-2">24/7</div>
              <div className="font-mono text-xs text-[#666] uppercase tracking-wide">Cloud Access</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
              <div className="font-mono text-3xl font-bold text-black mb-2">100+</div>
              <div className="font-mono text-xs text-[#666] uppercase tracking-wide">Businesses Served</div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ExpectSection;
