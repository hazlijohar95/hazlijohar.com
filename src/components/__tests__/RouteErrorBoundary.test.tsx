import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RouteErrorBoundary } from '../RouteErrorBoundary'

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('RouteErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock console.error to avoid noise in tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children when there is no error', () => {
    render(
      <RouteErrorBoundary>
        <ThrowError shouldThrow={false} />
      </RouteErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('renders error UI when child component throws', () => {
    render(
      <RouteErrorBoundary>
        <ThrowError shouldThrow={true} />
      </RouteErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText(/We encountered an unexpected error/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument()
  })

  it('shows error details in development mode', () => {
    // Mock development mode
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <RouteErrorBoundary>
        <ThrowError shouldThrow={true} />
      </RouteErrorBoundary>
    )

    expect(screen.getByText('Error Details (Development)')).toBeInTheDocument()
    expect(screen.getByText(/Test error/)).toBeInTheDocument()

    // Restore
    process.env.NODE_ENV = originalNodeEnv
  })

  it('retries when Try Again button is clicked', () => {
    const { rerender } = render(
      <RouteErrorBoundary>
        <ThrowError shouldThrow={true} />
      </RouteErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /try again/i }))

    // Rerender with no error
    rerender(
      <RouteErrorBoundary>
        <ThrowError shouldThrow={false} />
      </RouteErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('navigates home when Go Home button is clicked', () => {
    render(
      <RouteErrorBoundary>
        <ThrowError shouldThrow={true} />
      </RouteErrorBoundary>
    )

    fireEvent.click(screen.getByRole('button', { name: /go home/i }))

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
  })

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>

    render(
      <RouteErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </RouteErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })
})