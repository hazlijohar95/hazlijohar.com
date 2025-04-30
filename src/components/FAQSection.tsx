
import React, { useState } from 'react';
import { faqItems } from '../data/faq';
import { SectionContainer } from './ui/section-container';
import { SectionTitle } from './ui/section-title';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    'Who do you work with?': true, // Open by default
  });

  const toggleItem = (question: string) => {
    setOpenItems(prev => ({
      ...prev,
      [question]: !prev[question]
    }));
  };

  return (
    <SectionContainer id="faq" bgColor="white">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">
        {/* Left column - Section title */}
        <div>
          <SectionTitle>
            FAQ
          </SectionTitle>
        </div>

        {/* Right column - FAQ accordion */}
        <div>
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="border-t border-[#DADADA] py-6"
            >
              {openItems[item.question] ? (
                // Open state
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold leading-snug">
                      {item.question}
                    </h3>
                    <button 
                      onClick={() => toggleItem(item.question)}
                      className="text-2xl text-black font-light"
                    >
                      ×
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-[#333333] font-mono leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ) : (
                // Closed state
                <div 
                  className="cursor-pointer group"
                  onClick={() => toggleItem(item.question)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold leading-snug group-hover:text-black transition-colors">
                      {item.question}
                    </h3>
                    <span className="text-2xl text-[#999999] font-light group-hover:text-black transition-colors">
                      +
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default FAQSection;
