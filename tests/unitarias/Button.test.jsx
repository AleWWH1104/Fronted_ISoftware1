import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../../src/components/Button'

describe('Button Component', () => {
  it('renders button with children text', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const mockOnClick = vi.fn()
    render(<Button onClick={mockOnClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('has correct CSS classes applied', () => {
    render(<Button>Test Button</Button>)
    
    const button = screen.getByRole('button', { name: /test button/i })
    expect(button).toHaveClass(
      'bg-[#8dcdf4]',
      'text-white',
      'p-2.5',
      'rounded-md',
      'my-2',
      'w-full',
      'hover:bg-blue-900',
      'transition-colors',
      'font-semibold'
    )
  })

  it('renders different children content correctly', () => {
    const { rerender } = render(<Button>First Text</Button>)
    expect(screen.getByText('First Text')).toBeInTheDocument()
    
    rerender(<Button>Second Text</Button>)
    expect(screen.getByText('Second Text')).toBeInTheDocument()
    expect(screen.queryByText('First Text')).not.toBeInTheDocument()
  })

  it('works without onClick handler', () => {
    render(<Button>No Handler</Button>)
    
    const button = screen.getByRole('button', { name: /no handler/i })
    expect(() => fireEvent.click(button)).not.toThrow()
  })
})
