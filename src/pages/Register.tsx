import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { styles } from '@/styles/common-styles';
import { toast } from '@/components/ui/use-toast';
import { passwordSchema, emailSchema, sanitizeHtml } from '@/utils/validation';
import { PasswordStrengthMeter } from '@/components/security/PasswordStrengthMeter';
import type { ZodError } from 'zod';
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
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

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
    // Sanitize input to prevent XSS
    const sanitizedValue = sanitizeHtml(value);
    
    setFormData(prev => ({
      ...prev,
      [id]: sanitizedValue
    }));

    // Validate password in real-time
    if (id === 'password') {
      try {
        passwordSchema.parse(value);
        setPasswordErrors([]);
      } catch (error) {
        if (error instanceof Error && 'errors' in error) {
          const zodError = error as ZodError;
          setPasswordErrors(zodError.errors.map(err => err.message));
        } else {
          setPasswordErrors(['Invalid password format']);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate email
      emailSchema.parse(formData.email);
      
      // Validate password
      passwordSchema.parse(formData.password);
      
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: sanitizeHtml(formData.name),
            company: sanitizeHtml(formData.company),
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
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        // Zod validation errors
        const zodError = error as ZodError;
        toast({
          title: "Validation failed",
          description: zodError.errors[0]?.message || "Please check your input.",
          variant: "destructive",
        });
      } else if (error instanceof Error) {
        // Supabase or other errors
        toast({
          title: "Registration failed",
          description: error.message || "There was a problem with your registration.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration failed",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
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
              maxLength={100}
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
              maxLength={100}
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
            />
            {formData.password && (
              <div className="mt-2">
                <PasswordStrengthMeter password={formData.password} />
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
          <button 
            type="submit" 
            className={`${styles.buttonPrimary} w-full mt-4`}
            disabled={isLoading || passwordErrors.length > 0}
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
