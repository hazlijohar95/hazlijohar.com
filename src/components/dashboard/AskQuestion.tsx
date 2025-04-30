
import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { styles } from '@/styles/common-styles';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const AskQuestion: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would send the question to a Supabase table
      // This is just a simulation for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form after successful submission
      setFormData({ subject: '', message: '' });
      
      toast({
        title: "Message sent",
        description: "We'll get back to you soon!",
      });
    } catch (error) {
      console.error("Error submitting question:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-medium mb-6">Got a question?</h2>
      
      <div className="bg-black p-6 rounded-lg border border-[#1A1A1A]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="subject" className="block mb-1 font-mono text-sm">SUBJECT</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className={styles.input}
              placeholder="What's your question about?"
              value={formData.subject}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block mb-1 font-mono text-sm">MESSAGE</label>
            <textarea
              id="message"
              name="message"
              className={`${styles.input} min-h-[120px]`}
              placeholder="Please describe your question in detail..."
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit"
              className={`${styles.buttonPrimary} flex items-center`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <Send className="h-4 w-4 mr-2" /> Send Question
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AskQuestion;
