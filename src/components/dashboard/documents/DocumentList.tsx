
import React from 'react';
import DocumentItem from './DocumentItem';
import { Document } from '@/types/document';
import { useIsMobile } from '@/hooks/use-mobile';

interface DocumentListProps {
  docsByYear: Record<number, Document[]>;
  sortedYears: number[];
  onDownload: (document: Document) => void;
  onDelete: (document: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  docsByYear,
  sortedYears,
  onDownload,
  onDelete
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6 md:space-y-8 pb-20 lg:pb-0">
      {sortedYears.map(year => (
        <div key={year} className="space-y-3 md:space-y-4">
          <h3 className={`text-lg font-mono border-b border-[#333] pb-2 ${isMobile ? 'sticky top-0 bg-black z-10' : ''}`}>
            {year}
          </h3>
          <div className="space-y-3">
            {docsByYear[year].map(doc => (
              <DocumentItem 
                key={doc.id} 
                document={doc} 
                onDownload={onDownload} 
                onDelete={onDelete} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
