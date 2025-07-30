
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Document } from '@/types/document';
import { toast } from '@/hooks/use-toast';
import { validateFileName, generateSecureId, sanitizeInput } from '@/utils/validation';

export const useDocuments = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch all documents for the current user
  const fetchDocuments = useCallback(async (): Promise<void> => {
    if (!user) {
      setDocuments([]);
      return;
    }
    
    setIsLoading(true);
    try {
      // Fetch documents metadata from database
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('upload_date', { ascending: false });
      
      if (error) throw error;
      
      // For each document, get the file URL
      const docsWithUrls = await Promise.all(
        (data || []).map(async (doc) => {
          try {
            // Get signed URL for each file (valid for 1 hour)
            const { data: fileUrl, error: urlError } = await supabase
              .storage
              .from('client_documents')
              .createSignedUrl(`${doc.user_id}/${doc.id}`, 3600);
            
            if (urlError) {
              console.error('Error getting file URL:', urlError);
            }
            
            return {
              id: doc.id,
              name: doc.name,
              serviceType: doc.service_type,
              uploadDate: doc.upload_date,
              year: new Date(doc.upload_date).getFullYear(),
              userId: doc.user_id,
              fileType: doc.file_type,
              size: doc.size,
              fileUrl: fileUrl?.signedUrl || null
            } as Document;
          } catch (error) {
            console.error('Error processing document:', doc.id, error);
            return null;
          }
        })
      );
      
      // Filter out any null documents
      const validDocuments = docsWithUrls.filter((doc): doc is Document => doc !== null);
      setDocuments(validDocuments);
    } catch (error: unknown) {
      console.error('Error fetching documents:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: 'Error fetching documents',
        description: `Failed to load documents: ${errorMessage}`,
        variant: 'destructive'
      });
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Upload a new document
  const uploadDocument = useCallback(async (file: File, serviceType: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to upload documents.',
        variant: 'destructive'
      });
      return false;
    }
    
    // Validate file name for security
    if (!validateFileName(file.name)) {
      toast({
        title: 'Invalid file name',
        description: 'File name contains invalid characters or is not allowed.',
        variant: 'destructive'
      });
      return false;
    }
    
    // Sanitize service type
    const sanitizedServiceType = sanitizeInput(serviceType);
    if (!sanitizedServiceType) {
      toast({
        title: 'Invalid service type',
        description: 'Please select a valid service type.',
        variant: 'destructive'
      });
      return false;
    }
    
    setIsUploading(true);
    try {
      // Generate a secure unique ID for the document
      const documentId = generateSecureId();
      const filePath = `${user.id}/${documentId}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase
        .storage
        .from('client_documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) throw uploadError;
      
      // Insert document metadata into the database
      const { error: insertError } = await supabase
        .from('documents')
        .insert({
          id: documentId,
          name: file.name,
          service_type: sanitizedServiceType,
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
      await fetchDocuments();
      return true;
    } catch (error: unknown) {
      console.error('Error uploading document:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: 'Error uploading document',
        description: `Failed to upload document: ${errorMessage}`,
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsUploading(false);
    }
  }, [user, fetchDocuments]);

  // Delete a document
  const deleteDocument = useCallback(async (documentId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to delete documents.',
        variant: 'destructive'
      });
      return false;
    }
    
    try {
      // Verify the document belongs to the current user
      const { data: docData, error: fetchError } = await supabase
        .from('documents')
        .select('user_id')
        .eq('id', documentId)
        .single();
      
      if (fetchError || !docData) {
        throw new Error('Document not found');
      }
      
      if (docData.user_id !== user.id) {
        throw new Error('Unauthorized to delete this document');
      }
      
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
        .eq('id', documentId)
        .eq('user_id', user.id); // Double-check user ownership
      
      if (dbError) throw dbError;
      
      // Update local state
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      
      toast({
        title: 'Document deleted',
        description: 'Your document has been deleted successfully.',
      });
      return true;
    } catch (error: unknown) {
      console.error('Error deleting document:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: 'Error deleting document',
        description: `Failed to delete document: ${errorMessage}`,
        variant: 'destructive'
      });
      return false;
    }
  }, [user]);

  // Download a document
  const downloadDocument = useCallback(async (document: Document): Promise<boolean> => {
    if (!document.fileUrl) {
      toast({
        title: 'Error downloading document',
        description: 'Download URL not available.',
        variant: 'destructive'
      });
      return false;
    }
    
    try {
      // Create a proper anchor element for download
      const link = window.document.createElement('a');
      link.href = document.fileUrl;
      link.download = document.name;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Add to DOM, click, and remove
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      
      return true;
    } catch (error: unknown) {
      console.error('Error downloading document:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: 'Error downloading document',
        description: `Failed to download document: ${errorMessage}`,
        variant: 'destructive'
      });
      return false;
    }
  }, []);

  // Load documents when component mounts or user changes
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

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
