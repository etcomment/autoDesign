export interface TimelineEvent {
  date: string
  title: string
  description?: string
}

export function parseTimeline(dsl: string): { sections?: Record<string, TimelineEvent[]>; events: TimelineEvent[] } {
  const events: TimelineEvent[] = []
  const sections: Record<string, TimelineEvent[]> = {}
  let currentSection = ''
  const lines = dsl.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^timeline/i.test(trimmed)) continue

    const sectionMatch = /^section\s+(.+)/i.exec(trimmed)
    if (sectionMatch) {
      currentSection = sectionMatch[1]!.trim()
      if (!sections[currentSection]) sections[currentSection] = []
      continue
    }

    const eventMatch = /^(.+?)\s*:\s*(.+)$/.exec(trimmed)
    if (eventMatch) {
      const date = eventMatch[1]!.trim()
      const rest = eventMatch[2]!.trim()
      const colonIdx = rest.indexOf(':')
      let title = rest
      let description = ''
      if (colonIdx >= 0) {
        title = rest.slice(0, colonIdx).trim()
        description = rest.slice(colonIdx + 1).trim()
      }
      const event: TimelineEvent = { date, title, description: description || undefined }
      if (currentSection) {
        sections[currentSection]!.push(event)
      }
      events.push(event)
    }
  }

  return { sections: Object.keys(sections).length > 0 ? sections : undefined, events }
}

export function isTimeline(dsl: string): boolean {
  return /^\s*timeline/i.test(dsl)
}
