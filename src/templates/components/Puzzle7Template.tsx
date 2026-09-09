import { useRef, type ReactElement } from 'react'
import type { PuzzleData, PuzzlePiece } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import { computePuzzle7Layout } from '../shared/puzzle7Geometry'

const DEFAULT_PIECES: PuzzlePiece[] = [
  { number: 1, title: 'Improve', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#2c2b64', value: '1', icon: 'inbox' },
  { number: 2, title: 'Innovation', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#3466ce', value: '2', icon: 'database' },
  { number: 3, title: 'Management', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ff4d30', value: '3', icon: 'network' },
  { number: 4, title: 'Identify', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ffb703', value: '4', icon: 'send' },
]

export function Puzzle7Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const rawPieces = data.pieces?.length ? data.pieces : DEFAULT_PIECES
  const count = Math.min(8, Math.max(2, rawPieces.length))
  const pieces = rawPieces.slice(0, count)

  const layouts = computePuzzle7Layout(count, 500, 260)

  return (
    <g ref={svgRef}>
      {pieces.map((piece, index) => {
        const pDef = layouts[index]!
        const elementId = `piece-${index}`
        const cardElementId = `card-${index}`

        const defaultColor = piece.color || MIGSO_PALETTE[index % MIGSO_PALETTE.length] || '#2c2b64'
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || '#ffffff'
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3.5 : 2)
        const isSelected = selectedIds.has(elementId)
        const isCardSelected = selectedIds.has(cardElementId)

        const customPiecePos = templateElementPositions[elementId]
        const pieceBbox = {
          x: customPiecePos ? customPiecePos.x : pDef.bbox.x,
          y: customPiecePos ? customPiecePos.y : pDef.bbox.y,
          width: customPiecePos?.width || pDef.bbox.width,
          height: customPiecePos?.height || pDef.bbox.height,
        }

        const customCardPos = templateElementPositions[cardElementId]
        const cardWidth = customCardPos?.width || pDef.defaultCard.width
        const subtitleLines = piece.subtitle
          ? piece.subtitle.split('\n').flatMap(l => wrapTextByWidth(l, Math.max(12, Math.floor(cardWidth / 7.5))))
          : []
        const nominalCardHeight = 28 + (subtitleLines.length > 0 ? 12 + subtitleLines.length * 16 : 0)
        const cardBbox = {
          x: customCardPos ? customCardPos.x : pDef.defaultCard.x,
          y: customCardPos ? customCardPos.y : pDef.defaultCard.y,
          width: cardWidth,
          height: customCardPos?.height || Math.max(70, nominalCardHeight),
        }

        const deltaX = pieceBbox.x - pDef.bbox.x
        const deltaY = pieceBbox.y - pDef.bbox.y

        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : null

        let lineX1 = 0
        let lineY1 = 0
        let lineX2 = 0
        let lineY2 = 0
        let dotX = 0
        let dotY = 0

        if (pDef.cardDirection === 'left') {
          const cardConnX = cardBbox.x + cardBbox.width
          lineY1 = pDef.lineStart.y + deltaY
          lineY2 = lineY1
          lineX1 = pDef.lineStart.x + deltaX
          dotX = Math.min(lineX1 - 8, Math.max(cardConnX + 16, pDef.defaultDot.x + deltaX))
          dotY = lineY1
          lineX2 = dotX
        } else if (pDef.cardDirection === 'right') {
          const cardConnX = cardBbox.x
          lineY1 = pDef.lineStart.y + deltaY
          lineY2 = lineY1
          lineX1 = pDef.lineStart.x + deltaX
          dotX = Math.max(lineX1 + 8, Math.min(cardConnX - 16, pDef.defaultDot.x + deltaX))
          dotY = lineY1
          lineX2 = dotX
        } else if (pDef.cardDirection === 'top') {
          const cardConnY = cardBbox.y + cardBbox.height
          lineX1 = pDef.lineStart.x + deltaX
          lineX2 = lineX1
          lineY1 = pDef.lineStart.y + deltaY
          dotX = lineX1
          dotY = Math.min(lineY1 - 8, Math.max(cardConnY + 16, pDef.defaultDot.y + deltaY))
          lineY2 = dotY
        } else {
          const cardConnY = cardBbox.y
          lineX1 = pDef.lineStart.x + deltaX
          lineX2 = lineX1
          lineY1 = pDef.lineStart.y + deltaY
          dotX = lineX1
          dotY = Math.max(lineY1 + 8, Math.min(cardConnY - 16, pDef.defaultDot.y + deltaY))
          lineY2 = dotY
        }

        const hasValue = Boolean(piece.value)
        const hasIcon = Boolean(IconComponent)

        const centerPt = pDef.center || {
          x: (pDef.iconCenter.x + pDef.numCenter.x) / 2,
          y: (pDef.iconCenter.y + pDef.numCenter.y) / 2,
        }
        const cxPiece = centerPt.x + deltaX
        const cyPiece = centerPt.y + deltaY

        let badgeX = cxPiece
        let badgeY = cyPiece
        let iconX = cxPiece
        let iconY = cyPiece

        if (hasValue && hasIcon) {
          badgeY = cyPiece - 15
          iconY = cyPiece + 15
        }

        const isMiddleAnchor = pDef.cardDirection === 'top' || pDef.cardDirection === 'bottom'
        const textAnchor = isMiddleAnchor ? 'middle' : (pDef.cardDirection === 'left' ? 'end' : 'start')
        const titleX = isMiddleAnchor
          ? cardBbox.x + cardBbox.width / 2
          : (pDef.cardDirection === 'left' ? cardBbox.x + cardBbox.width : cardBbox.x)

        return (
          <g key={elementId}>
            <line
              x1={lineX1}
              y1={lineY1}
              x2={lineX2}
              y2={lineY2}
              stroke={color}
              strokeWidth={3.5}
            />
            <circle
              cx={dotX}
              cy={dotY}
              r={7}
              fill={color}
            />

            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, pieceBbox)}
              transform={getTransform(elementId, pieceBbox)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={pDef.path}
                transform={deltaX !== 0 || deltaY !== 0 ? `translate(${deltaX}, ${deltaY})` : undefined}
                fill={color}
                stroke={isSelected ? '#4a90d9' : stroke}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />

              {hasValue && (
                <g>
                  <circle
                    cx={badgeX}
                    cy={badgeY}
                    r={hasIcon ? 13 : 16}
                    fill="white"
                  />
                  <text
                    x={badgeX}
                    y={badgeY}
                    dominantBaseline="central"
                    textAnchor="middle"
                    fontFamily="Arial, Segoe UI, sans-serif"
                    fontSize={hasIcon ? 13 : 16}
                    fontWeight={800}
                    fill={color}
                  >
                    {piece.value}
                  </text>
                </g>
              )}

              {hasIcon && IconComponent && (
                <g transform={`translate(${iconX - (hasValue ? 11 : 14)}, ${iconY - (hasValue ? 11 : 14)})`}>
                  <IconComponent size={hasValue ? 22 : 28} color="white" />
                </g>
              )}
            </g>

            <g
              data-element-id={cardElementId}
              onMouseDown={e => startDrag(e, cardElementId, cardBbox)}
              transform={getTransform(cardElementId, cardBbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={cardBbox.x}
                y={cardBbox.y}
                width={cardBbox.width}
                height={cardBbox.height}
                fill="transparent"
                stroke={isCardSelected ? '#4a90d9' : 'none'}
                strokeWidth={isCardSelected ? 1.5 : 0}
                rx={4}
              />
              <text
                x={titleX}
                y={cardBbox.y + 16}
                textAnchor={textAnchor}
                fontFamily="Arial, Segoe UI, sans-serif"
                fontSize={16}
                fontWeight={700}
                fill="#1e293b"
              >
                {piece.title}
              </text>
              {subtitleLines.map((line, lIdx) => (
                <text
                  key={lIdx}
                  x={titleX}
                  y={cardBbox.y + 38 + lIdx * 15}
                  textAnchor={textAnchor}
                  fontFamily="Arial, Segoe UI, sans-serif"
                  fontSize={12}
                  fill="#334155"
                >
                  {line}
                </text>
              ))}
            </g>

            {isSelected && renderHandles(pieceBbox, elementId)}
            {isCardSelected && renderHandles(cardBbox, cardElementId)}
          </g>
        )
      })}
    </g>
  )
}
