import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800']
const BIG_W = 240
const BIG_H = 160
const SMALL_W = 130
const SMALL_H = 85
const BIG_X = 360
const BIG_Y = 240

export function Puzzle7Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, pieces } = data
  const W = 900
  const H = 550
  const displayed = pieces.slice(0, 4)

  const smallPositions = [
    { x: BIG_X - SMALL_W - 30, y: BIG_Y - 20 },
    { x: BIG_X + BIG_W + 30, y: BIG_Y - 20 },
    { x: BIG_X + (BIG_W - SMALL_W) / 2, y: BIG_Y + BIG_H + 30 },
  ]

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {displayed.length > 0 && (() => {
        const main = displayed[0]!
        return (
        <g>
          <g onMouseDown={e => startDrag(e, 'piece-0', { x: BIG_X, y: BIG_Y, width: BIG_W, height: BIG_H })} style={{ cursor: 'pointer' }}>
            <rect x={BIG_X + 3} y={BIG_Y + 3} width={BIG_W} height={BIG_H} rx={12} fill="black" opacity={0.15} />
            <rect
              x={BIG_X}
              y={BIG_Y}
              width={BIG_W}
              height={BIG_H}
              rx={10}
              fill={(tplColors['piece-0'] ?? main.color) || PALETTE[0]!}
              stroke={selectedIds.has('piece-0') ? '#4a90d9' : tplStrokeColors['piece-0'] || 'white'}
              strokeWidth={selectedIds.has('piece-0') ? 3.5 : 3}
            />
            <circle cx={BIG_X + 36} cy={BIG_Y + 44} r={18} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
            <text x={BIG_X + 36} y={BIG_Y + 50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
              {main.number}
            </text>
            <text x={BIG_X + BIG_W / 2} y={BIG_Y + BIG_H / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="white">
              {main.title}
            </text>
            {main.subtitle && (
              <text x={BIG_X + BIG_W / 2} y={BIG_Y + BIG_H / 2 + 26} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="rgba(255,255,255,0.85)">
                {main.subtitle}
              </text>
            )}
            {selectedIds.has('piece-0') && renderHandles({ x: BIG_X, y: BIG_Y, width: BIG_W, height: BIG_H }, 'piece-0')}
          </g>
        </g>
      )})()}

      {displayed.slice(1).map((piece, i) => {
        const pos = smallPositions[i]!
        const px = pos.x
        const py = pos.y
        const elementId = `piece-${i + 1}`
        const defaultColor = piece.color || PALETTE[(i + 1) % PALETTE.length]!
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'white'
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: px, y: py, width: SMALL_W, height: SMALL_H }

        return (
          <g key={i + 1}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={px + 2} y={py + 2} width={SMALL_W} height={SMALL_H} rx={8} fill="black" opacity={0.1} />
              <rect x={px} y={py} width={SMALL_W} height={SMALL_H} rx={8} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 3 : 2} />
              <circle cx={px + 24} cy={py + 28} r={11} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} />
              <text x={px + 24} y={py + 32} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                {piece.number}
              </text>
              <text x={px + SMALL_W / 2} y={py + SMALL_H / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {piece.title}
              </text>
              {piece.subtitle && (
                <text x={px + SMALL_W / 2} y={py + SMALL_H / 2 + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="rgba(255,255,255,0.85)">
                  {piece.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
            <line x1={BIG_X + BIG_W / 2} y1={BIG_Y + BIG_H / 2} x2={px + SMALL_W / 2} y2={py + SMALL_H / 2} stroke={color} strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          </g>
        )
      })}
    </g>
  )
}
