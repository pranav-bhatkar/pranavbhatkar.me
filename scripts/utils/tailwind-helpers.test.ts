import { describe, it, expect } from 'vitest'
import { cn } from './tailwind-helpers'

describe('cn utility', () => {
  it("handles undefined values", () => {
    expect(cn('a', undefined, 'b')).toBe('a b')
  })

  it('merges duplicate tailwind classes', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
  })
})
