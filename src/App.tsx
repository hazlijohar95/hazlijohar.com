
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
import { SmoothScroll } from "./components/ui/SmoothScroll";
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
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Enhanced loading component with better UX
const RouteLoader = ({ text = "Loading...", variant = "default" }: { 
  text?: string; 
  variant?: "default" | "dots" | "pulse" 
}) => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <LoadingSpinner size="lg" text={text} variant={variant} />
  </div>
);

// Protected route with smooth transitions
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <RouteLoader text="Authenticating..." variant="pulse" />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <PageTransition variant="fade">
      {children}
    </PageTransition>
  );
};

// Public route with redirect handling
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <RouteLoader text="Loading..." variant="dots" />;
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <PageTransition variant="slide">
      {children}
    </PageTransition>
  );
};

// Standard layout with smooth scrolling
const StandardLayout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Mobile optimizations
  useEffect(() => {
    if (isMobile) {
      // Prevent zoom on inputs
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
      
      // Optimize touch interactions with proper typing
      document.body.style.touchAction = 'manipulation';
      (document.body.style as any).webkitTouchCallout = 'none';
      (document.body.style as any).webkitUserSelect = 'none';
      
      // iOS specific optimizations
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        (document.body.style as any).webkitOverflowScrolling = 'touch';
        (document.documentElement.style as any).webkitTextSizeAdjust = '100%';
      }
    }
    
    return () => {
      if (isMobile) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
      }
    };
  }, [isMobile]);

  return (
    <SmoothScroll>
      <Suspense fallback={<RouteLoader variant="dots" />}>
        <Outlet />
      </Suspense>
      <Footer />
    </SmoothScroll>
  );
};

// Dashboard layout
const DashboardLayout = () => (
  <ProtectedRoute>
    <Suspense fallback={<RouteLoader text="Loading dashboard..." variant="pulse" />}>
      <Dashboard />
    </Suspense>
  </ProtectedRoute>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StandardLayout />} errorElement={<RouteErrorBoundary />}>
        <Route index element={
          <PageTransition variant="fade">
            <Index />
          </PageTransition>
        } />
        <Route path="contact" element={
          <PageTransition variant="slide">
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
          <PageTransition variant="scale">
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
  
  // Preload critical resources
  useEffect(() => {
    const preloadCritical = () => {
      const criticalImages = ['/placeholder.svg'];
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        document.head.appendChild(link);
      });
    };
    
    // Delay preloading to not block initial render
    setTimeout(preloadCritical, 1000);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className={`${isMobile ? 'mobile-app-shell' : ''} min-h-screen bg-black text-white`}>
              <GlobalLoadingIndicator />
              <Suspense fallback={<RouteLoader text="Starting..." variant="dots" />}>
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
