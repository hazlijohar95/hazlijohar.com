
export interface FAQItem {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Who do you work with?',
    answer: 'We work with startups, SMEs, and expanding regional companies in Malaysia and beyond.',
    defaultOpen: true
  },
  {
    question: 'What accounting software do you support?',
    answer: 'Xero, QuickBooks, Zoho Books, SQL, AutoCount, and more.'
  },
  {
    question: 'Are you licensed?',
    answer: 'Yes — Hazli Johar is a CPA (Aust.) and our firm is registered with the Malaysian Institute of Accountants.'
  },
  {
    question: 'Do you help set up companies?',
    answer: 'Yes — we assist with company incorporation, licensing, and compliance setup.'
  },
  {
    question: 'Can you assist foreign-owned companies?',
    answer: 'Absolutely — we\'ve helped many foreign investors enter the Malaysian market smoothly.'
  },
  {
    question: 'What\'s your pricing model?',
    answer: 'We tailor packages based on business size and needs. Most plans are fixed monthly fees.'
  }
];
