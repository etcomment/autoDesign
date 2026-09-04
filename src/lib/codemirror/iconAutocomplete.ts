import type { Completion, CompletionContext, CompletionResult } from '@codemirror/autocomplete'
import { autocompletion } from '@codemirror/autocomplete'
import * as LucideIcons from 'lucide-react'
import { MIGSO_ICONS_DATA } from '../../templates/shared/migsoIconsData'

const BUILT_IN_ICON_NAMES = [
  'clock', 'gear', 'briefcase', 'people', 'star', 'phone', 'mail',
  'shield', 'award', 'dollar', 'check', 'database', 'code', 'server',
  'pieChart', 'barChart', 'lineChart', 'calendar', 'truck', 'plane',
  'user', 'chart', 'target', 'lightbulb', 'flag', 'arrowUp', 'arrowDown',
  'chat', 'globe', 'wifi', 'bluetooth', 'euro', 'creditCard', 'wallet',
  'laptop', 'mobile', 'tablet', 'cloud', 'key', 'mapPin', 'handshake',
  'trophy', 'badge', 'file', 'folder', 'clipboard', 'ship', 'package',
  'leaf', 'tree', 'recycle', 'waterDrop',
]

function buildIconCompletions(): Completion[] {
  const seen = new Set<string>()
  const completions: Completion[] = []

  for (const name of BUILT_IN_ICON_NAMES) {
    seen.add(name.toLowerCase())
    completions.push({
      label: name,
      type: 'constant',
      detail: 'Template',
      boost: 10,
    })
  }

  for (const icon of MIGSO_ICONS_DATA) {
    const idLower = icon.id.toLowerCase()
    if (!seen.has(idLower)) {
      seen.add(idLower)
      completions.push({
        label: icon.id,
        type: 'constant',
        detail: icon.categoryTitle || 'MIGSO',
        boost: 5,
      })
    }
    if (icon.name) {
      const nameLower = icon.name.toLowerCase()
      if (!seen.has(nameLower)) {
        seen.add(nameLower)
        completions.push({
          label: icon.name,
          type: 'constant',
          detail: icon.categoryTitle || 'MIGSO',
          boost: 4,
        })
      }
    }
  }

  for (const key of Object.keys(LucideIcons)) {
    if (!/^[A-Z]/.test(key) || key.endsWith('Icon') || key.endsWith('Context') || key.endsWith('Provider')) {
      continue
    }
    const camel = key.charAt(0).toLowerCase() + key.slice(1)
    const lower = camel.toLowerCase()
    if (!seen.has(lower)) {
      seen.add(lower)
      completions.push({
        label: camel,
        type: 'constant',
        detail: 'Lucide',
        boost: 2,
      })
    }
  }

  return completions
}

const ICON_COMPLETIONS = buildIconCompletions()

export function iconCompletionSource(context: CompletionContext): CompletionResult | null {
  const match = context.matchBefore(/icon:\s*"?([A-Za-z0-9_-]*)$/)
  if (!match) return null

  const colonIndex = match.text.indexOf(':')
  const quoteIndex = match.text.indexOf('"', colonIndex)
  const from = match.from + (quoteIndex !== -1 ? quoteIndex + 1 : colonIndex + 1)

  return {
    from,
    options: ICON_COMPLETIONS,
    validFor: /^[A-Za-z0-9_-]*$/,
  }
}

export const iconAutocompleteExtension = autocompletion({
  override: [iconCompletionSource],
})
