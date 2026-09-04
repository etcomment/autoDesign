import { useRef, createElement, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import {
  PIECE_PATHS,
  PIECE_BOXES,
  DOT_CENTERS,
  DOT_RADIUS,
  CARD_TITLE_X_LEFT,
  CARD_TITLE_X_RIGHT,
  CARD_TITLE_Y_TOP,
  CARD_TITLE_Y_BOTTOM,
  CARD_BODY_Y_TOP,
  CARD_BODY_Y_BOTTOM,
  CARD_BODY_LINE_HEIGHT,
  translatePiecePath,
} from '../shared/puzzle2Geometry'

const TITLE_FONT_SIZE = 16.7
const BODY_FONT_SIZE = 14.6
const SUBTITLE_MAX_CHARS = 21
const BASE_PIECE_COUNT = 4
const TOP_ROW_SPACING = PIECE_BOXES[2]!.x - PIECE_BOXES[0]!.x
const BOTTOM_ROW_SPACING = PIECE_BOXES[3]!.x - PIECE_BOXES[1]!.x

export function Puzzle2Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const pieces = data.pieces

  const getElementPos = (elementId: string, defaultRect: { x: number; y: number; width: number; height: number }) => {
    const customPos = templateElementPositions[elementId]
    return {
      x: customPos ? customPos.x : defaultRect.x,
      y: customPos ? customPos.y : defaultRect.y,
      width: customPos?.width || defaultRect.width,
      height: customPos?.height || defaultRect.height,
    }
  }

  return (
    <g ref={svgRef}>
      {pieces.map((piece, index) => {
        const pathIndex = index % BASE_PIECE_COUNT
        const repeatCycle = Math.floor(index / BASE_PIECE_COUNT)
        const rowSpacing = pathIndex % 2 === 0 ? TOP_ROW_SPACING : BOTTOM_ROW_SPACING
        const extraShift = repeatCycle * 2 * rowSpacing
        const basePath = PIECE_PATHS[pathIndex]!
        const path = extraShift ? translatePiecePath(basePath, extraShift) : basePath
        const baseBox = PIECE_BOXES[pathIndex]!
        const box = extraShift ? { ...baseBox, x: baseBox.x + extraShift } : baseBox
        const pieceId = `piece-${index}`
        const color = tplColors[pieceId] ?? piece.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isPieceSelected = selectedIds.has(pieceId)
        const pieceRect = getElementPos(pieceId, box)
        const centerCx = pieceRect.x + pieceRect.width / 2
        const centerCy = pieceRect.y + pieceRect.height / 2

        const iconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] ?? TEMPLATE_ICONS[piece.icon.toLowerCase()] : undefined
        const hasCornerCard = index < BASE_PIECE_COUNT

        const isLeft = index === 0 || index === 1
        const isTop = index === 0 || index === 2
        const titleX = isLeft ? CARD_TITLE_X_LEFT : CARD_TITLE_X_RIGHT
        const titleY = isTop ? CARD_TITLE_Y_TOP : CARD_TITLE_Y_BOTTOM
        const bodyY = isTop ? CARD_BODY_Y_TOP : CARD_BODY_Y_BOTTOM
        const cardId = `card-${index}`
        const cardRect = getElementPos(cardId, { x: titleX - 4, y: titleY - 18, width: 204, height: 80 })
        const isCardSelected = selectedIds.has(cardId)
        const cardColor = tplColors[cardId] ?? color
        const subtitleLines = piece.subtitle ? wrapTextByWidth(piece.subtitle, SUBTITLE_MAX_CHARS) : []

        const dotId = `dot-${index}`
        const dot = DOT_CENTERS[index]
        const dotRect = dot ? getElementPos(dotId, { x: dot.x - DOT_RADIUS, y: dot.y - DOT_RADIUS, width: DOT_RADIUS * 2, height: DOT_RADIUS * 2 }) : null
        const isDotSelected = selectedIds.has(dotId)
        const dotColor = tplColors[dotId] ?? cardColor

        return (
          <g key={`item-p2-${index}`}>
            {hasCornerCard && dot && dotRect && (
              <g data-element-id={dotId} onMouseDown={e => startDrag(e, dotId, dotRect)} transform={getTransform(dotId, dotRect)} style={{ cursor: 'pointer' }}>
                <circle cx={dot.x} cy={dot.y} r={DOT_RADIUS} fill={dotColor} />
                {isDotSelected && renderHandles(dotRect, dotId)}
              </g>
            )}

            <g
              data-element-id={pieceId}
              onMouseDown={e => startDrag(e, pieceId, pieceRect)}
              transform={getTransform(pieceId, pieceRect)}
              style={{ cursor: 'pointer' }}
            >
              <path d={path} fill={color} fillRule="evenodd" stroke={isPieceSelected ? '#4a90d9' : 'none'} strokeWidth={isPieceSelected ? 2 : 0} strokeLinejoin="round" />
              {iconComponent ? (
                <g data-icon="true" transform={`translate(${centerCx - 24}, ${centerCy - 24})`}>
                  {createElement(iconComponent, { size: 48, color: 'white' })}
                </g>
              ) : (
                <text x={centerCx} y={centerCy + 7} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight="bold" fill="white">
                  {piece.number ?? index + 1}
                </text>
              )}
              {isPieceSelected && renderHandles(pieceRect, pieceId)}
            </g>

            {hasCornerCard && (
              <g data-element-id={cardId} onMouseDown={e => startDrag(e, cardId, cardRect)} transform={getTransform(cardId, cardRect)} style={{ cursor: 'pointer' }}>
                <text x={titleX} y={titleY} fontFamily="Arial, sans-serif" fontSize={TITLE_FONT_SIZE} fontWeight="bold" fill={cardColor}>
                  {piece.title}
                </text>
                {subtitleLines.length > 0 && (
                  <text x={titleX} y={bodyY} fontFamily="Arial, sans-serif" fontSize={BODY_FONT_SIZE} fill="black">
                    {subtitleLines.map((line, lineIdx) => (
                      <tspan key={lineIdx} x={titleX} dy={lineIdx === 0 ? 0 : CARD_BODY_LINE_HEIGHT}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )}
                {isCardSelected && renderHandles(cardRect, cardId)}
              </g>
            )}
          </g>
        )
      })}
    </g>
  )
}
