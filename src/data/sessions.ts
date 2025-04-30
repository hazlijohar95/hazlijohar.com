
export interface Speaker {
  name: string;
  company: string;
  image: string;
}

export interface Session {
  title: string;
  time: string;
  description: string;
  speakers: Speaker[];
}

export const sessions: Session[] = [
  {
    title: "Accounting &\nFinancial Reporting",
    time: "✔️",
    description: "Monthly & annual accounts preparation, compliance-ready reporting.",
    speakers: [
      { name: "HAZLI JOHAR", company: "CPA", image: "/lovable-uploads/9fa1e196-6516-4c96-b5fc-cc91548898e9.png" }
    ]
  },
  {
    title: "Tax Planning &\nCompliance",
    time: "✔️",
    description: "Corporate tax, SST, and advisory for local & international operations.",
    speakers: [
      { name: "AMIRAH KHAIRUDDIN", company: "Tax Specialist", image: "/lovable-uploads/b80405d0-8500-4bb0-9154-897328cbbfbf.png" }
    ]
  },
  {
    title: "Tech implementation\n& Integrations",
    time: "✔️",
    description: "Automate invoicing, reconciliations, and reporting using platforms like Xero & Zoho.",
    speakers: [
      { name: "SHAFIQ AZMAN", company: "Tech Lead", image: "/lovable-uploads/9fa1e196-6516-4c96-b5fc-cc91548898e9.png" },
      { name: "DENISE LEE", company: "Integration Specialist", image: "/lovable-uploads/8be56735-e3f5-40a9-bee4-cc84c7227998.png" }
    ]
  }
];
