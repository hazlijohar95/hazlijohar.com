
import React from 'react';
import { faqItems } from '../data/faq';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

const FAQSection = () => (
    <SectionContainer id="faq" bgColor="black" className="bg-texture-light overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-12">
          {/* Left column - Section title */}
          <div>
            <SectionTitle className="text-4xl sm:text-5xl md:text-7xl mb-6">
              FAQ
            </SectionTitle>
            <p className="text-gray-500 font-mono text-sm mt-4">
              Common questions about our services and approach
            </p>
          </div>

          {/* Right column - FAQ items with minimal design */}
          <div className="max-w-3xl">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border-t border-white/20 last:border-b animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Collapsible className="w-full">
                  <CollapsibleTrigger className="w-full py-5 flex items-center justify-between group">
                    <h3 className="text-left text-lg md:text-xl font-semibold font-sans group-hover:opacity-70 transition-opacity">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0 ml-2">
                      <div className="h-[1px] w-5 bg-white rotate-90 group-data-[state=open]:rotate-0 transition-transform"></div>
                      <div className="h-[1px] w-5 bg-white mt-[-1px] group-data-[state=open]:opacity-0"></div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pb-5">
                      <p className="text-sm text-white/80 font-mono">
                        {item.answer}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );

export default FAQSection;
