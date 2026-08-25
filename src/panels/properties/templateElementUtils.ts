export interface ParsedElement {
  prefix: string
  collectionKey?: string
  index: number
  isStartBanner?: boolean
  isFinishBanner?: boolean
  isMainTitle?: boolean
}

const collectionKeys: Record<string, string> = {
  milestone: 'milestones',
  circle: 'milestones',
  block: 'blocks',
  step: 'steps',
  piece: 'pieces',
  level: 'levels',
  section: 'sections',
  metric: 'metrics',
  row: 'rows',
  item: 'items',
  node: 'nodes',
  branch: 'branches',
  station: 'stations',
  primary: 'primary',
  support: 'support',
  dot: 'milestones',
  card: 'milestones',
  text: 'milestones',
  tick: 'milestones',
  segment: 'segments',
  ring: 'rings',
  bar: 'bars',
  gauge: 'gauges',
  entry: 'entries',
  thermo: 'thermos',
  prod: 'products',
  q: 'quarters',
  qa: 'qaItems',
  quadrant: 'quadrants',
  phase: 'lanes',
  lane: 'lanes',
  col: 'nodes',
}

export function parseTemplateElementId(elementId: string): ParsedElement {
  const parts = elementId.split('-')

  if (parts.includes('start')) {
    return { prefix: 'banner', isStartBanner: true, index: NaN }
  }
  if (parts.includes('finish')) {
    return { prefix: 'banner', isFinishBanner: true, index: NaN }
  }
  if (parts.length === 1 && parts[0] === 'title') {
    return { prefix: 'title', isMainTitle: true, index: NaN }
  }
  if (parts.includes('title') && !parts.includes('card') && !parts.includes('item') && !parts.includes('ms')) {
    return { prefix: 'title', isMainTitle: true, index: NaN }
  }

  let rawIdx = NaN
  for (let i = parts.length - 1; i >= 0; i--) {
    const parsed = parseInt(parts[i]!, 10)
    if (!isNaN(parsed)) {
      rawIdx = parsed
      break
    }
  }

  let prefix = ''
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i]!
    if (collectionKeys[part]) {
      prefix = part
      break
    }
  }

  if (!prefix && parts.length > 0) {
    prefix = parts[0]!
  }

  return { prefix, collectionKey: collectionKeys[prefix], index: rawIdx }
}

export function elementLabel(elementId: string): string {
  const parsed = parseTemplateElementId(elementId)
  if (parsed.isMainTitle) return 'Titre Principal'
  if (parsed.isStartBanner) return 'Bannière Début (Start)'
  if (parsed.isFinishBanner) return 'Bannière Fin (Finish)'
  const labels: Record<string, string> = {
    milestone: 'Jalon', circle: 'Cercle Jaune', block: 'Bloc', step: 'Étape', piece: 'Pièce',
    level: 'Niveau', section: 'Section', metric: 'Métrique', row: 'Ligne',
    item: 'Élément', node: 'Nœud', station: 'Station', branch: 'Branche',
    primary: 'Activité', support: 'Support', card: 'Carte Jalon',
    timeline: 'Chronologie', start: 'Début', finish: 'Fin', chevron: 'Chevron',
  }
  const label = labels[parsed.prefix] ?? parsed.prefix
  return !isNaN(parsed.index) ? `${label} ${parsed.index + 1}` : label
}

export const numericFields = new Set(['percentage', 'width', 'height', 'x', 'y'])
