
import React from 'react';
import { faqItems } from '../data/faq';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useIsMobile } from '@/hooks/use-mobile';

const FAQSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <SectionContainer id="faq" bgColor="white" className="bg-texture-light overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-[280px_1fr]'} gap-6 md:gap-12`}>
          {/* Left column - Section title */}
          <div>
            <SectionTitle className={`${isMobile ? 'text-4xl sm:text-5xl mb-6' : ''} gradient-text`}>
              FAQ
            </SectionTitle>
            {!isMobile && (
              <p className="text-gray-500 font-mono text-sm mt-4">
                Common questions about our services and approach
              </p>
            )}
          </div>

          {/* Right column - FAQ accordion */}
          <div className="max-w-3xl">
            <Accordion 
              type="single" 
              collapsible 
              defaultValue="item-0" 
              className="w-full"
            >
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index}
                  value={`item-${index}`}
                  className="border-t border-[#DADADA] py-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AccordionTrigger className="hover:no-underline py-4 group">
                    <h3 className="text-left text-lg md:text-xl font-semibold leading-snug font-heading group-hover:text-brand transition-colors">
                      {item.question}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-gray-50 rounded-md p-4 mt-2 mb-2">
                      <p className="text-sm text-[#333333] font-mono leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default FAQSection;
