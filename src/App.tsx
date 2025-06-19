
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, Suspense, lazy } from "react";
import { RouteErrorBoundary } from "./components/RouteErrorBoundary";
import { PageTransition } from "./components/PageTransition";
import { GlobalLoadingIndicator } from "./components/GlobalLoadingIndicator";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import Footer from "./components/Footer";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ProfilePage = lazy(() => import("./pages/dashboard/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));
const NotificationsPage = lazy(() => import("./pages/dashboard/NotificationsPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Enhanced loading component for route transitions
const RouteLoader = ({ text = "Loading page..." }: { text?: string }) => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <LoadingSpinner size="lg" text={text} />
  </div>
);

// Protected route wrapper with better UX
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <RouteLoader text="Authenticating..." />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
};

// Public route wrapper (redirects authenticated users)
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <RouteLoader text="Checking authentication..." />;
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
};

// Layout for pages that need the standard footer
const StandardLayout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
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

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <Suspense fallback={<RouteLoader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

// Dashboard layout with enhanced loading states
const DashboardLayout = () => (
  <ProtectedRoute>
    <Suspense fallback={<RouteLoader text="Loading dashboard..." />}>
      <Dashboard />
    </Suspense>
  </ProtectedRoute>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StandardLayout />} errorElement={<RouteErrorBoundary />}>
        <Route index element={
          <PageTransition>
            <Index />
          </PageTransition>
        } />
        <Route path="contact" element={
          <PageTransition>
            <Contact />
          </PageTransition>
        } />
        <Route path="login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Route>
      
      <Route path="/dashboard" element={<DashboardLayout />} errorElement={<RouteErrorBoundary />}>
        <Route index element={<Outlet />} />
        <Route path="profile" element={
          <Suspense fallback={<RouteLoader text="Loading profile..." />}>
            <ProfilePage />
          </Suspense>
        } />
        <Route path="settings" element={
          <Suspense fallback={<RouteLoader text="Loading settings..." />}>
            <SettingsPage />
          </Suspense>
        } />
        <Route path="notifications" element={
          <Suspense fallback={<RouteLoader text="Loading notifications..." />}>
            <NotificationsPage />
          </Suspense>
        } />
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
              <GlobalLoadingIndicator />
              <Suspense fallback={<RouteLoader text="Starting application..." />}>
                <AppRoutes />
              </Suspense>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
