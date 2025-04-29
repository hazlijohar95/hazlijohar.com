
import React, { useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { X } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
}

const speakers: Speaker[] = [
  {
    id: "guillermo-rauch",
    name: "GUILLERMO RAUCH",
    title: "CEO",
    company: "VERCEL",
    image: "/lovable-uploads/c631f8c1-8c6f-4b77-82f4-126643be43be.png"
  },
  {
    id: "luba-kravchenko",
    name: "LUBA KRAVCHENKO",
    title: "SOFTWARE ENGINEER - INFRASTRUCTURE",
    company: "VERCEL",
    image: "/lovable-uploads/79657baf-f82d-4c01-b1a9-712971f5fcae.png"
  },
  {
    id: "pepijn-senders",
    name: "PEPIJN SENDERS",
    title: "STAFF ENGINEER",
    company: "VERCEL",
    image: "/lovable-uploads/b80405d0-8500-4bb0-9154-897328cbbfbf.png"
  },
  {
    id: "malavika-balachandran-tadeusz",
    name: "MALAVIKA BALACHANDRAN TADEUSZ",
    title: "SENIOR PRODUCT DESIGNER",
    company: "VERCEL",
    image: "/lovable-uploads/1eac89fc-27bd-46d7-a428-adf1dff6a9b0.png"
  },
  {
    id: "tomas-jansson",
    name: "TOMAS JANSSON",
    title: "PRINCIPAL ENGINEER",
    company: "VERCEL",
    image: "/lovable-uploads/4f2a7b8a-2b07-4571-b4d2-2c2ffe9d80ba.png"
  },
  {
    id: "joe-zeng",
    name: "JOE ZENG",
    title: "PRODUCT MANAGER",
    company: "VERCEL",
    image: "/lovable-uploads/8be56735-e3f5-40a9-bee4-cc84c7227998.png"
  }
];

const FeaturedSpeakers = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section id="speakers" className="bg-black py-20 px-8 md:px-20">
      <div className="container mx-auto">
        <h2 className="text-white text-[56px] md:text-[72px] font-semibold leading-tight mb-10">
          Featured Speakers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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
                  onClick={() => setSelectedSpeaker(null)}
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
                <p className="font-mono text-sm">Select a speaker</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpeakers;
