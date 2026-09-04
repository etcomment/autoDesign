import { useRef, createElement, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { resolveTemplateIcon } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import {
  DOT_RADIUS,
  CARD_BODY_LINE_HEIGHT,
  computePuzzle2PieceLayout,
} from '../shared/puzzle2Geometry'

const TITLE_FONT_SIZE = 16.7
const BODY_FONT_SIZE = 14.6
const SUBTITLE_MAX_CHARS = 21

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
        const layout = computePuzzle2PieceLayout(index, pieces.length)
        const pieceId = `piece-${index}`
        const color = tplColors[pieceId] ?? piece.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isPieceSelected = selectedIds.has(pieceId)
        const pieceRect = getElementPos(pieceId, layout.box)
        const centerCx = pieceRect.x + pieceRect.width / 2
        const centerCy = pieceRect.y + pieceRect.height / 2

        const iconComponent = piece.icon ? resolveTemplateIcon(piece.icon) : undefined

        const cardId = `card-${index}`
        const cardRect = getElementPos(cardId, layout.cardRect)
        const isCardSelected = selectedIds.has(cardId)
        const cardColor = tplColors[cardId] ?? color
        const subtitleLines = piece.subtitle ? wrapTextByWidth(piece.subtitle, SUBTITLE_MAX_CHARS) : []

        const isCardMoved = Boolean(templateElementPositions[cardId])
        const titleX = isCardMoved
          ? (layout.textAnchor === 'middle' ? cardRect.x + cardRect.width / 2 : cardRect.x + 4)
          : layout.titleX
        const titleY = isCardMoved ? cardRect.y + 18 : layout.titleY
        const bodyY = isCardMoved
          ? (layout.textAnchor === 'middle' ? cardRect.y + 36 : cardRect.y + 42)
          : layout.bodyY

        const dotId = `dot-${index}`
        const dotRect = getElementPos(dotId, layout.dotRect)
        const isDotSelected = selectedIds.has(dotId)
        const dotColor = tplColors[dotId] ?? cardColor
        const isDotMoved = Boolean(templateElementPositions[dotId])
        const dotCx = isDotMoved ? dotRect.x + dotRect.width / 2 : layout.dot.x
        const dotCy = isDotMoved ? dotRect.y + dotRect.height / 2 : layout.dot.y

        return (
          <g key={`item-p2-${index}`}>
            <g
              data-element-id={dotId}
              onMouseDown={e => startDrag(e, dotId, dotRect)}
              transform={getTransform(dotId, dotRect)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={dotCx} cy={dotCy} r={DOT_RADIUS} fill={dotColor} />
              {isDotSelected && renderHandles(dotRect, dotId)}
            </g>

            <g
              data-element-id={pieceId}
              onMouseDown={e => startDrag(e, pieceId, pieceRect)}
              transform={getTransform(pieceId, pieceRect)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={layout.path}
                fill={color}
                fillRule="evenodd"
                stroke={isPieceSelected ? '#4a90d9' : 'none'}
                strokeWidth={isPieceSelected ? 2 : 0}
                strokeLinejoin="round"
              />
              {iconComponent ? (
                <g data-icon="true" transform={`translate(${centerCx - 24}, ${centerCy - 24})`}>
                  {createElement(iconComponent, { size: 48, color: 'white' })}
                </g>
              ) : (
                <text
                  x={centerCx}
                  y={centerCy + 7}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={20}
                  fontWeight="bold"
                  fill="white"
                >
                  {piece.number ?? index + 1}
                </text>
              )}
              {isPieceSelected && renderHandles(pieceRect, pieceId)}
            </g>

            <g
              data-element-id={cardId}
              onMouseDown={e => startDrag(e, cardId, cardRect)}
              transform={getTransform(cardId, cardRect)}
              style={{ cursor: 'pointer' }}
            >
              <text
                x={titleX}
                y={titleY}
                textAnchor={layout.textAnchor}
                fontFamily="Arial, sans-serif"
                fontSize={TITLE_FONT_SIZE}
                fontWeight="bold"
                fill={cardColor}
              >
                {piece.title}
              </text>
              {subtitleLines.length > 0 && (
                <text
                  x={titleX}
                  y={bodyY}
                  textAnchor={layout.textAnchor}
                  fontFamily="Arial, sans-serif"
                  fontSize={BODY_FONT_SIZE}
                  fill="black"
                >
                  {subtitleLines.map((line, lineIdx) => (
                    <tspan
                      key={lineIdx}
                      x={titleX}
                      dy={lineIdx === 0 ? 0 : CARD_BODY_LINE_HEIGHT}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
              {isCardSelected && renderHandles(cardRect, cardId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
