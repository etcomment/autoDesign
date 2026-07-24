import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800']
const CX = 450
const CY = 250
const OUTER_R = 170
const INNER_R = 60
const GAP_ANGLE = 4

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const rad1 = (startDeg * Math.PI) / 180
  const rad2 = (endDeg * Math.PI) / 180
  const x1 = cx + r * Math.cos(rad1)
  const y1 = cy + r * Math.sin(rad1)
  const x2 = cx + r * Math.cos(rad2)
  const y2 = cy + r * Math.sin(rad2)
  const large = (endDeg - startDeg) > 180 ? 1 : 0
  return 'M ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x2 + ' ' + y2
}

function ringSegmentPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startDeg: number,
  endDeg: number,
): string {
  const rad1 = (startDeg * Math.PI) / 180
  const rad2 = (endDeg * Math.PI) / 180
  return (
    'M ' + (cx + outerR * Math.cos(rad1)) + ' ' + (cy + outerR * Math.sin(rad1)) + ' ' +
    describeArc(cx, cy, outerR, startDeg, endDeg).slice(1) + ' ' +
    'L ' + (cx + innerR * Math.cos(rad2)) + ' ' + (cy + innerR * Math.sin(rad2)) + ' ' +
    describeArc(cx, cy, innerR, endDeg, startDeg).replace('M', 'L').replace(' 1 ', ' 0 ').slice(1) + ' Z'
  )
}

export function Puzzle5Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, pieces } = data
  const W = 900
  const H = 500
  const displayed = pieces.slice(0, 4)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      <circle cx={CX} cy={CY} r={INNER_R} fill="#eef2f6" stroke="#cbd5e0" strokeWidth={2} />
      <text x={CX} y={CY - 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#1e3a5f">
        {title || 'Puzzle'}
      </text>
      <text x={CX} y={CY + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="#718096">
        {displayed.length} pièces
      </text>

      {displayed.map((piece, i) => {
        const startDeg = i * 90 + GAP_ANGLE / 2
        const endDeg = startDeg + 90 - GAP_ANGLE
        const midDeg = (startDeg + endDeg) / 2
        const midRad = (midDeg * Math.PI) / 180
        const labelX = CX + (INNER_R + OUTER_R) / 2 * Math.cos(midRad)
        const labelY = CY + (INNER_R + OUTER_R) / 2 * Math.sin(midRad)
        const path = ringSegmentPath(CX, CY, INNER_R + 4, OUTER_R, startDeg, endDeg)
        const defaultColor = piece.color || PALETTE[i % PALETTE.length]!
        const elementId = `piece-${i}`
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'white'
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: CX - OUTER_R, y: CY - OUTER_R, width: OUTER_R * 2, height: OUTER_R * 2 }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <path d={path} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 3.5 : 2.5} strokeLinejoin="round" />
              <text x={labelX} y={labelY - 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {piece.title}
              </text>
              <text x={labelX} y={labelY + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.85)">
                {piece.number}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
