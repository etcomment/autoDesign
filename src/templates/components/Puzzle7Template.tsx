import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const MAIN_W = 280
const MAIN_H = 260
const SIDE_W = 200
const SIDE_H = 80
const SIDE_GAP = 12

export function Puzzle7Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { pieces } = data
  const mainPiece = pieces[0]
  const sidePieces = pieces.slice(1)

  const W = 700
  const totalW = MAIN_W + 40 + SIDE_W
  const startX = (W - totalW) / 2
  const startY = 40

  const mainDefaultRect = { x: startX, y: startY, width: MAIN_W, height: MAIN_H }
  const mainCustomPos = templateElementPositions['piece-0']
  const mainBbox = {
    x: mainCustomPos ? mainCustomPos.x : mainDefaultRect.x,
    y: mainCustomPos ? mainCustomPos.y : mainDefaultRect.y,
    width: mainCustomPos?.width || mainDefaultRect.width,
    height: mainCustomPos?.height || mainDefaultRect.height,
  }

  return (
    <g ref={svgRef}>
      {/* Main Big Piece */}
      {mainPiece && (() => {
        const elementId = 'piece-0'
        const color = tplColors[elementId] ?? mainPiece.color ?? MIGSO_PALETTE[0]!
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : 'white')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3.5 : 2.5)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = mainPiece.icon ? TEMPLATE_ICONS[mainPiece.icon] : undefined
        const maxChars = Math.max(10, Math.floor((mainBbox.width - 40) / 8))
        const titleLines = wrapTextByWidth(mainPiece.title, maxChars)
        const subtitleLines = mainPiece.subtitle ? wrapTextByWidth(mainPiece.subtitle, maxChars) : []

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, mainBbox)}
            transform={getTransform(elementId, mainBbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={mainBbox.x} y={mainBbox.y} width={mainBbox.width} height={mainBbox.height} rx={16} fill={color} stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx={mainBbox.x + 36} cy={mainBbox.y + 36} r={18} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
            {IconComponent ? (
              <g transform={`translate(${mainBbox.x + 27}, ${mainBbox.y + 27})`}>
                <IconComponent size={18} color="white" />
              </g>
            ) : (
              <text x={mainBbox.x + 36} y={mainBbox.y + 42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="white">
                {mainPiece.number}
              </text>
            )}
            <text x={mainBbox.x + mainBbox.width / 2} y={mainBbox.y + mainBbox.height / 2 + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={700} fill="white">
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={mainBbox.x + mainBbox.width / 2} dy={lineIndex === 0 ? 0 : 18}>
                  {line}
                </tspan>
              ))}
            </text>
            {mainPiece.subtitle && (
              <text x={mainBbox.x + mainBbox.width / 2} y={mainBbox.y + mainBbox.height / 2 + titleLines.length * 18 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="rgba(255,255,255,0.85)">
                {subtitleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={mainBbox.x + mainBbox.width / 2} dy={lineIndex === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}
            {isSelected && renderHandles(mainBbox, elementId)}
          </g>
        )
      })()}

      {/* Side Pieces */}
      {sidePieces.map((piece, index) => {
        const sideIdx = index + 1
        const elementId = `piece-${sideIdx}`
        const sy = startY + index * (SIDE_H + SIDE_GAP)
        const defaultRect = { x: startX + MAIN_W + 40, y: sy, width: SIDE_W, height: SIDE_H }
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const color = tplColors[elementId] ?? piece.color ?? MIGSO_PALETTE[sideIdx % MIGSO_PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : 'white')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3.5 : 2)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined

        const lineX1 = mainBbox.x + mainBbox.width
        const lineY1 = mainBbox.y + 40 + index * 80
        const lineX2 = bbox.x
        const lineY2 = bbox.y + bbox.height / 2
        const maxChars = Math.max(8, Math.floor((bbox.width - 50) / 8))
        const titleLines = wrapTextByWidth(piece.title, maxChars)

        return (
          <g key={elementId}>
            <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke={color} strokeWidth={2} strokeDasharray="4 3" opacity={0.6} />

            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={10} fill={color} stroke={stroke} strokeWidth={strokeWidth} />
              <circle cx={bbox.x + 24} cy={bbox.y + bbox.height / 2} r={14} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} />
              {IconComponent ? (
                <g transform={`translate(${bbox.x + 17}, ${bbox.y + bbox.height / 2 - 7})`}>
                  <IconComponent size={14} color="white" />
                </g>
              ) : (
                <text x={bbox.x + 24} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                  {piece.number}
                </text>
              )}
              <text x={bbox.x + 48} y={bbox.y + bbox.height / 2 + (piece.subtitle ? -2 : 5)} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {titleLines[0] || ''}
              </text>
              {piece.subtitle && (
                <text x={bbox.x + 48} y={bbox.y + bbox.height / 2 + 16} fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.85)">
                  {piece.subtitle.length > 18 ? piece.subtitle.slice(0, 16) + '...' : piece.subtitle}
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