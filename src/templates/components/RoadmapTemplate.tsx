import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { CircleBadge, ChevronArrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const PALETTE = ['#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']
const W = 1000
const H = 600

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

interface LayoutMilestone {
  id: string
  index: number
  centerX: number
  rectX: number
  rectY: number
  rectW: number
  rectH: number
  isAbove: boolean
}

function getRect(layout: LayoutMilestone, positions: Record<string, Rect>): Rect {
  const stored = positions[layout.id]
  if (stored) {
    return {
      x: stored.x,
      y: stored.y,
      width: stored.width || layout.rectW,
      height: stored.height || layout.rectH,
    }
  }
  return { x: layout.rectX, y: layout.rectY, width: layout.rectW, height: layout.rectH }
}

export function RoadmapTemplate({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)
  const moveTemplateElement = useTemplateStore(s => s.moveTemplateElement)
  const resizeTemplateElement = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones, startLabel = 'START', finishLabel = 'FINISH' } = data
  const timelineY = 260
  const circleR = 14
  const marginX = 100
  const rectW = 140
  const rectH = 95
  const headerH = 30
  const gap = 12

  const layoutMilestones = useMemo<LayoutMilestone[]>(() => {
    const availableW = W - marginX * 2
    const milestoneSpacing = milestones.length > 1 ? availableW / (milestones.length - 1) : availableW / 2
    return milestones.map((_milestone, index) => {
      const elementId = `milestone-${index}`
      const centerX = marginX + index * milestoneSpacing
      const isAbove = index % 2 === 0
      const rectX = centerX - rectW / 2
      const rectY = isAbove ? timelineY - circleR - gap - rectH : timelineY + circleR + gap
      return { id: elementId, index, centerX, rectX, rectY, rectW, rectH, isAbove }
    })
  }, [milestones])

  useEffect(() => {
    if (layoutMilestones.length === 0) return
    for (const layout of layoutMilestones) {
      if (templateElementPositions[layout.id]) continue
      const rect = getRect(layout, templateElementPositions)
      moveTemplateElement(layout.id, { x: rect.x, y: rect.y })
      resizeTemplateElement(layout.id, { width: rect.width, height: rect.height })
    }
  }, [layoutMilestones, templateElementPositions, moveTemplateElement, resizeTemplateElement])

  const elementRects = new Map<string, Rect>()
  for (const layout of layoutMilestones) {
    elementRects.set(layout.id, getRect(layout, templateElementPositions))
  }

  const availableW = W - marginX * 2
  const milestoneSpacing = milestones.length > 1 ? availableW / (milestones.length - 1) : availableW / 2

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <line x1={marginX} y1={timelineY} x2={W - marginX} y2={timelineY} stroke="#bbb" strokeWidth={2} />
      <text x={marginX - 16} y={timelineY - 18} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888">{startLabel}</text>
      <text x={W - marginX + 16} y={timelineY - 18} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888">{finishLabel}</text>
      <circle cx={marginX} cy={timelineY} r={6} fill="#bbb" />
      <circle cx={W - marginX} cy={timelineY} r={6} fill="#bbb" />

      {milestones.map((milestone, index) => {
        const elementId = `milestone-${index}`
        const layout = layoutMilestones.find(l => l.id === elementId)
        if (!layout) return null
        const color = tplColors[elementId] ?? PALETTE[index % PALETTE.length]!
        const customStroke = tplStrokeColors[elementId]
        const isSelected = selectedIds.has(elementId)
        const isAbove = index % 2 === 0
        const rect = elementRects.get(elementId)!
        const num = String(index + 1)
        const centerX = rect.x + rect.width / 2

        return (
          <g key={index}>
            <line
              x1={layout.centerX}
              y1={isAbove ? timelineY - circleR : timelineY + circleR}
              x2={centerX}
              y2={isAbove ? rect.y + rect.height : rect.y}
              stroke={color}
              strokeWidth={1.5}
              opacity={0.6}
            />

            <g onMouseDown={e => startDrag(e, elementId, rect)} style={{ cursor: 'pointer' }}>
              <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} rx={10} fill="white" stroke={customStroke || (isSelected ? '#4a90d9' : color)} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <path d={`M ${rect.x + 10} ${rect.y} L ${rect.x + rect.width - 10} ${rect.y} Q ${rect.x + rect.width} ${rect.y} ${rect.x + rect.width} ${rect.y + 10} L ${rect.x + rect.width} ${rect.y + headerH} L ${rect.x} ${rect.y + headerH} L ${rect.x} ${rect.y + 10} Q ${rect.x} ${rect.y} ${rect.x + 10} ${rect.y} Z`} fill={color} />
              <text x={rect.x + rect.width / 2} y={rect.y + headerH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">{milestone.title}</text>
              {milestone.subtitle && (
                <text x={rect.x + rect.width / 2} y={rect.y + headerH + 28} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#555">{milestone.subtitle.length > 28 ? milestone.subtitle.slice(0, 25) + '...' : milestone.subtitle}</text>
              )}
              {isSelected && renderHandles(rect, elementId)}
              {/* invisible click target - keeps selection working when dragging */}
            </g>

            <g style={{ cursor: 'pointer' }} onClick={e => { e.stopPropagation(); const s = useTemplateStore.getState(); s.toggleTemplateElement(elementId); }}>
              <CircleBadge cx={layout.centerX} cy={timelineY} r={circleR} fill={color} label={num} />
            </g>

            {index < milestones.length - 1 && (
              <ChevronArrow x={layout.centerX + circleR + 3} y={timelineY - 6} width={milestoneSpacing - circleR * 2 - 6} height={12} fill="#ddd" />
            )}
          </g>
        )
      })}
    </g>
  )
}
