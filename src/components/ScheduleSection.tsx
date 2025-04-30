
import React from 'react';
import { sessions } from '../data/sessions';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';
import { Separator } from './ui/separator';
import { Calendar } from 'lucide-react';

const ScheduleSection = () => {
  return (
    <SectionContainer id="schedule" bgColor="black">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Left Column: Section Title */}
          <div>
            <SectionTitle as="h2" className="text-white">
              Full<br />Schedule
            </SectionTitle>
          </div>

          {/* Right Column: Schedule */}
          <div className="flex flex-col text-white">
            <div className="flex items-center gap-2 mb-8 font-mono text-sm">
              <Calendar size={18} />
              <span>JUNE 25, 2025 • THE GLASSHOUSE, NEW YORK</span>
            </div>
            
            {/* Morning schedule */}
            <div className="mb-12">
              <h3 className="text-xl font-medium mb-6">Morning</h3>
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row md:gap-8">
                  <div className="w-full md:w-32 font-mono text-sm text-[#AAAAAA] mb-2 md:mb-0">9:00 AM</div>
                  <div>
                    <h4 className="text-lg font-medium">Registration & Breakfast</h4>
                    <p className="text-[#AAAAAA]">Welcome coffee and networking</p>
                  </div>
                </div>
                
                <Separator className="bg-[#333333] h-[1px] w-full" />
                
                <div className="flex flex-col md:flex-row md:gap-8">
                  <div className="w-full md:w-32 font-mono text-sm text-[#AAAAAA] mb-2 md:mb-0">{sessions[0].time}</div>
                  <div>
                    <h4 className="text-lg font-medium">{sessions[0].title.replace('\n', ' ')}</h4>
                    <p className="text-[#AAAAAA]">{sessions[0].description}</p>
                  </div>
                </div>
                
                <Separator className="bg-[#333333] h-[1px] w-full" />
                
                <div className="flex flex-col md:flex-row md:gap-8">
                  <div className="w-full md:w-32 font-mono text-sm text-[#AAAAAA] mb-2 md:mb-0">{sessions[1].time}</div>
                  <div>
                    <h4 className="text-lg font-medium">{sessions[1].title.replace('\n', ' ')}</h4>
                    <p className="text-[#AAAAAA]">{sessions[1].description}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Afternoon schedule */}
            <div>
              <h3 className="text-xl font-medium mb-6">Afternoon</h3>
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row md:gap-8">
                  <div className="w-full md:w-32 font-mono text-sm text-[#AAAAAA] mb-2 md:mb-0">12:30 PM</div>
                  <div>
                    <h4 className="text-lg font-medium">Lunch Break</h4>
                    <p className="text-[#AAAAAA]">Networking and refreshments</p>
                  </div>
                </div>
                
                <Separator className="bg-[#333333] h-[1px] w-full" />
                
                <div className="flex flex-col md:flex-row md:gap-8">
                  <div className="w-full md:w-32 font-mono text-sm text-[#AAAAAA] mb-2 md:mb-0">{sessions[2].time}</div>
                  <div>
                    <h4 className="text-lg font-medium">{sessions[2].title.replace('\n', ' ')}</h4>
                    <p className="text-[#AAAAAA]">{sessions[2].description}</p>
                  </div>
                </div>
                
                <Separator className="bg-[#333333] h-[1px] w-full" />
                
                <div className="flex flex-col md:flex-row md:gap-8">
                  <div className="w-full md:w-32 font-mono text-sm text-[#AAAAAA] mb-2 md:mb-0">3:00 PM</div>
                  <div>
                    <h4 className="text-lg font-medium">Closing Keynote</h4>
                    <p className="text-[#AAAAAA]">Final thoughts and future roadmap</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ScheduleSection;
