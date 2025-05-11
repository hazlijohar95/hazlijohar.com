
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import ProfilePage from "./pages/dashboard/ProfilePage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Layout for pages that need the standard footer
const StandardLayout = () => {
  const isMobile = useIsMobile();
  
  // Apply touch-friendly mobile optimizations
  useEffect(() => {
    if (isMobile) {
      // Prevent zooming on inputs
      const metaViewport = document.querySelector('meta[name=viewport]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.getElementsByTagName('head')[0].appendChild(meta);
      }
      
      // Add touch action for smoother scrolling
      document.body.style.touchAction = 'manipulation';
      document.documentElement.style.touchAction = 'manipulation';
      
      // Set iOS specific styles
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        document.body.classList.add('ios-device');
      }
    }
    
    return () => {
      // Reset viewport when component unmounts
      const metaViewport = document.querySelector('meta[name=viewport]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    };
  }, [isMobile]);

  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

// Dashboard layout with outlet for nested routes
const DashboardLayout = () => (
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
);

const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  // Don't render anything while checking auth state
  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>;
  }

  return (
    <Routes>
      <Route path="/" element={<StandardLayout />}>
        <Route index element={<Index />} />
        <Route path="contact" element={<Contact />} />
        <Route 
          path="login" 
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route 
          path="register" 
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Outlet />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  const isMobile = useIsMobile();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className={`${isMobile ? 'mobile-app-shell' : ''}`}>
              <AppRoutes />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
