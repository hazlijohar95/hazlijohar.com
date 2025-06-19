import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { passwordSchema } from '@/utils/validation';
import { PasswordStrengthMeter } from '@/components/security/PasswordStrengthMeter';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const SettingsPage = () => {
  const { user } = useAuth();
  const { securePasswordChange, isLoading: isUpdatingPassword } = useSecureAuth();
  const [activeTab, setActiveTab] = useState("account");
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    newDocuments: true,
    taskReminders: true,
    billingAlerts: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  // Handle notification toggle
  const handleToggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: 'Settings updated',
      description: 'Your notification preferences have been saved'
    });
  };
  
  // Handle password form input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    
    // Validate new password in real-time
    if (name === 'newPassword') {
      try {
        passwordSchema.parse(value);
        setPasswordErrors([]);
      } catch (error: any) {
        setPasswordErrors(error.errors?.map((err: any) => err.message) || []);
      }
    }
  };
  
  // Handle password update with enhanced security
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: 'Passwords don\'t match',
        description: 'New password and confirmation must match',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      passwordSchema.parse(passwordForm.newPassword);
    } catch (error: any) {
      toast({
        title: 'Password requirements not met',
        description: error.errors?.[0]?.message || 'Please check password requirements',
        variant: 'destructive'
      });
      return;
    }
    
    const result = await securePasswordChange(passwordForm.currentPassword, passwordForm.newPassword);
    
    if (result.success) {
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordErrors([]);
    }
  };

  return (
    <Card className="bg-[#111] border-[#333] text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Account Settings</CardTitle>
        <CardDescription className="text-[#999]">
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-[#222] border border-[#444] mb-6">
            <TabsTrigger value="account" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Account Information</h3>
              <p className="text-[#999]">Email: {user?.email}</p>
              <p className="text-[#999]">Member since: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Danger Zone</h3>
              <p className="text-[#999] mb-3">This action is permanent and cannot be undone</p>
              <Button 
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  toast({
                    title: 'Contact Support',
                    description: 'Please contact support to delete your account',
                  });
                }}
              >
                Request Account Deletion
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Email Notifications</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium">Email Updates</h4>
                  <p className="text-sm text-[#999]">Receive general news and product updates</p>
                </div>
                <Switch 
                  checked={notificationSettings.emailUpdates} 
                  onCheckedChange={() => handleToggleNotification('emailUpdates')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium">New Documents</h4>
                  <p className="text-sm text-[#999]">Get notified when new documents are available</p>
                </div>
                <Switch 
                  checked={notificationSettings.newDocuments} 
                  onCheckedChange={() => handleToggleNotification('newDocuments')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium">Task Reminders</h4>
                  <p className="text-sm text-[#999]">Receive reminders for upcoming tasks</p>
                </div>
                <Switch 
                  checked={notificationSettings.taskReminders} 
                  onCheckedChange={() => handleToggleNotification('taskReminders')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium">Billing Alerts</h4>
                  <p className="text-sm text-[#999]">Get important billing and payment notifications</p>
                </div>
                <Switch 
                  checked={notificationSettings.billingAlerts} 
                  onCheckedChange={() => handleToggleNotification('billingAlerts')} 
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="bg-[#222] border-[#444] text-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="bg-[#222] border-[#444] text-white"
                    required
                  />
                  {passwordForm.newPassword && (
                    <div className="mt-2">
                      <PasswordStrengthMeter password={passwordForm.newPassword} />
                    </div>
                  )}
                  {passwordErrors.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {passwordErrors.map((error, index) => (
                        <p key={index} className="text-red-400 text-sm">{error}</p>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="bg-[#222] border-[#444] text-white"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isUpdatingPassword || passwordErrors.length > 0}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
