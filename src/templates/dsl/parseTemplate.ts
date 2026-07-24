import type { RoadmapData, ProductRoadmapData, TemplateData } from '../types'

interface Milestone {
  title: string
  subtitle?: string
  quarter?: string
  lane?: string
}

function stripQuotes(s: string): string {
  return s.replace(/^["']|["']$/g, '').trim()
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
  const milestones: Milestone[] = []
  const quarters: string[] = []
  const lanes: string[] = []

  for (const line of lines) {
    if (line.startsWith('@roadmap')) {
      const titleMatch = /^@roadmap\s+"?([^"]*)"?\s*$/.exec(line)
      if (titleMatch && titleMatch[1]) title = stripQuotes(titleMatch[1])
      continue
    }

    const startMatch = /^start\s+"([^"]*)"\s*$/.exec(line)
    if (startMatch) {
      startLabel = startMatch[1]!
      continue
    }

    const finishMatch = /^finish\s+"([^"]*)"\s*$/.exec(line)
    if (finishMatch) {
      finishLabel = finishMatch[1]!
      continue
    }

    const quartersMatch = /^quarters\s+(.+)$/.exec(line)
    if (quartersMatch) {
      quarters.push(...quartersMatch[1]!.split(/\s+/).filter(Boolean))
      continue
    }

    const lanesMatch = /^lanes\s+(.+)$/.exec(line)
    if (lanesMatch) {
      lanes.push(...lanesMatch[1]!.split(/\s+/).filter(Boolean))
      continue
    }

    const milestoneMatch = /^milestone(?:\s+(\S+):(\S+))?\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (milestoneMatch) {
      milestones.push({
        quarter: milestoneMatch[1],
        lane: milestoneMatch[2],
        title: milestoneMatch[3]!,
        subtitle: milestoneMatch[4] ? stripQuotes(milestoneMatch[4]) : undefined,
      })
      continue
    }
  }

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
    })),
  }
}
