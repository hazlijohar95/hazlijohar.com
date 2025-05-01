
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <Card className="bg-[#0F0F0F] border border-[#1A1A1A] text-white">
          <CardHeader className="pb-4">
            <h1 className="text-4xl font-bold mb-2">Client Login</h1>
            <p className="text-[#999] text-sm">Enter your credentials to access your financial documents and reports.</p>
          </CardHeader>
          
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="block font-mono text-sm">EMAIL</Label>
                <Input 
                  type="email" 
                  id="email" 
                  className="bg-[#111] border border-[#333] text-white"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="block font-mono text-sm">PASSWORD</Label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    id="password" 
                    className="bg-[#111] border border-[#333] text-white pr-10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button 
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-[#888] hover:text-white transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <Button 
                type="submit" 
                variant="default"
                className="w-full bg-white hover:bg-[#eee] text-black mt-4 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Log In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <p className="text-center text-sm">
              Don't have an account? <Link to="/register" className="text-white hover:underline font-semibold">Register now</Link>
            </p>
            <Link to="/" className="text-[#888] hover:text-white transition-colors text-sm self-center">
              ← Back to main site
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
