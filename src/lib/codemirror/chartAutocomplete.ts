import type { Completion, CompletionContext, CompletionResult } from '@codemirror/autocomplete'

export const CHART_TYPES: Completion[] = [
  { label: 'line', type: 'type', detail: 'Courbe avec timeline', boost: 20 },
  { label: 'bar', type: 'type', detail: 'Histogramme vertical', boost: 19 },
  { label: 'pie', type: 'type', detail: 'Camembert / Donut', boost: 18 },
  { label: 'gauge', type: 'type', detail: 'Tachymètre avec aiguille', boost: 17 },
  { label: 'stat', type: 'type', detail: 'Grande icône + valeur chiffrée', boost: 16 },
  { label: 'progress', type: 'type', detail: 'Barre de progression horizontale', boost: 15 },
  { label: 'area', type: 'type', detail: 'Graphique en aires superposées', boost: 14 },
]

export const CHART_PREFIX_OPTIONS: Completion[] = CHART_TYPES.map(chartType => ({
  label: `chart:${chartType.label}`,
  type: 'property',
  detail: chartType.detail,
  boost: (chartType.boost ?? 10) + 10,
}))

export function chartCompletionSource(context: CompletionContext): CompletionResult | null {
  const chartDirectMatch = context.matchBefore(/chart:\s*"?([A-Za-z0-9_-]*)$/)
  if (chartDirectMatch) {
    const colonIndex = chartDirectMatch.text.indexOf(':')
    const quoteIndex = chartDirectMatch.text.indexOf('"', colonIndex)
    const from = chartDirectMatch.from + (quoteIndex !== -1 ? quoteIndex + 1 : colonIndex + 1)
    return {
      from,
      options: CHART_TYPES,
      validFor: /^[A-Za-z0-9_-]*$/,
    }
  }

  const metricPostTitleMatch = context.matchBefore(
    /(?:metric|widget)\s+(?:"[^"]*"|'[^']*')\s+([A-Za-z0-9_:-]*)$/
  )
  if (metricPostTitleMatch) {
    const tokens = metricPostTitleMatch.text.split(/\s+/)
    const typedWord = tokens[tokens.length - 1] ?? ''
    if (
      typedWord.startsWith('icon:') ||
      typedWord.startsWith('val:') ||
      typedWord.startsWith('pct:') ||
      typedWord.startsWith('#')
    ) {
      return null
    }
    const from = context.pos - typedWord.length
    return {
      from,
      options: CHART_PREFIX_OPTIONS,
      validFor: /^[A-Za-z0-9_:-]*$/,
    }
  }

  const metricPostValueMatch = context.matchBefore(
    /(?:metric|widget)\s+(?:"[^"]*"|'[^']*')\s+(?:"[^"]*"|'[^']*'|\S+)\s+([A-Za-z0-9_:-]*)$/
  )
  if (metricPostValueMatch) {
    const tokens = metricPostValueMatch.text.split(/\s+/)
    const typedWord = tokens[tokens.length - 1] ?? ''
    if (
      typedWord.startsWith('icon:') ||
      typedWord.startsWith('val:') ||
      typedWord.startsWith('pct:') ||
      typedWord.startsWith('#')
    ) {
      return null
    }
    const from = context.pos - typedWord.length
    return {
      from,
      options: CHART_PREFIX_OPTIONS,
      validFor: /^[A-Za-z0-9_:-]*$/,
    }
  }

  return null
}
