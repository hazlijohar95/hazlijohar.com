
import React, { useState } from 'react';
import { useDocuments } from '@/hooks/useDocuments';
import { validateFileType, validateFileSize, ALLOWED_DOCUMENT_TYPES, MAX_FILE_SIZE_MB } from '@/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, File, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DocumentUploader = () => {
  const { uploadDocument, isUploading } = useDocuments();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [serviceType, setServiceType] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  const serviceTypes = [
    'Accounting Services',
    'Tax Preparation',
    'Audit Services',
    'Financial Planning',
    'Business Consultation',
    'Other'
  ];

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!validateFileType(file, ALLOWED_DOCUMENT_TYPES)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload PDF, Word, Excel, or image files only.',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size
    if (!validateFileSize(file, MAX_FILE_SIZE_MB)) {
      toast({
        title: 'File too large',
        description: `Please upload files smaller than ${MAX_FILE_SIZE_MB}MB.`,
        variant: 'destructive'
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !serviceType) {
      toast({
        title: 'Missing information',
        description: 'Please select a file and service type.',
        variant: 'destructive'
      });
      return;
    }

    await uploadDocument(selectedFile, serviceType);
    
    // Reset form
    setSelectedFile(null);
    setServiceType('');
    
    // Clear file input
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="bg-[#111] border-[#333] text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-[#333] hover:border-[#555]'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {selectedFile ? (
            <div className="flex items-center justify-center gap-2">
              <File className="h-5 w-5 text-blue-400" />
              <div className="text-left">
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-[#999]">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
          ) : (
            <div>
              <Upload className="h-8 w-8 mx-auto mb-2 text-[#666]" />
              <p className="text-[#999] mb-2">Drag and drop your file here, or click to select</p>
              <p className="text-xs text-[#666]">
                Supported: PDF, Word, Excel, Images (Max {MAX_FILE_SIZE_MB}MB)
              </p>
            </div>
          )}
          <input
            id="file-input"
            type="file"
            accept={ALLOWED_DOCUMENT_TYPES.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            className="mt-4 bg-transparent border-[#333] hover:bg-[#222]"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            Select File
          </Button>
        </div>

        {/* Service Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="service-type">Service Type</Label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="bg-[#222] border-[#444] text-white">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent className="bg-[#222] border-[#444] text-white">
              {serviceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-400">Secure Upload</p>
            <p className="text-[#999]">
              Your documents are encrypted and stored securely. Only you and authorized personnel can access them.
            </p>
          </div>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !serviceType || isUploading}
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
