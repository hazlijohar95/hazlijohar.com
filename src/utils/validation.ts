
import { z } from 'zod';

// Password validation schema with strong requirements
export const passwordSchema = z.string()
  .min(12, 'Password must be at least 12 characters long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  .max(128, 'Password is too long');

// Email validation with additional checks
export const emailSchema = z.string()
  .email('Please enter a valid email address')
  .min(5, 'Email is too short')
  .max(254, 'Email is too long')
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format');

// Profile validation schemas
export const profileUpdateSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
  company: z.string()
    .min(1, 'Company is required')
    .max(100, 'Company name is too long')
    .regex(/^[a-zA-Z0-9\s&.,'-]+$/, 'Company name contains invalid characters'),
  phone: z.string()
    .regex(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long')
    .optional()
    .or(z.literal(''))
});

// Question validation schema
export const questionSchema = z.object({
  subject: z.string()
    .min(1, 'Subject is required')
    .max(100, 'Subject is too long')
    .regex(/^[a-zA-Z0-9\s\-_.,!?]+$/, 'Subject contains invalid characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long')
    .regex(/^[a-zA-Z0-9\s\-_.,!?@#$%^&*()[\]{}|\\:;"'<>/\n\r\t]+$/, 'Message contains invalid characters')
});

// File validation
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Allowed file types for document uploads
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'image/gif'
] as const;

export const MAX_FILE_SIZE_MB = 10;

// Enhanced HTML sanitization to prevent XSS
export const sanitizeHtml = (html: string): string => {
  if (typeof html !== 'string') {
    return '';
  }
  
  return html
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^>\s]+/gi, '')
    // Remove javascript: and vbscript: protocols
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:text\/html/gi, '')
    // Remove dangerous attributes
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\s*on\w+\s*=\s*[^>\s]+/gi, '')
    // Remove iframe tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove object and embed tags
    .replace(/<(object|embed)\b[^<]*(?:(?!<\/(object|embed)>)<[^<]*)*<\/(object|embed)>/gi, '')
    // Remove base64 encoded content
    .replace(/data:image\/[^;]+;base64,[^"'\s]+/gi, '')
    // Remove potentially dangerous CSS
    .replace(/expression\s*\(/gi, '')
    .replace(/url\s*\(\s*["']?javascript:/gi, '')
    // Trim whitespace
    .trim();
};

// Enhanced input sanitization for form fields
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

// Rate limiting helper with improved security
interface RateLimitRecord {
  count: number;
  resetTime: number;
  blocked: boolean;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export const checkRateLimit = (
  identifier: string, 
  maxAttempts: number = 5, 
  windowMs: number = 15 * 60 * 1000,
  blockDuration: number = 30 * 60 * 1000
): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  // Clean up old records to prevent memory leaks
  if (record && now > record.resetTime + blockDuration) {
    rateLimitMap.delete(identifier);
  }
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { 
      count: 1, 
      resetTime: now + windowMs,
      blocked: false 
    });
    return true;
  }
  
  // Check if currently blocked
  if (record.blocked && now < record.resetTime + blockDuration) {
    return false;
  }
  
  if (record.count >= maxAttempts) {
    // Block for additional time
    record.blocked = true;
    record.resetTime = now + blockDuration;
    return false;
  }
  
  record.count++;
  return true;
};

// Clear rate limit for testing or admin purposes
export const clearRateLimit = (identifier: string): void => {
  rateLimitMap.delete(identifier);
};

// Validate file name for security
export const validateFileName = (fileName: string): boolean => {
  const dangerousPatterns = [
    /\.\./, // Directory traversal
    /[<>:"|?*]/, // Invalid characters
    /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i, // Reserved names
    /\.(exe|bat|cmd|com|pif|scr|vbs|js|jar|msi|dll|sys)$/i // Executable extensions
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(fileName));
};

// Generate secure random string
export const generateSecureId = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(randomArray[i] % chars.length);
  }
  
  return result;
};
