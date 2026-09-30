import type { TemplateData } from '../../src/templates/types'
import { parseTemplateDsl } from '../../src/templates/dsl/parseTemplate'
import { TEMPLATES } from '../../src/templates/registry'

const KNOWN_TEMPLATE_TYPES = new Set<string>(TEMPLATES.map(template => template.type.toLowerCase()))

function normalizeDsl(rawDsl: string): string {
  const trimmed = rawDsl.trim()
  if (!trimmed) {
    throw new Error('DSL code cannot be empty')
  }

  if (trimmed.startsWith('@')) {
    return trimmed
  }

  const lines = trimmed.split('\n')
  const firstLine = lines[0]?.trim() ?? ''
  const words = firstLine.split(/\s+/)
  const firstWord = words[0]?.toLowerCase() ?? ''

  if (KNOWN_TEMPLATE_TYPES.has(firstWord)) {
    lines[0] = `@${firstLine}`
    return lines.join('\n')
  }

  return trimmed
}

export function parseDslToTemplateData(rawDsl: string): TemplateData {
  const normalized = normalizeDsl(rawDsl)
  const templateData = parseTemplateDsl(normalized)

  if (!templateData) {
    throw new Error('Failed to parse DSL code into valid template data')
  }

  return templateData
}
