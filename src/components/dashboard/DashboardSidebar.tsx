
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Files, Calendar, CheckSquare,
  HelpCircle, CreditCard, Settings, User,
  Bell, LogOut, Gauge
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardSidebar = ({ activeTab, setActiveTab }: DashboardSidebarProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/');
    }
  };

  const navItems = [
    { id: "overview", icon: <LayoutDashboard size={20} />, label: "Overview", path: "/dashboard" },
    { id: "documents", icon: <Files size={20} />, label: "Documents", path: "/dashboard" },
    { id: "calendar", icon: <Calendar size={20} />, label: "Calendar", path: "/dashboard" },
    { id: "tasks", icon: <CheckSquare size={20} />, label: "Tasks", path: "/dashboard" },
    { id: "questions", icon: <HelpCircle size={20} />, label: "Questions", path: "/dashboard" },
    { id: "billing", icon: <CreditCard size={20} />, label: "Billing", path: "/dashboard" },
    { id: "performance", icon: <Gauge size={20} />, label: "Performance", path: "/dashboard" },
  ];

  const accountItems = [
    { id: "profile", icon: <User size={20} />, label: "Profile", path: "/dashboard/profile" },
    { id: "settings", icon: <Settings size={20} />, label: "Settings", path: "/dashboard/settings" },
    { id: "notifications", icon: <Bell size={20} />, label: "Notifications", path: "/dashboard/notifications" },
  ];

  // Check if the current location matches an account item path
  const isAccountPage = (path: string) => location.pathname === path;

  // Handle navigation between main dashboard tabs
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    navigate('/dashboard');
  };

  return (
    <div className="hidden lg:block w-64 min-h-screen bg-[#111] border-r border-[#1A1A1A] pt-24">
      <div className="px-4 py-6">
        {/* Main navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${
                activeTab === item.id && location.pathname === "/dashboard"
                  ? "bg-white text-black" 
                  : "text-[#CCC] hover:bg-[#222] hover:text-white"
              }`}
              onClick={() => handleTabClick(item.id)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Account section */}
        <div className="mt-8 pt-8 border-t border-[#333]">
          <h3 className="px-4 text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">
            Account
          </h3>
          <nav className="space-y-1">
            {accountItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${
                  isAccountPage(item.path)
                    ? "bg-white text-black" 
                    : "text-[#CCC] hover:bg-[#222] hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 justify-start font-normal text-[#CCC] hover:bg-[#222] hover:text-white"
            >
              <span className="mr-3"><LogOut size={20} /></span>
              Sign Out
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
