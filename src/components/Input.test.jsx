import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { Input } from './Input'

// Mock component to test Input with react-hook-form
function TestInputWrapper({ inputProps }) {
  const { register } = useForm()
  return <Input register={register} {...inputProps} />
}

describe('Input Component', () => {
  it('renders input with correct type and placeholder', () => {
    render(
      <TestInputWrapper 
        inputProps={{
          type: 'email',
          placeholder: 'Enter your email',
          name: 'email'
        }} 
      />
    )
    
    const input = screen.getByPlaceholderText('Enter your email')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'email')
  })

  it('applies correct CSS classes', () => {
    render(
      <TestInputWrapper 
        inputProps={{
          type: 'text',
          placeholder: 'Test input',
          name: 'test'
        }} 
      />
    )
    
    const input = screen.getByPlaceholderText('Test input')
    expect(input).toHaveClass(
      'w-full',
      'text-black',
      'bg-white',
      'px-4',
      'py-2',
      'rounded-md',
      'my-2',
      'border-1',
      'border-[#046bb1]'
    )
  })

  it('handles user input correctly', () => {
    render(
      <TestInputWrapper 
        inputProps={{
          type: 'text',
          placeholder: 'Type here',
          name: 'testInput'
        }} 
      />
    )
    
    const input = screen.getByPlaceholderText('Type here')
    fireEvent.change(input, { target: { value: 'Hello World' } })
    
    expect(input.value).toBe('Hello World')
  })

  it('renders different input types correctly', () => {
    const { rerender } = render(
      <TestInputWrapper 
        inputProps={{
          type: 'password',
          placeholder: 'Password',
          name: 'password'
        }} 
      />
    )
    
    let input = screen.getByPlaceholderText('Password')
    expect(input).toHaveAttribute('type', 'password')
    
    rerender(
      <TestInputWrapper 
        inputProps={{
          type: 'number',
          placeholder: 'Age',
          name: 'age'
        }} 
      />
    )
    
    input = screen.getByPlaceholderText('Age')
    expect(input).toHaveAttribute('type', 'number')
  })

  it('handles required prop correctly', () => {
    render(
      <TestInputWrapper 
        inputProps={{
          type: 'text',
          placeholder: 'Required field',
          name: 'required',
          required: true
        }} 
      />
    )
    
    const input = screen.getByPlaceholderText('Required field')
    expect(input).toBeInTheDocument()
    // Note: The actual required validation is handled by react-hook-form
  })

  it('works with different name attributes', () => {
    render(
      <TestInputWrapper 
        inputProps={{
          type: 'text',
          placeholder: 'Username',
          name: 'username'
        }} 
      />
    )
    
    const input = screen.getByPlaceholderText('Username')
    expect(input).toHaveAttribute('name', 'username')
  })
})
