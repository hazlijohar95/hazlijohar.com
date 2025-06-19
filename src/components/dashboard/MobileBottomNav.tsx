
import React from 'react';
import { 
  LayoutDashboard, Files, Calendar, CheckSquare, 
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileBottomNav = ({ activeTab, setActiveTab }: MobileBottomNavProps) => {
  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Home' },
    { id: 'documents', icon: Files, label: 'Docs' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'questions', icon: HelpCircle, label: 'Help' },
  ];

  const handleTabClick = (tabId: string) => {
    // Add haptic feedback for better mobile UX
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    setActiveTab(tabId);
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#0F0F0F]/95 backdrop-blur-md border-t border-[#1A1A1A] flex items-center justify-around z-50 safe-area-bottom"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex flex-col items-center justify-center w-16 h-full relative touch-manipulation ${
              isActive ? 'text-white' : 'text-[#777]'
            }`}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-xs mt-1 font-mono ${isActive ? 'font-medium' : 'font-normal'}`}>
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default MobileBottomNav;
