# API Documentation

## Overview

HJC Chartered Accountants uses Supabase as the backend service, providing a comprehensive API for authentication, database operations, and file storage. This document outlines all available endpoints and their usage.

## Table of Contents

- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [File Storage](#file-storage)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Security](#security)

## Authentication

The application uses Supabase Auth with the following methods:

### Authentication Methods

- **Email/Password**: Standard email and password authentication
- **Session Management**: Automatic session refresh with secure token handling
- **Role-Based Access**: User-specific data access controls

### Authentication Flow

```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securePassword'
});

// Logout
const { error } = await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

## Database Schema

### Tables

#### `profiles`
User profile information linked to auth users.

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `documents`
Document metadata and file references.

```sql
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  file_type TEXT NOT NULL,
  size BIGINT NOT NULL,
  storage_path TEXT,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending'
);
```

### Row Level Security (RLS) Policies

All tables have RLS enabled with the following policies:

- Users can only access their own data
- Admins have elevated access (if admin role is implemented)
- All operations are logged for audit purposes

## API Endpoints

### Profiles

#### Get User Profile
```typescript
GET /rest/v1/profiles?id=eq.{user_id}

const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();
```

#### Update User Profile
```typescript
PATCH /rest/v1/profiles?id=eq.{user_id}

const { data, error } = await supabase
  .from('profiles')
  .update({
    first_name: 'John',
    last_name: 'Doe',
    company: 'Example Corp',
    phone: '+1234567890'
  })
  .eq('id', userId);
```

### Documents

#### List User Documents
```typescript
GET /rest/v1/documents?user_id=eq.{user_id}&order=upload_date.desc

const { data, error } = await supabase
  .from('documents')
  .select('*')
  .eq('user_id', userId)
  .order('upload_date', { ascending: false });
```

#### Upload Document
```typescript
POST /rest/v1/documents

const { data, error } = await supabase
  .from('documents')
  .insert({
    user_id: userId,
    name: fileName,
    service_type: 'tax-preparation',
    file_type: 'application/pdf',
    size: fileSize,
    storage_path: storagePath
  });
```

#### Delete Document
```typescript
DELETE /rest/v1/documents?id=eq.{document_id}

const { data, error } = await supabase
  .from('documents')
  .delete()
  .eq('id', documentId)
  .eq('user_id', userId); // Ensure user owns the document
```

## File Storage

### Storage Buckets

#### `client_documents`
Secure storage for client document uploads.

**Configuration:**
- Maximum file size: 10MB
- Allowed file types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, GIF
- Access: Private (authenticated users only)
- RLS: Users can only access their own files

### Storage Operations

#### Upload File
```typescript
const { data, error } = await supabase.storage
  .from('client_documents')
  .upload(`${userId}/${fileName}`, file, {
    cacheControl: '3600',
    upsert: false
  });
```

#### Download File
```typescript
const { data, error } = await supabase.storage
  .from('client_documents')
  .download(`${userId}/${fileName}`);
```

#### Delete File
```typescript
const { data, error } = await supabase.storage
  .from('client_documents')
  .remove([`${userId}/${fileName}`]);
```

#### Get Public URL
```typescript
const { data } = supabase.storage
  .from('client_documents')
  .getPublicUrl(`${userId}/${fileName}`);
```

## Error Handling

### Standard Error Response

All API endpoints return consistent error responses:

```typescript
interface ApiError {
  error: {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
  };
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `PGRST116` | Row not found | 404 |
| `23505` | Unique constraint violation | 409 |
| `42501` | Insufficient privilege | 403 |
| `23503` | Foreign key violation | 422 |
| `22001` | String data too long | 422 |

### Error Handling Example

```typescript
const handleApiError = (error: any) => {
  switch (error.code) {
    case 'PGRST116':
      return 'Resource not found';
    case '23505':
      return 'This record already exists';
    case '42501':
      return 'Access denied';
    default:
      return error.message || 'An unexpected error occurred';
  }
};
```

## Rate Limiting

### Client-Side Rate Limiting

The application implements client-side rate limiting for security:

- **Login attempts**: 5 attempts per 15 minutes
- **File uploads**: 10 uploads per hour
- **API requests**: 100 requests per minute per user

### Rate Limit Configuration

```typescript
export const rateLimitConfig = {
  maxAttempts: 5,
  windowMs: 900000, // 15 minutes
  blockDurationMs: 1800000, // 30 minutes
};
```

## Security

### Security Headers

All API requests include security headers:

```typescript
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};
```

### Input Validation

All input is validated using Zod schemas:

```typescript
import { z } from 'zod';

const profileSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  company: z.string().min(1).max(100),
  phone: z.string().optional(),
});
```

### Content Security Policy

```typescript
const csp = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", 'https://app.cal.com'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': ["'self'", 'data:', 'https:'],
  'connect-src': ["'self'", 'https://*.supabase.co'],
};
```

## SDK Usage Examples

### React Hook for Data Fetching

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const useDocuments = (userId: string) => {
  return useQuery({
    queryKey: ['documents', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', userId)
        .order('upload_date', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};
```

### File Upload with Progress

```typescript
const uploadDocument = async (file: File, userId: string, onProgress?: (progress: number) => void) => {
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('client_documents')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      onUploadProgress: (progress) => {
        onProgress?.(progress);
      }
    });

  if (error) throw error;
  return data;
};
```

## Testing

### API Testing

Use the provided test utilities for API testing:

```typescript
import { createTestClient } from '@/utils/testing';

describe('Documents API', () => {
  const testClient = createTestClient();

  test('should fetch user documents', async () => {
    const { data } = await testClient
      .from('documents')
      .select('*')
      .eq('user_id', 'test-user-id');

    expect(data).toBeDefined();
  });
});
```

## Webhooks

### Database Webhooks

Supabase can trigger webhooks on database events:

```sql
-- Example: Trigger webhook on document upload
CREATE OR REPLACE FUNCTION notify_document_upload()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url:='https://your-webhook-url.com/document-uploaded',
    headers:='{"Content-Type": "application/json"}',
    body:=json_build_object(
      'user_id', NEW.user_id,
      'document_id', NEW.id,
      'document_name', NEW.name
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

**Last Updated**: December 2024
**Version**: 1.0.0
**API Version**: v1

For additional help, contact: hazli@hazlijohar.my