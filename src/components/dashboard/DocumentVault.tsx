
import React, { useState } from 'react';
import { File, Download } from 'lucide-react';
import { styles } from '@/styles/common-styles';

// Types for our document data
interface Document {
  id: string;
  name: string;
  serviceType: string;
  uploadDate: string;
  year: number;
  downloadUrl: string;
}

const DocumentVault: React.FC = () => {
  // In a real app, this data would come from Supabase
  const [documents] = useState<Document[]>([
    { 
      id: '1', 
      name: 'Annual Tax Return.pdf', 
      serviceType: 'Tax', 
      uploadDate: '2023-11-15', 
      year: 2023, 
      downloadUrl: '#' 
    },
    { 
      id: '2', 
      name: 'Q4 Financial Statement.pdf', 
      serviceType: 'Audit', 
      uploadDate: '2023-10-05', 
      year: 2023, 
      downloadUrl: '#' 
    },
    { 
      id: '3', 
      name: 'January Payroll Summary.pdf', 
      serviceType: 'Payroll', 
      uploadDate: '2023-02-01', 
      year: 2023, 
      downloadUrl: '#' 
    },
    { 
      id: '4', 
      name: 'Annual Accounts.pdf', 
      serviceType: 'Audit', 
      uploadDate: '2022-12-20', 
      year: 2022, 
      downloadUrl: '#' 
    },
  ]);

  // Group documents by year
  const documentsByYear = documents.reduce((acc, doc) => {
    if (!acc[doc.year]) {
      acc[doc.year] = [];
    }
    acc[doc.year].push(doc);
    return acc;
  }, {} as Record<number, Document[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(documentsByYear).map(Number).sort((a, b) => b - a);

  const handleDownload = (documentId: string) => {
    // In a real app, this would download the file from Supabase storage
    console.log(`Downloading document with ID: ${documentId}`);
  };

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-medium mb-6">Your Files</h2>
      
      <div className="space-y-8">
        {sortedYears.map(year => (
          <div key={year} className="space-y-4">
            <h3 className="text-lg font-mono border-b border-[#333] pb-2">{year}</h3>
            <div className="space-y-3">
              {documentsByYear[year].map(doc => (
                <div 
                  key={doc.id}
                  className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg p-4 flex items-center justify-between"
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
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className={`${styles.buttonOutline} text-white border-[#333] hover:bg-[#1A1A1A] px-3 flex items-center`}
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DocumentVault;
