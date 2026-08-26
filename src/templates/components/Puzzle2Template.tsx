import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { randomMigsoColor } from '../../lib/theme'

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
  const neckW = 20
  const headR = 15
  const neckR = 7

  const hMid = mid

  let d = `M ${x} ${y} L ${r} ${y}`
  if (opts.rightTab) {
    d += ` L ${r} ${hMid - neckW / 2 - neckR}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${r + neckR} ${hMid - neckW / 2}`
    d += ` A ${headR} ${headR} 0 1 1 ${r + neckR} ${hMid + neckW / 2}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${r} ${hMid + neckW / 2 + neckR}`
    d += ` L ${r} ${b}`
  } else {
    d += ` L ${r} ${b}`
  }
  d += ` L ${x} ${b}`
  if (opts.leftIndent) {
    d += ` L ${x} ${hMid + neckW / 2 + neckR}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${x + neckR} ${hMid + neckW / 2}`
    d += ` A ${headR} ${headR} 0 1 0 ${x + neckR} ${hMid - neckW / 2}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${x} ${hMid - neckW / 2 - neckR}`
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
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { pieces } = data
  const W = 900
  const totalW = pieces.length * CELL_W
  const startX = (W - totalW) / 2
  const startY = 40

  return (
    <g ref={svgRef}>
      {pieces.map((piece, index) => {
        const layout = index === 0
          ? PIECE_LAYOUTS[0]!
          : index === pieces.length - 1
          ? PIECE_LAYOUTS[3]!
          : PIECE_LAYOUTS[1]!
        const px = startX + index * CELL_W
        const py = startY
        const path = piecePathH(px, py, layout.tabs)
        const defaultColor = piece.color || randomMigsoColor(index)
        const elementId = `piece-${index}`
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'white'
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3.5 : 3)
        const isSelected = selectedIds.has(elementId)

        const defaultRect = { x: px, y: py, width: CELL_W, height: CELL_H }
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const centerCx = bbox.x + bbox.width / 2
        const centerCy = bbox.y + bbox.height / 2
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined
        const maxChars = Math.max(8, Math.floor((bbox.width - 40) / 8))
        const titleLines = wrapTextByWidth(piece.title, maxChars)
        const subtitleLines = piece.subtitle ? wrapTextByWidth(piece.subtitle, maxChars) : []

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path d={path} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
              <circle cx={centerCx} cy={centerCy - 28} r={16} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
              {IconComponent ? (
                <g transform={`translate(${centerCx - 8}, ${centerCy - 36})`}>
                  <IconComponent size={16} color="white" />
                </g>
              ) : (
                <text x={centerCx} y={centerCy - 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                  {piece.number}
                </text>
              )}
              <text x={centerCx} y={centerCy + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
              {piece.subtitle && (
                <text x={centerCx} y={centerCy + 10 + titleLines.length * 14 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.85)">
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
