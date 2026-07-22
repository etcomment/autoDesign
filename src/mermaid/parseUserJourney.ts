export interface JourneyTask {
  name: string
  score: number
  actors: string[]
}

export interface JourneySection {
  title: string
  tasks: JourneyTask[]
}

export function parseUserJourney(dsl: string): JourneySection[] {
  const sections: JourneySection[] = []
  const lines = dsl.split('\n')
  let currentSection: JourneySection | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^journey/i.test(trimmed)) continue

    const sectionMatch = /^section\s+(.+)/i.exec(trimmed)
    if (sectionMatch) {
      currentSection = { title: sectionMatch[1]!.trim(), tasks: [] }
      sections.push(currentSection)
      continue
    }

    if (currentSection) {
      const taskMatch = /^(.+?)\s*:\s*(\d+)\s*:\s*(.+)$/.exec(trimmed)
      if (taskMatch) {
        const name = taskMatch[1]!.trim()
        const score = parseInt(taskMatch[2]!, 10)
        const actors = taskMatch[3]!.split(',').map(a => a.trim())
        currentSection.tasks.push({ name, score, actors })
      }
    }
  }

  return sections
}

export function isUserJourney(dsl: string): boolean {
  return /^\s*journey/i.test(dsl)
}
