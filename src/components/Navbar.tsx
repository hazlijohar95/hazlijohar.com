
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrollObserver } from '../hooks/useScrollObserver';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, X, ArrowLeft, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from './ui/button';

const Navbar = () => {
  const [isWhiteBackground, setIsWhiteBackground] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
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
      setIsWhiteBackground(false);
    } else if (isIntersecting['services']) {
      setIsWhiteBackground(true);
    } else if (!isIntersecting['hero']) {
      setIsWhiteBackground(true);
    } else {
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

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleBackNavigation = () => {
    // If there's browser history, go back, otherwise go to home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Check if we're on the dashboard
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Check if we need a back button (for non-home, non-dashboard pages)
  const needsBackButton = !isHomePage && !isDashboard && location.pathname !== '/login' && location.pathname !== '/register';

  // Only show section links on home page
  const renderSectionLinks = isHomePage ? (
    <>
      <a href="#leadership" className="hover:opacity-80 transition-opacity">Team</a>
      <a href="#services" className="hover:opacity-80 transition-opacity">Services</a>
      <a href="#faq" className="hover:opacity-80 transition-opacity">FAQ</a>
    </>
  ) : null;

  // Minimalist HJ Logo component
  const MinimalistHJLogo = ({ className = "" }) => (
    <div className={`font-mono font-bold ${className}`}>
      <span className="tracking-tighter">H</span>
      <span className="tracking-tighter">J</span>
    </div>
  );

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 sm:py-5 px-4 sm:px-8 border-b transition-all duration-300 ease-in-out backdrop-blur-sm ${
        isWhiteBackground && !isDashboard 
          ? 'bg-white/95 text-black border-[#EBEBEB]' 
          : 'bg-black/95 text-white border-[#1A1A1A]'
      }`}
      aria-label="Main navigation"
    >
      {/* Left menu items / Back button */}
      <div className="hidden md:flex space-x-6 font-mono uppercase tracking-wide text-sm">
        {needsBackButton ? (
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleBackNavigation}
              className="flex items-center gap-2 px-0 hover:bg-transparent"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Home size={16} />
              Home
            </Link>
          </div>
        ) : (
          renderSectionLinks
        )}
      </div>
      
      {/* Mobile menu button / Back button */}
      <div className="md:hidden">
        {needsBackButton ? (
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={handleBackNavigation}
              className="font-mono uppercase tracking-wide text-sm flex items-center gap-1 px-0"
            >
              <ArrowLeft size={14} />
              Back
            </Button>
            <Link 
              to="/" 
              className="font-mono uppercase tracking-wide text-sm flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Home size={14} />
              Home
            </Link>
          </div>
        ) : (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild aria-label="Open menu">
              <button className="font-mono uppercase tracking-wide text-sm flex items-center">
                <Menu className="mr-2" size={18} /> Menu
              </button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className={`p-0 ${
                isWhiteBackground && !isDashboard 
                  ? 'bg-white text-black' 
                  : 'bg-black text-white'
              } border-r-[1px] ${
                isWhiteBackground && !isDashboard 
                  ? 'border-[#EBEBEB]' 
                  : 'border-[#1A1A1A]'
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-[#333333]">
                  <div className="flex items-center">
                    <MinimalistHJLogo className="text-2xl" />
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto pt-4 px-4">
                  {isHomePage && (
                    <div className="space-y-6 font-mono uppercase tracking-wide text-sm mb-6">
                      <a href="#leadership" className="block hover:opacity-80 transition-opacity py-2" onClick={() => setIsMenuOpen(false)}>Team</a>
                      <a href="#services" className="block hover:opacity-80 transition-opacity py-2" onClick={() => setIsMenuOpen(false)}>Services</a>
                      <a href="#faq" className="block hover:opacity-80 transition-opacity py-2" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                    </div>
                  )}
                  
                  <div className="pt-6 border-t border-[#333333] space-y-6 font-mono uppercase tracking-wide text-sm">
                    <button 
                      onClick={() => handleNavigation("/contact")} 
                      className="block hover:opacity-80 transition-opacity py-2 text-left w-full"
                    >
                      Contact Us
                    </button>
                    {user ? (
                      <>
                        <button 
                          onClick={() => handleNavigation("/dashboard")} 
                          className="block hover:opacity-80 transition-opacity py-2 text-left w-full"
                        >
                          Dashboard
                        </button>
                        <button 
                          onClick={() => {handleLogout(); setIsMenuOpen(false);}} 
                          className="block hover:opacity-80 transition-opacity text-left w-full py-2"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleNavigation("/login")} 
                        className="block hover:opacity-80 transition-opacity py-2 text-left w-full"
                      >
                        Client Login
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
      
      {/* Center logo */}
      <div className="flex items-center font-mono">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <MinimalistHJLogo className="text-2xl sm:text-3xl mr-3" />
          {isDashboard && <span className="text-xs sm:text-sm font-medium ml-1 sm:ml-3 opacity-70">Client Portal</span>}
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
    </nav>
  );
};

export default Navbar;
