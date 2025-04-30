
import React from 'react';
import { Bell } from 'lucide-react';
import { styles } from '@/styles/common-styles';
import { Button } from '@/components/ui/button';

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
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.flexBetween}>
          <div>
            <h1 className="text-3xl font-bold">
              {getGreeting()}, <span className="text-brand">{clientName}</span> 👋
            </h1>
            <p className="font-mono text-sm text-[#999]">Today is {currentDate}</p>
          </div>
          
          <div className="relative">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand text-white text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        {notifications.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-medium text-[#CCC]">Important notifications:</h3>
            {notifications.map((notification) => (
              <div key={notification.id} className="bg-[#1A1A1A] p-3 rounded-lg border-l-4 border-brand">
                {notification.message}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeBanner;
