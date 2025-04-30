
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { styles } from '@/styles/common-styles';
import { toast } from '@/components/ui/use-toast';
import Navbar from '../components/Navbar';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate('/'); // Redirect to home page if already logged in
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            company: formData.company,
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Registration successful",
        description: "Please check your email for a confirmation link to complete your registration.",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "There was a problem with your registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <Navbar />
      <div className="max-w-md w-full mt-32">
        <h1 className="text-4xl font-bold mb-8">Register for Client Access</h1>
        <p className="mb-8">Complete the form below to register for our client portal and access your financial documents.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 font-mono text-sm">NAME</label>
            <input 
              type="text" 
              id="name" 
              className={styles.input}
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-mono text-sm">EMAIL</label>
            <input 
              type="email" 
              id="email" 
              className={styles.input}
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block mb-1 font-mono text-sm">COMPANY</label>
            <input 
              type="text" 
              id="company" 
              className={styles.input}
              placeholder="Your company name"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-mono text-sm">PASSWORD</label>
            <input 
              type="password" 
              id="password" 
              className={styles.input}
              placeholder="Choose a secure password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>
          <button 
            type="submit" 
            className={`${styles.buttonPrimary} w-full mt-4`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Complete Registration'}
          </button>
        </form>
        <div className="mt-8 text-center space-y-4">
          <p>Already have an account? <Link to="/login" className="text-white hover:underline">Log in</Link></p>
          <Link to="/" className="text-[#888] hover:text-white transition-colors block">← Back to main site</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
