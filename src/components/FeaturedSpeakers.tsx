
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { speakers } from '../data/speakers';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';

const FeaturedSpeakers = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(speakers[0]);

  return (
    <SectionContainer id="leadership" bgColor="black">
      <div className="container mx-auto">
        <SectionTitle>
          Our Leadership
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-10">
          {/* Left side - Speaker list */}
          <div className="flex flex-col w-full space-y-[1px] border-t border-[#222222]">
            {speakers.map(speaker => (
              <div
                key={speaker.id}
                className={`px-6 py-5 border-b border-[#222222] cursor-pointer transition-all duration-200 ${
                  selectedSpeaker?.id === speaker.id 
                    ? 'bg-[#111111] text-white' 
                    : 'text-[#555555] hover:text-[#AAAAAA]'
                }`}
                onClick={() => setSelectedSpeaker(speaker)}
              >
                <div className="font-semibold uppercase font-mono tracking-wide text-sm">
                  {speaker.name}
                </div>
                <div className="text-xs font-mono text-[#AAAAAA] mt-1 uppercase">
                  {speaker.title}{speaker.company ? ` – ${speaker.company}` : ''}
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side - Speaker image and info */}
          <div className="w-full h-full flex items-center justify-center relative">
            {selectedSpeaker ? (
              <div className="relative">
                <button 
                  className="absolute top-4 right-4 text-[#AAAAAA] hover:text-white z-10"
                  onClick={() => setSelectedSpeaker(speakers[0])}
                >
                  <X size={20} />
                </button>
                <div className="rounded-full overflow-hidden w-[320px] h-[320px]">
                  <img 
                    src={selectedSpeaker.image} 
                    alt={selectedSpeaker.name}
                    className="w-full h-full object-cover grayscale" 
                  />
                </div>
              </div>
            ) : (
              <div className="border border-[#333333] rounded-full w-[320px] h-[320px] flex items-center justify-center text-[#333333]">
                <p className="font-mono text-sm">Select a team member</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default FeaturedSpeakers;
