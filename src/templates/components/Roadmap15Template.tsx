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
const BLOCK_W = 140
const BLOCK_H = 160
const TOP_Y = 80

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function getDynamicIcon(iconName?: string, size = 18, color = '#282c61'): ReactElement | null {
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

function getRect(id: string, pos: Record<string, Rect>, layout: Map<string, { cx: number }>, grey: Map<string, Rect>): Rect {
  const s = pos[id]
  if (id.startsWith('block-')) {
    const l = layout.get(id)
    if (!l) return s || { x: 0, y: 0, width: 0, height: 0 }
    const bx = l.cx - BLOCK_W / 2
    if (s) return { ...s, width: s.width || BLOCK_W, height: Math.max(s.height || BLOCK_H, BLOCK_H) }
    return { x: bx, y: TOP_Y, width: BLOCK_W, height: BLOCK_H }
  }
  const g = grey.get(id)
  if (g) return s ? { x: s.x, y: s.y, width: s.width || g.width, height: s.height || g.height } : g
  return s || { x: 0, y: 0, width: 0, height: 0 }
}

export function Roadmap15Template({ data }: { data: RoadmapData }): ReactElement {
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
  const N = Math.max(1, milestones.length)
  const availableW = W - MARGIN_X * 2

  const layoutMap = useMemo(() => {
    const m = new Map<string, { cx: number }>()
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`block-${i}`, { cx })
    })
    return m
  }, [milestones, availableW, N])

  const greyMap = useMemo(() => {
    const m = new Map<string, Rect>()
    m.set('track-line', { x: MARGIN_X, y: TOP_Y + 30, width: availableW, height: 2 })
    m.set('start-label', { x: MARGIN_X - 60, y: TOP_Y + 20, width: 50, height: 16 })
    m.set('finish-label', { x: MARGIN_X + availableW + 10, y: TOP_Y + 20, width: 50, height: 16 })
    milestones.forEach((_, i) => {
      const cx = MARGIN_X + (N === 1 ? availableW / 2 : (i / (N - 1)) * availableW)
      m.set(`conn-${i}`, { x: cx - 1, y: TOP_Y, width: 2, height: 32 })
    })
    return m
  }, [availableW, milestones, N])

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

  const tr = rects.get('track-line')!

  return (
    <g ref={svgRef}>
      {/* Track Line */}
      <g
        data-element-id="track-line"
        onMouseDown={e => startDrag(e, 'track-line', tr)}
        transform={getTransform('track-line', tr)}
        style={{ cursor: 'pointer' }}
      >
        <line
          x1={tr.x}
          y1={tr.y}
          x2={tr.x + tr.width}
          y2={tr.y}
          stroke={tplStrokeColors['track-line'] ?? '#ccc'}
          strokeWidth={tplStrokeWidths['track-line'] ?? 2}
          strokeDasharray="6 3"
        />
        {selectedIds.has('track-line') && renderHandles(tr, 'track-line')}
      </g>

      {/* Start Label */}
      {(() => {
        const sr = rects.get('start-label')!
        const fill = tplColors['start-label'] ?? '#888'
        return (
          <g
            data-element-id="start-label"
            onMouseDown={e => startDrag(e, 'start-label', sr)}
            transform={getTransform('start-label', sr)}
            style={{ cursor: 'pointer' }}
          >
            <text
              x={sr.x + sr.width / 2}
              y={sr.y + sr.height}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={11}
              fontWeight={700}
              fill={fill}
            >
              {startLabel}
            </text>
            {selectedIds.has('start-label') && renderHandles(sr, 'start-label')}
          </g>
        )
      })()}

      {/* Finish Label */}
      {(() => {
        const fr = rects.get('finish-label')!
        const fill = tplColors['finish-label'] ?? '#888'
        return (
          <g
            data-element-id="finish-label"
            onMouseDown={e => startDrag(e, 'finish-label', fr)}
            transform={getTransform('finish-label', fr)}
            style={{ cursor: 'pointer' }}
          >
            <text
              x={fr.x + fr.width / 2}
              y={fr.y + fr.height}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={11}
              fontWeight={700}
              fill={fill}
            >
              {finishLabel}
            </text>
            {selectedIds.has('finish-label') && renderHandles(fr, 'finish-label')}
          </g>
        )
      })()}

      {/* Milestone Cards */}
      {milestones.map((ms, i) => {
        const bid = `block-${i}`
        const cid = `conn-${i}`
        const br = rects.get(bid)!
        const cr = rects.get(cid)!
        const color = tplColors[bid] ?? ms.style?.fill ?? ms.color ?? PALETTE[i % PALETTE.length]!
        const cStroke = tplStrokeColors[cid] ?? color
        const cSW = tplStrokeWidths[cid] ?? 1.5
        const customStroke = tplStrokeColors[bid]
        const customStrokeWidth = tplStrokeWidths[bid] ?? 1
        const styleStroke = ms.style?.stroke
        const isSel = selectedIds.has(bid)
        const isCSel = selectedIds.has(cid)
        const blockCx = br.x + br.width / 2
        const progressVal = (i + 1) / N
        const styleFontSize = ms.style?.fontSize ?? 13
        const styleFontWeight = ms.style?.fontWeight ?? 700
        const styleFontColor = ms.style?.fontColor ?? '#333333'

        const maxTitleChars = Math.max(6, Math.floor(br.width / 8.5))
        const maxSubChars = Math.max(8, Math.floor(br.width / 7))
        const titleLines = wrapTextByWidth(ms.title || `Phase ${i + 1}`, maxTitleChars)
        const subLines = ms.subtitle ? wrapTextByWidth(ms.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(ms.icon, 18, color)
        const dateStr = ms.date || (ms.quarter ? ms.quarter : String(i + 1).padStart(2, '0'))

        return (
          <g key={i}>
            {/* Connector */}
            <g
              data-element-id={cid}
              onMouseDown={e => startDrag(e, cid, cr)}
              transform={getTransform(cid, cr)}
              style={{ cursor: 'pointer' }}
            >
              <line
                x1={blockCx}
                y1={tr.y}
                x2={blockCx}
                y2={br.y}
                stroke={cStroke}
                strokeWidth={cSW}
                opacity={0.5}
              />
              {isCSel && renderHandles(cr, cid)}
            </g>

            {/* Block */}
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
                rx={12}
                fill="white"
                stroke={customStroke || (isSel ? '#4a90d9' : (styleStroke || '#e0e0e0'))}
                strokeWidth={isSel ? 2.5 : customStrokeWidth}
              />
              <rect x={br.x} y={br.y} width={br.width} height={6} rx={3} fill={color} opacity={0.15} />
              <rect x={br.x} y={br.y} width={br.width * progressVal} height={6} rx={3} fill={color} />

              <text
                x={blockCx}
                y={br.y + 38}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={28}
                fontWeight={900}
                fill={color}
                opacity={0.15}
              >
                {dateStr}
              </text>

              <g transform={`translate(${blockCx}, ${br.y + 55})`}>
                {iconEl && (
                  <g transform="translate(-9, -16)">
                    {iconEl}
                  </g>
                )}
                <text
                  x={0}
                  y={iconEl ? 16 : 0}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={styleFontSize}
                  fontWeight={styleFontWeight}
                  fill={styleFontColor}
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={0} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              {subLines.length > 0 && (
                <text
                  x={blockCx}
                  y={br.y + (iconEl ? 72 : 56) + titleLines.length * 15 + 4}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={10.5}
                  fill="#777777"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={blockCx} dy={li === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {ms.date && (
                <text
                  x={blockCx}
                  y={br.y + br.height - 25}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={10}
                  fontWeight={700}
                  fill={color}
                  opacity={0.85}
                >
                  {ms.date}
                </text>
              )}
              <text
                x={blockCx}
                y={br.y + br.height - 12}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fontWeight={600}
                fill={color}
              >
                {Math.round(progressVal * 100)}%
              </text>

              {isSel && renderHandles(br, bid)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
