import { describe, expect, it } from 'vitest'

import { extractPlaceholders, fillTemplate } from '../story'

describe('extractPlaceholders', () => {
  it('finds the blanks in order', () => {
    expect(extractPlaceholders('a [noun] and a [verb]')).toEqual(['noun', 'verb'])
  })

  it('returns each blank once even when it repeats', () => {
    const template = 'to the [place] and back to the [place]'
    expect(extractPlaceholders(template)).toEqual(['place'])
  })

  it('keeps first-appearance order when deduplicating', () => {
    const template = '[a] [b] [a] [c] [b]'
    expect(extractPlaceholders(template)).toEqual(['a', 'b', 'c'])
  })

  it('handles blanks with spaces in the name', () => {
    expect(extractPlaceholders('some [plural noun] here')).toEqual(['plural noun'])
  })

  it('returns nothing for a template with no blanks', () => {
    expect(extractPlaceholders('just a sentence')).toEqual([])
  })

  it('returns nothing for empty or missing input', () => {
    expect(extractPlaceholders('')).toEqual([])
    expect(extractPlaceholders(undefined)).toEqual([])
  })
})

describe('fillTemplate', () => {
  it('substitutes a single blank', () => {
    expect(fillTemplate('a [noun]', { noun: 'duck' })).toBe('a duck')
  })

  it('uses the same answer for every occurrence of a blank', () => {
    const out = fillTemplate('to the [place] and back to the [place]', { place: 'zoo' })
    expect(out).toBe('to the zoo and back to the zoo')
  })

  it('leaves an unanswered blank visible rather than blanking it out', () => {
    expect(fillTemplate('a [noun] and a [verb]', { noun: 'duck' })).toBe('a duck and a [verb]')
  })

  it('treats an empty answer as unanswered', () => {
    expect(fillTemplate('a [noun]', { noun: '' })).toBe('a [noun]')
  })

  it('ignores answers for blanks the template does not have', () => {
    expect(fillTemplate('a [noun]', { noun: 'duck', extra: 'x' })).toBe('a duck')
  })

  it('does not re-substitute into a value that itself looks like a blank', () => {
    // If someone types "[noun]" as their answer it should appear literally,
    // not get replaced again.
    expect(fillTemplate('a [noun]', { noun: '[verb]' })).toBe('a [verb]')
  })

  it('copes with an empty or missing template', () => {
    expect(fillTemplate('', {})).toBe('')
    expect(fillTemplate(undefined, {})).toBe('')
  })

  it('copes with no answers at all', () => {
    expect(fillTemplate('a [noun]', undefined)).toBe('a [noun]')
  })
})
