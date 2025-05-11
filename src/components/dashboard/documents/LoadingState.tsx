
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6 md:p-12 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 w-full h-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute top-0 w-full h-full border-4 border-t-transparent border-r-white border-b-transparent border-l-transparent rounded-full animate-ping opacity-20"></div>
        </div>
        <p className="text-[#999] mt-4 animate-pulse">Loading documents...</p>
      </div>
    </div>
  );
};

export default LoadingState;
