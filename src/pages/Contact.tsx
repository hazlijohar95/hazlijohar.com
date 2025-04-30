
import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-12">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl mb-6 font-mono">GET IN TOUCH</h2>
            <p className="mb-8 text-[#888] max-w-md">
              Have questions about our services? Want to discuss how we can help your business?
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-mono text-[#888] mb-1">EMAIL</h3>
                <p>contact@acmefirm.com</p>
              </div>
              <div>
                <h3 className="text-sm font-mono text-[#888] mb-1">PHONE</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-sm font-mono text-[#888] mb-1">ADDRESS</h3>
                <p>123 Finance Street<br />Business District<br />New York, NY 10001</p>
              </div>
            </div>
          </div>
          
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-mono text-sm">NAME</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-mono text-sm">EMAIL</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-mono text-sm">MESSAGE</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-white text-black py-3 font-medium hover:bg-[#f2f2f2] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
