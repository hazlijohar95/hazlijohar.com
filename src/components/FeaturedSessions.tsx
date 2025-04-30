
import React from 'react';
import { sessions } from '../data/sessions';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';

const FeaturedSessions = () => {
  return (
    <SectionContainer id="sessions" bgColor="white">
      <div className="container mx-auto px-0 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Left Column: Section Title */}
          <div className="pl-4 md:pl-0">
            <SectionTitle as="h2" className="text-black">
              Featured<br />Sessions
            </SectionTitle>
          </div>

          {/* Right Column: List of Sessions */}
          <div className="flex flex-col">
            {sessions.map((session, index) => (
              <div key={index}>
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-medium leading-tight whitespace-pre-line mb-2">
                      {session.title}
                    </h3>
                    <p className="font-mono text-sm text-black">{session.time}</p>
                  </div>
                  
                  <div>
                    <p className="text-base text-[#333333] mb-8">
                      {session.description}
                    </p>
                    <div className="flex flex-col gap-4">
                      {session.speakers.map((speaker, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage 
                              src={speaker.image} 
                              alt={`${speaker.name} from ${speaker.company}`} 
                              className="grayscale" 
                              loading="lazy"
                            />
                            <AvatarFallback>{speaker.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-mono">{speaker.name}, {speaker.company}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < sessions.length - 1 && (
                  <Separator className="bg-[#DADADA] h-[1px] w-full" />
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
