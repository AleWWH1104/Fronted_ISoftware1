import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Label } from './Label'

describe('Label Component', () => {
  it('renders label with children text', () => {
    render(<Label>Username</Label>)
    
    const label = screen.getByText('Username')
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('LABEL')
  })

  it('applies correct CSS classes', () => {
    render(<Label>Email Address</Label>)
    
    const label = screen.getByText('Email Address')
    expect(label).toHaveClass(
      'text-m',
      'block',
      'my-1',
      'text-white',
      'font-bold'
    )
  })

  it('sets htmlFor attribute correctly', () => {
    render(<Label htmlFor="email-input">Email</Label>)
    
    const label = screen.getByText('Email')
    expect(label).toHaveAttribute('for', 'email-input')
  })

  it('works without htmlFor attribute', () => {
    render(<Label>Password</Label>)
    
    const label = screen.getByText('Password')
    expect(label).toBeInTheDocument()
    expect(label).not.toHaveAttribute('for')
  })

  it('renders different children content correctly', () => {
    const { rerender } = render(<Label>First Label</Label>)
    expect(screen.getByText('First Label')).toBeInTheDocument()
    
    rerender(<Label>Second Label</Label>)
    expect(screen.getByText('Second Label')).toBeInTheDocument()
    expect(screen.queryByText('First Label')).not.toBeInTheDocument()
  })

  it('can render complex children content', () => {
    render(
      <Label htmlFor="complex">
        <span>Required</span> Field *
      </Label>
    )
    
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.getByText('Field *')).toBeInTheDocument()
  })
})
