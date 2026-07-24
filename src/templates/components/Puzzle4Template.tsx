import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9b59b6', '#00bcd4']
const CELL_W = 160
const CELL_H = 130
const TAB_H = 40
const TAB_D = 18

type Tab = { right?: boolean; bottom?: boolean; leftIndent?: boolean; topIndent?: boolean }

const GRID: Tab[][] = [
  [
    { right: true, bottom: true },
    { right: true, bottom: true, leftIndent: true },
    { bottom: true, leftIndent: true },
  ],
  [
    { right: true, topIndent: true },
    { right: true, leftIndent: true, topIndent: true },
    { leftIndent: true, topIndent: true },
  ],
]

function gridPath(x: number, y: number, t: Tab): string {
  const r = x + CELL_W
  const b = y + CELL_H
  const midX = x + CELL_W / 2
  const midY = y + CELL_H / 2
  const hs = midY - TAB_H / 2
  const he = midY + TAB_H / 2
  const vs = midX - TAB_H / 2
  const ve = midX + TAB_H / 2
  let d = 'M ' + x + ' ' + y
  d += t.topIndent ? ' L ' + vs + ' ' + y + ' C ' + vs + ' ' + (y + TAB_D) + ' ' + ve + ' ' + (y + TAB_D) + ' ' + ve + ' ' + y + ' L ' + r + ' ' + y : ' L ' + r + ' ' + y
  d += t.right ? ' L ' + r + ' ' + hs + ' C ' + (r + TAB_D) + ' ' + hs + ' ' + (r + TAB_D) + ' ' + he + ' ' + r + ' ' + he + ' L ' + r + ' ' + b : ' L ' + r + ' ' + b
  d += t.bottom ? ' L ' + ve + ' ' + b + ' C ' + ve + ' ' + (b + TAB_D) + ' ' + vs + ' ' + (b + TAB_D) + ' ' + vs + ' ' + b + ' L ' + x + ' ' + b : ' L ' + x + ' ' + b
  d += t.leftIndent ? ' L ' + x + ' ' + he + ' C ' + (x + TAB_D) + ' ' + he + ' ' + (x + TAB_D) + ' ' + hs + ' ' + x + ' ' + hs : ''
  return d + ' Z'
}

export function Puzzle4Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, pieces } = data
  const W = 700
  const H = 480
  const cols = 3
  const gridW = cols * CELL_W
  const startX = (W - gridW) / 2
  const startY = title ? 110 : 70
  const displayed = pieces.slice(0, 6)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {displayed.map((piece, i) => {
        const row = Math.floor(i / cols)
        const col = i % cols
        const tabOpts = GRID[row]?.[col] ?? {}
        const px = startX + col * CELL_W
        const py = startY + row * CELL_H
        const cx = px + CELL_W / 2
        const cy = py + CELL_H / 2
        const path = gridPath(px, py, tabOpts)
        const defaultColor = piece.color || PALETTE[i % PALETTE.length]!
        const elementId = `piece-${i}`
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'white'
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: px, y: py, width: CELL_W, height: CELL_H }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <path d={path} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 3.5 : 3} strokeLinejoin="round" />
              <circle cx={cx} cy={cy - 14} r={13} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
              <text x={cx} y={cy - 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                {piece.number}
              </text>
              <text x={cx} y={cy + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {piece.title}
              </text>
              {piece.subtitle && (
                <text x={cx} y={cy + 32} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.85)">
                  {piece.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
