
import React from 'react';
import { Bell } from 'lucide-react';

interface WelcomeBannerProps {
  clientName: string;
}

const WelcomeBanner = ({ clientName }: WelcomeBannerProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Determine appropriate greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Placeholder notifications - would be dynamic in a real implementation
  const notifications = [
    { id: 1, message: "Your tax returns are due in 2 weeks" },
    { id: 2, message: "New document uploaded: April Financial Report" }
  ];

  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-medium mb-2">
            {getGreeting()}, {clientName} 👋
          </h1>
          <p className="text-[#999] font-mono">Today is {currentDate}</p>
        </div>
        
        <div className="relative">
          <button className="p-2 bg-[#1A1A1A] rounded-full hover:bg-[#333] transition-colors">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-white text-black text-xs flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {notifications.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-medium text-[#CCC]">Important notifications:</h3>
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-[#1A1A1A] p-3 rounded border-l-4 border-white">
              {notification.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WelcomeBanner;
