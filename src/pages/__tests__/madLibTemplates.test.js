import { describe, expect, it } from 'vitest'

import madLibTemplates from '../madLibTemplates'
import { extractPlaceholders, fillTemplate } from '../../lib/story'

describe('the story collection', () => {
  it('ships at least 20 stories, which the README claims', () => {
    expect(madLibTemplates.length).toBeGreaterThanOrEqual(20)
  })

  it('gives every story a title and a template', () => {
    for (const story of madLibTemplates) {
      expect(story.title.trim()).not.toBe('')
      expect(story.template.trim()).not.toBe('')
    }
  })

  it('gives every story a unique title', () => {
    const titles = madLibTemplates.map((s) => s.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('gives every story at least one blank to fill', () => {
    for (const story of madLibTemplates) {
      expect(extractPlaceholders(story.template).length).toBeGreaterThan(0)
    }
  })

  it('leaves no blank unfilled once every blank is answered', () => {
    for (const story of madLibTemplates) {
      const answers = Object.fromEntries(
        extractPlaceholders(story.template).map((name) => [name, 'WORD']),
      )
      const filled = fillTemplate(story.template, answers)
      expect(filled, `${story.title} still has an unfilled blank`).not.toMatch(/\[[^\]]+\]/)
    }
  })

  it('has no unclosed bracket in any template', () => {
    for (const story of madLibTemplates) {
      const opens = (story.template.match(/\[/g) || []).length
      const closes = (story.template.match(/\]/g) || []).length
      expect(opens, `${story.title} has unbalanced brackets`).toBe(closes)
    }
  })
})
