
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Files, Calendar, CheckSquare, 
  HelpCircle, Menu
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileBottomNav = ({ activeTab, setActiveTab }: MobileBottomNavProps) => {
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0F0F0F] border-t border-[#1A1A1A] flex items-center justify-around z-50">
      <button
        onClick={() => handleTabClick('overview')}
        className={`flex flex-col items-center justify-center w-16 h-full ${
          activeTab === 'overview' ? 'text-white' : 'text-[#777]'
        }`}
      >
        <LayoutDashboard size={20} />
        <span className="text-xs mt-1">Home</span>
      </button>
      
      <button
        onClick={() => handleTabClick('documents')}
        className={`flex flex-col items-center justify-center w-16 h-full ${
          activeTab === 'documents' ? 'text-white' : 'text-[#777]'
        }`}
      >
        <Files size={20} />
        <span className="text-xs mt-1">Docs</span>
      </button>
      
      <button
        onClick={() => handleTabClick('calendar')}
        className={`flex flex-col items-center justify-center w-16 h-full ${
          activeTab === 'calendar' ? 'text-white' : 'text-[#777]'
        }`}
      >
        <Calendar size={20} />
        <span className="text-xs mt-1">Calendar</span>
      </button>
      
      <button
        onClick={() => handleTabClick('tasks')}
        className={`flex flex-col items-center justify-center w-16 h-full ${
          activeTab === 'tasks' ? 'text-white' : 'text-[#777]'
        }`}
      >
        <CheckSquare size={20} />
        <span className="text-xs mt-1">Tasks</span>
      </button>
      
      <button
        onClick={() => handleTabClick('questions')}
        className={`flex flex-col items-center justify-center w-16 h-full ${
          activeTab === 'questions' ? 'text-white' : 'text-[#777]'
        }`}
      >
        <HelpCircle size={20} />
        <span className="text-xs mt-1">Help</span>
      </button>
    </div>
  );
};

export default MobileBottomNav;
