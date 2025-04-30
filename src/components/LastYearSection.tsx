
import React from 'react';

const LastYearSection = () => {
  // Create duplicate images for the continuous scroll effect
  const images = [
    "/lovable-uploads/d5df9344-b316-4fd4-9210-f1927d908e42.png",
    "/lovable-uploads/d5df9344-b316-4fd4-9210-f1927d908e42.png",
    "/lovable-uploads/d5df9344-b316-4fd4-9210-f1927d908e42.png",
    // Duplicating the images to create a seamless loop
    "/lovable-uploads/d5df9344-b316-4fd4-9210-f1927d908e42.png",
    "/lovable-uploads/d5df9344-b316-4fd4-9210-f1927d908e42.png",
    "/lovable-uploads/d5df9344-b316-4fd4-9210-f1927d908e42.png",
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
