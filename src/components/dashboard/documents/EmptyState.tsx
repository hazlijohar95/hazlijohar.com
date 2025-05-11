
import React from 'react';
import { FilePlus, SearchX } from 'lucide-react';

interface EmptyStateProps {
  searchActive: boolean;
  onResetFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchActive, onResetFilters }) => {
  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6 md:p-12 text-center">
      <div className="flex flex-col items-center">
        {searchActive ? (
          <>
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4">
              <SearchX size={32} className="text-[#777]" />
            </div>
            <p className="text-[#999] mb-6">
              No documents match your search criteria
            </p>
            <button
              onClick={onResetFilters}
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors active:scale-95 transform"
            >
              Clear All Filters
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4">
              <FilePlus size={32} className="text-[#777]" />
            </div>
            <p className="text-[#999] mb-2">
              No documents found
            </p>
            <p className="text-[#777] text-sm mb-6">
              Upload your first document to get started
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
