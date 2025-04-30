
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8">Client Login</h1>
        <p className="mb-8">Enter your credentials to access your financial documents and reports.</p>
        <form className="space-y-4">
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
            <label htmlFor="password" className="block mb-1 font-mono text-sm">PASSWORD</label>
            <input 
              type="password" 
              id="password" 
              className="w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-[#888] hover:text-white transition-colors">Forgot password?</Link>
          </div>
          <button 
            type="submit" 
            className="w-full bg-white text-black py-3 font-medium hover:bg-[#f2f2f2] transition-colors mt-4"
          >
            Log In
          </button>
        </form>
        <div className="mt-8 text-center space-y-4">
          <p>Don't have an account? <Link to="/register" className="text-white hover:underline">Register now</Link></p>
          <Link to="/" className="text-[#888] hover:text-white transition-colors block">← Back to main site</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
