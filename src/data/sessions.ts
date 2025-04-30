
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
    title: "Building agents with\nthe AI SDK",
    time: "1:15 PM–1:55 PM",
    description: "Learn the basics of building AI agents with the AI SDK.",
    speakers: [
      { name: "NICO ALBANESE", company: "VERCEL", image: "/lovable-uploads/9fa1e196-6516-4c96-b5fc-cc91548898e9.png" }
    ]
  },
  {
    title: "Dynamic content\nat scale",
    time: "1:35 PM–1:55 PM",
    description: "Get architectural strategies for scaling dynamic content globally while ensuring low latency.",
    speakers: [
      { name: "PEPIJN SENDERS", company: "HELLOFRESH", image: "/lovable-uploads/9fa1e196-6516-4c96-b5fc-cc91548898e9.png" }
    ]
  },
  {
    title: "Feature Flag success\nwith Vercel\nand Statsig",
    time: "3:05 PM–3:45 PM",
    description: "Learn how to use the Flags SDK to experiment without impacting site performance.",
    speakers: [
      { name: "DOMINIK FERBER", company: "VERCEL", image: "/lovable-uploads/9fa1e196-6516-4c96-b5fc-cc91548898e9.png" },
      { name: "JOE ZENG", company: "STATSIG", image: "/lovable-uploads/9fa1e196-6516-4c96-b5fc-cc91548898e9.png" }
    ]
  }
];
