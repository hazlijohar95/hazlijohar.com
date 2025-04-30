
import React, { useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./ui/collapsible";

interface FAQItem {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    'What is Ship?': true, // Open by default
  });

  const faqItems: FAQItem[] = [
    {
      question: 'What is Ship?',
      answer: 'Vercel Ship brings together developers, community members, business leaders, and partners for a day of learning, connection, and inspiration. Hear what\'s new at Vercel, learn from real-world customer stories, and explore the latest innovations shaping the web.',
      defaultOpen: true
    },
    {
      question: 'What\'s the difference between the in-person and virtual experience?',
      answer: 'The in-person experience offers direct networking opportunities, hands-on workshops, and face-to-face interaction with speakers and Vercel team members. The virtual experience provides access to all mainstage presentations, select breakout sessions, and online Q&A opportunities.'
    },
    {
      question: 'When will the full agenda be announced?',
      answer: 'The detailed agenda including all sessions and speakers will be announced approximately 3 weeks before the event. Early attendees will receive first access to session registration and exclusive content.'
    },
    {
      question: 'Can I participate as a sponsor of the event?',
      answer: 'Yes, we have several sponsorship opportunities available for companies looking to connect with our audience of developers, designers, and technology leaders. Please contact our sponsorship team at ship-sponsors@vercel.com for more information.'
    },
    {
      question: 'What\'s the refund and cancellation policy?',
      answer: 'Tickets are fully refundable up to 30 days before the event. Within 30 days of the event, tickets are non-refundable but fully transferable to another attendee. Please contact support@vercel.com for assistance with refunds or transfers.'
    },
    {
      question: 'Can I request an accommodation to attend the event?',
      answer: 'Yes, we're committed to making Ship accessible to all attendees. Please contact us at accessibility@vercel.com at least 2 weeks prior to the event with any specific accommodation needs you may have.'
    }
  ];

  const toggleItem = (question: string) => {
    setOpenItems(prev => ({
      ...prev,
      [question]: !prev[question]
    }));
  };

  return (
    <section id="faq" className="bg-white py-24 px-8 md:px-20 text-black">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">
        {/* Left column - Section title */}
        <div>
          <h2 className="text-[56px] md:text-[72px] font-semibold leading-tight">
            FAQ
          </h2>
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
    </section>
  );
};

export default FAQSection;
