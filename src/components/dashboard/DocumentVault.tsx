
import React, { useState } from 'react';
import { useDocuments } from '@/hooks/useDocuments';
import { Document } from '@/types/document';
import DocumentUploader from './DocumentUploader';
import DocumentFilters from './documents/DocumentFilters';
import DocumentList from './documents/DocumentList';
import EmptyState from './documents/EmptyState';
import LoadingState from './documents/LoadingState';
import DeleteConfirmDialog from './documents/DeleteConfirmDialog';

const DocumentVault: React.FC = () => {
  // Use our custom hook to manage documents
  const { 
    documents, 
    isLoading, 
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

  // Check if search or filters are active
  const isSearchActive = searchQuery || selectedYear || selectedType;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Your Files</h2>
        <DocumentUploader />
      </div>
      
      <DocumentFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        resetFilters={resetFilters}
        years={years}
        serviceTypes={serviceTypes}
      />
      
      {isLoading ? (
        <LoadingState />
      ) : filteredDocs.length === 0 ? (
        <EmptyState 
          searchActive={!!isSearchActive} 
          onResetFilters={resetFilters} 
        />
      ) : (
        <DocumentList 
          docsByYear={docsByYear}
          sortedYears={sortedYears}
          onDownload={handleDownload}
          onDelete={confirmDelete}
        />
      )}

      <DeleteConfirmDialog 
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        documentToDelete={documentToDelete}
        onConfirmDelete={handleDelete}
      />
    </div>
  );
};

export default DocumentVault;
