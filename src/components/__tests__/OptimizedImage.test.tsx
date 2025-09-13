import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { OptimizedImage } from '../ui/optimized-image'

describe('OptimizedImage', () => {
  it('renders with correct attributes', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={300}
        height={200}
      />
    )

    const img = screen.getByAltText('Test image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test-image.jpg')
    expect(img).toHaveAttribute('width', '300')
    expect(img).toHaveAttribute('height', '200')
  })

  it('shows placeholder initially', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
      />
    )

    const container = screen.getByAltText('Test image').closest('div')
    expect(container).toHaveStyle('backgroundColor: #000000')
  })

  it('shows error message when image fails to load', async () => {
    render(
      <OptimizedImage
        src="/invalid-image.jpg"
        alt="Test image"
      />
    )

    const img = screen.getByAltText('Test image')
    fireEvent.error(img)

    await waitFor(() => {
      expect(screen.getByText('Failed to load image')).toBeInTheDocument()
    })
  })

  it('applies custom className', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        className="custom-class"
      />
    )

    const container = screen.getByAltText('Test image').closest('div')
    expect(container).toHaveClass('custom-class')
  })

  it('uses lazy loading by default', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
      />
    )

    const img = screen.getByAltText('Test image')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('respects loadingStrategy prop', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        loadingStrategy="eager"
      />
    )

    const img = screen.getByAltText('Test image')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('handles onLoad event', async () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
      />
    )

    const img = screen.getByAltText('Test image')
    fireEvent.load(img)

    await waitFor(() => {
      expect(img).toHaveClass('opacity-100')
    })
  })
})