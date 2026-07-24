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
  const layout = layoutMap.get(elementId)
  if (layout) {
    if (elementId.startsWith('circle-')) {
      if (stored) return { x: stored.x, y: stored.y, width: stored.width || 20, height: stored.height || 20 }
      return { x: layout.centerX - 14, y: 260 - 14, width: 28, height: 28 }
    }
    if (stored) {
      return { x: stored.x, y: stored.y, width: stored.width || layout.rectW, height: Math.max(stored.height || layout.rectH, layout.rectH) }
    }
    return { x: layout.rectX, y: layout.rectY, width: layout.rectW, height: layout.rectH }
  }
  if (stored) return { ...stored, width: stored.width || 20, height: stored.height || 20 }
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
  const baselineRectH = 95
  const headerH = 30
  const gap = 12
  const LINE_HEIGHT = 14

  const layoutMap = useMemo(() => {
    const map = new Map<string, LayoutMilestone>()
    const availableW = W - marginX * 2
    const milestoneSpacing = milestones.length > 1 ? availableW / (milestones.length - 1) : availableW / 2
    milestones.forEach((milestone, index) => {
      const elementId = `milestone-${index}`
      const circleId = `circle-${index}`
      const centerX = marginX + index * milestoneSpacing
      const isAbove = index % 2 === 0
      const styleW = milestone.style?.boxWidth ?? rectW
      const baseStyleH = milestone.style?.boxHeight ?? baselineRectH
      const subtitleLines = milestone.subtitle ? milestone.subtitle.split('\n').filter(Boolean).length : 0
      const titleLines = milestone.title ? Math.max(1, milestone.title.split('\n').filter(Boolean).length) : 1
      const effectiveHeaderH = Math.max(headerH, titleLines * LINE_HEIGHT + 8)
      const subtitleTextH = subtitleLines * LINE_HEIGHT
      const computedH = Math.max(baseStyleH, effectiveHeaderH + 16 + subtitleTextH)
      const rx = centerX - styleW / 2
      const ry = isAbove ? timelineY - circleR - gap - computedH : timelineY + circleR + gap
      map.set(elementId, { id: elementId, circleId, index, centerX, rectX: rx, rectY: ry, rectW: styleW, rectH: computedH, isAbove })
      map.set(circleId, { id: circleId, circleId, index, centerX, rectX: rx, rectY: ry, rectW: styleW, rectH: computedH, isAbove })
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
        const color = tplColors[elementId] ?? milestone.style?.fill ?? PALETTE[index % PALETTE.length]!
        const circleColor = tplColors[circleId] ?? milestone.style?.fill ?? color
        const customStroke = tplStrokeColors[elementId]
        const styleStroke = milestone.style?.stroke
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
        const titleLineArray = milestone.title.split('\n').filter(Boolean)
        const styleFontSize = milestone.style?.fontSize ?? 12
        const styleFontWeight = milestone.style?.fontWeight ?? 700
        const styleFontColor = milestone.style?.fontColor ?? 'white'
        const dynamicHeaderH = Math.max(headerH, titleLineArray.length * LINE_HEIGHT + 8)
        const titleStartY = rect.y + dynamicHeaderH / 2 + 5 - ((titleLineArray.length - 1) * LINE_HEIGHT) / 2
        const baseStroke = styleStroke || color

        return (
          <g key={index}>
            <line
              x1={circleX} y1={lineY1}
              x2={centerX} y2={lineY2}
              stroke={color} strokeWidth={1.5} opacity={0.6}
            />

            <g onMouseDown={e => startDrag(e, elementId, rect)} style={{ cursor: 'pointer' }}>
              <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} rx={10} fill="white" stroke={customStroke || (isSelected ? '#4a90d9' : baseStroke)} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <path d={`M ${rect.x + 10} ${rect.y} L ${rect.x + rect.width - 10} ${rect.y} Q ${rect.x + rect.width} ${rect.y} ${rect.x + rect.width} ${rect.y + 10} L ${rect.x + rect.width} ${rect.y + dynamicHeaderH} L ${rect.x} ${rect.y + dynamicHeaderH} L ${rect.x} ${rect.y + 10} Q ${rect.x} ${rect.y} ${rect.x + 10} ${rect.y} Z`} fill={color} />
              {titleLineArray.map((line, li) => (
                <text key={li} x={rect.x + rect.width / 2} y={titleStartY + li * LINE_HEIGHT} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>{line}</text>
              ))}
              {milestone.subtitle && milestone.subtitle.split('\n').filter(Boolean).slice(0, 3).map((line, li) => (
                <text key={li} x={rect.x + rect.width / 2} y={rect.y + dynamicHeaderH + 16 + li * LINE_HEIGHT} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={milestone.style?.fontSize ? milestone.style.fontSize - 2 : 9} fill={milestone.style?.fontColor ?? '#555'}>
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
