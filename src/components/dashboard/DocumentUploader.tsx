
import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { styles } from '@/styles/common-styles';
import { DocumentFormData, SERVICE_TYPES } from '@/types/document';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocumentUploaderProps {
  isUploading: boolean;
  onUpload: (file: File, serviceType: string) => Promise<void>;
}

const DocumentUploader = ({ isUploading, onUpload }: DocumentUploaderProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<DocumentFormData>({
    file: null as unknown as File,
    serviceType: ''
  });
  const [isDragging, setIsDragging] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({
        ...formData,
        file: e.dataTransfer.files[0]
      });
      setFileSelected(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0]
      });
      setFileSelected(true);
    }
  };

  const handleServiceTypeChange = (value: string) => {
    setFormData({
      ...formData,
      serviceType: value
    });
  };

  const handleUpload = async () => {
    if (!formData.file || !formData.serviceType) return;
    
    await onUpload(formData.file, formData.serviceType);
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setFormData({
      file: null as unknown as File,
      serviceType: ''
    });
    setFileSelected(false);
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  const removeFile = () => {
    setFormData({
      ...formData,
      file: null as unknown as File
    });
    setFileSelected(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-white text-black hover:bg-gray-200 flex items-center gap-2"
        >
          <Upload size={18} /> Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0F0F0F] border border-[#333] text-white sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Upload Document</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          {!fileSelected ? (
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragging ? 'border-white bg-[#1A1A1A]' : 'border-[#333] hover:border-[#555]'}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
              />
              <Upload className="mx-auto h-12 w-12 text-[#777] mb-2" />
              <p className="text-lg font-medium">Drop your file here, or click to browse</p>
              <p className="text-sm text-[#999] mt-1">PDF, Office documents, and images supported</p>
            </div>
          ) : (
            <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#222] rounded-full p-2">
                    <File className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{formData.file.name}</p>
                    <p className="text-xs text-[#999]">{formatFileSize(formData.file.size)}</p>
                  </div>
                </div>
                <button 
                  onClick={removeFile}
                  className="text-[#999] hover:text-white p-1 rounded-full hover:bg-[#333] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="serviceType">Document Type</Label>
            <Select 
              value={formData.serviceType}
              onValueChange={handleServiceTypeChange}
            >
              <SelectTrigger className="bg-[#1A1A1A] border-[#333] text-white">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#333] text-white">
                {SERVICE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline"
            onClick={handleCancel}
            className="border-[#333] text-white hover:bg-[#1A1A1A]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!fileSelected || !formData.serviceType || isUploading}
            className="bg-white text-black hover:bg-gray-200"
          >
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploader;
