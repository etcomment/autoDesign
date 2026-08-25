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
const MARGIN_X = 60

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function getDynamicIcon(iconName?: string, size = 20, color = '#ffffff'): ReactElement | null {
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
  if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
  return s ? { x: s.x, y: s.y, width: s.width || l.width, height: s.height || l.height } : l
}

export function Roadmap8Template({ data }: { data: RoadmapData }): ReactElement {
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
    const availableW = W - MARGIN_X * 2
    const colW = availableW / N

    milestones.forEach((_, i) => {
      const cx = MARGIN_X + colW * i + colW / 2
      const boxW = Math.min(180, colW * 0.88)
      const boxH = 90

      m.set(`year-${i}`, { x: cx - 60, y: 60, width: 120, height: 40 })
      m.set(`card-${i}`, { x: cx - boxW / 2, y: 130, width: boxW, height: boxH })
      m.set(`desc-${i}`, { x: cx - boxW / 2, y: 245, width: boxW, height: 120 })
      if (i < N - 1) {
        m.set(`arrow-${i}`, { x: MARGIN_X + colW * (i + 1) - 10, y: 70, width: 20, height: 20 })
      }
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
        const yid = `year-${i}`
        const cid = `card-${i}`
        const did = `desc-${i}`
        const aid = `arrow-${i}`

        const yr = rects.get(yid)!
        const cr = rects.get(cid)!
        const dr = rects.get(did)!
        const ar = rects.get(aid)

        const color = tplColors[cid] ?? ms.style?.fill ?? ms.color ?? PALETTE[i % PALETTE.length]!
        const isSelCard = selectedIds.has(cid)
        const isSelYear = selectedIds.has(yid)
        const isSelDesc = selectedIds.has(did)
        const isSelArr = ar && selectedIds.has(aid)

        const styleFontSize = ms.style?.fontSize ?? 17
        const styleFontWeight = ms.style?.fontWeight ?? 700
        const styleFontColor = ms.style?.fontColor ?? '#ffffff'

        const maxTitleChars = Math.max(6, Math.floor(cr.width / 9))
        const maxDescChars = Math.max(8, Math.floor(dr.width / 7.2))

        const titleLines = wrapTextByWidth(ms.title || `Step ${i + 1}`, maxTitleChars)
        const descLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxDescChars) : []

        const iconEl = getDynamicIcon(ms.icon, 20, styleFontColor)

        const dateStr = ms.date || (ms.quarter ? ms.quarter : String(2019 + i))

        return (
          <g key={i}>
            {/* Arrow between columns */}
            {ar && (
              <g
                data-element-id={aid}
                onMouseDown={e => startDrag(e, aid, ar)}
                transform={getTransform(aid, ar)}
                style={{ cursor: 'pointer' }}
              >
                <polygon
                  points={`${ar.x},${ar.y} ${ar.x + ar.width},${ar.y + ar.height / 2} ${ar.x},${ar.y + ar.height}`}
                  fill={tplColors[aid] ?? '#dcdcdc'}
                />
                {isSelArr && renderHandles(ar, aid)}
              </g>
            )}

            {/* Year Label */}
            <g
              data-element-id={yid}
              onMouseDown={e => startDrag(e, yid, yr)}
              transform={getTransform(yid, yr)}
              style={{ cursor: 'pointer' }}
            >
              <text
                x={yr.x + yr.width / 2}
                y={yr.y + 26}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={30}
                fontWeight={700}
                fill={tplColors[yid] ?? '#2c3e50'}
              >
                {dateStr}
              </text>
              {isSelYear && renderHandles(yr, yid)}
            </g>

            {/* Card */}
            <g
              data-element-id={cid}
              onMouseDown={e => startDrag(e, cid, cr)}
              transform={getTransform(cid, cr)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={cr.x}
                y={cr.y}
                width={cr.width}
                height={cr.height}
                rx={6}
                fill={color}
                stroke={tplStrokeColors[cid] || (isSelCard ? '#4a90d9' : undefined)}
                strokeWidth={isSelCard ? 2 : (tplStrokeWidths[cid] ?? 0)}
              />

              <g transform={`translate(${cr.x + cr.width / 2}, ${cr.y + cr.height / 2 + (iconEl ? 4 : 5) - (titleLines.length - 1) * 9})`}>
                {iconEl && (
                  <g transform={`translate(-10, ${-titleLines.length * 10 - 14})`}>
                    {iconEl}
                  </g>
                )}
                <text
                  x={0}
                  y={0}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={styleFontSize}
                  fontWeight={styleFontWeight}
                  fill={styleFontColor}
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={0} dy={li === 0 ? 0 : 18}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
              {isSelCard && renderHandles(cr, cid)}
            </g>

            {/* Description Block */}
            <g
              data-element-id={did}
              onMouseDown={e => startDrag(e, did, dr)}
              transform={getTransform(did, dr)}
              style={{ cursor: 'pointer' }}
            >
              <text
                x={dr.x + dr.width / 2}
                y={dr.y + 16}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={13.5}
                fill={tplColors[did] ?? '#555555'}
              >
                {descLines.length > 0 ? (
                  descLines.map((line, j) => (
                    <tspan x={dr.x + dr.width / 2} dy={j === 0 ? 0 : 18} key={j}>
                      {line}
                    </tspan>
                  ))
                ) : (
                  <>
                    <tspan x={dr.x + dr.width / 2} dy="0">MIGSO-PCUBED</tspan>
                    <tspan x={dr.x + dr.width / 2} dy="18">content and words to be</tspan>
                    <tspan x={dr.x + dr.width / 2} dy="18">added here as required</tspan>
                  </>
                )}
              </text>
              {isSelDesc && renderHandles(dr, did)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
