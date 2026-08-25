import type { Diagnostic } from '@codemirror/lint'
import { parseMermaid } from '../../mermaid/parseMermaid'
import { parseTemplateDsl } from '../../templates/dsl/parseTemplate'
import type { CodeEditorLanguage } from '../../ui/CodeEditor'

export function computeDiagnostics(language: CodeEditorLanguage, text: string): Diagnostic[] {
  const trimmed = text.trim()
  if (!trimmed) return []

  if (language === 'templates') {
    return computeTemplateDiagnostics(text)
  }

  return computeMermaidDiagnostics(text)
}

function computeMermaidDiagnostics(text: string): Diagnostic[] {
  const trimmed = text.trim()
  try {
    const result = parseMermaid(trimmed)
    if (
      result.model.shapes.length === 0 &&
      result.model.connections.length === 0 &&
      !result.diagramData &&
      result.subgraphGroups.length === 0
    ) {
      return [
        {
          from: 0,
          to: firstLineEnd(text),
          severity: 'warning',
          message: 'Aucun élément détecté dans ce diagramme Mermaid',
        },
      ]
    }
    return []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Syntaxe Mermaid invalide'
    return [
      {
        from: 0,
        to: firstLineEnd(text),
        severity: 'error',
        message,
      },
    ]
  }
}

function computeTemplateDiagnostics(text: string): Diagnostic[] {
  const data = parseTemplateDsl(text)
  if (data) return []

  const firstContentLine = text
    .split('\n')
    .findIndex(line => line.trim() && !line.trim().startsWith('//'))

  const from = firstContentLine === -1 ? 0 : offsetOfLine(text, firstContentLine)
  const to = firstContentLine === -1 ? Math.min(8, text.length) : offsetOfLine(text, firstContentLine + 1)

  return [
    {
      from,
      to: Math.max(from + 1, to),
      severity: 'error',
      message: 'DSL invalide : la première ligne doit être un en-tête @type ou @typeN "titre"',
    },
  ]
}

function offsetOfLine(text: string, lineIndex: number): number {
  let offset = 0
  for (let i = 0; i < lineIndex; i++) {
    const newline = text.indexOf('\n', offset)
    if (newline === -1) return text.length
    offset = newline + 1
  }
  return offset
}

function firstLineEnd(text: string): number {
  const newline = text.indexOf('\n')
  return newline === -1 ? text.length : newline
}
