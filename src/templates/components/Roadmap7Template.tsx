import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

// Roadmap 7: Vertical timeline with colored circles showing a numeric value.
// Each milestone: year label on the left, dot on the vertical line, large colored
// circle with a number (from ms.subtitle or ms.value), description text to the right.

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const DOT_X = 240          // x of the vertical timeline
const BUBBLE_CX = 330      // x center of the circular bubble
const BUBBLE_R = 52        // radius of the bubble
const TEXT_X = BUBBLE_CX + BUBBLE_R + 40   // start of description text
const DATE_X = DOT_X - 20  // right edge of the year label

interface Rect { x: number; y: number; width: number; height: number }

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, Rect>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (l) return s ? { ...s, width: s.width || l.width, height: s.height || l.height } : l
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

function wrapText(text: string, maxLen: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const w of words) {
    if ((current + ' ' + w).length > maxLen) {
      if (current) lines.push(current)
      current = w
    } else {
      current = current ? current + ' ' + w : w
    }
  }
  if (current) lines.push(current)
  return lines
}

export function Roadmap7Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones } = data
  const N = Math.max(1, milestones.length)

  // Vertical spacing: distribute milestones evenly with generous top/bottom margin
  const TOP_Y = 80
  const BOT_Y = 520
  const spacing = N > 1 ? (BOT_Y - TOP_Y) / (N - 1) : 0
  const startY = N === 1 ? (TOP_Y + BOT_Y) / 2 : TOP_Y

  const layoutMap = useMemo(() => {
    const m = new Map<string, Rect>()

    // Vertical timeline bar
    m.set('timeline', { x: DOT_X - 2, y: startY - 60, width: 4, height: (N - 1) * spacing + 120 })

    milestones.forEach((_, i) => {
      const cy = startY + i * spacing
      m.set(`date-${i}`, { x: DATE_X - 90, y: cy - 18, width: 90, height: 36 })
      m.set(`dot-${i}`, { x: DOT_X - 6, y: cy - 6, width: 12, height: 12 })
      m.set(`bubble-${i}`, { x: BUBBLE_CX - BUBBLE_R, y: cy - BUBBLE_R, width: BUBBLE_R * 2, height: BUBBLE_R * 2 })
      m.set(`desc-${i}`, { x: TEXT_X, y: cy - 22, width: W - TEXT_X - 30, height: 60 })
    })

    return m
  }, [milestones, N, spacing, startY])

  useEffect(() => {
    for (const id of layoutMap.keys()) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  for (const id of layoutMap.keys()) {
    rects.set(id, getRect(id, pos, layoutMap))
  }

  return (
    <g ref={svgRef}>
      {/* Vertical timeline */}
      {(() => {
        const tr = rects.get('timeline')!
        const color = tplColors['timeline'] ?? '#d0d0d0'
        return (
          <g onMouseDown={e => startDrag(e, 'timeline', tr)} style={{ cursor: 'pointer' }}>
            <rect x={tr.x} y={tr.y} width={tr.width} height={tr.height} fill={color} />
            {selectedIds.has('timeline') && renderHandles(tr, 'timeline')}
          </g>
        )
      })()}

      {milestones.map((ms, i) => {
        const dateId = `date-${i}`
        const dotId = `dot-${i}`
        const bubId = `bubble-${i}`
        const descId = `desc-${i}`

        const dr = rects.get(dateId)!
        const dotr = rects.get(dotId)!
        const br = rects.get(bubId)!
        const sr = rects.get(descId)!

        const color = tplColors[bubId] ?? ms.style?.fill ?? PALETTE[i % PALETTE.length]!
        const strokeC = tplStrokeColors[bubId]
        const strokeW = tplStrokeWidths[bubId] ?? 0
        const isSel = selectedIds.has(bubId)

        const bCx = br.x + br.width / 2
        const bCy = br.y + br.height / 2

        // Value displayed inside the circle: use ms.subtitle if it's numeric, otherwise ms.value or ms.title
        const rawValue = (ms as any).value ?? ms.subtitle ?? ms.title ?? ''
        const numericMatch = String(rawValue).match(/^\d+/)
        const displayValue = numericMatch ? numericMatch[0] : String(rawValue).slice(0, 5)

        // Year/date label: use ms.title, ms.date or ms.quarter
        const dateLabel = (ms as any).date ?? (ms as any).quarter ?? ms.title

        // Description: use ms.subtitle (unless it was the numeric value)
        const description = numericMatch ? (ms.subtitle ?? ms.title) : (ms.subtitle ?? '')

        return (
          <g key={i}>
            {/* Year label */}
            <g onMouseDown={e => startDrag(e, dateId, dr)} style={{ cursor: 'pointer' }}>
              <text
                x={dr.x + dr.width}
                y={dr.y + dr.height / 2 + 7}
                textAnchor="end"
                fontFamily="Arial, sans-serif"
                fontSize={20}
                fontWeight={700}
                fill={tplColors[dateId] ?? '#292b3a'}
              >
                {dateLabel}
              </text>
              {selectedIds.has(dateId) && renderHandles(dr, dateId)}
            </g>

            {/* Small dot on the timeline */}
            <g onMouseDown={e => startDrag(e, dotId, dotr)} style={{ cursor: 'pointer' }}>
              <circle
                cx={dotr.x + dotr.width / 2}
                cy={dotr.y + dotr.height / 2}
                r={dotr.width / 2}
                fill={tplColors[dotId] ?? '#aaa'}
              />
              {selectedIds.has(dotId) && renderHandles(dotr, dotId)}
            </g>

            {/* Triangle connector from dot to bubble */}
            <polygon
              points={`${dotr.x + dotr.width / 2},${bCy} ${br.x - 2},${bCy - 14} ${br.x - 2},${bCy + 14}`}
              fill={color}
            />

            {/* Large colored circle with value */}
            <g onMouseDown={e => startDrag(e, bubId, br)} style={{ cursor: 'pointer' }}>
              <circle
                cx={bCx}
                cy={bCy}
                r={br.width / 2}
                fill={color}
                stroke={strokeC || (isSel ? '#fff' : 'none')}
                strokeWidth={isSel ? 3 : strokeW}
              />
              <text
                x={bCx}
                y={bCy + 10}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={26}
                fontWeight={700}
                fill={tplColors[`${bubId}-text`] ?? '#fff'}
              >
                {displayValue}
              </text>
              {isSel && renderHandles(br, bubId)}
            </g>

            {/* Description text to the right */}
            <g onMouseDown={e => startDrag(e, descId, sr)} style={{ cursor: 'pointer' }}>
              {wrapText(description ?? ms.title, 60).map((line, li) => (
                <text
                  key={li}
                  x={sr.x}
                  y={sr.y + 16 + li * 20}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={14}
                  fill={tplColors[descId] ?? '#292b3a'}
                >
                  {line}
                </text>
              ))}
              {selectedIds.has(descId) && renderHandles(sr, descId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
