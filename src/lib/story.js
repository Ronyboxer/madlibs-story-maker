/**
 * Story template helpers.
 *
 * A template marks its blanks in square brackets, for example
 * "I saw a [adjective] [animal]". A blank may appear more than once, and the
 * same answer is used everywhere it appears.
 */

const PLACEHOLDER = /\[([^\]]+)\]/g

/**
 * The distinct blanks in a template, in the order they first appear.
 *
 * Deduplicated on purpose. Most templates repeat a blank, and the form asks
 * once per distinct blank rather than once per occurrence.
 */
export function extractPlaceholders(template) {
  if (!template) return []
  const seen = []
  for (const match of template.matchAll(PLACEHOLDER)) {
    if (!seen.includes(match[1])) seen.push(match[1])
  }
  return seen
}

/**
 * Substitute answers into a template. Every occurrence of a blank is replaced,
 * so a repeated blank stays consistent through the story. Blanks with no
 * answer are left as they are rather than silently becoming an empty gap.
 */
export function fillTemplate(template, answers) {
  if (!template) return ''
  return template.replace(PLACEHOLDER, (whole, name) => {
    const value = answers?.[name]
    return value === undefined || value === '' ? whole : value
  })
}
