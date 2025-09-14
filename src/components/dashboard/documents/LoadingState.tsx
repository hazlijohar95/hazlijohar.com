
import React from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const LoadingState: React.FC = () => (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6 md:p-12 text-center">
      <LoadingSpinner 
        size="lg" 
        text="Loading documents..." 
        variant="dots"
        className="py-8"
      />
    </div>
  );

export default LoadingState;
