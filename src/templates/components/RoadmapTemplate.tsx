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
  circleId: string
  index: number
  centerX: number
  rectX: number
  rectY: number
  rectW: number
  rectH: number
  isAbove: boolean
}

function getRect(elementId: string, positions: Record<string, Rect>, layoutMap: Map<string, LayoutMilestone>): Rect {
  const stored = positions[elementId]
  if (stored) return { ...stored, width: stored.width || 20, height: stored.height || 20 }
  const layout = layoutMap.get(elementId)
  if (layout) {
    if (elementId.startsWith('circle-')) {
      return { x: layout.centerX - 14, y: 260 - 14, width: 28, height: 28 }
    }
    return { x: layout.rectX, y: layout.rectY, width: layout.rectW, height: layout.rectH }
  }
  return { x: 0, y: 0, width: 0, height: 0 }
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

  const layoutMap = useMemo(() => {
    const map = new Map<string, LayoutMilestone>()
    const availableW = W - marginX * 2
    const milestoneSpacing = milestones.length > 1 ? availableW / (milestones.length - 1) : availableW / 2
    milestones.forEach((_m, index) => {
      const elementId = `milestone-${index}`
      const circleId = `circle-${index}`
      const centerX = marginX + index * milestoneSpacing
      const isAbove = index % 2 === 0
      const rx = centerX - rectW / 2
      const ry = isAbove ? timelineY - circleR - gap - rectH : timelineY + circleR + gap
      map.set(elementId, { id: elementId, circleId, index, centerX, rectX: rx, rectY: ry, rectW, rectH, isAbove })
      map.set(circleId, { id: circleId, circleId, index, centerX, rectX: rx, rectY: ry, rectW, rectH, isAbove })
    })
    return map
  }, [milestones])

  useEffect(() => {
    const ids = [...layoutMap.keys()]
    for (const id of ids) {
      if (templateElementPositions[id]) continue
      const rect = getRect(id, templateElementPositions, layoutMap)
      moveTemplateElement(id, { x: rect.x, y: rect.y })
      resizeTemplateElement(id, { width: rect.width, height: rect.height })
    }
  }, [layoutMap, templateElementPositions, moveTemplateElement, resizeTemplateElement])

  const elementRects = new Map<string, Rect>()
  for (const id of layoutMap.keys()) {
    elementRects.set(id, getRect(id, templateElementPositions, layoutMap))
  }

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
        const circleId = `circle-${index}`
        const layout = layoutMap.get(elementId)
        if (!layout) return null
        const color = tplColors[elementId] ?? PALETTE[index % PALETTE.length]!
        const circleColor = tplColors[circleId] ?? color
        const customStroke = tplStrokeColors[elementId]
        const isSelected = selectedIds.has(elementId)
        const isCircleSelected = selectedIds.has(circleId)
        const rect = elementRects.get(elementId)!
        const circleRect = elementRects.get(circleId)!
        const num = String(index + 1)
        const centerX = rect.x + rect.width / 2
        const circleX = circleRect.x + circleRect.width / 2
        const circleY = circleRect.y + circleRect.height / 2
        const circleRadius = Math.max(5, Math.min(circleRect.width, circleRect.height) / 2)
        const isAbove = index % 2 === 0
        const lineY1 = timelineY
        const lineY2 = isAbove ? rect.y + rect.height : rect.y
        const availableW = W - marginX * 2
        const milestoneSpacing = milestones.length > 1 ? availableW / (milestones.length - 1) : availableW / 2

        return (
          <g key={index}>
            <line
              x1={circleX} y1={lineY1}
              x2={centerX} y2={lineY2}
              stroke={color} strokeWidth={1.5} opacity={0.6}
            />

            <g onMouseDown={e => startDrag(e, elementId, rect)} style={{ cursor: 'pointer' }}>
              <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} rx={10} fill="white" stroke={customStroke || (isSelected ? '#4a90d9' : color)} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <path d={`M ${rect.x + 10} ${rect.y} L ${rect.x + rect.width - 10} ${rect.y} Q ${rect.x + rect.width} ${rect.y} ${rect.x + rect.width} ${rect.y + 10} L ${rect.x + rect.width} ${rect.y + headerH} L ${rect.x} ${rect.y + headerH} L ${rect.x} ${rect.y + 10} Q ${rect.x} ${rect.y} ${rect.x + 10} ${rect.y} Z`} fill={color} />
              <text x={rect.x + rect.width / 2} y={rect.y + headerH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">{milestone.title}</text>
              {milestone.subtitle && milestone.subtitle.split('\n').slice(0, 3).map((line, li) => (
                <text key={li} x={rect.x + rect.width / 2} y={rect.y + headerH + 16 + li * 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#555">
                  {line.length > 38 ? line.slice(0, 35) + '...' : line}
                </text>
              ))}
              {isSelected && renderHandles(rect, elementId)}
            </g>

            <g onMouseDown={e => startDrag(e, circleId, circleRect)} style={{ cursor: 'pointer' }}>
              <CircleBadge cx={circleX} cy={circleY} r={circleRadius} fill={circleColor} label={num} />
              {isCircleSelected && renderHandles(circleRect, circleId)}
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
