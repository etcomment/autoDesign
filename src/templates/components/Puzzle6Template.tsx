import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800']
const CX = 450
const CY = 280
const PIECE_W = 140
const PIECE_H = 100
const DIST = 160
const ROTATIONS = [0, 8, -8, 0]

export function Puzzle6Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, pieces } = data
  const W = 900
  const H = 580
  const displayed = pieces.slice(0, 4)

  const positions = [
    { x: CX - PIECE_W / 2, y: CY - DIST - PIECE_H / 2 },
    { x: CX + DIST - PIECE_W / 2, y: CY - PIECE_H / 2 },
    { x: CX - PIECE_W / 2, y: CY + DIST - PIECE_H / 2 },
    { x: CX - DIST - PIECE_W / 2, y: CY - PIECE_H / 2 },
  ]

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={CX} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <circle cx={CX} cy={CY} r={40} fill="#eef2f6" stroke="#cbd5e0" strokeWidth={2} />
      <text x={CX} y={CY + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="#1e3a5f">
        {displayed.length}
      </text>

      {displayed.map((piece, i) => {
        const pos = positions[i]!
        const px = pos.x
        const py = pos.y
        const cx = px + PIECE_W / 2
        const cy = py + PIECE_H / 2
        const rot = ROTATIONS[i]!
        const defaultColor = piece.color || PALETTE[i % PALETTE.length]!
        const elementId = `piece-${i}`
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'white'
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: px, y: py, width: PIECE_W, height: PIECE_H }

        const lineX = CX
        const lineY = CY

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
                <rect x={-PIECE_W / 2} y={-PIECE_H / 2} width={PIECE_W} height={PIECE_H} rx={10} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 3.5 : 2} />
                <circle cx={-PIECE_W / 2 + 28} cy={-PIECE_H / 2 + 28} r={14} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
                <text x={-PIECE_W / 2 + 28} y={-PIECE_H / 2 + 34} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                  {piece.number}
                </text>
                <text x={0} y={6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="white">
                  {piece.title}
                </text>
                {piece.subtitle && (
                  <text x={0} y={24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.85)">
                    {piece.subtitle}
                  </text>
                )}
              </g>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
            <line x1={lineX} y1={lineY} x2={cx} y2={cy} stroke={color} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.6} />
          </g>
        )
      })}
    </g>
  )
}
