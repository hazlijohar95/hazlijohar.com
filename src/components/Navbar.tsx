import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollObserver } from '../hooks/useScrollObserver';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { OptimizedImage } from './ui/optimized-image';

const Navbar = () => {
  const [isWhiteBackground, setIsWhiteBackground] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    isIntersecting
  } = useScrollObserver(['hero', 'leadership', 'services', 'contact']);

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
      }
    };

    fetchUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    // Use the intersection data to determine navbar background
    if (isIntersecting['leadership'] && !isIntersecting['services'] || isIntersecting['contact']) {
      // We're in the speakers section or tickets section (black background)
      setIsWhiteBackground(false);
    } else if (isIntersecting['services']) {
      // We're in the sessions section (white background)
      setIsWhiteBackground(true);
    } else if (!isIntersecting['hero']) {
      // We're past the hero section but not yet at speakers section
      setIsWhiteBackground(true);
    } else {
      // We're in the hero section
      setIsWhiteBackground(false);
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, [isIntersecting]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/');
    }
  };

  // Check if we're on the dashboard
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Only show section links on home page
  const renderSectionLinks = isHomePage ? (
    <>
      <a href="#leadership" className="hover:opacity-80 transition-opacity">Team</a>
      <a href="#services" className="hover:opacity-80 transition-opacity">Services</a>
      <a href="#faq" className="hover:opacity-80 transition-opacity">FAQ</a>
    </>
  ) : null;

  return <nav 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-5 px-8 border-b transition-colors duration-300 ease-in-out ${isWhiteBackground && !isDashboard ? 'bg-white text-black border-[#EBEBEB]' : 'bg-black text-white border-[#1A1A1A]'}`}
      aria-label="Main navigation"
    >
      {/* Left menu items */}
      <div className="hidden md:flex space-x-6 font-mono uppercase tracking-wide text-sm">
        {renderSectionLinks}
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild aria-label="Open menu">
            <button className="font-mono uppercase tracking-wide text-sm flex items-center">
              <Menu className="mr-2" size={18} /> Menu
            </button>
          </SheetTrigger>
          <SheetContent side="left" className={`${isWhiteBackground && !isDashboard ? 'bg-white text-black' : 'bg-black text-white'} border-r-[1px] ${isWhiteBackground && !isDashboard ? 'border-[#EBEBEB]' : 'border-[#1A1A1A]'}`}>
            <div className="flex flex-col mt-10 space-y-6 font-mono uppercase tracking-wide text-sm">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <img 
                    src="/public/lovable-uploads/f757621e-0869-4b8d-997f-982e149145c6.png" 
                    alt="Hazli Johar & Co. Logo" 
                    className="h-8 mix-blend-lighten"
                  />
                </div>
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              {isHomePage && (
                <>
                  <a href="#leadership" className="hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>Team</a>
                  <a href="#services" className="hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>Services</a>
                  <a href="#faq" className="hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                </>
              )}
              <div className="pt-6 border-t border-[#333333]">
                <Link to="/contact" className="hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
              </div>
              {user ? (
                <>
                  <Link to="/dashboard" className="hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <button onClick={() => {handleLogout(); setIsMenuOpen(false);}} className="hover:opacity-80 transition-opacity text-left">Logout</button>
                </>
              ) : (
                <Link to="/login" className="hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>Client Login</Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Center logo */}
      <div className="flex items-center font-mono">
        <Link to="/" className="flex items-center">
          <img 
            src="/public/lovable-uploads/f757621e-0869-4b8d-997f-982e149145c6.png" 
            alt="Hazli Johar & Co. Logo" 
            className="h-8 mr-3 mix-blend-lighten"
          />
          {isDashboard && <span className="text-sm font-medium ml-3 opacity-70">Client Portal</span>}
        </Link>
      </div>
      
      {/* Right menu items */}
      <div className="hidden md:flex space-x-6 font-mono uppercase tracking-wide text-sm">
        <Link to="/contact" className="hover:opacity-80 transition-opacity">Contact Us</Link>
        {user ? (
          <>
            <Link to="/dashboard" className="hover:opacity-80 transition-opacity">Dashboard</Link>
            <button onClick={handleLogout} className="hover:opacity-80 transition-opacity">Logout</button>
          </>
        ) : (
          <Link to="/login" className="hover:opacity-80 transition-opacity">Client Login</Link>
        )}
      </div>
      
      {/* Mobile empty div for flex spacing */}
      <div className="md:hidden"></div>
    </nav>;
};

export default Navbar;
