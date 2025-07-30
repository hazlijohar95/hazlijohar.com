
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
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
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user profile from database
  const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
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
  }, [user?.email]);

  // Refresh user profile
  const refreshProfile = useCallback(async (): Promise<void> => {
    if (!user) return;
    
    try {
      const userProfile = await fetchProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
      toast({
        title: 'Error refreshing profile',
        description: 'Failed to refresh profile data.',
        variant: 'destructive'
      });
    }
  }, [user, fetchProfile]);

  // Update user profile
  const updateProfile = useCallback(async (updates: Partial<Omit<UserProfile, 'id' | 'email'>>): Promise<void> => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to update your profile.',
        variant: 'destructive'
      });
      return;
    }
    
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
    } catch (error: unknown) {
      console.error('Error updating profile:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      toast({
        title: 'Error updating profile',
        description: errorMessage,
        variant: 'destructive'
      });
    }
  }, [user, profile, refreshProfile]);

  // Sign out function
  const signOut = useCallback(async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setProfile(null);
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error: unknown) {
      console.error('Error signing out:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
      toast({
        title: 'Error signing out',
        description: errorMessage,
        variant: 'destructive'
      });
    }
  }, []);

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
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async (): Promise<void> => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session check:", session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      console.log("AuthProvider unmounted - unsubscribing");
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const value: AuthContextType = {
    user,
    session,
    profile,
    isLoading,
    refreshProfile,
    updateProfile,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
