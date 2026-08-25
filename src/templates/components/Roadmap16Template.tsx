import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const W = 1000
const MARGIN_X = 100

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function getDynamicIcon(iconName?: string, size = 20, color = '#282c61'): ReactElement | null {
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

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, any>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('node-')) {
    const p = layout.get(id)
    if (!p) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 60, height: s.height || 60 }
    return { x: p.cx - 30, y: 220, width: 60, height: 60 }
  }
  if (id.startsWith('text-')) {
    const p = layout.get(id)
    if (!p) return s || { x: 0, y: 0, width: 0, height: 0 }
    if (s) return { ...s, width: s.width || 160, height: s.height || 100 }
    return { x: p.cx - 80, y: 310, width: 160, height: 100 }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap16Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { milestones, startLabel = 'START', finishLabel = 'FINISH' } = data
  const N = milestones.length
  const availableW = W - MARGIN_X * 2

  const pathSegments = useMemo(() => {
    const startY = 250
    return `M ${MARGIN_X} ${startY} L ${W - MARGIN_X} ${startY}`
  }, [])

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`node-${i}`, { cx })
      m.set(`text-${i}`, { cx })
    })
    return m
  }, [milestones, availableW, N])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('start', { x: MARGIN_X - 80, y: 220, width: 60, height: 60 })
    m.set('finish', { x: W - MARGIN_X + 20, y: 220, width: 60, height: 60 })
    return m
  }, [])

  useEffect(() => {
    for (const id of [...layoutMap.keys(), ...greyMap.keys()]) {
      if (pos[id]) continue
      const r = getRect(id, pos, layoutMap, greyMap)
      moveEl(id, { x: r.x, y: r.y })
      resizeEl(id, { width: r.width, height: r.height })
    }
  }, [layoutMap, greyMap, pos, moveEl, resizeEl])

  const rects = new Map<string, Rect>()
  for (const id of [...layoutMap.keys(), ...greyMap.keys()]) {
    rects.set(id, getRect(id, pos, layoutMap, greyMap))
  }

  return (
    <g ref={svgRef}>
      {/* Central Path */}
      {(() => {
        const r = { x: MARGIN_X, y: 241, width: W - 2 * MARGIN_X, height: 18 }
        const color = tplColors['path'] ?? '#a9a9a9'
        const sW = tplStrokeWidths['path'] ?? 18
        return (
          <g
            data-element-id="path"
            onMouseDown={e => startDrag(e, 'path', r)}
            transform={getTransform('path', r)}
            style={{ cursor: 'pointer' }}
          >
            <svg x={r.x} y={r.y} width={r.width} height={r.height} viewBox="140 140 680 260" preserveAspectRatio="none">
              <path d={pathSegments} fill="none" stroke={color} strokeWidth={sW} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {selectedIds.has('path') && renderHandles(r, 'path')}
          </g>
        )
      })()}

      {/* Start & Finish Badges */}
      {[
        { kind: 'start', label: startLabel },
        { kind: 'finish', label: finishLabel },
      ].map(({ kind, label }) => {
        const r = rects.get(kind)!
        const fill = tplColors[kind] ?? '#282c61'
        const stroke = tplStrokeColors[kind]
        const sW = tplStrokeWidths[kind] ?? 4
        const cx = r.x + r.width / 2
        const cy = r.y + r.height / 2
        return (
          <g
            key={kind}
            data-element-id={kind}
            onMouseDown={e => startDrag(e, kind, r)}
            transform={getTransform(kind, r)}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={cx} cy={cy} r={r.width / 2} fill="#ffffff" stroke={stroke || fill} strokeWidth={sW} />
            <text
              x={cx}
              y={cy + 6}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={14}
              fontWeight={800}
              fill={fill}
            >
              {label.toUpperCase()}
            </text>
            {selectedIds.has(kind) && renderHandles(r, kind)}
          </g>
        )
      })}

      {/* Milestones */}
      {milestones.map((ms, i) => {
        const iid = `node-${i}`
        const tid = `text-${i}`
        const r = rects.get(iid)!
        const tr = rects.get(tid)!
        const color = tplColors[iid] ?? ms.style?.fill ?? ms.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSel = selectedIds.has(iid)
        const tSel = selectedIds.has(tid)

        const cx = r.x + r.width / 2
        const cy = r.y + r.height / 2
        const tcx = tr.x + tr.width / 2

        const maxTitleChars = Math.max(8, Math.floor(tr.width / 8.5))
        const maxSubChars = Math.max(10, Math.floor(tr.width / 7))
        const titleLines = wrapTextByWidth(ms.title || `Milestone ${i + 1}`, maxTitleChars)
        const subLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(ms.icon, 20, color)
        const valStr = ms.value || ms.percent || String(i + 1)

        return (
          <g key={i}>
            {/* Node Circle */}
            <g
              data-element-id={iid}
              onMouseDown={e => startDrag(e, iid, r)}
              transform={getTransform(iid, r)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={cx} cy={cy} r={r.width / 2} fill="#ffffff" stroke={color} strokeWidth={4} />
              <circle cx={cx} cy={cy} r={r.width / 2 - 6} fill="none" stroke={color} strokeWidth={1} />
              {iconEl ? (
                <g transform={`translate(${cx - 10}, ${cy - 10})`}>
                  {iconEl}
                </g>
              ) : (
                <text
                  x={cx}
                  y={cy + 5}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={14}
                  fontWeight={700}
                  fill={color}
                >
                  {valStr}
                </text>
              )}
              {isSel && renderHandles(r, iid)}
            </g>

            {/* Description Below */}
            <g
              data-element-id={tid}
              onMouseDown={e => startDrag(e, tid, tr)}
              transform={getTransform(tid, tr)}
              style={{ cursor: 'pointer' }}
            >
              <text
                x={tcx}
                y={tr.y + 16}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={800}
                fill={tplColors[tid] ?? '#222222'}
              >
                {titleLines.map((line, li) => (
                  <tspan key={li} x={tcx} dy={li === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>

              {subLines.length > 0 && (
                <text
                  x={tcx}
                  y={tr.y + 18 + titleLines.length * 18 + 2}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fill="#555555"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={tcx} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {ms.date && (
                <text
                  x={tcx}
                  y={tr.y + 22 + titleLines.length * 18 + (subLines.length > 0 ? subLines.length * 15 + 4 : 0)}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={11}
                  fontWeight={700}
                  fill="#888888"
                >
                  {ms.date}
                </text>
              )}

              {tSel && renderHandles(tr, tid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
