import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { toast } from '@/components/ui/use-toast';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      id,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon."
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };
  return <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-12">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-mono">GET IN TOUCH</h2>
            <p className="mb-6 sm:mb-8 text-[#888] max-w-md">
              Have questions about our services? Want to discuss how we can help your business?
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h3 className="text-sm font-mono text-[#888] mb-1">EMAIL</h3>
                <p>contact@acmefirm.com</p>
              </div>
              <div>
                <h3 className="text-sm font-mono text-[#888] mb-1">PHONE</h3>
                <p>+6016-3889123</p>
              </div>
              <div>
                <h3 className="text-sm font-mono text-[#888] mb-1">ADDRESS</h3>
                <p>123 Finance Street<br />Business District<br />New York, NY 10001</p>
              </div>
            </div>
          </div>
          
          <div>
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 font-mono text-sm">NAME</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-mono text-sm">EMAIL</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors" required />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-mono text-sm">MESSAGE</label>
                <textarea id="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors" required></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black py-3 font-medium hover:bg-[#f2f2f2] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default Contact;