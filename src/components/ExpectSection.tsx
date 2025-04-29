
import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ExpectCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const ExpectCard = ({ title, description, icon, index }: ExpectCardProps) => {
  return (
    <Card className="w-[300px] h-[340px] bg-black text-white p-6 flex flex-col justify-between snap-start shrink-0">
      <div>
        <div className="text-white text-2xl mb-6">{icon}</div>
        <h3 className="font-semibold text-white text-2xl leading-snug">{title}</h3>
        <p className="text-[#CCCCCC] text-sm mt-4 font-mono">{description}</p>
      </div>
    </Card>
  );
};

const ExpectSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const cardsContainer = cardsContainerRef.current;
    
    if (!scrollContainer || !cardsContainer) return;

    const handleScroll = () => {
      const { top, height } = scrollContainer.getBoundingClientRect();
      // Calculate scroll progress
      const scrollProgress = Math.min(Math.max((window.innerHeight - top) / (height + window.innerHeight), 0), 1);
      
      // Calculate how far the cards should move
      const maxScroll = cardsContainer.scrollWidth - cardsContainer.clientWidth;
      const horizontalScroll = maxScroll * scrollProgress;
      
      // Apply the transform
      cardsContainer.scrollLeft = horizontalScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardData = [
    {
      icon: '🎤',
      title: 'Keynotes and conversations',
      description: 'Hear the latest updates on AI, compute, and more.'
    },
    {
      icon: '👥',
      title: 'Community sessions',
      description: 'Get insights and lessons learned directly from experts and leading companies.'
    },
    {
      icon: '💻',
      title: 'Hands-on workshops',
      description: 'Bring your laptop for live sessions led by the creators of Next.js, v0, and Vercel.'
    },
    {
      icon: '🔮',
      title: 'Interactive experiences',
      description: 'Engage with our sponsors and try the v0 booth to build an app live.'
    }
  ];

  return (
    <section className="bg-white pt-[100px] pb-[60px] min-h-screen" id="expect">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="sticky top-32">
            <h2 className="text-black font-semibold text-5xl md:text-6xl leading-tight">
              What you <br /> can expect
            </h2>
          </div>
          
          <div ref={scrollContainerRef} className="h-[calc(100vh+50vh)] relative">
            <div 
              ref={cardsContainerRef}
              className="sticky top-32 flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cardData.map((card, index) => (
                <ExpectCard 
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpectSection;
