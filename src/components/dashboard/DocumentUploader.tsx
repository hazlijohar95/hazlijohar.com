
import React, { useState, useCallback } from 'react';
import { useDocuments } from '@/hooks/useDocuments';
import { validateFileType, validateFileSize, ALLOWED_DOCUMENT_TYPES, MAX_FILE_SIZE_MB, validateFileName, sanitizeInput } from '@/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, File, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DocumentUploader: React.FC = () => {
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
  ] as const;

  const handleFileSelect = useCallback((file: File): void => {
    // Validate file name for security
    if (!validateFileName(file.name)) {
      toast({
        title: 'Invalid file name',
        description: 'File name contains invalid characters or is not allowed.',
        variant: 'destructive'
      });
      return;
    }

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
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0] as File);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0] as File);
    }
  }, [handleFileSelect]);

  const handleUpload = useCallback(async (): Promise<void> => {
    if (!selectedFile || !serviceType) {
      toast({
        title: 'Missing information',
        description: 'Please select a file and service type.',
        variant: 'destructive'
      });
      return;
    }

    const success = await uploadDocument(selectedFile, serviceType);
    
    if (success) {
      // Reset form
      setSelectedFile(null);
      setServiceType('');
      
      // Clear file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }, [selectedFile, serviceType, uploadDocument]);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return (
    <Card className="bg-[#0F0F0F] border border-[#1A1A1A] text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Service Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="service-type" className="block font-mono text-sm">SERVICE TYPE</Label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="bg-[#111] border border-[#333] text-white">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent className="bg-[#111] border border-[#333] text-white">
              {serviceTypes.map((type) => (
                <SelectItem key={type} value={type} className="text-white hover:bg-[#333]">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* File Upload Area */}
        <div className="space-y-2">
          <Label className="block font-mono text-sm">DOCUMENT</Label>
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
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
              accept={ALLOWED_DOCUMENT_TYPES.join(',')}
            />
            
            {selectedFile ? (
              <div className="space-y-2">
                <File className="h-8 w-8 mx-auto text-green-500" />
                <div>
                  <p className="font-medium text-white">{selectedFile.name}</p>
                  <p className="text-sm text-[#999]">{formatFileSize(selectedFile.size)}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  className="text-red-400 border-red-400 hover:bg-red-400/10"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 mx-auto text-[#666]" />
                <div>
                  <p className="text-white">
                    Drag and drop your file here, or{' '}
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-input')?.click()}
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-[#999] mt-1">
                    Supported formats: PDF, Word, Excel, Images (max {MAX_FILE_SIZE_MB}MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !serviceType || isUploading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-[#333] disabled:text-[#666]"
        >
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </Button>

        {/* Security Notice */}
        <div className="flex items-start gap-2 p-3 bg-[#1A1A1A] rounded-lg">
          <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-[#999]">
            <p className="font-medium text-yellow-500 mb-1">Security Notice</p>
            <p>Your documents are encrypted and stored securely. Only authorized personnel can access your files.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
