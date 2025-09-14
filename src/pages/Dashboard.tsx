
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { errorLogger } from '@/utils/errorLogger';
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
import MobileBottomNav from '@/components/dashboard/MobileBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import PerformanceMetrics from '@/components/dashboard/PerformanceMetrics';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<{ first_name?: string; last_name?: string } | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();
  
  // Check if we're on a nested route
  const isNestedRoute = location.pathname !== "/dashboard";
  
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
        errorLogger.error('Error fetching profile in Dashboard', error, {
          component: 'Dashboard',
          action: 'fetchProfile',
          userId: user?.id
        });
      }
    };
    
    fetchProfile();
  }, [user, navigate]);

  // Get client name (either from profile or fallback to email)
  const clientName = profile 
    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() 
    : user?.email?.split('@')[0] || 'Client';

  // Status bar component for mobile
  const StatusBar = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 h-6 bg-black z-40">
      <div className="flex justify-between items-center px-4 h-full">
        <div className="text-xs font-mono text-white/50">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-white/50"></div>
          <div className="w-3 h-3 rounded-full bg-white/50"></div>
          <div className="w-3 h-3 rounded-full bg-white/50"></div>
        </div>
      </div>
    </div>
  );

  // If this is a nested route (profile, settings, notifications), render the Outlet
  if (isNestedRoute) {
    return (
      <div className="min-h-screen bg-black text-white">
        {isMobile && <StatusBar />}
        <Navbar />
        
        <div className="flex">
          {/* Sidebar */}
          <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Main content */}
          <div className="flex-1 pt-24 lg:pt-24 pb-24 lg:pb-16 px-4 lg:px-8">
            {/* Welcome Banner */}
            <WelcomeBanner clientName={clientName} />
            
            {/* Nested route content */}
            <div className="mt-8">
              <Outlet />
            </div>
          </div>
        </div>
        
        {isMobile && <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
      </div>
    );
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-black text-white">
      {isMobile && <StatusBar />}
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main content */}
        <div className="flex-1 pt-24 pb-24 lg:pb-16 px-4 lg:px-8">
          {/* Welcome Banner */}
          <WelcomeBanner clientName={clientName} />
          
          {/* Main Content */}
          <div className="mt-8">
            {isMobile ? (
              // Mobile view - direct content display based on activeTab
              <div>
                {activeTab === 'overview' && <OverviewCards />}
                {activeTab === 'documents' && <DocumentVault />}
                {activeTab === 'calendar' && <DashboardCalendar />}
                {activeTab === 'tasks' && <TaskManager />}
                {activeTab === 'questions' && <AskQuestion />}
                {activeTab === 'billing' && <BillingSection />}
                {activeTab === 'performance' && <PerformanceMetrics />}
                
                {activeTab === 'overview' && <div className="mt-12"><FutureFeature /></div>}
              </div>
            ) : (
              // Desktop view - tabs
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
                  <TabsTrigger value="performance" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    Performance
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

                <TabsContent value="performance" className="mt-4">
                  <PerformanceMetrics />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
      
      {isMobile && <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default Dashboard;
