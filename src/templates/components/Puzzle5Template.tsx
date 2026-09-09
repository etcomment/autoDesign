import { useRef, type ReactElement } from 'react'
import type { PuzzleData, PuzzlePiece } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'
import { PUZZLE2_TAB_BEZIERS } from './Puzzle4Template'

const DEFAULT_PIECES: PuzzlePiece[] = [
  { number: 1, title: 'Improve', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#2c2b64', value: 'A' },
  { number: 2, title: 'Identify', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#3466ce', value: 'B' },
  { number: 3, title: 'Management', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ff4d30', value: 'C' },
  { number: 4, title: 'Innovation', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ffb703', value: 'D' },
  { number: 5, title: 'Audience', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#4cbfa0', value: 'E' },
]

function appendHexEdge(
  d: string[],
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  kind: 'straight' | 'tab' | 'indent',
  scaleU: number,
  scaleV: number,
  baseHalf: number,
): void {
  if (kind === 'straight') {
    d.push(`L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`)
    return
  }

  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len
  const uy = dy / len
  const nx = uy
  const ny = -ux

  const mx = (p1.x + p2.x) / 2
  const my = (p1.y + p2.y) / 2

  const sx = mx - baseHalf * ux
  const sy = my - baseHalf * uy
  d.push(`L ${sx.toFixed(2)} ${sy.toFixed(2)}`)

  const sign = kind === 'tab' ? 1 : -1

  for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
    const cp1x = mx + cp1u * scaleU * ux + sign * (cp1v * scaleV) * nx
    const cp1y = my + cp1u * scaleU * uy + sign * (cp1v * scaleV) * ny
    const cp2x = mx + cp2u * scaleU * ux + sign * (cp2v * scaleV) * nx
    const cp2y = my + cp2u * scaleU * uy + sign * (cp2v * scaleV) * ny
    const pex = mx + endu * scaleU * ux + sign * (endv * scaleV) * nx
    const pey = my + endu * scaleU * uy + sign * (endv * scaleV) * ny
    d.push(`C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
  }

  d.push(`L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`)
}

export function makePuzzleHexagonPath(
  cx: number,
  cy: number,
  s: number,
  index: number,
  _total?: number,
): string {
  const w = s / 2
  const h = (Math.sqrt(3) / 2) * s

  const scale = (s / 142.02) * 0.95
  const scaleU = scale * 1.20
  const scaleV = scale * 1.24
  const baseHalf = 11.75 * scaleU

  const p0 = { x: cx - w, y: cy - h }
  const p1 = { x: cx + w, y: cy - h }
  const p2 = { x: cx + s, y: cy }
  const p3 = { x: cx + w, y: cy + h }
  const p4 = { x: cx - w, y: cy + h }
  const p5 = { x: cx - s, y: cy }

  const isLower = index % 2 === 0

  let edge1Kind: 'straight' | 'tab' | 'indent' = 'straight'
  let edge2Kind: 'straight' | 'tab' | 'indent' = 'straight'
  let edge4Kind: 'straight' | 'tab' | 'indent' = 'straight'
  let edge5Kind: 'straight' | 'tab' | 'indent' = 'straight'

  if (isLower) {
    edge1Kind = 'tab'
    edge5Kind = 'indent'
  } else {
    edge2Kind = 'tab'
    edge4Kind = 'indent'
  }

  const d: string[] = []
  d.push(`M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)}`)
  appendHexEdge(d, p0, p1, 'straight', scaleU, scaleV, baseHalf)
  appendHexEdge(d, p1, p2, edge1Kind, scaleU, scaleV, baseHalf)
  appendHexEdge(d, p2, p3, edge2Kind, scaleU, scaleV, baseHalf)
  appendHexEdge(d, p3, p4, 'straight', scaleU, scaleV, baseHalf)
  appendHexEdge(d, p4, p5, edge4Kind, scaleU, scaleV, baseHalf)
  appendHexEdge(d, p5, p0, edge5Kind, scaleU, scaleV, baseHalf)
  d.push('Z')

  return d.join(' ')
}

export function Puzzle5Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const rawPieces = data.pieces?.length ? data.pieces : DEFAULT_PIECES
  const count = rawPieces.length
  const pieces = rawPieces

  const W = 1000
  const H = 520
  const cy = H / 2

  const maxTotalWidth = 840
  const s = Math.min(88, maxTotalWidth / (1.5 * (count - 1) + 2))
  const h = (Math.sqrt(3) / 2) * s
  const totalW = (1.5 * (count - 1) + 2) * s
  const startX = (W - totalW) / 2 + s

  const yUp = cy - h / 2
  const yDown = cy + h / 2

  const tabProtrusion = (s / 142.02) * 0.95 * 1.24 * 33.4

  return (
    <g ref={svgRef}>
      {pieces.map((piece, index) => {
        const isLower = index % 2 === 0
        const pieceCx = startX + index * 1.5 * s
        const pieceCy = isLower ? yDown : yUp

        const elementId = `piece-${index}`
        const cardElementId = `card-${index}`

        const defaultColor = piece.color || MIGSO_PALETTE[index % MIGSO_PALETTE.length] || '#2c2b64'
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || '#ffffff'
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3.5 : 2.5)
        const isSelected = selectedIds.has(elementId)
        const isCardSelected = selectedIds.has(cardElementId)

        const defaultPieceRect = {
          x: pieceCx - s - tabProtrusion,
          y: pieceCy - h - tabProtrusion,
          width: (s + tabProtrusion) * 2,
          height: (h + tabProtrusion) * 2,
        }

        const customPiecePos = templateElementPositions[elementId]
        const pieceBbox = {
          x: customPiecePos ? customPiecePos.x : defaultPieceRect.x,
          y: customPiecePos ? customPiecePos.y : defaultPieceRect.y,
          width: customPiecePos?.width || defaultPieceRect.width,
          height: customPiecePos?.height || defaultPieceRect.height,
        }

        const deltaX = pieceBbox.x - defaultPieceRect.x
        const deltaY = pieceBbox.y - defaultPieceRect.y
        const currentCx = pieceCx + deltaX
        const currentCy = pieceCy + deltaY

        const path = makePuzzleHexagonPath(currentCx, currentCy, s, index, count)

        const cardWidth = 170
        const defaultCardY = isLower ? 45 : 400
        const customCardPos = templateElementPositions[cardElementId]
        const subtitleLines = piece.subtitle
          ? piece.subtitle.split('\n').flatMap(l => wrapTextByWidth(l, Math.max(12, Math.floor(cardWidth / 8.5))))
          : []
        const nominalCardHeight = 28 + (subtitleLines.length > 0 ? 10 + subtitleLines.length * 16 : 0)
        const cardBbox = {
          x: customCardPos ? customCardPos.x : currentCx - cardWidth / 2,
          y: customCardPos ? customCardPos.y : defaultCardY,
          width: customCardPos?.width || cardWidth,
          height: customCardPos?.height || Math.max(70, nominalCardHeight),
        }

        const lineStartX = currentCx
        const lineStartY = isLower ? currentCy - h : currentCy + h
        const lineEndY = isLower ? cardBbox.y + cardBbox.height : cardBbox.y

        const letter = piece.value ?? (piece.title ? piece.title[0] : String.fromCharCode(65 + index))

        return (
          <g key={elementId}>
            <line
              x1={lineStartX}
              y1={lineStartY}
              x2={lineStartX}
              y2={lineEndY}
              stroke={color}
              strokeWidth={2.5}
              strokeDasharray="5 4"
            />

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
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />

              <text
                x={currentCx}
                y={currentCy}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontFamily="Arial, Segoe UI, sans-serif"
                fontSize={Math.round(s * 0.58)}
                fontWeight={700}
              >
                {letter}
              </text>
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
                x={cardBbox.x + cardBbox.width / 2}
                y={cardBbox.y + 16}
                textAnchor="middle"
                fontFamily="Arial, Segoe UI, sans-serif"
                fontSize={18}
                fontWeight={700}
                fill="#1e293b"
              >
                {piece.title}
              </text>
              {subtitleLines.map((line, lIdx) => (
                <text
                  key={lIdx}
                  x={cardBbox.x + cardBbox.width / 2}
                  y={cardBbox.y + 38 + lIdx * 16}
                  textAnchor="middle"
                  fontFamily="Arial, Segoe UI, sans-serif"
                  fontSize={13}
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
