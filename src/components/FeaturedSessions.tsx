
import React from 'react';
import { sessions } from '../data/sessions';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';

const FeaturedSessions = () => {
  return (
    <SectionContainer id="sessions" bgColor="white">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
        {/* Left Column: Section Title */}
        <div>
          <SectionTitle>
            Featured<br />Sessions
          </SectionTitle>
        </div>

        {/* Right Column: List of Sessions */}
        <div className="flex flex-col">
          {sessions.map((session, index) => (
            <div key={index} className="border-t border-[#DADADA] py-6 flex flex-col md:flex-row md:justify-between gap-4">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-medium leading-snug whitespace-pre-line">
                  {session.title}
                </h3>
                <p className="font-mono text-sm mt-2">{session.time}</p>
              </div>
              
              <div className="w-full md:w-1/2">
                <p className="text-sm text-[#333333] font-mono mb-4">
                  {session.description}
                </p>
                <div className="flex flex-col gap-2">
                  {session.speakers.map((speaker, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name} 
                        className="w-8 h-8 rounded-full object-cover grayscale" 
                      />
                      <p className="text-sm font-mono">{speaker.name}, {speaker.company}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default FeaturedSessions;
