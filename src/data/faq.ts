
export interface FAQItem {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const faqItems: FAQItem[] = [
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
    answer: "Yes, we're committed to making Ship accessible to all attendees. Please contact us at accessibility@vercel.com at least 2 weeks prior to the event with any specific accommodation needs you may have."
  }
];
