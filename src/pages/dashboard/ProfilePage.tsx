import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { profileUpdateSchema, sanitizeHtml } from '@/utils/validation';
import { Button } from '@/components/ui/button';
import type { ZodError } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { user, profile, isLoading, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: user?.email || '',
    company: profile?.company || '',
    phone: profile?.phone || ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Update form data when profile changes
  React.useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: user?.email || '',
        company: profile.company || '',
        phone: profile.phone || ''
      });
    }
  }, [profile, user]);

  // Handle input changes with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Sanitize input to prevent XSS
    const sanitizedValue = sanitizeHtml(value);
    
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    
    // Clear field-specific errors
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    try {
      profileUpdateSchema.parse({
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        phone: formData.phone
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        const zodError = error as ZodError;
        const validationErrors: { [key: string]: string } = {};
        zodError.errors.forEach(err => {
          const field = err.path[0] as string;
          validationErrors[field] = err.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({ general: 'Validation failed' });
      }
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) return;
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please check your input and try again.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSaving(true);
    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        phone: formData.phone
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <Card className="bg-[#111] border-[#333] text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Your Profile</CardTitle>
        <CardDescription className="text-[#999]">
          View and edit your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName || ''}
                onChange={handleChange}
                className="bg-[#222] border-[#444] text-white focus:border-white"
                maxLength={50}
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm">{errors.firstName}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName || ''}
                onChange={handleChange}
                className="bg-[#222] border-[#444] text-white focus:border-white"
                maxLength={50}
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email || ''}
              disabled
              className="bg-[#222] border-[#444] text-[#999] cursor-not-allowed"
            />
            <p className="text-xs text-[#999] mt-1">To change your email, please contact support</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-white">Company</Label>
            <Input
              id="company"
              name="company"
              type="text"
              value={formData.company || ''}
              onChange={handleChange}
              className="bg-[#222] border-[#444] text-white focus:border-white"
              maxLength={100}
            />
            {errors.company && (
              <p className="text-red-400 text-sm">{errors.company}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={handleChange}
              className="bg-[#222] border-[#444] text-white focus:border-white"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone}</p>
            )}
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              disabled={isSaving}
              className="bg-white text-black hover:bg-gray-200"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
