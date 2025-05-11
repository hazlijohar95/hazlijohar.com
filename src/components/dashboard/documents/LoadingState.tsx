
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-12 text-center">
      <p className="text-[#999]">Loading documents...</p>
    </div>
  );
};

export default LoadingState;
