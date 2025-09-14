
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SEOProvider } from "./components/SEOProvider";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { useEffect, Suspense } from "react";
import { GlobalLoadingIndicator } from "./components/GlobalLoadingIndicator";
import { RouteLoader } from "./components/routing/RouteLoader";
import { AppRoutes } from "./components/routing/AppRoutes";
import { RouteErrorBoundary } from "./components/RouteErrorBoundary";
import { validateEnvironment } from "./utils/security";
import { initWebVitals, observePageLoad, observeResourceLoading } from "./utils/performance";

// Validate environment variables on app startup
try {
  validateEnvironment();
} catch (error) {
  console.error('Environment validation failed:', error);
  // In production, you might want to show a user-friendly error page
  if (import.meta.env.PROD) {
    throw new Error('Application configuration error. Please contact support.');
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('Query mutation error:', error);
      },
    },
  },
});

const App = () => {
  const { isMobile, isIOS } = useMobileOptimizations();
  
  // Initialize Web Vitals and preload critical resources
  useEffect(() => {
    // Initialize Web Vitals performance monitoring
    initWebVitals();
    observePageLoad();
    observeResourceLoading();

    const preloadCritical = (): void => {
      const criticalImages = ['/placeholder.svg'];
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Delay preloading to not block initial render
    const timeoutId = setTimeout(preloadCritical, 1000);

    return () => clearTimeout(timeoutId);
  }, []);
  
  return (
    <RouteErrorBoundary>
      <SEOProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <div
                  className={`min-h-screen bg-black text-white ${
                    isMobile ? 'mobile-app-shell mobile-viewport' : ''
                  } ${isIOS ? 'ios-optimized' : ''}`}
                  style={{
                    // Enhanced mobile viewport handling
                    ...(isMobile && {
                      minHeight: '100dvh', // Dynamic viewport height
                    }),
                  }}
                >
                  <GlobalLoadingIndicator />
                  <Suspense fallback={<RouteLoader text="Starting..." variant="dots" />}>
                    <AppRoutes />
                  </Suspense>
                </div>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </SEOProvider>
    </RouteErrorBoundary>
  );
};

export default App;
