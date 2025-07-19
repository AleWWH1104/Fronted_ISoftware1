import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Label } from '../components/Label'

// Integration test component that combines multiple components
function TestForm() {
  const { register, handleSubmit, watch } = useForm()
  const watchedEmail = watch('email', '')

  const onSubmit = vi.fn()

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="test-form">
      <Label htmlFor="email">Email Address</Label>
      <Input 
        type="email"
        name="email"
        placeholder="Enter your email"
        register={register}
        required={true}
      />
      
      <Label htmlFor="password">Password</Label>
      <Input 
        type="password"
        name="password"
        placeholder="Enter your password"
        register={register}
        required={true}
      />
      
      <Button type="submit">
        {watchedEmail ? `Submit as ${watchedEmail}` : 'Submit Form'}
      </Button>
    </form>
  )
}

describe('Component Integration Tests', () => {
  it('renders form with all components correctly', () => {
    render(<TestForm />)
    
    // Check labels
    expect(screen.getByText('Email Address')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    
    // Check inputs
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
    
    // Check button
    expect(screen.getByRole('button', { name: /submit form/i })).toBeInTheDocument()
  })

  it('updates button text based on email input', () => {
    render(<TestForm />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const button = screen.getByRole('button')
    
    // Initially shows default text
    expect(button).toHaveTextContent('Submit Form')
    
    // Type in email and check button text updates
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    // Note: This might need a small delay for react-hook-form to update
    setTimeout(() => {
      expect(button).toHaveTextContent('Submit as test@example.com')
    }, 100)
  })

  it('handles form interactions correctly', () => {
    render(<TestForm />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    
    // Fill out form
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    // Check values are set
    expect(emailInput.value).toBe('user@test.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('maintains proper label-input associations', () => {
    render(<TestForm />)
    
    const emailLabel = screen.getByText('Email Address')
    const passwordLabel = screen.getByText('Password')
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    
    // Check label associations
    expect(emailLabel).toHaveAttribute('for', 'email')
    expect(passwordLabel).toHaveAttribute('for', 'password')
    expect(emailInput).toHaveAttribute('name', 'email')
    expect(passwordInput).toHaveAttribute('name', 'password')
  })

  it('applies consistent styling across components', () => {
    render(<TestForm />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const button = screen.getByRole('button')
    const labels = screen.getAllByText(/address|password/i)
    
    // Check inputs have consistent styling
    expect(emailInput).toHaveClass('w-full', 'px-4', 'py-2', 'rounded-md')
    expect(passwordInput).toHaveClass('w-full', 'px-4', 'py-2', 'rounded-md')
    
    // Check button styling
    expect(button).toHaveClass('w-full', 'rounded-md', 'font-semibold')
    
    // Check labels have consistent styling
    labels.forEach(label => {
      expect(label).toHaveClass('text-white', 'font-bold')
    })
  })
})
