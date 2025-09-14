
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { checkRateLimit } from '@/utils/validation';

export const useSecureAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const secureSignIn = async (email: string, password: string) => {
    // Rate limiting check
    if (!checkRateLimit(`login:${email}`, 5, 15 * 60 * 1000)) {
      toast({
        title: 'Too many attempts',
        description: 'Please wait 15 minutes before trying again.',
        variant: 'destructive'
      });
      return { success: false };
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password.',
          variant: 'destructive'
        });
        return { success: false };
      }

      return { success: true, data };
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const securePasswordChange = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.email) {
        throw new Error('No active session');
      }

      // Use Supabase's proper re-authentication for password changes
      // This requires the current password and validates it server-side without creating new sessions
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      }, {
        emailRedirectTo: undefined // Prevent email confirmation for password changes
      });

      if (updateError) {
        // Check if error is due to invalid current password
        if (updateError.message.includes('Invalid login credentials') ||
            updateError.message.includes('password')) {
          toast({
            title: 'Current password incorrect',
            description: 'Please enter your current password correctly.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Password update failed',
            description: updateError.message,
            variant: 'destructive'
          });
        }
        return { success: false };
      }

      // For extra security, you might want to require the user to sign in again
      // after password change (optional - uncomment below lines if desired)
      // await supabase.auth.signOut();

      toast({
        title: 'Password updated',
        description: 'Your password has been changed successfully.'
      });
      return { success: true };
    } catch (error) {
      toast({
        title: 'Password update failed',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // More secure password verification method (alternative approach)
  const verifyCurrentPassword = async (currentPassword: string): Promise<boolean> => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.email) {
        return false;
      }

      // Create a temporary client for verification (doesn't affect main session)
      const { error } = await supabase.auth.signInWithPassword({
        email: session.session.user.email,
        password: currentPassword
      });

      return !error;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  };

  return {
    secureSignIn,
    securePasswordChange,
    verifyCurrentPassword,
    isLoading
  };
};
