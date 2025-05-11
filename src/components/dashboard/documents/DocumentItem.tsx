
import React, { useState } from 'react';
import { Download, File, Trash2, MoreVertical } from 'lucide-react';
import { Document } from '@/types/document';
import { useIsMobile } from '@/hooks/use-mobile';

interface DocumentItemProps {
  document: Document;
  onDownload: (document: Document) => void;
  onDelete: (document: Document) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onDownload, onDelete }) => {
  const isMobile = useIsMobile();
  const [showActions, setShowActions] = useState(false);
  
  const toggleActions = () => {
    if (isMobile) {
      setShowActions(!showActions);
    }
  };
  
  // Format date to be more compact on mobile
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isMobile 
      ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : date.toLocaleDateString();
  };

  return (
    <div 
      className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg p-4 hover:border-[#444] transition-all active:bg-[#111] touch-manipulation"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1" onClick={toggleActions}>
          <div className="bg-[#1A1A1A] rounded-full p-2 flex-shrink-0">
            <File className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">{document.name}</p>
            <div className="flex items-center mt-1">
              <span className="text-[#CCCCCC] font-mono text-xs">
                {document.serviceType} • {formatDate(document.uploadDate)}
              </span>
            </div>
          </div>
        </div>
        
        {isMobile ? (
          <button 
            onClick={toggleActions} 
            className="p-2 rounded-full hover:bg-[#1A1A1A] active:bg-[#333]"
          >
            <MoreVertical size={20} className="text-[#CCC]" />
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => onDownload(document)}
              className="border border-[#333] text-white hover:bg-[#1A1A1A] px-3 py-2 rounded flex items-center transition-colors"
            >
              <Download className="h-4 w-4 mr-1" /> Download
            </button>
            <button
              onClick={() => onDelete(document)}
              className="border border-[#333] text-white hover:bg-[#1A1A1A] hover:text-red-400 hover:border-red-400/50 px-3 py-2 rounded transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      
      {/* Mobile action menu */}
      {isMobile && showActions && (
        <div className="mt-3 pt-3 border-t border-[#1A1A1A] grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onDownload(document);
              setShowActions(false);
            }}
            className="flex items-center justify-center bg-[#1A1A1A] text-white py-3 px-4 rounded-lg active:scale-95 transform transition-transform"
          >
            <Download className="h-4 w-4 mr-2" /> Download
          </button>
          <button
            onClick={() => {
              onDelete(document);
              setShowActions(false);
            }}
            className="flex items-center justify-center bg-[#1A1A1A] text-red-400 py-3 px-4 rounded-lg active:scale-95 transform transition-transform"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentItem;
