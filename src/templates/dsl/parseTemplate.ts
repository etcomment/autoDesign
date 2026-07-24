import type { RoadmapData, ProductRoadmapData, TemplateData, TemplateElementStyle, TemplateMilestone } from '../types'

function stripQuotes(s: string): string {
  return s.replace(/^["']|["']$/g, '').trim()
}

function parseStyleValue(value: string): string | number {
  const num = Number(value)
  if (!isNaN(num)) return num
  return value.replace(/^["']|["']$/g, '')
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
  const defaultStyle: Record<string, string | number> = {}
  let currentStyle: Record<string, string | number> | null = null

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

    const styleMatch = /^style\s+(\S+)\s+(.+)$/.exec(line)
    if (styleMatch) {
      const key = styleMatch[1]!
      const value = parseStyleValue(styleMatch[2]!)
      if (currentStyle) {
        currentStyle[key] = value
      } else {
        defaultStyle[key] = value
      }
      continue
    }

    const milestoneMatch = /^milestone(?:\s+(\S+):(\S+))?\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (milestoneMatch) {
      const style: TemplateElementStyle = {}
      if (currentStyle) {
        for (const [k, v] of Object.entries(currentStyle)) {
          ;(style as Record<string, unknown>)[k] = v
        }
      }
      milestones.push({
        quarter: milestoneMatch[1],
        lane: milestoneMatch[2],
        title: milestoneMatch[3]!,
        subtitle: milestoneMatch[4] ? stripQuotes(milestoneMatch[4]) : undefined,
        style: Object.keys(style).length > 0 ? style : undefined,
      })
      currentStyle = {}
      continue
    }
  }

  const defaultStyleObj: TemplateElementStyle | undefined = Object.keys(defaultStyle).length > 0 ? defaultStyle as unknown as TemplateElementStyle : undefined

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
        style: m.style ?? (Object.keys(defaultStyle).length > 0 ? defaultStyleObj : undefined),
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
      style: m.style ?? (Object.keys(defaultStyle).length > 0 ? defaultStyleObj : undefined),
    })),
  }
}
