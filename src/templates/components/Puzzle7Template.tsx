import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800']
const BIG_W = 240
const BIG_H = 160
const SMALL_W = 130
const SMALL_H = 85
const BIG_X = 360
const BIG_Y = 240

export function Puzzle7Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const pos = useTemplateStore(s => s.templateElementPositions) // Retrieve positions as 'pos'

  // Helper function to get current or fallback rectangle position
  const getRect = (id: string, fallback: {x: number, y: number, width: number, height: number}) => pos[id] || fallback;

  const { title, pieces } = data
  const W = 900

  const staticSmallPositions = [
    { x: BIG_X - SMALL_W - 30, y: BIG_Y - 20 },
    { x: BIG_X + BIG_W + 30, y: BIG_Y - 20 },
    { x: BIG_X + (BIG_W - SMALL_W) / 2, y: BIG_Y + BIG_H + 30 },
  ]

  // Define default and current positions for the main piece
  const mainPieceId = 'piece-0';
  const mainDefaultRect = { x: BIG_X, y: BIG_Y, width: BIG_W, height: BIG_H };
  const mainRect = getRect(mainPieceId, mainDefaultRect);

  return (
    <g ref={svgRef}>
      {title && (
        <text x={W / 2} y={50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill={TITLE_COLOR}>
          {title}
        </text>
      )}

      {pieces.length > 0 && (() => {
        const main = pieces[0]!
        const elementId = mainPieceId
        const visualRect = mainRect; // Use the dynamically retrieved position
        const scaleX = visualRect.width / mainDefaultRect.width
        const scaleY = visualRect.height / mainDefaultRect.height
        const isSelected = selectedIds.has(elementId)

        return (
          <g>
            <g
              data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, visualRect)} transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              {/* Content drawn relative to (0,0) of its original size, as getTransform handles the full positioning and scaling */}
              <rect x={3} y={3} width={BIG_W} height={BIG_H} rx={12} fill="black" opacity={0.15} />
              <rect
                x={0}
                y={0}
                width={BIG_W}
                height={BIG_H}
                rx={10}
                fill={(tplColors[elementId] ?? main.color) || PALETTE[0]!}
                stroke={isSelected ? '#4a90d9' : tplStrokeColors[elementId] || 'white'}
                strokeWidth={isSelected ? 3.5 : 3}
              />
              <circle cx={36} cy={44} r={18} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
              <text x={36} y={50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
                {main.number}
              </text>
              <text x={BIG_W / 2} y={BIG_H / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="white">
                {main.title}
              </text>
              {main.subtitle && (
                <text x={BIG_W / 2} y={BIG_H / 2 + 26} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="rgba(255,255,255,0.85)">
                  {main.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })()}

      {pieces.slice(1).map((piece, i) => {
        let px: number
        let py: number

        if (i < staticSmallPositions.length) {
          px = staticSmallPositions[i]!.x
          py = staticSmallPositions[i]!.y
        } else {
          const smallCount = pieces.length - 1
          const angle = (i / smallCount) * 2 * Math.PI - Math.PI / 2
          const radius = 220
          const centerPx = BIG_X + BIG_W / 2
          const centerPy = BIG_Y + BIG_H / 2
          px = centerPx + radius * Math.cos(angle) - SMALL_W / 2
          py = centerPy + radius * Math.sin(angle) - SMALL_H / 2
        }

        const elementId = `piece-${i + 1}`
        const defaultColor = piece.color || PALETTE[(i + 1) % PALETTE.length]!
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'white'
        const isSelected = selectedIds.has(elementId)

        const smallDefaultRect = { x: px, y: py, width: SMALL_W, height: SMALL_H };
        const smallRect = getRect(elementId, smallDefaultRect); // Use the dynamically retrieved position
        const scaleX = smallRect.width / smallDefaultRect.width
        const scaleY = smallRect.height / smallDefaultRect.height

        return (
          <g key={i + 1}>
            <g
              data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, smallRect)} transform={getTransform(elementId, smallRect)}
              style={{ cursor: 'pointer' }}
            >
              {/* Content drawn relative to (0,0) of its original size, as getTransform handles the full positioning and scaling */}
              <rect x={2} y={2} width={SMALL_W} height={SMALL_H} rx={8} fill="black" opacity={0.1} />
              <rect x={0} y={0} width={SMALL_W} height={SMALL_H} rx={8} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 3 : 2} />
              <circle cx={24} cy={28} r={11} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} />
              <text x={24} y={32} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                {piece.number}
              </text>
              <text x={SMALL_W / 2} y={SMALL_H / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {piece.title}
              </text>
              {piece.subtitle && (
                <text x={SMALL_W / 2} y={SMALL_H / 2 + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="rgba(255,255,255,0.85)">
                  {piece.subtitle}
                </text>
              )}
              {isSelected && renderHandles(smallRect, elementId)}
            </g>
            {/* Connector line: dynamically calculate endpoints based on current positions */}
            <line
              x1={mainRect.x + mainRect.width / 2}
              y1={mainRect.y + mainRect.height / 2}
              x2={smallRect.x + smallRect.width / 2}
              y2={smallRect.y + smallRect.height / 2}
              stroke={color}
              strokeWidth={1}
              strokeDasharray="4 3"
              opacity={0.5}
            />
          </g>
        )
      })}
    </g>
  )
}