
import React from 'react';
import { sessions } from '../data/sessions';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { CheckCircle } from 'lucide-react';

const FeaturedSessions = () => {
  return (
    <SectionContainer id="services" bgColor="white">
      <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Section Title */}
          <div className="pl-0">
            <SectionTitle as="h2" className="text-black text-5xl md:text-6xl lg:text-7xl mb-6">
              Our<br />Services
            </SectionTitle>
            <p className="text-[#666] font-mono text-sm leading-relaxed max-w-xs">
              Comprehensive financial solutions tailored for modern businesses. From compliance to strategic growth.
            </p>
          </div>

          {/* Right Column: List of Sessions */}
          <div className="flex flex-col space-y-6">
            {sessions.map((session, index) => (
              <div key={index} className="group">
                <div className="py-8 md:py-10 grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-300 hover:bg-[#FAFAFA] hover:px-6 hover:py-10 hover:-mx-6 hover:rounded-lg">
                  {/* Service Title & Status */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-3xl font-medium leading-tight whitespace-pre-line">
                        {session.title}
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-mono text-xs text-green-700 font-medium">AVAILABLE</span>
                    </div>
                  </div>
                  
                  {/* Service Description */}
                  <div className="lg:col-span-2">
                    <p className="text-base text-[#444] leading-relaxed mb-6">
                      {session.description}
                    </p>
                    
                    {/* Key Benefits */}
                    <div className="space-y-2">
                      <p className="font-mono text-xs text-[#888] uppercase tracking-wide mb-2">Key Benefits</p>
                      <div className="flex flex-wrap gap-2">
                        {getBenefits(index).map((benefit, idx) => (
                          <span key={idx} className="px-2 py-1 bg-[#F5F5F5] text-xs font-mono text-[#666] rounded">
                            {benefit}
                        </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="lg:col-span-1">
                    <p className="font-mono text-xs text-[#888] uppercase tracking-wide mb-4">Your Team</p>
                    <div className="flex flex-col gap-4">
                      {session.speakers.map((speaker, idx) => (
                        <div key={idx} className="group/speaker">
                          <div className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-white">
                            <Avatar className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-[#F0F0F0] transition-all group-hover/speaker:ring-[#E0E0E0]">
                              <AvatarImage 
                                src={speaker.image} 
                                alt={`${speaker.name} from ${speaker.company}`} 
                                className="grayscale object-cover transition-all group-hover/speaker:grayscale-0" 
                                loading="lazy"
                              />
                              <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                                {speaker.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-[#333]">{speaker.name}</p>
                              <p className="text-xs font-mono text-[#666] tracking-wide">{speaker.company}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {index < sessions.length - 1 && (
                  <Separator className="bg-[#EBEBEB] h-px w-full mt-6" />
                )}
              </div>
            ))}
            
            {/* Call to Action */}
            <div className="mt-12 p-8 bg-[#FAFAFA] rounded-lg border border-[#EBEBEB]">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-3">Ready to get started?</h3>
                <p className="text-[#666] mb-6 max-w-md mx-auto">
                  Schedule a consultation to discuss how our services can help streamline your business operations.
                </p>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-[#333] transition-colors"
                >
                  Get Started Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

// Helper function to get benefits for each service
const getBenefits = (index: number) => {
  const benefitsList = [
    ['Compliance Ready', 'Monthly Reports', 'Tax Efficient'],
    ['SST Expertise', 'International Tax', 'Strategic Planning'],
    ['Cloud-Based', 'Real-time Data', 'Process Automation']
  ];
  return benefitsList[index] || [];
};

export default FeaturedSessions;
