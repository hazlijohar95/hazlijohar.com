
import React, { useState } from 'react';
import { Download, Search, ArrowDown, ArrowUp, Filter, File } from 'lucide-react';
import { styles } from '@/styles/common-styles';
import { useDocuments } from '@/hooks/useDocuments';
import { Document } from '@/types/document';
import DocumentUploader from './DocumentUploader';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';

const DocumentVault: React.FC = () => {
  // Use our custom hook to manage documents
  const { 
    documents, 
    isLoading, 
    isUploading, 
    uploadDocument, 
    deleteDocument, 
    downloadDocument 
  } = useDocuments();

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'uploadDate' | 'serviceType'>('uploadDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);

  // Get unique years and service types for filters
  const years = [...new Set(documents.map(doc => doc.year))].sort((a, b) => b - a);
  const serviceTypes = [...new Set(documents.map(doc => doc.serviceType))].sort();

  // Filter and sort documents
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === null || doc.year === selectedYear;
    const matchesType = selectedType === null || doc.serviceType === selectedType;
    
    return matchesSearch && matchesYear && matchesType;
  }).sort((a, b) => {
    if (sortField === 'uploadDate') {
      return sortDirection === 'asc' 
        ? new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        : new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    } else if (sortField === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === 'asc'
        ? a.serviceType.localeCompare(b.serviceType)
        : b.serviceType.localeCompare(a.serviceType);
    }
  });

  // Group documents by year after filtering and sorting
  const docsByYear = filteredDocs.reduce((acc, doc) => {
    if (!acc[doc.year]) {
      acc[doc.year] = [];
    }
    acc[doc.year].push(doc);
    return acc;
  }, {} as Record<number, Document[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(docsByYear).map(Number).sort((a, b) => b - a);

  const handleSortChange = (field: 'name' | 'uploadDate' | 'serviceType') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDownload = (document: Document) => {
    downloadDocument(document);
  };

  const confirmDelete = (document: Document) => {
    setDocumentToDelete(document);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (documentToDelete) {
      await deleteDocument(documentToDelete.id);
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedYear(null);
    setSelectedType(null);
    setSortField('uploadDate');
    setSortDirection('desc');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Your Files</h2>
        <DocumentUploader isUploading={isUploading} onUpload={uploadDocument} />
      </div>
      
      {/* Search and filter controls */}
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
      
      {isLoading ? (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-12 text-center">
          <p className="text-[#999]">Loading documents...</p>
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-12 text-center">
          <p className="text-[#999] mb-4">
            {searchQuery || selectedYear || selectedType ? 
              'No documents match your search criteria' : 
              'No documents found. Upload your first document to get started.'}
          </p>
          {(searchQuery || selectedYear || selectedType) && (
            <button
              onClick={resetFilters}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {sortedYears.map(year => (
            <div key={year} className="space-y-4">
              <h3 className="text-lg font-mono border-b border-[#333] pb-2">{year}</h3>
              <div className="space-y-3">
                {docsByYear[year].map(doc => (
                  <div 
                    key={doc.id}
                    className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg p-4 flex items-center justify-between hover:border-[#444] transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#1A1A1A] rounded-full p-2">
                        <File className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center mt-1 text-sm">
                          <span className="text-[#CCCCCC] font-mono">
                            {doc.serviceType} • {new Date(doc.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownload(doc)}
                        className="border border-[#333] text-white hover:bg-[#1A1A1A] px-3 py-2 rounded flex items-center transition-colors"
                      >
                        <Download className="h-4 w-4 mr-1" /> Download
                      </button>
                      <button
                        onClick={() => confirmDelete(doc)}
                        className="border border-[#333] text-white hover:bg-[#1A1A1A] hover:text-red-400 hover:border-red-400/50 px-3 py-2 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#0F0F0F] border border-[#333] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription className="text-[#999]">
              Are you sure you want to delete "{documentToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#333] text-white hover:bg-[#1A1A1A]">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DocumentVault;
