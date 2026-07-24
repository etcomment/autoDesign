import type { RoadmapData, ProductRoadmapData, TemplateData, TemplateElementStyle, TemplateMilestone } from '../types'

function stripQuotes(s: string): string {
  return s.replace(/^["']|["']$/g, '').trim().replace(/\\n/g, '\n')
}

function parseStyleValue(value: string): string | number {
  const num = Number(value)
  if (!isNaN(num)) return num
  return value.replace(/^["']|["']$/g, '')
}

function styleObj(record: Record<string, string | number>): TemplateElementStyle | undefined {
  const keys = Object.keys(record)
  if (keys.length === 0) return undefined
  return record as unknown as TemplateElementStyle
}

export function parseTemplateDsl(dsl: string): TemplateData | null {
  const trimmed = dsl.trim()
  if (!trimmed) return null

  if (trimmed.startsWith('@roadmap')) {
    return parseRoadmap(trimmed)
  }

  return null
}

function parseRoadmap(dsl: string): RoadmapData | ProductRoadmapData {
  const lines = dsl.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'))
  let title: string | undefined
  let startLabel: string | undefined
  let finishLabel: string | undefined
  const milestones: TemplateMilestone[] = []
  const quarters: string[] = []
  const lanes: string[] = []
  const globalStyles: Record<string, string | number> = {}
  let pendingStyle: Record<string, string | number> = {}
  let hasPendingStyle = false
  let pendingMilestone: { quarter?: string; lane?: string; title: string; subtitle?: string } | null = null

  function flushMilestone() {
    if (pendingMilestone) {
      const merged = { ...globalStyles, ...(hasPendingStyle ? pendingStyle : {}) }
      milestones.push({
        ...pendingMilestone,
        style: styleObj(merged),
      })
      pendingMilestone = null
      pendingStyle = {}
      hasPendingStyle = false
    }
  }

  for (const line of lines) {
    if (line.startsWith('@roadmap')) {
      const titleMatch = /^@roadmap\s+"?([^"]*)"?\s*$/.exec(line)
      if (titleMatch && titleMatch[1]) title = stripQuotes(titleMatch[1])
      continue
    }

    const startMatch = /^start\s+"([^"]*)"\s*$/.exec(line)
    if (startMatch) { startLabel = startMatch[1]!; continue }

    const finishMatch = /^finish\s+"([^"]*)"\s*$/.exec(line)
    if (finishMatch) { finishLabel = finishMatch[1]!; continue }

    const quartersMatch = /^quarters\s+(.+)$/.exec(line)
    if (quartersMatch) { quarters.push(...quartersMatch[1]!.split(/\s+/).filter(Boolean)); continue }

    const lanesMatch = /^lanes\s+(.+)$/.exec(line)
    if (lanesMatch) { lanes.push(...lanesMatch[1]!.split(/\s+/).filter(Boolean)); continue }

    const styleMatch = /^style\s+(\S+)\s+(.+)$/.exec(line)
    if (styleMatch) {
      const key = styleMatch[1]!
      const value = parseStyleValue(styleMatch[2]!)
      if (pendingMilestone) {
        pendingStyle[key] = value
        hasPendingStyle = true
      } else {
        globalStyles[key] = value
      }
      continue
    }

    const milestoneMatch = /^milestone(?:\s+(\S+):(\S+))?\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (milestoneMatch) {
      flushMilestone()
      pendingMilestone = {
        quarter: milestoneMatch[1],
        lane: milestoneMatch[2],
        title: milestoneMatch[3]!,
        subtitle: milestoneMatch[4] ? stripQuotes(milestoneMatch[4]) : undefined,
      }
      pendingStyle = {}
      hasPendingStyle = false
      continue
    }
  }

  flushMilestone()

  const globalStyle = styleObj(globalStyles)

  if (quarters.length > 0 || lanes.length > 0) {
    const defaultQuarters = quarters.length > 0 ? quarters : ['Q1', 'Q2', 'Q3', 'Q4']
    const defaultLanes = lanes.length > 0 ? lanes : ['Default']

    return {
      type: 'productRoadmap',
      title,
      quarters: defaultQuarters.map(q => ({ label: q })),
      lanes: defaultLanes.map(l => ({ label: l })),
      milestones: milestones.map(m => ({
        title: m.title,
        subtitle: m.subtitle,
        quarter: m.quarter ?? defaultQuarters[0],
        lane: m.lane ?? defaultLanes[0],
        style: m.style ?? globalStyle,
      })),
    }
  }

  return {
    type: 'roadmap',
    title,
    startLabel,
    finishLabel,
    milestones: milestones.map(m => ({
      title: m.title,
      subtitle: m.subtitle,
      style: m.style ?? globalStyle,
    })),
  }
}
