import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RoleCard from './RoleCard'

describe('RoleCard Component', () => {
  it('renders with correct initial content', () => {
    render(<RoleCard />)
    
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Control total del sistema. Tiene todos los permisos')).toBeInTheDocument()
  })

  it('starts in unselected state', () => {
    render(<RoleCard />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    
    const label = screen.getByRole('checkbox').closest('label')
    expect(label).toHaveClass('border-gray-300')
    expect(label).not.toHaveClass('border-blue-600', 'ring-2', 'ring-blue-400')
  })

  it('toggles selection when clicked', () => {
    render(<RoleCard />)
    
    const checkbox = screen.getByRole('checkbox')
    const label = checkbox.closest('label')
    
    // Initially unselected
    expect(checkbox).not.toBeChecked()
    expect(label).toHaveClass('border-gray-300')
    
    // Click to select
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(label).toHaveClass('border-blue-600', 'ring-2', 'ring-blue-400')
    expect(label).not.toHaveClass('border-gray-300')
    
    // Click again to unselect
    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
    expect(label).toHaveClass('border-gray-300')
    expect(label).not.toHaveClass('border-blue-600', 'ring-2', 'ring-blue-400')
  })

  it('shows custom check indicator when selected', () => {
    render(<RoleCard />)
    
    const checkbox = screen.getByRole('checkbox')
    
    // Initially no inner check indicator
    let checkCircle = document.querySelector('.h-5.w-5.border-2.rounded-full')
    expect(checkCircle).toHaveClass('border-black')
    expect(checkCircle).not.toHaveClass('bg-blue-600', 'border-blue-600')
    
    // After selection, check indicator should appear
    fireEvent.click(checkbox)
    
    checkCircle = document.querySelector('.h-5.w-5.border-2.rounded-full')
    expect(checkCircle).toHaveClass('bg-blue-600', 'border-blue-600')
    expect(checkCircle).not.toHaveClass('border-black')
    
    // Inner white dot should be visible
    const innerDot = document.querySelector('.h-2\\.5.w-2\\.5.bg-white.rounded-full')
    expect(innerDot).toBeInTheDocument()
  })

  it('can be toggled multiple times', () => {
    render(<RoleCard />)
    
    const checkbox = screen.getByRole('checkbox')
    
    // Toggle multiple times
    for (let i = 0; i < 5; i++) {
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
      
      fireEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
    }
  })

  it('has proper accessibility attributes', () => {
    render(<RoleCard />)
    
    const checkbox = screen.getByRole('checkbox')
    const label = checkbox.closest('label')
    
    expect(checkbox).toHaveAttribute('type', 'checkbox')
    expect(label).toHaveClass('cursor-pointer')
    
    // Checkbox should be accessible but visually hidden
    expect(checkbox).toHaveClass('absolute', 'opacity-0', 'pointer-events-none')
  })

  it('applies correct styling classes', () => {
    render(<RoleCard />)
    
    const label = screen.getByRole('checkbox').closest('label')
    
    expect(label).toHaveClass(
      'cursor-pointer',
      'border',
      'rounded-xl',
      'p-4',
      'transition',
      'flex',
      'justify-between',
      'items-start',
      'mb-2'
    )
    
    const title = screen.getByText('Admin')
    expect(title).toHaveClass('text-blue-700', 'font-semibold', 'text-lg')
    
    const description = screen.getByText('Control total del sistema. Tiene todos los permisos')
    expect(description).toHaveClass('text-black', 'mt-1')
  })
})
