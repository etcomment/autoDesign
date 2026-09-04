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
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const pieces = data?.pieces || []

  const getElementPos = (
    elementId: string,
    defaultRect: { x: number; y: number; width: number; height: number },
    deltaY: number = 0
  ) => {
    const customPos = templateElementPositions[elementId]
    if (!customPos) return defaultRect
    return {
      x: customPos.x,
      y: customPos.y - deltaY,
      width: customPos.width || defaultRect.width,
      height: Math.max(customPos.height || 0, defaultRect.height),
    }
  }

  const selectedOverlays: Array<{ id: string; rect: { x: number; y: number; width: number; height: number }; isPiece?: boolean }> = []

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

        const pieceStroke = isPieceSelected ? '#4a90d9' : (tplStrokeColors[pieceId] || 'none')
        const pieceStrokeWidth = isPieceSelected ? 3 : (tplStrokeWidths[pieceId] ?? 0)

        const dx = pieceRect.x - layout.box.x
        const dy = pieceRect.y - layout.box.y
        const scaleX = layout.box.width > 0 ? pieceRect.width / layout.box.width : 1
        const scaleY = layout.box.height > 0 ? pieceRect.height / layout.box.height : 1

        let pieceTransform: string | undefined
        if (scaleX !== 1 || scaleY !== 1) {
          pieceTransform = `translate(${pieceRect.x}, ${pieceRect.y}) scale(${scaleX}, ${scaleY}) translate(${-layout.box.x}, ${-layout.box.y})`
        } else if (dx !== 0 || dy !== 0) {
          pieceTransform = `translate(${dx}, ${dy})`
        }

        const iconComponent = piece.icon ? resolveTemplateIcon(piece.icon) : undefined

        const cardId = `card-${index}`
        const titleMaxChars = Math.max(10, Math.floor(layout.cardRect.width / 10))
        const titleLines = piece.title ? wrapTextByWidth(piece.title, titleMaxChars) : []
        const subtitleLines = piece.subtitle ? wrapTextByWidth(piece.subtitle, SUBTITLE_MAX_CHARS) : []

        const titleLineHeight = 18
        const totalTitleHeight = Math.max(1, titleLines.length) * titleLineHeight
        const totalSubtitleHeight = subtitleLines.length * CARD_BODY_LINE_HEIGHT
        const requiredCardHeight = 24 + totalTitleHeight + totalSubtitleHeight + 10
        const dynamicCardHeight = Math.max(layout.cardRect.height, requiredCardHeight)
        const deltaHeight = Math.max(0, dynamicCardHeight - layout.cardRect.height)
        const upwardShift = layout.isTop ? deltaHeight : 0

        const baseCardY = layout.cardRect.y - upwardShift
        const baseCardRect = { ...layout.cardRect, y: baseCardY, height: dynamicCardHeight }
        const cardRect = getElementPos(cardId, baseCardRect, upwardShift)
        const isCardSelected = selectedIds.has(cardId)
        const cardColor = tplColors[cardId] ?? color

        const isCardMoved = Boolean(templateElementPositions[cardId])
        const titleX = isCardMoved
          ? (layout.textAnchor === 'middle' ? cardRect.x + cardRect.width / 2 : cardRect.x + 4)
          : layout.titleX
        const titleY = cardRect.y + 18
        const bodyY = cardRect.y + 20 + totalTitleHeight

        const dotId = `dot-${index}`
        const dotRect = getElementPos(dotId, layout.dotRect)
        const isDotSelected = selectedIds.has(dotId)
        const dotColor = tplColors[dotId] ?? cardColor
        const isDotMoved = Boolean(templateElementPositions[dotId])
        const dotCx = isDotMoved ? dotRect.x + dotRect.width / 2 : layout.dot.x
        const dotCy = isDotMoved ? dotRect.y + dotRect.height / 2 : layout.dot.y

        if (isDotSelected) selectedOverlays.push({ id: dotId, rect: dotRect })
        if (isPieceSelected) selectedOverlays.push({ id: pieceId, rect: pieceRect, isPiece: true })
        if (isCardSelected) selectedOverlays.push({ id: cardId, rect: cardRect })

        return (
          <g key={`item-p2-${index}`}>
            <g
              data-element-id={dotId}
              onMouseDown={e => startDrag(e, dotId, dotRect)}
              transform={getTransform(dotId, dotRect)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={dotCx} cy={dotCy} r={DOT_RADIUS} fill={dotColor} />
            </g>

            <g
              data-element-id={pieceId}
              onMouseDown={e => startDrag(e, pieceId, pieceRect)}
              transform={getTransform(pieceId, pieceRect)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={layout.path}
                transform={pieceTransform}
                fill={color}
                fillRule="evenodd"
                stroke={pieceStroke}
                strokeWidth={pieceStrokeWidth}
                strokeLinejoin="round"
              />
              {iconComponent ? (
                <g data-icon="true" pointerEvents="none" transform={`translate(${centerCx - 24}, ${centerCy - 24})`}>
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
                  pointerEvents="none"
                >
                  {piece.number ?? index + 1}
                </text>
              )}
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
                {titleLines.map((line, lineIdx) => (
                  <tspan
                    key={lineIdx}
                    x={titleX}
                    dy={lineIdx === 0 ? 0 : titleLineHeight}
                  >
                    {line}
                  </tspan>
                ))}
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
            </g>
          </g>
        )
      })}
      {selectedOverlays.map(item => (
        <g key={`overlay-${item.id}`}>
          {item.isPiece && (
            <rect
              data-selection-box="true"
              x={item.rect.x}
              y={item.rect.y}
              width={item.rect.width}
              height={item.rect.height}
              fill="none"
              stroke="#4a90d9"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              pointerEvents="none"
            />
          )}
          {renderHandles(item.rect, item.id)}
        </g>
      ))}
    </g>
  )
}
