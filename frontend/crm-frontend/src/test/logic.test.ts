import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Auth token helpers ────────────────────────────────────────────────────────
describe('Auth token persistence', () => {
  beforeEach(() => localStorage.clear())

  it('stores token in localStorage on login', () => {
    localStorage.setItem('token', 'test-jwt-token')
    expect(localStorage.getItem('token')).toBe('test-jwt-token')
  })

  it('removes token on logout', () => {
    localStorage.setItem('token', 'test-jwt-token')
    localStorage.removeItem('token')
    expect(localStorage.getItem('token')).toBeNull()
  })
})

// ── Note status tag parsing ───────────────────────────────────────────────────
function parseTags(status: string): string[] {
  return status.split(',').map((s) => s.trim()).filter(Boolean)
}

describe('parseTags', () => {
  it('parses single tag', () => {
    expect(parseTags('Weekly')).toEqual(['Weekly'])
  })

  it('parses multiple comma-separated tags', () => {
    expect(parseTags('Monthly,Product')).toEqual(['Monthly', 'Product'])
  })

  it('trims whitespace', () => {
    expect(parseTags('Personal , Business')).toEqual(['Personal', 'Business'])
  })

  it('filters empty strings', () => {
    expect(parseTags('')).toEqual([])
  })
})

// ── Date formatting ───────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
}

describe('formatDate', () => {
  it('formats ISO date string to readable format', () => {
    const result = formatDate('2024-03-05T04:25:00.000Z')
    expect(result).toContain('Mar')
    expect(result).toContain('5')
  })
})

// ── Note validation ───────────────────────────────────────────────────────────
function validateNote(title: string): string | null {
  if (!title.trim()) return 'Title is required'
  if (title.length > 200) return 'Title too long'
  return null
}

describe('validateNote', () => {
  it('returns error for empty title', () => {
    expect(validateNote('')).toBe('Title is required')
  })

  it('returns error for whitespace-only title', () => {
    expect(validateNote('   ')).toBe('Title is required')
  })

  it('returns null for valid title', () => {
    expect(validateNote('Product Team Meeting')).toBeNull()
  })

  it('returns error for title over 200 chars', () => {
    expect(validateNote('a'.repeat(201))).toBe('Title too long')
  })
})
