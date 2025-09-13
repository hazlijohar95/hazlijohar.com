import { describe, it, expect } from 'vitest'
import {
  passwordSchema,
  emailSchema,
  profileUpdateSchema,
  questionSchema,
  sanitizeHtml
} from '../validation'
import { z } from 'zod'

describe('Validation Utils', () => {
  describe('passwordSchema', () => {
    it('should accept strong passwords', () => {
      const validPasswords = [
        'StrongPassword123!',
        'ComplexP@ssw0rd2023',
        'MySecurePassw0rd!'
      ]

      validPasswords.forEach(password => {
        expect(() => passwordSchema.parse(password)).not.toThrow()
      })
    })

    it('should reject weak passwords', () => {
      const weakPasswords = [
        'short',
        'nodigits!',
        'NOLOWERCASE123!',
        'nouppercase123!',
        'NoSpecialChar123',
        'a'.repeat(129) // too long
      ]

      weakPasswords.forEach(password => {
        expect(() => passwordSchema.parse(password)).toThrow()
      })
    })

    it('should require minimum length', () => {
      expect(() => passwordSchema.parse('Short1!')).toThrow('Password must be at least 12 characters long')
    })

    it('should require uppercase letters', () => {
      expect(() => passwordSchema.parse('lowercase123!')).toThrow('Password must contain at least one uppercase letter')
    })

    it('should require lowercase letters', () => {
      expect(() => passwordSchema.parse('UPPERCASE123!')).toThrow('Password must contain at least one lowercase letter')
    })

    it('should require numbers', () => {
      expect(() => passwordSchema.parse('NoDigitsHere!')).toThrow('Password must contain at least one number')
    })

    it('should require special characters', () => {
      expect(() => passwordSchema.parse('NoSpecialChar123')).toThrow('Password must contain at least one special character')
    })
  })

  describe('emailSchema', () => {
    it('should accept valid emails', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'a@b.co'
      ]

      validEmails.forEach(email => {
        expect(() => emailSchema.parse(email)).not.toThrow()
      })
    })

    it('should reject invalid emails', () => {
      const invalidEmails = [
        'not-an-email',
        'test@',
        '@example.com',
        'test..test@example.com',
        'test@example',
        'a@b.c' // TLD too short
      ]

      invalidEmails.forEach(email => {
        expect(() => emailSchema.parse(email)).toThrow()
      })
    })

    it('should enforce length limits', () => {
      expect(() => emailSchema.parse('a@b')).toThrow('Email is too short')
      expect(() => emailSchema.parse('a'.repeat(250) + '@example.com')).toThrow('Email is too long')
    })
  })

  describe('profileUpdateSchema', () => {
    it('should accept valid profile data', () => {
      const validProfile = {
        firstName: 'John',
        lastName: 'Doe',
        company: 'Acme Corp',
        phone: '+1 (555) 123-4567'
      }

      expect(() => profileUpdateSchema.parse(validProfile)).not.toThrow()
    })

    it('should accept empty phone', () => {
      const profileWithEmptyPhone = {
        firstName: 'John',
        lastName: 'Doe',
        company: 'Acme Corp',
        phone: ''
      }

      expect(() => profileUpdateSchema.parse(profileWithEmptyPhone)).not.toThrow()
    })

    it('should reject invalid names', () => {
      const invalidProfiles = [
        { firstName: '', lastName: 'Doe', company: 'Acme', phone: '' },
        { firstName: 'John123', lastName: 'Doe', company: 'Acme', phone: '' },
        { firstName: 'John', lastName: '', company: 'Acme', phone: '' },
        { firstName: 'John', lastName: 'Doe!', company: 'Acme', phone: '' }
      ]

      invalidProfiles.forEach(profile => {
        expect(() => profileUpdateSchema.parse(profile)).toThrow()
      })
    })

    it('should reject invalid phone numbers', () => {
      const profileWithInvalidPhone = {
        firstName: 'John',
        lastName: 'Doe',
        company: 'Acme Corp',
        phone: 'not-a-phone-number'
      }

      expect(() => profileUpdateSchema.parse(profileWithInvalidPhone)).toThrow()
    })
  })

  describe('questionSchema', () => {
    it('should accept valid questions', () => {
      const validQuestion = {
        subject: 'Test Question',
        message: 'This is a test message that is long enough to meet requirements.'
      }

      expect(() => questionSchema.parse(validQuestion)).not.toThrow()
    })

    it('should reject short messages', () => {
      const shortMessage = {
        subject: 'Test',
        message: 'Too short'
      }

      expect(() => questionSchema.parse(shortMessage)).toThrow('Message must be at least 10 characters')
    })

    it('should reject empty subjects', () => {
      const emptySubject = {
        subject: '',
        message: 'This is a valid message length.'
      }

      expect(() => questionSchema.parse(emptySubject)).toThrow('Subject is required')
    })

    it('should reject messages that are too long', () => {
      const longMessage = {
        subject: 'Test',
        message: 'a'.repeat(1001)
      }

      expect(() => questionSchema.parse(longMessage)).toThrow('Message is too long')
    })
  })

  describe('sanitizeHtml', () => {
    it('should remove script tags', () => {
      const input = '<p>Hello</p><script>alert("xss")</script>'
      const result = sanitizeHtml(input)
      expect(result).toBe('<p>Hello</p>')
    })

    it('should preserve safe HTML', () => {
      const input = '<p>Hello <strong>world</strong></p>'
      const result = sanitizeHtml(input)
      expect(result).toBe('<p>Hello <strong>world</strong></p>')
    })

    it('should remove dangerous attributes', () => {
      const input = '<p onclick="alert(\'xss\')">Hello</p>'
      const result = sanitizeHtml(input)
      expect(result).toBe('<p>Hello</p>')
    })

    it('should handle empty strings', () => {
      expect(sanitizeHtml('')).toBe('')
    })

    it('should handle plain text', () => {
      const input = 'Just plain text'
      const result = sanitizeHtml(input)
      expect(result).toBe('Just plain text')
    })
  })
})