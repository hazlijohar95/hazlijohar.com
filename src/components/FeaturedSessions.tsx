
import React from 'react';
import { sessions } from '../data/sessions';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';

const FeaturedSessions = () => {
  return (
    <SectionContainer id="services" bgColor="white">
      <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Section Title */}
          <div className="pl-0">
            <SectionTitle as="h2" className="text-black text-5xl md:text-6xl lg:text-7xl">
              Our<br />Services
            </SectionTitle>
          </div>

          {/* Right Column: List of Sessions */}
          <div className="flex flex-col space-y-4">
            {sessions.map((session, index) => (
              <div key={index}>
                <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight whitespace-pre-line mb-3">
                      {session.title}
                    </h3>
                    <p className="font-mono text-sm text-black mt-2">{session.time}</p>
                  </div>
                  
                  <div>
                    <p className="text-base text-[#333333] mb-8">
                      {session.description}
                    </p>
                    <div className="flex flex-col gap-4">
                      {session.speakers.map((speaker, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                            <AvatarImage 
                              src={speaker.image} 
                              alt={`${speaker.name} from ${speaker.company}`} 
                              className="grayscale object-cover" 
                              loading="lazy"
                            />
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {speaker.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-mono tracking-wide">{speaker.name}, {speaker.company}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < sessions.length - 1 && (
                  <Separator className="bg-[#EBEBEB] h-px w-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default FeaturedSessions;
