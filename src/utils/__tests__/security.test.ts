import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  validateEnvironment,
  sanitizeInput,
  isValidUrl,
  isValidEmail,
  validatePasswordStrength,
  generateSecureString,
  simpleHash,
  generateCSP,
} from '../security'

describe('Security Utils', () => {
  describe('validateEnvironment', () => {
    const originalEnv = import.meta.env

    beforeEach(() => {
      // Mock import.meta.env
      Object.defineProperty(import.meta, 'env', {
        value: {
          VITE_SUPABASE_URL: 'https://test.supabase.co',
          VITE_SUPABASE_ANON_KEY: 'test-key'
        },
        configurable: true
      })
    })

    afterEach(() => {
      // Restore original env
      Object.defineProperty(import.meta, 'env', {
        value: originalEnv,
        configurable: true
      })
    })

    it('should pass with valid environment variables', () => {
      expect(() => validateEnvironment()).not.toThrow()
    })

    it('should throw with missing SUPABASE_URL', () => {
      Object.defineProperty(import.meta, 'env', {
        value: {
          VITE_SUPABASE_ANON_KEY: 'test-key'
        },
        configurable: true
      })

      expect(() => validateEnvironment()).toThrow('Missing required environment variables: VITE_SUPABASE_URL')
    })

    it('should throw with missing SUPABASE_ANON_KEY', () => {
      Object.defineProperty(import.meta, 'env', {
        value: {
          VITE_SUPABASE_URL: 'https://test.supabase.co'
        },
        configurable: true
      })

      expect(() => validateEnvironment()).toThrow('Missing required environment variables: VITE_SUPABASE_ANON_KEY')
    })
  })

  describe('sanitizeInput', () => {
    it('should remove script tags', () => {
      const input = '<script>alert("xss")</script>Hello'
      const result = sanitizeInput(input)
      expect(result).toBe('Hello')
    })

    it('should remove event handlers', () => {
      const input = '<div onclick="alert(\'xss\')">Hello</div>'
      const result = sanitizeInput(input)
      expect(result).toBe('<div>Hello</div>')
    })

    it('should remove javascript: protocol', () => {
      const input = '<a href="javascript:alert(\'xss\')">Link</a>'
      const result = sanitizeInput(input)
      expect(result).toBe('<a href="">Link</a>')
    })

    it('should handle empty strings', () => {
      expect(sanitizeInput('')).toBe('')
    })

    it('should handle non-string input', () => {
      expect(sanitizeInput(123 as any)).toBe('')
      expect(sanitizeInput(null as any)).toBe('')
    })
  })

  describe('isValidUrl', () => {
    it('should validate HTTP URLs', () => {
      expect(isValidUrl('http://example.com')).toBe(true)
    })

    it('should validate HTTPS URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
    })

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false)
      expect(isValidUrl('ftp://example.com')).toBe(false)
      expect(isValidUrl('')).toBe(false)
    })
  })

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
    })

    it('should reject emails with dangerous patterns', () => {
      expect(isValidEmail('test@example.com<script>')).toBe(false)
      expect(isValidEmail('javascript:alert()@example.com')).toBe(false)
    })
  })

  describe('validatePasswordStrength', () => {
    it('should validate strong passwords', () => {
      const result = validatePasswordStrength('StrongPassword123!')
      expect(result.isValid).toBe(true)
      expect(result.score).toBeGreaterThanOrEqual(4)
      expect(result.feedback).toHaveLength(0)
    })

    it('should reject weak passwords', () => {
      const result = validatePasswordStrength('weak')
      expect(result.isValid).toBe(false)
      expect(result.score).toBeLessThan(4)
      expect(result.feedback.length).toBeGreaterThan(0)
    })

    it('should provide specific feedback', () => {
      const result = validatePasswordStrength('password')
      expect(result.feedback).toContain('Password must be at least 12 characters long')
      expect(result.feedback).toContain('Include at least one uppercase letter')
      expect(result.feedback).toContain('Include at least one number')
      expect(result.feedback).toContain('Include at least one special character')
    })

    it('should reject common passwords', () => {
      const result = validatePasswordStrength('password123456!')
      expect(result.feedback).toContain('Avoid common passwords')
    })
  })

  describe('generateSecureString', () => {
    it('should generate string of specified length', () => {
      const result = generateSecureString(16)
      expect(result).toHaveLength(16)
    })

    it('should generate different strings each time', () => {
      const str1 = generateSecureString()
      const str2 = generateSecureString()
      expect(str1).not.toBe(str2)
    })

    it('should only contain valid characters', () => {
      const result = generateSecureString(100)
      expect(result).toMatch(/^[A-Za-z0-9]+$/)
    })
  })

  describe('simpleHash', () => {
    it('should generate consistent hash for same input', () => {
      const hash1 = simpleHash('test string')
      const hash2 = simpleHash('test string')
      expect(hash1).toBe(hash2)
    })

    it('should generate different hashes for different inputs', () => {
      const hash1 = simpleHash('string1')
      const hash2 = simpleHash('string2')
      expect(hash1).not.toBe(hash2)
    })

    it('should handle empty strings', () => {
      const result = simpleHash('')
      expect(result).toBe('0')
    })
  })

  describe('generateCSP', () => {
    it('should generate valid CSP string', () => {
      const csp = generateCSP()
      expect(csp).toContain('default-src')
      expect(csp).toContain('script-src')
      expect(csp).toContain('style-src')
      expect(csp).toContain('img-src')
    })

    it('should include security directives', () => {
      const csp = generateCSP()
      expect(csp).toContain("object-src 'none'")
      expect(csp).toContain("base-uri 'self'")
      expect(csp).toContain("frame-ancestors 'none'")
    })
  })
})