
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Bell, CheckCircle, Clock, AlertCircle, CreditCard } from 'lucide-react';

// Sample notification data (in a real app, this would come from the database)
const sampleNotifications = [
  {
    id: 1,
    title: 'Tax Returns Due Soon',
    message: 'Your annual tax returns are due in 2 weeks. Please review and submit any missing documents.',
    type: 'reminder',
    read: false,
    date: '2025-04-27T10:30:00Z'
  },
  {
    id: 2,
    title: 'New Document Available',
    message: 'April Financial Report has been uploaded to your document vault.',
    type: 'document',
    read: true,
    date: '2025-04-25T15:20:00Z'
  },
  {
    id: 3,
    title: 'Task Completed',
    message: 'Your advisor has completed the review of your investment portfolio.',
    type: 'task',
    read: false,
    date: '2025-04-23T09:15:00Z'
  },
  {
    id: 4,
    title: 'Payment Receipt',
    message: 'Your payment for Q2 services has been processed successfully.',
    type: 'billing',
    read: true,
    date: '2025-04-20T14:10:00Z'
  },
  {
    id: 5,
    title: 'Account Security',
    message: 'We noticed a login from a new device. If this was not you, please secure your account.',
    type: 'alert',
    read: false,
    date: '2025-04-18T08:45:00Z'
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [filter, setFilter] = useState('all');
  
  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Clock className="text-blue-400" size={20} />;
      case 'document':
        return <Bell className="text-green-400" size={20} />;
      case 'task':
        return <CheckCircle className="text-purple-400" size={20} />;
      case 'billing':
        return <CreditCard className="text-yellow-400" size={20} />;
      case 'alert':
        return <AlertCircle className="text-red-400" size={20} />;
      default:
        return <Bell className="text-gray-400" size={20} />;
    }
  };
  
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Filter notifications
  const filteredNotifications = notifications.filter(note => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !note.read;
    if (filter === 'read') return note.read;
    return note.type === filter;
  });
  
  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(note => 
        note.id === id ? { ...note, read: true } : note
      )
    );
    
    toast({
      title: 'Notification marked as read',
      description: 'The notification has been marked as read'
    });
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(note => ({ ...note, read: true }))
    );
    
    toast({
      title: 'All notifications marked as read',
      description: 'All notifications have been marked as read'
    });
  };
  
  return (
    <Card className="bg-[#111] border-[#333] text-white">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-2xl">Notifications</CardTitle>
          <CardDescription className="text-[#999]">
            Stay updated with important alerts and information
          </CardDescription>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            className="h-9 text-sm border-[#444] text-white hover:bg-[#222]"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant="outline" 
            size="sm"
            className={`${filter === 'all' ? 'bg-white text-black' : 'text-white border-[#444]'} hover:bg-[#222]`}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={`${filter === 'unread' ? 'bg-white text-black' : 'text-white border-[#444]'} hover:bg-[#222]`}
            onClick={() => setFilter('unread')}
          >
            Unread
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={`${filter === 'reminder' ? 'bg-white text-black' : 'text-white border-[#444]'} hover:bg-[#222]`}
            onClick={() => setFilter('reminder')}
          >
            Reminders
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={`${filter === 'document' ? 'bg-white text-black' : 'text-white border-[#444]'} hover:bg-[#222]`}
            onClick={() => setFilter('document')}
          >
            Documents
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={`${filter === 'billing' ? 'bg-white text-black' : 'text-white border-[#444]'} hover:bg-[#222]`}
            onClick={() => setFilter('billing')}
          >
            Billing
          </Button>
        </div>
        
        {/* Notification list */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-[#888]">
              <Bell className="mx-auto mb-3 opacity-50" size={40} />
              <p>No notifications to display</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div 
                key={notification.id}
                className={`flex gap-3 p-4 rounded-lg ${notification.read ? 'bg-[#1A1A1A]' : 'bg-[#1f2937] border-l-4 border-white'}`}
              >
                <div className="mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-medium ${notification.read ? 'text-[#CCC]' : 'text-white'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-[#888]">{formatDate(notification.date)}</span>
                  </div>
                  <p className={`mt-1 text-sm ${notification.read ? 'text-[#999]' : 'text-[#CCC]'}`}>
                    {notification.message}
                  </p>
                  
                  {!notification.read && (
                    <div className="mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 px-2 text-xs text-[#CCC] hover:bg-[#222] hover:text-white"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsPage;
