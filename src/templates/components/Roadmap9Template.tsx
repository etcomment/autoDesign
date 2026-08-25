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

function getDynamicIcon(iconName?: string, size = 18, color = '#2c3e50'): ReactElement | null {
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

function getChevronPath(x: number, y: number, w: number, h: number, isFirst: boolean, isLast: boolean, arrowW: number) {
  const p1 = `${x},${y}`
  const p2 = `${x + w - (isLast ? 0 : arrowW)},${y}`
  const p3 = isLast ? '' : `L ${x + w} ${y + h / 2}`
  const p4 = `${x + w - (isLast ? 0 : arrowW)},${y + h}`
  const p5 = `${x},${y + h}`
  const p6 = isFirst ? '' : `L ${x + arrowW} ${y + h / 2}`

  return `M ${p1} L ${p2} ${p3} L ${p4} L ${p5} ${p6} Z`
}

export function Roadmap9Template({ data }: { data: RoadmapData }): ReactElement {
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
      const boxW = colW
      const boxH = 75

      m.set(`chevron-${i}`, { x: MARGIN_X + colW * i, y: 100, width: boxW, height: boxH })

      const textW = boxW * 0.85
      m.set(`title-${i}`, { x: cx - textW / 2, y: 220, width: textW, height: 40 })
      m.set(`desc-${i}`, { x: cx - textW / 2, y: 270, width: textW, height: 120 })
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
        const chid = `chevron-${i}`
        const tid = `title-${i}`
        const did = `desc-${i}`

        const chr = rects.get(chid)!
        const tr = rects.get(tid)!
        const dr = rects.get(did)!

        const color = tplColors[chid] ?? ms.style?.fill ?? ms.color ?? PALETTE[i % PALETTE.length]!
        const isSelCh = selectedIds.has(chid)
        const isSelTitle = selectedIds.has(tid)
        const isSelDesc = selectedIds.has(did)

        const styleFontSize = ms.style?.fontSize ?? 17
        const styleFontWeight = ms.style?.fontWeight ?? 700

        const arrowW = Math.min(35, chr.width * 0.25)
        const path = getChevronPath(chr.x, chr.y, chr.width, chr.height, i === 0, i === N - 1, arrowW)

        const maxTitleChars = Math.max(6, Math.floor(tr.width / 9))
        const maxDescChars = Math.max(8, Math.floor(dr.width / 7.2))

        const titleLines = wrapTextByWidth(ms.title || `Step ${i + 1}`, maxTitleChars)
        const descLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxDescChars) : []

        const dateStr = ms.date || (ms.quarter ? ms.quarter : String(2019 + i))
        const iconEl = getDynamicIcon(ms.icon, 18, tplColors[tid] ?? '#2c3e50')

        return (
          <g key={i}>
            {/* Chevron Badge */}
            <g
              data-element-id={chid}
              onMouseDown={e => startDrag(e, chid, chr)}
              transform={getTransform(chid, chr)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={path}
                fill={color}
                stroke={tplStrokeColors[chid] || (isSelCh ? '#4a90d9' : 'white')}
                strokeWidth={isSelCh ? 2.5 : (tplStrokeWidths[chid] ?? 2)}
              />
              <text
                x={chr.x + chr.width / 2 + (i === 0 ? -arrowW / 4 : i === N - 1 ? arrowW / 4 : 0)}
                y={chr.y + chr.height / 2 + 10}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={32}
                fontWeight={700}
                fill={ms.style?.fontColor ?? '#ffffff'}
              >
                {dateStr}
              </text>
              {isSelCh && renderHandles(chr, chid)}
            </g>

            {/* Title */}
            <g
              data-element-id={tid}
              onMouseDown={e => startDrag(e, tid, tr)}
              transform={getTransform(tid, tr)}
              style={{ cursor: 'pointer' }}
            >
              <g transform={`translate(${tr.x + tr.width / 2}, ${tr.y + 16})`}>
                {iconEl && (
                  <g transform={`translate(-10, ${-titleLines.length * 9 - 14})`}>
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
                  fill={tplColors[tid] ?? '#2c3e50'}
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={0} dy={li === 0 ? 0 : 18}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
              {isSelTitle && renderHandles(tr, tid)}
            </g>

            {/* Description */}
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
                    <tspan x={dr.x + dr.width / 2} dy="0">MIGSO-PCUBED content and</tspan>
                    <tspan x={dr.x + dr.width / 2} dy="18">words to be added here as</tspan>
                    <tspan x={dr.x + dr.width / 2} dy="18">required</tspan>
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
