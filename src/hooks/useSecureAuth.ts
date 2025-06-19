
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
      // First, re-authenticate with current password
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.email) {
        throw new Error('No active session');
      }

      // Verify current password by attempting to sign in
      const { error: reAuthError } = await supabase.auth.signInWithPassword({
        email: session.session.user.email,
        password: currentPassword
      });

      if (reAuthError) {
        toast({
          title: 'Current password incorrect',
          description: 'Please enter your current password correctly.',
          variant: 'destructive'
        });
        return { success: false };
      }

      // Now update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        toast({
          title: 'Password update failed',
          description: updateError.message,
          variant: 'destructive'
        });
        return { success: false };
      }

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

  return {
    secureSignIn,
    securePasswordChange,
    isLoading
  };
};
