import { useRef, type ReactElement } from 'react'
import type { PuzzleData, PuzzlePiece } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import { makePuzzlePiecePath } from './Puzzle4Template'

const DEFAULT_PIECES: PuzzlePiece[] = [
  { number: 1, title: 'Identify', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#2c2b64' },
  { number: 2, title: 'Innovation', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#3466ce' },
  { number: 3, title: 'Management', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ff4d30' },
  { number: 4, title: 'Improve', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ffb703' },
]

interface PieceLayout {
  index: number
  data: PuzzlePiece
  defaultPieceX: number
  defaultPieceY: number
  pieceSize: number
  top: 'none' | 'out' | 'in'
  right: 'none' | 'out' | 'in'
  bottom: 'none' | 'out' | 'in'
  left: 'none' | 'out' | 'in'
  defaultCardX: number
  defaultCardY: number
}

function computePieceLayouts(pieces: PuzzlePiece[]): PieceLayout[] {
  const count = pieces.length
  if (count === 4) {
    const S = 145
    const PUZZLE_X = 355
    const PUZZLE_Y = 135
    return [
      {
        index: 0,
        data: pieces[0]!,
        defaultPieceX: PUZZLE_X,
        defaultPieceY: PUZZLE_Y,
        pieceSize: S,
        top: 'none',
        right: 'out',
        bottom: 'in',
        left: 'out',
        defaultCardX: 50,
        defaultCardY: PUZZLE_Y + 12,
      },
      {
        index: 1,
        data: pieces[1]!,
        defaultPieceX: PUZZLE_X + S,
        defaultPieceY: PUZZLE_Y,
        pieceSize: S,
        top: 'out',
        right: 'none',
        bottom: 'out',
        left: 'in',
        defaultCardX: 790,
        defaultCardY: PUZZLE_Y + 12,
      },
      {
        index: 2,
        data: pieces[2]!,
        defaultPieceX: PUZZLE_X + S,
        defaultPieceY: PUZZLE_Y + S,
        pieceSize: S,
        top: 'in',
        right: 'out',
        bottom: 'none',
        left: 'out',
        defaultCardX: 790,
        defaultCardY: PUZZLE_Y + S + 17,
      },
      {
        index: 3,
        data: pieces[3]!,
        defaultPieceX: PUZZLE_X,
        defaultPieceY: PUZZLE_Y + S,
        pieceSize: S,
        top: 'out',
        right: 'in',
        bottom: 'out',
        left: 'none',
        defaultCardX: 50,
        defaultCardY: PUZZLE_Y + S + 17,
      },
    ]
  }

  // Dynamic layout for any N != 4
  const cols = count <= 3 ? count : count <= 6 ? 3 : 4
  const rows = Math.ceil(count / cols)
  const pieceSize = Math.min(140, Math.floor(360 / Math.max(cols, rows)))
  const totalW = cols * pieceSize
  const totalH = rows * pieceSize
  const startX = 500 - totalW / 2
  const startY = 270 - totalH / 2

  return pieces.map((data, idx) => {
    const col = idx % cols
    const row = Math.floor(idx / cols)
    const px = startX + col * pieceSize
    const py = startY + row * pieceSize

    const top: 'none' | 'out' | 'in' = row === 0 ? 'none' : 'in'
    const right: 'none' | 'out' | 'in' = col === cols - 1 || idx === count - 1 ? 'none' : 'out'
    const bottom: 'none' | 'out' | 'in' = row === rows - 1 || idx + cols >= count ? 'none' : 'out'
    const left: 'none' | 'out' | 'in' = col === 0 ? 'none' : 'in'

    const isLeft = col < cols / 2
    const defaultCardX = isLeft ? 50 : 790
    const rowInSide = isLeft ? row : row
    const defaultCardY = Math.max(60, startY + rowInSide * (pieceSize + 20) + 10)

    return {
      index: idx,
      data,
      defaultPieceX: px,
      defaultPieceY: py,
      pieceSize,
      top,
      right,
      bottom,
      left,
      defaultCardX,
      defaultCardY,
    }
  })
}

export function PuzzleTemplate({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const piecesList = data.pieces?.length ? data.pieces : DEFAULT_PIECES
  const layouts = computePieceLayouts(piecesList)

  return (
    <g ref={svgRef}>
      {layouts.map(layout => {
        const piece = layout.data
        const elementId = `piece-${layout.index}`
        const cardElementId = `card-${layout.index}`

        const defaultColor = piece.color || MIGSO_PALETTE[layout.index % MIGSO_PALETTE.length] || '#2c2b64'
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || '#ffffff'
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3 : 2.5)
        const isSelected = selectedIds.has(elementId)
        const isCardSelected = selectedIds.has(cardElementId)

        // Dynamic Position from Store or Layout
        const customPiecePos = templateElementPositions[elementId]
        const pieceBbox = {
          x: customPiecePos ? customPiecePos.x : layout.defaultPieceX,
          y: customPiecePos ? customPiecePos.y : layout.defaultPieceY,
          width: customPiecePos?.width || layout.pieceSize,
          height: customPiecePos?.height || layout.pieceSize,
        }

        // Subtitle wrapping & Dynamic Card Height (Rule 4 & 5)
        const customCardPos = templateElementPositions[cardElementId]
        const cardWidth = customCardPos?.width || 160
        const subtitleLines = piece.subtitle
          ? piece.subtitle.split('\n').flatMap(l => wrapTextByWidth(l, Math.max(12, Math.floor(cardWidth / 7.5))))
          : []
        const nominalCardHeight = 36 + (subtitleLines.length > 0 ? 16 + subtitleLines.length * 18 : 0)
        const cardBbox = {
          x: customCardPos ? customCardPos.x : layout.defaultCardX,
          y: customCardPos ? customCardPos.y : layout.defaultCardY,
          width: cardWidth,
          height: customCardPos?.height || Math.max(80, nominalCardHeight),
        }

        const cardBadgeColor = tplColors[cardElementId] ?? color
        const path = makePuzzlePiecePath(
          pieceBbox.x,
          pieceBbox.y,
          pieceBbox.width,
          layout.top,
          layout.right,
          layout.bottom,
          layout.left,
        )

        const centerCx = pieceBbox.x + pieceBbox.width / 2
        const centerCy = pieceBbox.y + pieceBbox.height / 2
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined

        // Elastic Dynamic Connectors (Rule 2 & 7)
        const isLeftCard = cardBbox.x < pieceBbox.x
        const lineX1 = isLeftCard ? cardBbox.x + cardBbox.width : pieceBbox.x + pieceBbox.width
        const lineY1 = isLeftCard ? cardBbox.y + 18 : pieceBbox.y + pieceBbox.height / 2
        const lineX2 = isLeftCard ? pieceBbox.x : cardBbox.x
        const lineY2 = isLeftCard ? pieceBbox.y + pieceBbox.height / 2 : cardBbox.y + 18

        return (
          <g key={elementId}>
            {/* Dynamic elastic dashed connector */}
            <line
              x1={lineX1}
              y1={lineY1}
              x2={lineX2}
              y2={lineY2}
              stroke={color}
              strokeWidth={4}
              strokeDasharray="6 4"
            />

            {/* Puzzle Piece */}
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, pieceBbox)}
              transform={getTransform(elementId, pieceBbox)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={path}
                fill={color}
                stroke={isSelected ? '#4a90d9' : stroke}
                strokeWidth={isSelected ? 3 : strokeWidth}
                strokeLinejoin="round"
              />
              {IconComponent ? (
                <g transform={`translate(${centerCx - 18}, ${centerCy - 18})`}>
                  <IconComponent size={36} color="white" />
                </g>
              ) : (
                <text
                  x={centerCx}
                  y={centerCy + 16}
                  textAnchor="middle"
                  fontFamily="Arial, Segoe UI, sans-serif"
                  fontSize={Math.max(20, Math.floor(pieceBbox.width * 0.33))}
                  fontWeight={700}
                  fill="white"
                >
                  {piece.number !== undefined ? piece.number : layout.index + 1}
                </text>
              )}
            </g>

            {/* Side Text Card with Auto-resize */}
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
                height={36}
                rx={3}
                fill={cardBadgeColor}
                stroke={isCardSelected ? '#4a90d9' : 'none'}
                strokeWidth={isCardSelected ? 2 : 0}
              />
              <text
                x={cardBbox.x + 12}
                y={cardBbox.y + 24}
                fontFamily="Arial, Segoe UI, sans-serif"
                fontSize={16}
                fontWeight={700}
                fill="white"
              >
                {piece.title}
              </text>
              {subtitleLines.map((line, lIdx) => (
                <text
                  key={lIdx}
                  x={cardBbox.x + 6}
                  y={cardBbox.y + 56 + lIdx * 18}
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
