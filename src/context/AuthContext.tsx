
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

type UserProfile = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  company: string | null;
  phone: string | null;
  createdAt: string | null;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Omit<UserProfile, 'id' | 'email'>>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  refreshProfile: async () => {},
  updateProfile: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user profile from database
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      if (data) {
        return {
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: user?.email || null,
          company: data.company,
          phone: data.phone,
          createdAt: data.created_at
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const userProfile = await fetchProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<Omit<UserProfile, 'id' | 'email'>>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: updates.firstName !== undefined ? updates.firstName : profile?.firstName,
          last_name: updates.lastName !== undefined ? updates.lastName : profile?.lastName,
          company: updates.company !== undefined ? updates.company : profile?.company,
          phone: updates.phone !== undefined ? updates.phone : profile?.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh profile data
      await refreshProfile();
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        description: error.message || 'Failed to update profile',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    console.log("AuthProvider mounted - setting up auth state");
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Don't fetch profile inside the auth event handler to prevent deadlocks
          setTimeout(async () => {
            const userProfile = await fetchProfile(session.user.id);
            setProfile(userProfile);
            setIsLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: `Welcome back${session?.user?.email ? ', ' + session.user.email : ''}!`,
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out successfully",
            description: "You have been signed out of your account.",
          });
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userProfile = await fetchProfile(session.user.id);
        setProfile(userProfile);
      }
      
      setIsLoading(false);
    });

    return () => {
      console.log("AuthProvider unmounted - unsubscribing");
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    profile,
    isLoading,
    refreshProfile,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
