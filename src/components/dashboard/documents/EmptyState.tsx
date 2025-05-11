
import React from 'react';

interface EmptyStateProps {
  searchActive: boolean;
  onResetFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchActive, onResetFilters }) => {
  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-12 text-center">
      <p className="text-[#999] mb-4">
        {searchActive ? 
          'No documents match your search criteria' : 
          'No documents found. Upload your first document to get started.'}
      </p>
      {searchActive && (
        <button
          onClick={onResetFilters}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
