
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SEOProvider } from "./components/SEOProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, Suspense } from "react";
import { GlobalLoadingIndicator } from "./components/GlobalLoadingIndicator";
import { RouteLoader } from "./components/routing/RouteLoader";
import { AppRoutes } from "./components/routing/AppRoutes";

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
    <SEOProvider>
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
    </SEOProvider>
  );
};

export default App;
