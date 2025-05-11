
import React from 'react';
import { Filter, Search, ArrowDown, ArrowUp } from 'lucide-react';
import { Document } from '@/types/document';

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
  const handleSortChange = (field: 'name' | 'uploadDate' | 'serviceType') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777]" size={18} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="bg-[#1A1A1A] border border-[#333] rounded-md p-3 pl-10 text-white w-full"
            />
          </div>
        </div>
        
        {/* Year filter */}
        <div className="w-full md:w-48">
          <select
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
            className="bg-[#1A1A1A] border border-[#333] rounded-md p-3 text-white w-full"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        {/* Service type filter */}
        <div className="w-full md:w-48">
          <select
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value || null)}
            className="bg-[#1A1A1A] border border-[#333] rounded-md p-3 text-white w-full"
          >
            <option value="">All Types</option>
            {serviceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        {/* Reset filters */}
        <button
          onClick={resetFilters}
          className="bg-[#1A1A1A] border border-[#333] rounded-md p-3 text-white hover:bg-[#333] transition-colors md:whitespace-nowrap flex items-center justify-center gap-2"
        >
          <Filter size={18} /> Reset Filters
        </button>
      </div>
      
      {/* Sort controls */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-[#777]">Sort by:</span>
        <button 
          onClick={() => handleSortChange('name')}
          className={`flex items-center gap-1 px-2 py-1 rounded ${sortField === 'name' ? 'bg-[#333] text-white' : 'text-[#CCC]'}`}
        >
          Name {sortField === 'name' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
        </button>
        <button 
          onClick={() => handleSortChange('uploadDate')}
          className={`flex items-center gap-1 px-2 py-1 rounded ${sortField === 'uploadDate' ? 'bg-[#333] text-white' : 'text-[#CCC]'}`}
        >
          Date {sortField === 'uploadDate' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
        </button>
        <button 
          onClick={() => handleSortChange('serviceType')}
          className={`flex items-center gap-1 px-2 py-1 rounded ${sortField === 'serviceType' ? 'bg-[#333] text-white' : 'text-[#CCC]'}`}
        >
          Type {sortField === 'serviceType' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
        </button>
      </div>
    </div>
  );
};

export default DocumentFilters;
