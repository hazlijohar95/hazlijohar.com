# Testing Documentation

## Overview

HJC Chartered Accountants follows comprehensive testing practices to ensure code quality, security, and reliability. This document outlines our testing strategy, tools, and best practices.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Testing Stack](#testing-stack)
- [Testing Pyramid](#testing-pyramid)
- [Test Types](#test-types)
- [Setup and Configuration](#setup-and-configuration)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Coverage Requirements](#coverage-requirements)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Testing Philosophy

Our testing strategy follows these core principles:

1. **Quality over Quantity**: Focus on meaningful tests that catch real bugs
2. **Test-Driven Development**: Write tests first when possible
3. **Fast Feedback**: Tests should run quickly and provide immediate feedback
4. **Maintainable Tests**: Tests should be easy to read, write, and maintain
5. **Security-First**: Every security feature must have comprehensive tests
6. **User-Centric**: Tests should reflect real user scenarios

## Testing Stack

| Tool | Version | Purpose | Documentation |
|------|---------|---------|---------------|
| **Vitest** | 3.2.4 | Test Runner | Fast, Vite-native testing framework |
| **Testing Library** | 16.3.0 | Component Testing | Simple and complete testing utilities |
| **jsdom** | 27.0.0 | DOM Simulation | Simulates browser environment for tests |
| **User Event** | 14.6.1 | User Interaction Testing | Fire events the same way users do |
| **MSW** | - | API Mocking | Mock Service Worker for API testing |

## Testing Pyramid

```
    ┌─────────────────┐
    │   E2E Tests     │  ← Few, expensive, high confidence
    │   (Cypress)     │
    ├─────────────────┤
    │ Integration     │  ← Some, moderate cost, good confidence
    │ Tests (React    │
    │ Testing Library)│
    ├─────────────────┤
    │  Unit Tests     │  ← Many, cheap, fast feedback
    │  (Vitest)       │
    └─────────────────┘
```

### Test Distribution Goals
- **70%** Unit Tests
- **20%** Integration Tests
- **10%** End-to-End Tests

## Test Types

### 1. Unit Tests

Test individual functions and components in isolation.

```typescript
// Example: Utility function test
import { describe, it, expect } from 'vitest';
import { sanitizeInput } from '@/utils/validation';

describe('sanitizeInput', () => {
  it('should remove dangerous HTML tags', () => {
    const input = '<script>alert("xss")</script>Hello World';
    const result = sanitizeInput(input);
    expect(result).toBe('Hello World');
  });

  it('should preserve safe content', () => {
    const input = 'Hello World 123';
    const result = sanitizeInput(input);
    expect(result).toBe('Hello World 123');
  });
});
```

### 2. Component Tests

Test React components with user interactions.

```typescript
// Example: Component test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import DocumentUpload from '@/components/DocumentUpload';

describe('DocumentUpload', () => {
  it('should upload file successfully', async () => {
    const mockOnUpload = vi.fn();
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });

    render(<DocumentUpload onUpload={mockOnUpload} />);

    const input = screen.getByLabelText(/upload document/i);
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith(file);
    });
  });

  it('should reject invalid file types', () => {
    const mockOnUpload = vi.fn();
    const file = new File(['content'], 'test.exe', { type: 'application/exe' });

    render(<DocumentUpload onUpload={mockOnUpload} />);

    const input = screen.getByLabelText(/upload document/i);
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText(/invalid file type/i)).toBeInTheDocument();
    expect(mockOnUpload).not.toHaveBeenCalled();
  });
});
```

### 3. Integration Tests

Test component interactions and data flow.

```typescript
// Example: Integration test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import Dashboard from '@/pages/Dashboard';
import { AuthProvider } from '@/context/AuthContext';

const createWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('Dashboard Integration', () => {
  it('should load and display user documents', async () => {
    // Mock API response
    vi.mock('@/integrations/supabase/client', () => ({
      supabase: {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: [{ id: '1', name: 'test.pdf', upload_date: '2024-01-01' }],
              error: null,
            }),
          }),
        }),
      },
    }));

    render(<Dashboard />, { wrapper: createWrapper });

    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });
  });
});
```

### 4. Security Tests

Test security features and vulnerabilities.

```typescript
// Example: Security test
import { describe, it, expect } from 'vitest';
import { validatePasswordStrength, sanitizeInput } from '@/utils/security';

describe('Security Functions', () => {
  describe('validatePasswordStrength', () => {
    it('should reject weak passwords', () => {
      const result = validatePasswordStrength('password123');
      expect(result.isValid).toBe(false);
      expect(result.feedback).toContain('Password must be at least 12 characters long');
    });

    it('should accept strong passwords', () => {
      const result = validatePasswordStrength('MySecureP@ssw0rd123!');
      expect(result.isValid).toBe(true);
      expect(result.feedback).toHaveLength(0);
    });

    it('should detect common passwords', () => {
      const result = validatePasswordStrength('password');
      expect(result.feedback).toContain('Avoid common passwords');
    });
  });

  describe('sanitizeInput', () => {
    it('should prevent XSS attacks', () => {
      const maliciousInput = '<script>alert("xss")</script><img src="x" onerror="alert(1)">';
      const sanitized = sanitizeInput(maliciousInput);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('onerror');
    });

    it('should remove dangerous protocols', () => {
      const input = 'javascript:alert("xss")';
      const sanitized = sanitizeInput(input);
      expect(sanitized).not.toContain('javascript:');
    });
  });
});
```

### 5. API Tests

Test Supabase integration and API calls.

```typescript
// Example: API test
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { supabase } from '@/integrations/supabase/client';

describe('Supabase API', () => {
  beforeEach(() => {
    // Setup test data
  });

  afterEach(() => {
    // Cleanup test data
  });

  it('should create user profile', async () => {
    const profileData = {
      id: 'test-user-id',
      first_name: 'John',
      last_name: 'Doe',
      company: 'Test Company',
    };

    const { data, error } = await supabase
      .from('profiles')
      .insert(profileData)
      .single();

    expect(error).toBeNull();
    expect(data).toMatchObject(profileData);
  });

  it('should enforce RLS policies', async () => {
    // Test that users can't access other users' data
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', 'other-user-id');

    expect(data).toHaveLength(0); // Should not return other user's documents
  });
});
```

## Setup and Configuration

### Test Environment Setup

1. **Install Dependencies**
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

2. **Vitest Configuration**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
      ],
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

3. **Test Setup File**
```typescript
// src/test/setup.ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with Testing Library matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_SUPABASE_URL: 'https://test.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'test-key',
    VITE_ENABLE_DEBUG_MODE: 'true',
  },
});
```

### Mock Setup

#### Supabase Mock
```typescript
// src/test/mocks/supabase.ts
export const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
    getUser: vi.fn(),
    onAuthStateChange: vi.fn(),
  },
  from: vi.fn().mockReturnValue({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  }),
  storage: {
    from: vi.fn().mockReturnValue({
      upload: vi.fn(),
      download: vi.fn(),
      remove: vi.fn(),
      getPublicUrl: vi.fn(),
    }),
  },
};
```

## Writing Tests

### Test File Organization

```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
├── utils/
│   ├── validation.ts
│   └── __tests__/
│       └── validation.test.ts
├── pages/
│   ├── Dashboard.tsx
│   └── __tests__/
│       └── Dashboard.test.tsx
└── test/
    ├── setup.ts
    ├── mocks/
    └── utils/
```

### Test Naming Convention

```typescript
describe('ComponentName/FunctionName', () => {
  // Group related tests
  describe('when user is authenticated', () => {
    it('should display user dashboard', () => {
      // Test implementation
    });

    it('should allow document upload', () => {
      // Test implementation
    });
  });

  describe('when user is not authenticated', () => {
    it('should redirect to login page', () => {
      // Test implementation
    });
  });

  // Edge cases
  describe('error handling', () => {
    it('should handle network errors gracefully', () => {
      // Test implementation
    });
  });
});
```

### Test Data Factory

```typescript
// src/test/factories/userFactory.ts
export const createUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  company: 'Test Company',
  createdAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

export const createDocument = (overrides = {}) => ({
  id: 'test-doc-id',
  userId: 'test-user-id',
  name: 'test-document.pdf',
  fileType: 'application/pdf',
  size: 1024,
  uploadDate: '2024-01-01T00:00:00Z',
  status: 'pending',
  ...overrides,
});
```

## Running Tests

### Development Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run specific test file
npm run test -- validation.test.ts

# Run tests matching pattern
npm run test -- --grep "should validate"

# Run tests with coverage
npm run test:coverage

# Run integration tests only
npm run test:integration

# Run unit tests only
npm run test:unit
```

### Test Scripts in package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "test:unit": "vitest run src/**/*.test.{ts,tsx}",
    "test:integration": "vitest run src/**/*.integration.test.{ts,tsx}",
    "test:security": "vitest run src/**/*security*.test.{ts,tsx}",
    "test:all": "npm run test:run && npm run test:security"
  }
}
```

### Debugging Tests

```typescript
// Debug specific test
import { screen } from '@testing-library/react';

it('should debug component', () => {
  render(<MyComponent />);

  // Print DOM structure
  screen.debug();

  // Print specific element
  screen.debug(screen.getByRole('button'));

  // Use debugger
  // eslint-disable-next-line no-debugger
  debugger;
});
```

## Coverage Requirements

### Coverage Thresholds

```typescript
// vitest.config.ts coverage settings
export default defineConfig({
  test: {
    coverage: {
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        // Specific files with higher requirements
        'src/utils/security.ts': {
          branches: 95,
          functions: 95,
          lines: 95,
          statements: 95,
        },
      },
    },
  },
});
```

### Coverage Reporting

```bash
# Generate coverage report
npm run test:coverage

# Open HTML coverage report
open coverage/index.html
```

### What to Test (Priority Order)

1. **Security Functions** (95%+ coverage required)
2. **Utility Functions** (90%+ coverage required)
3. **Business Logic** (85%+ coverage required)
4. **Components with Complex Logic** (80%+ coverage required)
5. **Simple Presentation Components** (60%+ coverage acceptable)

## CI/CD Integration

### GitHub Actions Test Workflow

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run security tests
      run: npm run test:security

    - name: Run unit tests
      run: npm run test:unit

    - name: Run integration tests
      run: npm run test:integration

    - name: Generate coverage
      run: npm run test:coverage

    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/coverage-final.json

    - name: Comment PR with coverage
      uses: romeovs/lcov-reporter-action@v0.3.1
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        lcov-file: ./coverage/lcov.info
```

### Pre-commit Hooks

```json
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test:security
npm run lint
npm run type-check
```

## Best Practices

### 1. Test Structure (AAA Pattern)

```typescript
it('should upload document successfully', async () => {
  // Arrange - Set up test data and mocks
  const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
  const mockOnUpload = vi.fn().mockResolvedValue({ id: 'doc-1' });

  // Act - Execute the code under test
  render(<DocumentUpload onUpload={mockOnUpload} />);
  const input = screen.getByLabelText(/upload/i);
  fireEvent.change(input, { target: { files: [file] } });

  // Assert - Verify the results
  await waitFor(() => {
    expect(mockOnUpload).toHaveBeenCalledWith(file);
  });
});
```

### 2. Test Independence

```typescript
// ❌ Bad - Tests depend on each other
let userId = '';

it('should create user', () => {
  userId = createUser().id;
  expect(userId).toBeTruthy();
});

it('should get user', () => {
  const user = getUser(userId); // Depends on previous test
  expect(user).toBeTruthy();
});

// ✅ Good - Tests are independent
describe('User API', () => {
  let testUserId: string;

  beforeEach(() => {
    testUserId = 'test-user-id';
  });

  it('should create user', () => {
    const user = createUser({ id: testUserId });
    expect(user.id).toBe(testUserId);
  });

  it('should get user', () => {
    const user = getUser(testUserId);
    expect(user).toBeTruthy();
  });
});
```

### 3. Meaningful Test Names

```typescript
// ❌ Bad
it('should work', () => {});
it('test login', () => {});

// ✅ Good
it('should redirect to dashboard when login is successful', () => {});
it('should show error message when login fails with invalid credentials', () => {});
it('should disable submit button when form is invalid', () => {});
```

### 4. Test User Behavior, Not Implementation

```typescript
// ❌ Bad - Testing implementation details
it('should call useState when component mounts', () => {
  const useStateSpy = vi.spyOn(React, 'useState');
  render(<MyComponent />);
  expect(useStateSpy).toHaveBeenCalled();
});

// ✅ Good - Testing user behavior
it('should display loading spinner while data is being fetched', () => {
  render(<MyComponent />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
```

### 5. Async Testing

```typescript
// ✅ Proper async testing
it('should display success message after form submission', async () => {
  const mockSubmit = vi.fn().mockResolvedValue({ success: true });

  render(<MyForm onSubmit={mockSubmit} />);

  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => {
    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });
});
```

## Troubleshooting

### Common Issues

#### 1. Tests Timing Out
```typescript
// Increase timeout for specific test
it('should handle slow operation', async () => {
  // Test implementation
}, 10000); // 10 second timeout
```

#### 2. DOM Cleanup Issues
```typescript
// Ensure proper cleanup
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
```

#### 3. Mock Issues
```typescript
// Clear mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});
```

#### 4. Async Race Conditions
```typescript
// Use proper waiting
await waitFor(() => {
  expect(screen.getByText('Expected text')).toBeInTheDocument();
});

// Or wait for specific conditions
await waitFor(() => expect(mockFunction).toHaveBeenCalled());
```

### Test Debugging Tips

1. **Use screen.debug()** to see DOM structure
2. **Check async operations** with proper waiting
3. **Verify mocks are working** with console.log
4. **Check test isolation** by running tests individually
5. **Use descriptive variable names** in tests

### Performance Optimization

```typescript
// Use concurrent tests for independent tests
describe.concurrent('Utility functions', () => {
  it.concurrent('should validate email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it.concurrent('should sanitize input', () => {
    expect(sanitizeInput('<script></script>')).toBe('');
  });
});
```

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Testing Framework**: Vitest

For testing questions, contact: hazli@hazlijohar.my