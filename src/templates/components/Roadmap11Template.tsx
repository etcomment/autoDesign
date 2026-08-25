import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = ['#2c3e50', '#3498db', '#e74c3c', '#f1c40f', '#2ecc71', '#ff7979', ...MIGSO_PALETTE]
const W = 1000
const LINE_Y = 260
const BLOCK_H = 50

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

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, Rect>): Rect {
  const s = pos[id]
  const l = layout.get(id)
  if (l) {
    if (s) return { ...s, width: s.width || l.width, height: s.height || l.height }
    return l
  }
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap11Template({ data }: { data: RoadmapData }): ReactElement {
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
    const m = new Map<string, Rect>()
    const blockW = 800 / N
    milestones.forEach((_, i) => {
      const cx = 100 + i * blockW
      m.set(`block-${i}`, { x: cx, y: LINE_Y, width: blockW, height: BLOCK_H })
      const isTop = i % 2 === 0
      const textY = isTop ? 80 : 360
      m.set(`text-${i}`, { x: cx + blockW / 2 - 100, y: textY, width: 200, height: 80 })

      const lineY1 = isTop ? LINE_Y : LINE_Y + BLOCK_H
      const lineY2 = isTop ? textY + 80 : textY
      m.set(`conn-${i}`, {
        x: cx + blockW / 2 - 1.5,
        y: Math.min(lineY1, lineY2),
        width: 3,
        height: Math.max(10, Math.abs(lineY2 - lineY1)),
      })
    })
    return m
  }, [milestones, N])

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
      {milestones.map((ms, i) => {
        const bid = `block-${i}`
        const tid = `text-${i}`
        const cid = `conn-${i}`
        const br = rects.get(bid)!
        const tr = rects.get(tid)!
        const cr = rects.get(cid)!

        const color = tplColors[bid] ?? ms.style?.fill ?? ms.color ?? PALETTE[i % PALETTE.length]!
        const customStroke = tplStrokeColors[bid]
        const customStrokeWidth = tplStrokeWidths[bid] ?? 1
        const isSelBlock = selectedIds.has(bid)
        const isSelText = selectedIds.has(tid)

        const isTop = i % 2 === 0
        const blockCx = br.x + br.width / 2
        const textCx = tr.x + tr.width / 2

        const blockEdgeY = isTop ? br.y : br.y + br.height
        const textEdgeY = isTop ? tr.y + tr.height : tr.y

        const bigNum = ms.date || ms.value || `${i + 1}`

        const maxTitleChars = Math.max(6, Math.floor(br.width / 10))
        const titleLines = wrapTextByWidth(ms.title || `STEP ${i + 1}`, maxTitleChars)

        const maxSubChars = Math.max(10, Math.floor((tr.width - 50) / 7))
        const subLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(ms.icon, 16, '#ffffff')

        return (
          <g key={i}>
            {/* Dynamic Connection Line */}
            <g data-element-id={cid}>
              <line
                x1={blockCx}
                y1={blockEdgeY}
                x2={textCx}
                y2={textEdgeY}
                stroke={tplColors[cid] || tplStrokeColors[cid] || '#cccccc'}
                strokeWidth={tplStrokeWidths[cid] || 3}
                strokeDasharray="4 2"
              />
            </g>

            {/* Block on Timeline */}
            <g
              data-element-id={bid}
              onMouseDown={e => startDrag(e, bid, br)}
              transform={getTransform(bid, br)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={br.x + 2}
                y={br.y}
                width={br.width - 4}
                height={br.height}
                rx={4}
                fill={color}
                stroke={customStroke || (isSelBlock ? '#4a90d9' : 'none')}
                strokeWidth={isSelBlock ? 2 : customStrokeWidth}
              />
              <g transform={`translate(${blockCx}, ${br.y + br.height / 2 + 5 - (titleLines.length - 1) * 7})`}>
                {iconEl && (
                  <g transform="translate(-8, -20)">
                    {iconEl}
                  </g>
                )}
                <text
                  x={0}
                  y={0}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={14}
                  fontWeight={700}
                  fill="#ffffff"
                  letterSpacing={0.5}
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={0} dy={li === 0 ? 0 : 15}>
                      {line.toUpperCase()}
                    </tspan>
                  ))}
                </text>
              </g>
              {isSelBlock && renderHandles(br, bid)}
            </g>

            {/* Text Area */}
            <g
              data-element-id={tid}
              onMouseDown={e => startDrag(e, tid, tr)}
              transform={getTransform(tid, tr)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={tr.x}
                y={tr.y}
                width={tr.width}
                height={tr.height}
                fill="transparent"
                stroke={isSelText ? '#4a90d9' : 'none'}
                strokeWidth={1}
              />
              <text
                x={textCx - 10}
                y={tr.y + 15}
                textAnchor="end"
                dominantBaseline="hanging"
                fontFamily="Arial, sans-serif"
                fontSize={24}
                fontWeight={700}
                fill={color}
              >
                {bigNum}
              </text>
              <text
                x={textCx + 6}
                y={tr.y + 16}
                textAnchor="start"
                dominantBaseline="hanging"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#555555"
              >
                {subLines.length > 0 ? (
                  subLines.map((line, li) => (
                    <tspan key={li} x={textCx + 6} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))
                ) : (
                  <tspan x={textCx + 6} dy="0">
                    Content for this step
                  </tspan>
                )}
              </text>
              {isSelText && renderHandles(tr, tid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
