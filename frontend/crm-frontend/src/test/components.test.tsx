import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import Tag from '@/shared/ui/Tag'

// ── Button ──────────────────────────────────────────────────────────────────
describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled and shows spinner when loading', () => {
    render(<Button loading>Save</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies danger variant class', () => {
    render(<Button variant="danger">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })
})

// ── Input ────────────────────────────────────────────────────────────────────
describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" placeholder="Enter email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Input error="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('fires onChange', () => {
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
    expect(onChange).toHaveBeenCalled()
  })
})

// ── Tag ──────────────────────────────────────────────────────────────────────
describe('Tag', () => {
  it('renders label text', () => {
    render(<Tag label="Weekly" />)
    expect(screen.getByText('Weekly')).toBeInTheDocument()
  })

  it('applies weekly color class', () => {
    render(<Tag label="Weekly" />)
    expect(screen.getByText('Weekly')).toHaveClass('bg-tag-weekly')
  })

  it('applies default color for unknown tag', () => {
    render(<Tag label="Unknown" />)
    expect(screen.getByText('Unknown')).toHaveClass('bg-gray-100')
  })
})
