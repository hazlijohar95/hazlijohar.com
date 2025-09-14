/**
 * Security utility functions and configurations
 * Provides comprehensive security features including input validation,
 * environment validation, and security header configuration.
 * @fileoverview Security utilities for HJC Chartered Accountants application
 */

/**
 * Validates that all required environment variables are present
 * For production environments, logs warnings instead of throwing errors to allow graceful degradation
 * @throws {Error} Throws an error if any required environment variables are missing (development only)
 * @example
 * ```typescript
 * try {
 *   validateEnvironment();
 *   console.log('Environment is valid');
 * } catch (error) {
 *   console.error('Missing environment variables:', error.message);
 * }
 * ```
 */
export const validateEnvironment = (): void => {
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  const missingVars = requiredVars.filter(varName => !import.meta.env[varName as keyof ImportMetaEnv]);

  if (missingVars.length > 0) {
    const message = `Missing required environment variables: ${missingVars.join(', ')}`;

    // In production, log warning instead of throwing to allow graceful degradation
    if (import.meta.env.PROD) {
      console.warn(`⚠️ ${message}. Authentication features will be disabled.`);
    } else {
      // In development, still throw to catch configuration issues early
      throw new Error(message);
    }
  }
};

// Security headers configuration
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
} as const;

// Content Security Policy
export const contentSecurityPolicy = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    'https://app.cal.com',
    'https://cdn.gpteng.co'
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com'
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com'
  ],
  'img-src': [
    "'self'",
    'data:',
    'https:'
  ],
  'connect-src': [
    "'self'",
    'https://*.supabase.co',
    'https://app.cal.com'
  ],
  'frame-src': [
    'https://app.cal.com'
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
} as const;

// Generate CSP string
export const generateCSP = (): string => Object.entries(contentSecurityPolicy)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');

// Input sanitization patterns
export const sanitizationPatterns = {
  // Remove script tags and content
  scriptTags: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  // Remove event handlers
  eventHandlers: /on\w+\s*=\s*["'][^"']*["']/gi,
  // Remove javascript: protocol
  javascriptProtocol: /javascript:/gi,
  // Remove vbscript: protocol
  vbscriptProtocol: /vbscript:/gi,
  // Remove data: URLs
  dataUrls: /data:text\/html/gi,
  // Remove iframe tags
  iframeTags: /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  // Remove object and embed tags
  objectTags: /<(object|embed)\b[^<]*(?:(?!<\/(object|embed)>)<[^<]*)*<\/(object|embed)>/gi,
  // Remove base64 encoded content
  base64Content: /data:image\/[^;]+;base64,[^"'\s]+/gi,
  // Remove dangerous CSS
  dangerousCSS: /expression\s*\(/gi,
  // Remove angle brackets
  angleBrackets: /[<>]/g,
} as const;

/**
 * Sanitizes user input to prevent XSS attacks and other security vulnerabilities
 * @param input - The string to sanitize
 * @returns The sanitized string with dangerous patterns removed
 * @example
 * ```typescript
 * const userInput = '<script>alert("xss")</script>Hello World';
 * const safe = sanitizeInput(userInput);
 * console.log(safe); // "Hello World"
 * ```
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // Apply all sanitization patterns
  Object.values(sanitizationPatterns).forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  return sanitized.trim();
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Email validation with additional security checks
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return false;
  }

  // Additional security checks
  const dangerousPatterns = [
    /javascript:/i,
    /vbscript:/i,
    /data:/i,
    /<script/i,
    /on\w+\s*=/i,
  ];

  return !dangerousPatterns.some(pattern => pattern.test(email));
};

/**
 * Validates password strength against security best practices
 * @param password - The password to validate
 * @returns Object containing validation result, strength score (0-5), and feedback array
 * @example
 * ```typescript
 * const result = validatePasswordStrength('MySecureP@ssw0rd123!');
 * if (result.isValid) {
 *   console.log('Strong password, score:', result.score);
 * } else {
 *   console.log('Weak password:', result.feedback);
 * }
 * ```
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length < 12) {
    feedback.push('Password must be at least 12 characters long');
  } else {
    score += 1;
  }

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Include at least one lowercase letter');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Include at least one uppercase letter');

  if (/\d/.test(password)) score += 1;
  else feedback.push('Include at least one number');

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  else feedback.push('Include at least one special character');

  // Common password check
  const commonPasswords = [
    'password', '123456', 'qwerty', 'admin', 'letmein',
    'welcome', 'monkey', 'dragon', 'master', 'football'
  ];

  if (commonPasswords.includes(password.toLowerCase())) {
    feedback.push('Avoid common passwords');
    score = Math.max(0, score - 2);
  }

  // Sequential character check
  if (/(.)\1{2,}/.test(password)) {
    feedback.push('Avoid repeated characters');
    score = Math.max(0, score - 1);
  }

  const isValid = score >= 4 && password.length >= 12;

  return {
    isValid,
    score,
    feedback: isValid ? [] : feedback
  };
};

// Secure random string generation
export const generateSecureString = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomArray = new Uint8Array(length);
  
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(randomArray);
  } else {
    // Fallback for environments without crypto.getRandomValues
    for (let i = 0; i < length; i++) {
      randomArray[i] = Math.floor(Math.random() * 256);
    }
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(randomArray[i] % chars.length);
  }

  return result;
};

// Cryptographically secure hash function using SHA-256
export const secureHash = async (input: string): Promise<string> => {
  try {
    // Encode the input string as UTF-8
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    // Hash the data using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
  } catch (error) {
    console.error('Error creating secure hash:', error);
    throw new Error('Failed to create secure hash');
  }
};

// Synchronous hash function for backwards compatibility (DEPRECATED - use secureHash instead)
// This should only be used for non-sensitive data like cache keys
export const simpleHash = (input: string): string => {
  console.warn('simpleHash is deprecated and insecure. Use secureHash for sensitive data.');

  let hash = 0;
  if (input.length === 0) return hash.toString();

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36);
};

// Rate limiting configuration
export const rateLimitConfig = {
  maxAttempts: parseInt(import.meta.env.VITE_RATE_LIMIT_MAX_ATTEMPTS || '5'),
  windowMs: parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW_MS || '900000'),
  blockDurationMs: parseInt(import.meta.env.VITE_RATE_LIMIT_BLOCK_DURATION_MS || '1800000'),
} as const;

// Security audit logging
export const logSecurityEvent = (event: string, details?: Record<string, unknown>): void => {
  // Only log in development mode - import.meta.env.DEV is false in production builds
  if (import.meta.env.DEV) {
    console.log(`[SECURITY] ${event}`, details);
  }

  // In production, send to a security monitoring service instead of console
  if (import.meta.env.PROD) {
    // TODO: Implement proper security event logging for production
    // Example: sendToSecurityService({ event, details, timestamp: new Date().toISOString() });

    // For now, you could use a service like:
    // - Sentry for error tracking
    // - LogRocket for user session recording
    // - Custom analytics/logging endpoint

    // Avoid logging sensitive details in production
    const sanitizedDetails = details ? sanitizeForLogging(details) : undefined;
    // sendToProductionLogging(event, sanitizedDetails);
  }
};

// Helper to sanitize sensitive data before logging
const sanitizeForLogging = (details: Record<string, unknown>): Record<string, unknown> => {
  const sanitized = { ...details };

  // Remove sensitive fields
  const sensitiveKeys = ['password', 'email', 'token', 'key', 'secret', 'auth', 'credential'];

  for (const key in sanitized) {
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED]';
    }
  }

  return sanitized;
};

// Export security configuration
export const securityConfig = {
  validateEnvironment,
  securityHeaders,
  contentSecurityPolicy,
  generateCSP,
  sanitizeInput,
  isValidUrl,
  isValidEmail,
  validatePasswordStrength,
  generateSecureString,
  simpleHash,
  rateLimitConfig,
  logSecurityEvent,
} as const; 