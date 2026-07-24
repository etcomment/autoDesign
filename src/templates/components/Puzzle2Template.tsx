import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800']
const CELL_W = 190
const CELL_H = 160
const TAB_H = 50
const TAB_D = 22

function piecePathH(
  x: number,
  y: number,
  opts: { rightTab?: boolean; leftIndent?: boolean },
): string {
  const r = x + CELL_W
  const b = y + CELL_H
  const mid = y + CELL_H / 2
  const ts = mid - TAB_H / 2
  const te = mid + TAB_H / 2

  let d = 'M ' + x + ' ' + y + ' L ' + r + ' ' + y
  if (opts.rightTab) {
    d += ' L ' + r + ' ' + ts + ' C ' + (r + TAB_D) + ' ' + ts + ' ' + (r + TAB_D) + ' ' + te + ' ' + r + ' ' + te + ' L ' + r + ' ' + b
  } else {
    d += ' L ' + r + ' ' + b
  }
  d += ' L ' + x + ' ' + b
  if (opts.leftIndent) {
    d += ' L ' + x + ' ' + te + ' C ' + (x + TAB_D) + ' ' + te + ' ' + (x + TAB_D) + ' ' + ts + ' ' + x + ' ' + ts
  }
  d += ' Z'
  return d
}

const PIECE_LAYOUTS = [
  { tabs: { rightTab: true } as const },
  { tabs: { rightTab: true, leftIndent: true } as const },
  { tabs: { rightTab: true, leftIndent: true } as const },
  { tabs: { leftIndent: true } as const },
]

export function Puzzle2Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, pieces } = data
  const W = 900
  const H = 350
  const displayed = pieces.slice(0, 4)
  const totalW = displayed.length * CELL_W
  const startX = (W - totalW) / 2
  const startY = title ? 120 : 80

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {displayed.map((piece, i) => {
        const layout = PIECE_LAYOUTS[i]!
        const px = startX + i * CELL_W
        const py = startY
        const cx = px + CELL_W / 2
        const cy = py + CELL_H / 2
        const path = piecePathH(px, py, layout.tabs)
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
              <circle cx={cx} cy={cy - 18} r={16} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
              <text x={cx} y={cy - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {piece.number}
              </text>
              <text x={cx} y={cy + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="white">
                {piece.title}
              </text>
              {piece.subtitle && (
                <text x={cx} y={cy + 36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.85)">
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
