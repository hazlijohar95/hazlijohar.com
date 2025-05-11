
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) return;
    
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
              />
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
              />
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
            />
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
