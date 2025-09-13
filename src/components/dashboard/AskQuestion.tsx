
import React, { useState } from 'react';
import { useQuestions } from '@/hooks/useQuestions';
import { questionSchema, sanitizeHtml } from '@/utils/validation';
import { Button } from '@/components/ui/button';
import type { ZodError } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AskQuestion = () => {
  const { submitQuestion, isSubmitting } = useQuestions();
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Sanitize input to prevent XSS
    const sanitizedValue = sanitizeHtml(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

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
      questionSchema.parse(formData);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please check your input and try again.',
        variant: 'destructive'
      });
      return;
    }

    const success = await submitQuestion(formData);
    
    if (success) {
      setFormData({ subject: '', message: '' });
      setErrors({});
    }
  };

  return (
    <Card className="bg-[#111] border-[#333] text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Ask a Question
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Brief summary of your question"
              className="bg-[#222] border-[#444] text-white focus:border-white"
              maxLength={100}
            />
            {errors.subject && (
              <p className="text-red-400 text-sm">{errors.subject}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your question in detail..."
              className="bg-[#222] border-[#444] text-white focus:border-white min-h-[120px]"
              maxLength={1000}
            />
            <div className="flex justify-between items-center">
              {errors.message && (
                <p className="text-red-400 text-sm">{errors.message}</p>
              )}
              <p className="text-xs text-[#666] ml-auto">
                {formData.message.length}/1000 characters
              </p>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center"
          >
            {isSubmitting ? 'Sending...' : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Question
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AskQuestion;
