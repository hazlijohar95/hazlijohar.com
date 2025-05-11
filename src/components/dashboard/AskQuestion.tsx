
import React, { useState } from 'react';
import { Send, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { styles } from '@/styles/common-styles';
import { useAuth } from '@/context/AuthContext';
import { useQuestions } from '@/hooks/useQuestions';
import { QuestionFormData, QuestionStatus } from '@/types/question';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const AskQuestion: React.FC = () => {
  const { user } = useAuth();
  const { questions, isLoading, isSubmitting, submitQuestion } = useQuestions();
  const [formData, setFormData] = useState<QuestionFormData>({
    subject: '',
    message: ''
  });
  const [activeTab, setActiveTab] = useState<string>('ask');

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
      return; // Form validation is handled by HTML required attribute
    }

    const success = await submitQuestion(formData);
    
    if (success) {
      // Reset form after successful submission
      setFormData({ subject: '', message: '' });
      // Switch to history tab
      setActiveTab('history');
    }
  };

  const getStatusBadge = (status: QuestionStatus) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50"><Clock size={12} className="mr-1" /> Pending</Badge>;
      case 'answered':
        return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50"><CheckCircle size={12} className="mr-1" /> Answered</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-gray-500/50">Closed</Badge>;
      default:
        return null;
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-medium mb-6">Questions & Support</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-[#111] border border-[#333]">
          <TabsTrigger 
            value="ask" 
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Ask a Question
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Question History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ask" className="space-y-4">
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
                  required
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
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors flex items-center"
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
        </TabsContent>
        
        <TabsContent value="history">
          {isLoading ? (
            <div className="bg-black p-6 rounded-lg border border-[#1A1A1A] text-center">
              <p className="text-[#999]">Loading questions...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="bg-black p-6 rounded-lg border border-[#1A1A1A] text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-[#555]" />
              <h3 className="text-lg font-medium mb-2">No questions yet</h3>
              <p className="text-[#999] mb-4">You haven't submitted any questions yet.</p>
              <button 
                onClick={() => setActiveTab('ask')}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Ask Your First Question
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question) => (
                <div 
                  key={question.id}
                  className="bg-black p-6 rounded-lg border border-[#1A1A1A]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium">{question.subject}</h3>
                    {getStatusBadge(question.status)}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-[#999] text-xs mb-1 font-mono">
                        QUESTION • {format(new Date(question.createdAt), 'MMM d, yyyy')}
                      </p>
                      <p className="text-[#EEE]">{question.message}</p>
                    </div>
                    
                    {question.answer && (
                      <div className="bg-[#111] p-4 rounded border-l-4 border-white">
                        <p className="text-[#999] text-xs mb-1 font-mono">
                          ANSWER • {format(new Date(question.answeredAt || question.updatedAt), 'MMM d, yyyy')}
                        </p>
                        <p className="text-[#EEE]">{question.answer}</p>
                      </div>
                    )}
                    
                    {question.status === 'pending' && (
                      <div className="flex items-center text-[#888] text-sm">
                        <Clock size={14} className="mr-1" />
                        <span>We'll respond to your question as soon as possible</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AskQuestion;
