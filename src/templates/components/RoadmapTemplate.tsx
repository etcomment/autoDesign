import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { CircleBadge, ChevronArrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
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

function getRect(
  elementId: string,
  positions: Record<string, Rect>,
  layoutMap: Map<string, LayoutMilestone>,
  greyDefaultPositions: Map<string, Rect>
): Rect {
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
  const greyDefault = greyDefaultPositions.get(elementId)
  if (greyDefault) {
    if (stored) return { x: stored.x, y: stored.y, width: stored.width || greyDefault.width, height: stored.height || greyDefault.height }
    return greyDefault
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

  const greyDefaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('timeline-line', { x: marginX, y: timelineY, width: W - marginX * 2, height: 2 })
    map.set('start-label', { x: marginX - 56, y: timelineY - 34, width: 40, height: 16 })
    map.set('finish-label', { x: W - marginX + 16, y: timelineY - 34, width: 40, height: 16 })
    map.set('start-circle', { x: marginX - 6, y: timelineY - 6, width: 12, height: 12 })
    map.set('finish-circle', { x: W - marginX - 6, y: timelineY - 6, width: 12, height: 12 })
    for (let i = 0; i < milestones.length - 1; i++) {
      const fromLayout = layoutMap.get(`milestone-${i}`)
      const toLayout = layoutMap.get(`milestone-${i + 1}`)
      if (fromLayout && toLayout) {
        const spacing = toLayout.centerX - fromLayout.centerX
        map.set(`chevron-${i}`, {
          x: fromLayout.centerX + circleR + 3,
          y: timelineY - 6,
          width: Math.max(spacing - circleR * 2 - 6, 10),
          height: 12,
        })
      }
    }
    return map
  }, [milestones.length, layoutMap])

  useEffect(() => {
    const ids = [...layoutMap.keys(), ...greyDefaultPositions.keys()]
    for (const id of ids) {
      if (templateElementPositions[id]) continue
      const rect = getRect(id, templateElementPositions, layoutMap, greyDefaultPositions)
      moveTemplateElement(id, { x: rect.x, y: rect.y })
      resizeTemplateElement(id, { width: rect.width, height: rect.height })
    }
  }, [layoutMap, greyDefaultPositions, templateElementPositions, moveTemplateElement, resizeTemplateElement])

  const elementRects = new Map<string, Rect>()
  const allIds = [...layoutMap.keys(), ...greyDefaultPositions.keys()]
  for (const id of allIds) {
    elementRects.set(id, getRect(id, templateElementPositions, layoutMap, greyDefaultPositions))
  }

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {(() => {
        const r = elementRects.get('timeline-line')!
        const isSel = selectedIds.has('timeline-line')
        const stroke = tplStrokeColors['timeline-line'] ?? '#bbb'
        return (
          <g onMouseDown={e => startDrag(e, 'timeline-line', r)} style={{ cursor: 'pointer' }}>
            <line x1={r.x} y1={r.y} x2={r.x + r.width} y2={r.y} stroke={stroke} strokeWidth={2} />
            {isSel && renderHandles(r, 'timeline-line')}
          </g>
        )
      })()}

      {(() => {
        const r = elementRects.get('start-label')!
        const isSel = selectedIds.has('start-label')
        const fill = tplColors['start-label'] ?? '#888'
        return (
          <g onMouseDown={e => startDrag(e, 'start-label', r)} style={{ cursor: 'pointer' }}>
            <text x={r.x + r.width} y={r.y + r.height} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill={fill}>{startLabel}</text>
            {isSel && renderHandles(r, 'start-label')}
          </g>
        )
      })()}

      {(() => {
        const r = elementRects.get('finish-label')!
        const isSel = selectedIds.has('finish-label')
        const fill = tplColors['finish-label'] ?? '#888'
        return (
          <g onMouseDown={e => startDrag(e, 'finish-label', r)} style={{ cursor: 'pointer' }}>
            <text x={r.x} y={r.y + r.height} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill={fill}>{finishLabel}</text>
            {isSel && renderHandles(r, 'finish-label')}
          </g>
        )
      })()}

      {(() => {
        const r = elementRects.get('start-circle')!
        const isSel = selectedIds.has('start-circle')
        const fill = tplColors['start-circle'] ?? '#bbb'
        const cx = r.x + r.width / 2
        const cy = r.y + r.height / 2
        const radius = Math.max(1, Math.min(r.width, r.height) / 2)
        return (
          <g onMouseDown={e => startDrag(e, 'start-circle', r)} style={{ cursor: 'pointer' }}>
            <circle cx={cx} cy={cy} r={radius} fill={fill} />
            {isSel && renderHandles(r, 'start-circle')}
          </g>
        )
      })()}

      {(() => {
        const r = elementRects.get('finish-circle')!
        const isSel = selectedIds.has('finish-circle')
        const fill = tplColors['finish-circle'] ?? '#bbb'
        const cx = r.x + r.width / 2
        const cy = r.y + r.height / 2
        const radius = Math.max(1, Math.min(r.width, r.height) / 2)
        return (
          <g onMouseDown={e => startDrag(e, 'finish-circle', r)} style={{ cursor: 'pointer' }}>
            <circle cx={cx} cy={cy} r={radius} fill={fill} />
            {isSel && renderHandles(r, 'finish-circle')}
          </g>
        )
      })()}

      {milestones.map((milestone, index) => {
        const elementId = `milestone-${index}`
        const circleId = `circle-${index}`
        const chevronId = `chevron-${index}`
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
              {milestone.subtitle && milestone.subtitle.split('\n').filter(Boolean).map((line, li) => (
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

            {index < milestones.length - 1 && (() => {
              const chevronRect = elementRects.get(chevronId)
              if (!chevronRect) return null
              const isChevronSel = selectedIds.has(chevronId)
              const chevronFill = tplColors[chevronId] ?? '#ddd'
              return (
                <g onMouseDown={e => startDrag(e, chevronId, chevronRect)} style={{ cursor: 'pointer' }}>
                  <ChevronArrow x={chevronRect.x} y={chevronRect.y} width={chevronRect.width} height={chevronRect.height} fill={chevronFill} />
                  {isChevronSel && renderHandles(chevronRect, chevronId)}
                </g>
              )
            })()}
          </g>
        )
      })}
    </g>
  )
}
