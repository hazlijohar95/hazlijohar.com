
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Question, QuestionFormData } from '@/types/question';
import { toast } from '@/hooks/use-toast';

export const useQuestions = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all questions for the current user
  const fetchQuestions = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch questions from database
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const formattedQuestions = data.map(q => ({
        id: q.id,
        subject: q.subject,
        message: q.message,
        status: q.status,
        userId: q.user_id,
        createdAt: q.created_at,
        updatedAt: q.updated_at,
        answer: q.answer,
        answeredAt: q.answered_at
      })) as Question[];
      
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: 'Error fetching questions',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Submit a new question
  const submitQuestion = async (questionData: QuestionFormData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Generate a unique ID for the question
      const questionId = crypto.randomUUID();
      const now = new Date().toISOString();
      
      // Insert question into the database
      const { error } = await supabase
        .from('questions')
        .insert({
          id: questionId,
          subject: questionData.subject,
          message: questionData.message,
          status: 'pending',
          user_id: user.id,
          created_at: now,
          updated_at: now
        });
      
      if (error) throw error;
      
      toast({
        title: 'Question submitted',
        description: 'We will get back to you as soon as possible.',
      });
      
      // Refresh questions list
      fetchQuestions();
      return true;
    } catch (error) {
      console.error('Error submitting question:', error);
      toast({
        title: 'Error submitting question',
        description: 'Please try again later.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load questions when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchQuestions();
    } else {
      setQuestions([]);
    }
  }, [user]);

  return {
    questions,
    isLoading,
    isSubmitting,
    fetchQuestions,
    submitQuestion
  };
};
