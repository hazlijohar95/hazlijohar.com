
import React from 'react';

interface Speaker {
  name: string;
  company: string;
  image: string;
}

interface Session {
  title: string;
  time: string;
  description: string;
  speakers: Speaker[];
}

const FeaturedSessions = () => {
  const sessions: Session[] = [
    {
      title: "Building agents with\nthe AI SDK",
      time: "1:15 PM–1:55 PM",
      description: "Learn the basics of building AI agents with the AI SDK.",
      speakers: [
        { name: "NICO ALBANESE", company: "VERCEL", image: "/public/lovable-uploads/9fa1e196-6516-4c96-b5fc-cc91548898e9.png" }
      ]
    },
    {
      title: "Dynamic content\nat scale",
      time: "1:35 PM–1:55 PM",
      description: "Get architectural strategies for scaling dynamic content globally while ensuring low latency.",
      speakers: [
        { name: "PEPIJN SENDERS", company: "HELLOFRESH", image: "/public/lovable-uploads/9fa1e196-6516-4c96-b5fc-cc91548898e9.png" }
      ]
    },
    {
      title: "Feature Flag success\nwith Vercel\nand Statsig",
      time: "3:05 PM–3:45 PM",
      description: "Learn how to use the Flags SDK to experiment without impacting site performance.",
      speakers: [
        { name: "DOMINIK FERBER", company: "VERCEL", image: "/public/lovable-uploads/9fa1e196-6516-4c96-b5fc-cc91548898e9.png" },
        { name: "JOE ZENG", company: "STATSIG", image: "/public/lovable-uploads/9fa1e196-6516-4c96-b5fc-cc91548898e9.png" }
      ]
    }
  ];

  return (
    <section id="sessions" className="bg-white py-24 px-8 md:px-20 text-black">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
        {/* Left Column: Section Title */}
        <div>
          <h2 className="text-[56px] md:text-[72px] font-semibold leading-tight">
            Featured<br />Sessions
          </h2>
        </div>

        {/* Right Column: List of Sessions */}
        <div className="flex flex-col">
          {sessions.map((session, index) => (
            <div key={index} className="border-t border-[#DADADA] py-6 flex flex-col md:flex-row md:justify-between gap-4">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-medium leading-snug whitespace-pre-line">
                  {session.title}
                </h3>
                <p className="font-mono text-sm mt-2">{session.time}</p>
              </div>
              
              <div className="w-full md:w-1/2">
                <p className="text-sm text-[#333333] font-mono mb-4">
                  {session.description}
                </p>
                <div className="flex flex-col gap-2">
                  {session.speakers.map((speaker, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name} 
                        className="w-8 h-8 rounded-full object-cover grayscale" 
                      />
                      <p className="text-sm font-mono">{speaker.name}, {speaker.company}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSessions;
