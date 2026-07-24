import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const CELL_W = 260
const CELL_H = 170
const TAB_W = 50
const TAB_D = 22

function piecePath(
  x: number,
  y: number,
  opts: { right?: boolean; bottom?: boolean; leftIndent?: boolean; topIndent?: boolean },
): string {
  const r = x + CELL_W
  const b = y + CELL_H
  const midX = x + CELL_W / 2
  const midY = y + CELL_H / 2
  const ts = midY - TAB_W / 2
  const te = midY + TAB_W / 2
  const bs = midX - TAB_W / 2
  const be = midX + TAB_W / 2

  let d = 'M ' + x + ' ' + y

  if (opts.topIndent) {
    d += ' L ' + bs + ' ' + y + ' C ' + bs + ' ' + (y + TAB_D) + ' ' + be + ' ' + (y + TAB_D) + ' ' + be + ' ' + y + ' L ' + r + ' ' + y
  } else {
    d += ' L ' + r + ' ' + y
  }

  if (opts.right) {
    d += ' L ' + r + ' ' + ts + ' C ' + (r + TAB_D) + ' ' + ts + ' ' + (r + TAB_D) + ' ' + te + ' ' + r + ' ' + te + ' L ' + r + ' ' + b
  } else {
    d += ' L ' + r + ' ' + b
  }

  if (opts.bottom) {
    d += ' L ' + be + ' ' + b + ' C ' + be + ' ' + (b + TAB_D) + ' ' + bs + ' ' + (b + TAB_D) + ' ' + bs + ' ' + b + ' L ' + x + ' ' + b
  } else {
    d += ' L ' + x + ' ' + b
  }

  if (opts.leftIndent) {
    d += ' L ' + x + ' ' + te + ' C ' + (x + TAB_D) + ' ' + te + ' ' + (x + TAB_D) + ' ' + ts + ' ' + x + ' ' + ts
  }

  d += ' Z'
  return d
}

const PIECE_LAYOUTS = [
  { tabs: { right: true, bottom: true } as const, offsetX: 0, offsetY: 0 },
  { tabs: { bottom: true, leftIndent: true } as const, offsetX: CELL_W, offsetY: 0 },
  { tabs: { right: true, topIndent: true } as const, offsetX: 0, offsetY: CELL_H },
  { tabs: { leftIndent: true, topIndent: true } as const, offsetX: CELL_W, offsetY: CELL_H },
]

export function PuzzleTemplate({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, pieces } = data
  const W = 900
  const H = 600

  const gridX = (W - CELL_W * 2) / 2
  const gridY = title ? 110 : 80
  const displayed = pieces.slice(0, 4)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {displayed.map((piece, i) => {
        const layout = PIECE_LAYOUTS[i]!
        const px = gridX + layout.offsetX
        const py = gridY + layout.offsetY
        const cx = px + CELL_W / 2
        const cy = py + CELL_H / 2
        const path = piecePath(px, py, layout.tabs)

        const elementId = `piece-${i}`
        const color = tplColors[elementId] ?? piece.color
        const stroke = tplStrokeColors[elementId] || 'white'
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: px, y: py, width: CELL_W, height: CELL_H }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <path d={path} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 3.5 : 3} strokeLinejoin="round" />

              <circle cx={px + 36} cy={py + 50} r={16} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
              <text x={px + 36} y={py + 56} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {piece.number}
              </text>

              <text x={cx + 10} y={cy + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
                {piece.title}
              </text>
              {piece.subtitle && (
                <text x={cx + 10} y={cy + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="rgba(255,255,255,0.85)">
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
