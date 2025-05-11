
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Document } from '@/types/document';
import { toast } from '@/hooks/use-toast';

export const useDocuments = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch all documents for the current user
  const fetchDocuments = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch documents metadata from database
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('upload_date', { ascending: false });
      
      if (error) throw error;
      
      // For each document, get the file URL
      const docsWithUrls = await Promise.all(data.map(async (doc) => {
        // Get signed URL for each file (valid for 1 hour)
        const { data: fileUrl } = await supabase
          .storage
          .from('client_documents')
          .createSignedUrl(`${doc.user_id}/${doc.id}`, 3600);
        
        return {
          id: doc.id,
          name: doc.name,
          serviceType: doc.service_type,
          uploadDate: doc.upload_date,
          year: new Date(doc.upload_date).getFullYear(),
          userId: doc.user_id,
          fileType: doc.file_type,
          size: doc.size,
          fileUrl: fileUrl?.signedUrl
        } as Document;
      }));
      
      setDocuments(docsWithUrls);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: 'Error fetching documents',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Upload a new document
  const uploadDocument = async (file: File, serviceType: string) => {
    if (!user) return;
    
    setIsUploading(true);
    try {
      // Generate a unique ID for the document
      const documentId = crypto.randomUUID();
      const filePath = `${user.id}/${documentId}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase
        .storage
        .from('client_documents')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Insert document metadata into the database
      const { error: insertError } = await supabase
        .from('documents')
        .insert({
          id: documentId,
          name: file.name,
          service_type: serviceType,
          upload_date: new Date().toISOString(),
          user_id: user.id,
          file_type: file.type,
          size: file.size
        });
      
      if (insertError) throw insertError;
      
      toast({
        title: 'Document uploaded',
        description: 'Your document has been uploaded successfully.',
      });
      
      // Refresh documents list
      fetchDocuments();
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: 'Error uploading document',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Delete a document
  const deleteDocument = async (documentId: string) => {
    if (!user) return;
    
    try {
      // Delete document from storage
      const { error: storageError } = await supabase
        .storage
        .from('client_documents')
        .remove([`${user.id}/${documentId}`]);
      
      if (storageError) throw storageError;
      
      // Delete document metadata from database
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);
      
      if (dbError) throw dbError;
      
      // Update local state
      setDocuments(documents.filter(doc => doc.id !== documentId));
      
      toast({
        title: 'Document deleted',
        description: 'Your document has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: 'Error deleting document',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    }
  };

  // Download a document
  const downloadDocument = async (document: Document) => {
    if (!document.fileUrl) {
      toast({
        title: 'Error downloading document',
        description: 'Download URL not available.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = document.fileUrl;
      link.download = document.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: 'Error downloading document',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    }
  };

  // Load documents when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchDocuments();
    } else {
      setDocuments([]);
    }
  }, [user]);

  return {
    documents,
    isLoading,
    isUploading,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument
  };
};
