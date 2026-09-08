import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import PlaceholderForm from '../PlaceholderForm'
import madLibTemplates from '../madLibTemplates'
import { extractPlaceholders } from '../../lib/story'

describe('PlaceholderForm', () => {
  it('renders one input per blank', () => {
    const template = 'a [noun] and a [verb]'
    render(
      <PlaceholderForm
        placeholders={extractPlaceholders(template)}
        onSubmit={vi.fn()}
      />,
    )

    expect(screen.getAllByRole('textbox')).toHaveLength(2)
  })

  it('asks once for a blank the story repeats', () => {
    // "The Yelling Animal Adventure" uses [place] and [verb] twice each.
    // Before deduplication this rendered an input per occurrence, so the same
    // question appeared more than once and React saw duplicate keys.
    const template = 'to the [place], then [verb], then back to the [place]'
    render(
      <PlaceholderForm
        placeholders={extractPlaceholders(template)}
        onSubmit={vi.fn()}
      />,
    )

    expect(screen.getAllByRole('textbox')).toHaveLength(2)
  })

  it('never asks the same question twice for any shipped story', () => {
    for (const story of madLibTemplates) {
      const placeholders = extractPlaceholders(story.template)
      const { unmount } = render(
        <PlaceholderForm
          placeholders={placeholders}
          onSubmit={vi.fn()}
        />,
      )

      const labels = screen.getAllByRole('textbox').map((input) => input.placeholder)
      expect(new Set(labels).size, `${story.title} repeats a question`).toBe(labels.length)

      unmount()
    }
  })
})
