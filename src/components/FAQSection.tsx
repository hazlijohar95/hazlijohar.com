
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
    <SectionContainer id="faq" bgColor="white">
      <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-[280px_1fr]'} gap-6 md:gap-12`}>
        {/* Left column - Section title */}
        <div>
          <SectionTitle className={`${isMobile ? 'text-4xl sm:text-5xl mb-6' : ''}`}>
            FAQ
          </SectionTitle>
        </div>

        {/* Right column - FAQ accordion */}
        <div className="max-w-3xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index}
                value={`item-${index}`}
                className="border-t border-[#DADADA] py-2"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <h3 className="text-left text-lg md:text-xl font-semibold leading-snug">
                    {item.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-[#333333] font-mono leading-relaxed pt-2 pb-4">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionContainer>
  );
};

export default FAQSection;
