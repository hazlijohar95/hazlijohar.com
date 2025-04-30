
import React from 'react';

const LastYearSection = () => {
  // Use all the provided event images for the gallery
  const images = [
    "/lovable-uploads/5f5d890e-a100-4297-b370-816b451001f4.png",
    "/lovable-uploads/475501a4-73b7-45cd-bffb-1421996c89ee.png",
    "/lovable-uploads/b80fa1aa-36a2-41cf-a757-778a3fca6268.png", 
    "/lovable-uploads/1000ff1f-cecb-42b1-bf73-c77fcac101e1.png",
    "/lovable-uploads/d6a39dce-eb67-429d-8a4d-8791de158f2e.png",
    "/lovable-uploads/54066d34-8e3e-40cf-b02e-54271ca7839a.png",
    // Duplicate the images to create a seamless infinite scroll effect
    "/lovable-uploads/5f5d890e-a100-4297-b370-816b451001f4.png",
    "/lovable-uploads/475501a4-73b7-45cd-bffb-1421996c89ee.png",
    "/lovable-uploads/b80fa1aa-36a2-41cf-a757-778a3fca6268.png",
    "/lovable-uploads/1000ff1f-cecb-42b1-bf73-c77fcac101e1.png",
    "/lovable-uploads/d6a39dce-eb67-429d-8a4d-8791de158f2e.png",
    "/lovable-uploads/54066d34-8e3e-40cf-b02e-54271ca7839a.png",
  ];

  return (
    <section id="last-year" className="bg-black text-white py-32 px-6 md:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading Block */}
        <h2 className="text-[40px] md:text-[64px] font-medium leading-tight tracking-tight mb-8 max-w-4xl">
          Last year, Vercel Ship 2024 was all about the power of the frontend cloud, highlighting the integrations, ecosystem, and teams building the web's best products.
        </h2>

        {/* Button */}
        <a 
          href="https://vercel.com/ship/2024" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 bg-white text-black font-mono text-sm tracking-wide uppercase px-4 py-2 hover:scale-105 transition-transform mb-16"
        >
          Explore Ship 2024
          <span>↗</span>
        </a>

        {/* Auto Scrolling Image Strip */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-4"
            style={{
              animation: "scrollX 60s linear infinite",
            }}
          >
            {images.map((image, index) => (
              <img 
                key={index}
                src={image}
                alt={`Ship 2024 event image ${index + 1}`}
                className="rounded-lg w-[300px] h-auto object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastYearSection;
