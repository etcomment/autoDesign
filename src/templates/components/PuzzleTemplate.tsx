import { useRef, type ReactElement } from 'react'
import type { PuzzleData, PuzzlePiece } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { makePuzzlePiecePath } from './Puzzle4Template'

const PIECE_SIZE = 145
const PUZZLE_X = 355
const PUZZLE_Y = 135

const DEFAULT_PIECES: PuzzlePiece[] = [
  { number: 1, title: 'Identify', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#2c2b64' },
  { number: 2, title: 'Innovation', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#3466ce' },
  { number: 3, title: 'Management', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ff4d30' },
  { number: 4, title: 'Improve', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ffb703' },
]

export function PuzzleTemplate({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const piecesList = data.pieces?.length ? data.pieces : DEFAULT_PIECES
  const p1Data = piecesList[0] || DEFAULT_PIECES[0]!
  const p2Data = piecesList[1] || DEFAULT_PIECES[1]!
  const p3Data = piecesList[2] || DEFAULT_PIECES[2]!
  const p4Data = piecesList[3] || DEFAULT_PIECES[3]!

  const pieceConfigs = [
    {
      index: 0,
      data: p1Data,
      x: PUZZLE_X,
      y: PUZZLE_Y,
      top: 'none' as const,
      right: 'in' as const,
      bottom: 'in' as const,
      left: 'out' as const,
      cardX: 50,
      cardY: PUZZLE_Y + 12,
      lineStart: { x1: 240, y1: PUZZLE_Y + 30 },
      lineEnd: { x2: PUZZLE_X - 30, y2: PUZZLE_Y + 30 },
    },
    {
      index: 1,
      data: p2Data,
      x: PUZZLE_X + PIECE_SIZE,
      y: PUZZLE_Y,
      top: 'out' as const,
      right: 'none' as const,
      bottom: 'in' as const,
      left: 'out' as const,
      cardX: 790,
      cardY: PUZZLE_Y + 12,
      lineStart: { x1: PUZZLE_X + 2 * PIECE_SIZE, y1: PUZZLE_Y + 30 },
      lineEnd: { x2: 760, y2: PUZZLE_Y + 30 },
    },
    {
      index: 2,
      data: p3Data,
      x: PUZZLE_X + PIECE_SIZE,
      y: PUZZLE_Y + PIECE_SIZE,
      top: 'out' as const,
      right: 'out' as const,
      bottom: 'none' as const,
      left: 'in' as const,
      cardX: 790,
      cardY: PUZZLE_Y + PIECE_SIZE + 17,
      lineStart: { x1: PUZZLE_X + 2 * PIECE_SIZE + 30, y1: PUZZLE_Y + PIECE_SIZE + 35 },
      lineEnd: { x2: 760, y2: PUZZLE_Y + PIECE_SIZE + 35 },
    },
    {
      index: 3,
      data: p4Data,
      x: PUZZLE_X,
      y: PUZZLE_Y + PIECE_SIZE,
      top: 'out' as const,
      right: 'out' as const,
      bottom: 'out' as const,
      left: 'none' as const,
      cardX: 50,
      cardY: PUZZLE_Y + PIECE_SIZE + 17,
      lineStart: { x1: 240, y1: PUZZLE_Y + PIECE_SIZE + 35 },
      lineEnd: { x2: PUZZLE_X, y2: PUZZLE_Y + PIECE_SIZE + 35 },
    },
  ]

  return (
    <g ref={svgRef}>
      {pieceConfigs.map(cfg => {
        const piece = cfg.data
        const elementId = `piece-${cfg.index}`
        const defaultColor = piece.color || DEFAULT_PIECES[cfg.index]?.color || '#2c2b64'
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'transparent'
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3 : 0)
        const isSelected = selectedIds.has(elementId)

        const defaultBbox = { x: cfg.x, y: cfg.y, width: PIECE_SIZE, height: PIECE_SIZE }
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultBbox.x,
          y: customPos ? customPos.y : defaultBbox.y,
          width: customPos?.width || defaultBbox.width,
          height: customPos?.height || defaultBbox.height,
        }

        const path = makePuzzlePiecePath(bbox.x, bbox.y, bbox.width, cfg.top, cfg.right, cfg.bottom, cfg.left)
        const centerCx = bbox.x + bbox.width / 2
        const centerCy = bbox.y + bbox.height / 2
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined

        const cardElementId = `card-${cfg.index}`
        const isCardSelected = selectedIds.has(cardElementId)
        const customCardPos = templateElementPositions[cardElementId]
        const cardBbox = {
          x: customCardPos ? customCardPos.x : cfg.cardX,
          y: customCardPos ? customCardPos.y : cfg.cardY,
          width: customCardPos?.width || 160,
          height: customCardPos?.height || 140,
        }

        const cardBadgeColor = tplColors[cardElementId] ?? color
        const subtitleLines = piece.subtitle ? piece.subtitle.split('\n').flatMap(l => wrapTextByWidth(l, 22)) : []

        return (
          <g key={elementId}>
            {/* Connector dashed line */}
            <line
              x1={cfg.lineStart.x1}
              y1={cfg.lineStart.y1}
              x2={cfg.lineEnd.x2}
              y2={cfg.lineEnd.y2}
              stroke={color}
              strokeWidth={4}
              strokeDasharray="6 4"
            />

            {/* Puzzle Piece */}
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={path}
                fill={color}
                stroke={isSelected ? '#4a90d9' : stroke}
                strokeWidth={isSelected ? 3 : strokeWidth}
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
                  fontSize={48}
                  fontWeight={700}
                  fill="white"
                >
                  {piece.number !== undefined ? piece.number : cfg.index + 1}
                </text>
              )}
            </g>

            {/* Side Text Card */}
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

            {isSelected && renderHandles(bbox, elementId)}
            {isCardSelected && renderHandles(cardBbox, cardElementId)}
          </g>
        )
      })}
    </g>
  )
}
