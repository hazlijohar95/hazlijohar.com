
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';
import OverviewCards from '@/components/dashboard/OverviewCards';
import DocumentVault from '@/components/dashboard/DocumentVault';
import AskQuestion from '@/components/dashboard/AskQuestion';
import BillingSection from '@/components/dashboard/BillingSection';
import FutureFeature from '@/components/dashboard/FutureFeature';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import DashboardCalendar from '@/components/dashboard/DashboardCalendar';
import TaskManager from '@/components/dashboard/TaskManager';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ first_name?: string; last_name?: string } | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Fetch user profile if available
    const fetchProfile = async () => {
      try {
        if (!user.id) return;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, [user, navigate]);

  // Get client name (either from profile or fallback to email)
  const clientName = profile 
    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() 
    : user?.email?.split('@')[0] || 'Client';

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main content */}
        <div className="flex-1 pt-24 pb-16 px-6 lg:px-8">
          {/* Welcome Banner */}
          <WelcomeBanner clientName={clientName} />
          
          {/* Main Content */}
          <div className="mt-8">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="bg-[#111] border border-[#333] mb-6">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="documents" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Documents
                </TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="tasks" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="questions" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Q&A
                </TabsTrigger>
                <TabsTrigger value="billing" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Billing
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4 space-y-12">
                <OverviewCards />
                <FutureFeature />
              </TabsContent>
              
              <TabsContent value="documents" className="mt-4">
                <DocumentVault />
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-4">
                <DashboardCalendar />
              </TabsContent>
              
              <TabsContent value="tasks" className="mt-4">
                <TaskManager />
              </TabsContent>
              
              <TabsContent value="questions" className="mt-4">
                <AskQuestion />
              </TabsContent>
              
              <TabsContent value="billing" className="mt-4">
                <BillingSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
