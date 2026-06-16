import { describe, it, expect } from 'vitest'
import { shortenAddress, formatBalance } from '../stellar'

describe('shortenAddress', () => {
  it('shortens a long address', () => {
    const result = shortenAddress('GABCDEF123456789012345678901234567890123456789012345678901234567')
    expect(result).toBe('GABCDE...4567')
  })

  it('returns empty string for empty input', () => {
    expect(shortenAddress('')).toBe('')
  })

  it('handles undefined', () => {
    expect(shortenAddress(undefined as any)).toBe('')
  })
})

describe('formatBalance', () => {
  it('formats small numbers', () => {
    expect(formatBalance(123.45)).toBe('123.45')
  })

  it('formats thousands', () => {
    expect(formatBalance(1500)).toBe('1.50K')
  })

  it('formats millions', () => {
    expect(formatBalance(2000000)).toBe('2.00M')
  })

  it('formats billions', () => {
    expect(formatBalance(3000000000)).toBe('3.00B')
  })
})
