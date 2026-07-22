export interface GanttTask {
  name: string
  start?: string
  end?: string
  duration?: number
  after?: string
  section?: string
}

export function parseGantt(dsl: string): { title?: string; dateFormat?: string; sections: Record<string, GanttTask[]> } {
  let title: string | undefined
  let dateFormat: string | undefined
  const sections: Record<string, GanttTask[]> = {}
  let currentSection = 'Default'
  const lines = dsl.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^gantt/i.test(trimmed)) continue

    const titleMatch = /^title\s+(.+)/i.exec(trimmed)
    if (titleMatch) { title = titleMatch[1]!.trim(); continue }

    const formatMatch = /^dateFormat\s+(.+)/i.exec(trimmed)
    if (formatMatch) { dateFormat = formatMatch[1]!.trim(); continue }

    const sectionMatch = /^section\s+(.+)/i.exec(trimmed)
    if (sectionMatch) {
      currentSection = sectionMatch[1]!.trim()
      if (!sections[currentSection]) sections[currentSection] = []
      continue
    }

    const taskMatch = /^(.+?)\s*:/.exec(trimmed)
    if (taskMatch) {
      const taskName = taskMatch[1]!.trim()
      const rest = trimmed.slice(taskMatch[0].length).trim()

      const durationMatch = /([\d.]+)[dwmy]?/.exec(rest)
      const afterMatch = /after\s+(\S+)/.exec(rest)

      const task: GanttTask = {
        name: taskName,
        duration: durationMatch ? parseFloat(durationMatch[1]!) : undefined,
        after: afterMatch ? afterMatch[1]!.trim() : undefined,
      }

      if (!sections[currentSection]) sections[currentSection] = []
      sections[currentSection]!.push(task)
    }
  }

  return { title, dateFormat, sections }
}

export function isGantt(dsl: string): boolean {
  return /^\s*gantt/i.test(dsl)
}
