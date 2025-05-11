
import React, { useState } from 'react';
import { Filter, Search, ArrowDown, ArrowUp, SlidersHorizontal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DocumentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  sortField: 'name' | 'uploadDate' | 'serviceType';
  setSortField: (field: 'name' | 'uploadDate' | 'serviceType') => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (direction: 'asc' | 'desc') => void;
  resetFilters: () => void;
  years: number[];
  serviceTypes: string[];
}

const DocumentFilters: React.FC<DocumentFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedType,
  setSelectedType,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  resetFilters,
  years,
  serviceTypes,
}) => {
  const isMobile = useIsMobile();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(!isMobile);
  
  const handleSortChange = (field: 'name' | 'uploadDate' | 'serviceType') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-4 md:p-6 mb-6 md:mb-8">
      <div className="flex flex-col gap-4">
        {/* Search input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777]" size={18} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="bg-[#1A1A1A] border border-[#333] rounded-lg p-3 pl-10 text-white w-full"
            />
          </div>
          
          {isMobile && (
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="bg-[#1A1A1A] border border-[#333] rounded-lg p-3 flex items-center justify-center"
            >
              <SlidersHorizontal size={18} className="text-[#CCC]" />
            </button>
          )}
        </div>
        
        {/* Mobile expandable filters */}
        {showAdvancedFilters && (
          <div className="space-y-3">
            {/* Year filter */}
            <div>
              <label className="block text-sm text-[#777] mb-1 ml-1">Year</label>
              <select
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
                className="bg-[#1A1A1A] border border-[#333] rounded-lg p-3 text-white w-full appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' fill=\'none\'%3E%3Cpath d=\'M2.5 4.5L6 8L9.5 4.5\' stroke=\'%23999999\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            {/* Service type filter */}
            <div>
              <label className="block text-sm text-[#777] mb-1 ml-1">Document Type</label>
              <select
                value={selectedType || ''}
                onChange={(e) => setSelectedType(e.target.value || null)}
                className="bg-[#1A1A1A] border border-[#333] rounded-lg p-3 text-white w-full appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' fill=\'none\'%3E%3Cpath d=\'M2.5 4.5L6 8L9.5 4.5\' stroke=\'%23999999\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              >
                <option value="">All Types</option>
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Sort controls */}
            <div className="flex flex-col space-y-2">
              <label className="block text-sm text-[#777] mb-1 ml-1">Sort By</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleSortChange('name')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg ${sortField === 'name' ? 'bg-[#333] text-white' : 'bg-[#1A1A1A] text-[#CCC]'}`}
                >
                  Name {sortField === 'name' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                </button>
                <button 
                  onClick={() => handleSortChange('uploadDate')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg ${sortField === 'uploadDate' ? 'bg-[#333] text-white' : 'bg-[#1A1A1A] text-[#CCC]'}`}
                >
                  Date {sortField === 'uploadDate' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                </button>
                <button 
                  onClick={() => handleSortChange('serviceType')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg ${sortField === 'serviceType' ? 'bg-[#333] text-white' : 'bg-[#1A1A1A] text-[#CCC]'}`}
                >
                  Type {sortField === 'serviceType' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                </button>
              </div>
            </div>
            
            {/* Reset filters */}
            <button
              onClick={resetFilters}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg p-3 text-white hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
            >
              <Filter size={18} /> Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentFilters;
