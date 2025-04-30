
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from '@/styles/common-styles';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate('/dashboard'); // Redirect to dashboard if already logged in
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back to your account.",
      });
      
      // Redirect to dashboard instead of homepage
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
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
        <h1 className="text-4xl font-bold mb-8">Client Login</h1>
        <p className="mb-8">Enter your credentials to access your financial documents and reports.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            <label htmlFor="password" className="block mb-1 font-mono text-sm">PASSWORD</label>
            <input 
              type="password" 
              id="password" 
              className={styles.input}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-[#888] hover:text-white transition-colors">Forgot password?</Link>
          </div>
          <button 
            type="submit" 
            className={`${styles.buttonPrimary} w-full mt-4`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div className="mt-8 text-center space-y-4">
          <p>Don't have an account? <Link to="/register" className="text-white hover:underline">Register now</Link></p>
          <Link to="/" className="text-[#888] hover:text-white transition-colors block">← Back to main site</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
