
import React from 'react';
import { Download, File } from 'lucide-react';
import { Document } from '@/types/document';

interface DocumentItemProps {
  document: Document;
  onDownload: (document: Document) => void;
  onDelete: (document: Document) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onDownload, onDelete }) => {
  return (
    <div 
      className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg p-4 flex items-center justify-between hover:border-[#444] transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-[#1A1A1A] rounded-full p-2">
          <File className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-medium">{document.name}</p>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-[#CCCCCC] font-mono">
              {document.serviceType} • {new Date(document.uploadDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default DocumentItem;
