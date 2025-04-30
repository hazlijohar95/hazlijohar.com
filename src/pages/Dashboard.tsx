
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

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ first_name?: string; last_name?: string } | null>(null);
  
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="mb-12">
          <h1 className="text-4xl font-medium mb-3">Welcome back, {clientName} 👋</h1>
          <p className="text-[#CCCCCC] text-lg">Here's what's happening with your account.</p>
        </div>
        
        <div className="space-y-16">
          {/* Overview Cards */}
          <OverviewCards />
          
          {/* Document Vault */}
          <DocumentVault />
          
          {/* Ask a Question */}
          <AskQuestion />
          
          {/* Billing & Payments */}
          <BillingSection />
          
          {/* Future Feature */}
          <FutureFeature />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
