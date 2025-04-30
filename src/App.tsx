
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Create a simple registration page
const RegisterPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
    <div className="max-w-md w-full">
      <h1 className="text-4xl font-bold mb-8">Register for Vercel Ship</h1>
      <p className="mb-8">Fill out the form below to register for the event on June 25, 2025.</p>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-mono text-sm">NAME</label>
          <input 
            type="text" 
            id="name" 
            className="w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-mono text-sm">EMAIL</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="company" className="block mb-1 font-mono text-sm">COMPANY</label>
          <input 
            type="text" 
            id="company" 
            className="w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors"
            placeholder="Your company name"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-white text-black py-3 font-medium hover:bg-[#f2f2f2] transition-colors mt-4"
        >
          Complete Registration
        </button>
      </form>
      <div className="mt-8 text-center">
        <a href="/" className="text-[#888] hover:text-white transition-colors">← Back to main site</a>
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ship/register" element={<RegisterPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
