import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#3498db']
const W = 1000
const LINE_Y = 270
const BOX_W = 160
const BOX_H = 130

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function getDynamicIcon(iconName?: string, size = 18, color = '#ffffff'): ReactElement | null {
  if (!iconName) return null
  const clean = iconName.trim()

  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn({ size, color })

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const lucideRecord = LucideIcons as Record<string, unknown>
  const LucideFn = (lucideRecord[pascalName] || lucideRecord[clean] || lucideRecord[clean.toUpperCase()]) as
    | React.ComponentType<{ size?: number; color?: string }>
    | undefined

  if (LucideFn) {
    return <LucideFn size={size} color={color} />
  }

  return null
}

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number; isTop: boolean }>): Rect {
  const s = pos[id]
  if (s) return s
  if (id === 'timeline') return { x: 30, y: LINE_Y - 2, width: W - 60, height: 4 }

  const match = id.match(/^(node|conn|arrow|block)-(\d+)$/)
  if (!match) return { x: 0, y: 0, width: 0, height: 0 }

  const type = match[1]
  const i = match[2]
  const l = layout.get(`block-${i}`)
  if (!l) return { x: 0, y: 0, width: 0, height: 0 }

  const bx = l.cx
  const by = l.isTop ? LINE_Y - 35 - BOX_H : LINE_Y + 35
  const boxCx = bx
  const br = { x: bx - BOX_W / 2, y: by, width: BOX_W, height: BOX_H }

  if (type === 'block') {
    return { x: br.x, y: br.y, width: BOX_W, height: BOX_H }
  }

  const lineY1 = l.isTop ? LINE_Y - 6 : LINE_Y + 6
  const arrowY = l.isTop ? br.y + br.height : br.y
  const lineY2 = l.isTop ? arrowY + 8 : arrowY - 8

  if (type === 'node') {
    return { x: boxCx - 8, y: LINE_Y - 8, width: 16, height: 16 }
  }
  if (type === 'conn') {
    return { x: boxCx - 1.5, y: Math.min(lineY1, lineY2), width: 3, height: Math.abs(lineY2 - lineY1) }
  }
  if (type === 'arrow') {
    return { x: boxCx - 6, y: Math.min(arrowY, lineY2), width: 12, height: Math.abs(arrowY - lineY2) }
  }
  return { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap10Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones } = data
  const N = Math.max(1, milestones.length)

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number; isTop: boolean }>()
    const availableW = W - 180
    milestones.forEach((_, i) => {
      const cx = 90 + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      const isTop = i % 2 === 0
      m.set(`block-${i}`, { cx, isTop })
    })
    return m
  }, [milestones, N])

  useEffect(() => {
    const allIds = ['timeline']
    for (const id of [...layoutMap.keys()]) {
      const idx = id.split('-')[1]
      allIds.push(id, `node-${idx}`, `conn-${idx}`, `arrow-${idx}`)
    }
    for (const id of allIds) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  const allIds = ['timeline']
  for (const id of [...layoutMap.keys()]) {
    const idx = id.split('-')[1]
    allIds.push(id, `node-${idx}`, `conn-${idx}`, `arrow-${idx}`)
  }
  for (const id of allIds) {
    rects.set(id, getRect(id, pos, layoutMap))
  }

  const tr = rects.get('timeline')!

  return (
    <g ref={svgRef}>
      {/* Horizontal timeline line */}
      <g
        data-element-id="timeline"
        onMouseDown={e => startDrag(e, 'timeline', tr)}
        transform={getTransform('timeline', tr)}
        style={{ cursor: 'pointer' }}
      >
        <line
          x1={tr.x}
          y1={tr.y + tr.height / 2}
          x2={tr.x + tr.width}
          y2={tr.y + tr.height / 2}
          stroke={tplColors['timeline'] || '#e0e0e0'}
          strokeWidth={tr.height}
        />
        {selectedIds.has('timeline') && renderHandles(tr, 'timeline')}
      </g>

      {milestones.map((ms, i) => {
        const bid = `block-${i}`
        const nid = `node-${i}`
        const cid = `conn-${i}`
        const aid = `arrow-${i}`

        const br = rects.get(bid)!
        const nr = rects.get(nid)!
        const layout = layoutMap.get(bid)!
        const color = tplColors[bid] ?? ms.style?.fill ?? ms.color ?? PALETTE[i % PALETTE.length]!
        const customStroke = tplStrokeColors[bid]
        const customStrokeWidth = tplStrokeWidths[bid] ?? 1
        const isSel = selectedIds.has(bid)

        const isTop = layout.isTop
        const boxCx = br.x + br.width / 2
        const boxEdgeY = isTop ? br.y + br.height : br.y
        const timelineCenterY = tr.y + tr.height / 2

        const maxTitleChars = Math.max(6, Math.floor(br.width / 9))
        const maxSubChars = Math.max(8, Math.floor(br.width / 7))
        const titleLines = wrapTextByWidth(ms.title || `Step ${i + 1}`, maxTitleChars)
        const subLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(ms.icon, 18, '#ffffff')
        const dateStr = ms.date || (ms.quarter ? ms.quarter : undefined)

        return (
          <g key={i}>
            {/* Timeline connection node */}
            <g
              data-element-id={nid}
              onMouseDown={e => startDrag(e, nid, nr)}
              transform={getTransform(nid, nr)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={boxCx} cy={timelineCenterY} r={8} fill={tplColors[nid] || color} />
              {selectedIds.has(nid) && renderHandles(nr, nid)}
            </g>

            {/* Dynamic line connecting timeline to arrow */}
            <g data-element-id={cid}>
              <line
                x1={boxCx}
                y1={isTop ? timelineCenterY - 8 : timelineCenterY + 8}
                x2={boxCx}
                y2={isTop ? boxEdgeY + 8 : boxEdgeY - 8}
                stroke={tplColors[cid] || '#d0d0d0'}
                strokeWidth={tplStrokeWidths[cid] || 3}
              />
            </g>

            {/* Dynamic arrow pointing to block */}
            <g data-element-id={aid}>
              <polygon
                points={
                  isTop
                    ? `${boxCx - 6},${boxEdgeY + 8} ${boxCx + 6},${boxEdgeY + 8} ${boxCx},${boxEdgeY}`
                    : `${boxCx - 6},${boxEdgeY - 8} ${boxCx + 6},${boxEdgeY - 8} ${boxCx},${boxEdgeY}`
                }
                fill={tplColors[aid] || color}
              />
            </g>

            {/* Milestone Box */}
            <g
              data-element-id={bid}
              onMouseDown={e => startDrag(e, bid, br)}
              transform={getTransform(bid, br)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={br.x}
                y={br.y}
                width={br.width}
                height={br.height}
                rx={6}
                fill={color}
                stroke={customStroke || (isSel ? '#4a90d9' : 'none')}
                strokeWidth={isSel ? 2 : customStrokeWidth}
              />

              <g transform={`translate(${boxCx}, ${br.y + 22})`}>
                {iconEl && (
                  <g transform="translate(-9, -14)">
                    {iconEl}
                  </g>
                )}
                <text
                  x={0}
                  y={iconEl ? 16 : 0}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={16}
                  fontWeight={700}
                  fill="#ffffff"
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={0} dy={li === 0 ? 0 : 18}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              {dateStr && (
                <text
                  x={boxCx}
                  y={br.y + 28 + (iconEl ? 16 : 0) + titleLines.length * 18}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fontWeight={600}
                  fill="rgba(255,255,255,0.85)"
                >
                  {dateStr}
                </text>
              )}

              {subLines.length > 0 && (
                <text
                  x={boxCx}
                  y={br.y + (dateStr ? 46 : 30) + (iconEl ? 16 : 0) + titleLines.length * 18}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={11.5}
                  fill="rgba(255,255,255,0.92)"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={boxCx} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSel && renderHandles(br, bid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
