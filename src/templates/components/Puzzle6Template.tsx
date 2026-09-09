import { useRef, type ReactElement } from 'react'
import type { PuzzleData, PuzzlePiece } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'
import { PUZZLE2_TAB_BEZIERS } from './Puzzle4Template'

const DEFAULT_PIECES: PuzzlePiece[] = [
  { number: 1, title: 'Identify', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#2c2b64', value: 'A' },
  { number: 2, title: 'Management', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#3466ce', value: 'B' },
  { number: 3, title: 'Innovation', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ff4d30', value: 'C' },
  { number: 4, title: 'Improve', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ffb703', value: 'D' },
]

export function makeCornerSegmentPath(
  corner: number,
  x: number,
  y: number,
  size: number,
  scaleU: number,
  scaleV: number,
  baseHalf: number,
  gapOffset: number,
): string {
  const midX = x + size / 2
  const midY = y + size / 2
  const x1 = x + size
  const y1 = y + size

  const half1 = PUZZLE2_TAB_BEZIERS.slice(0, 4)
  const half2 = PUZZLE2_TAB_BEZIERS.slice(4)

  const d: string[] = []

  if (corner === 0) {
    const startX = x + 33.40 * scaleV
    const startY = midY - gapOffset
    d.push(`M ${startX.toFixed(2)} ${startY.toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of half2) {
      const p1x = x + cp1v * scaleV
      const p1y = midY - cp1u * scaleU
      const p2x = x + cp2v * scaleV
      const p2y = midY - cp2u * scaleU
      const pex = x + endv * scaleV
      const pey = midY - endu * scaleU
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`)
    d.push(`L ${(midX - baseHalf).toFixed(2)} ${y.toFixed(2)}`)

    for (let i = 0; i < half1.length; i++) {
      const [cp1u, cp1v, cp2u, cp2v, endu, endv] = half1[i]!
      const p1x = midX + cp1u * scaleU
      const p1y = y - cp1v * scaleV
      const p2x = midX + cp2u * scaleU
      const p2y = y - cp2v * scaleV
      const pex = i === half1.length - 1 ? midX - gapOffset : midX + endu * scaleU
      const pey = y - endv * scaleV
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }
  } else if (corner === 1) {
    const startX = midX + gapOffset
    const startY = y - 33.40 * scaleV
    d.push(`M ${startX.toFixed(2)} ${startY.toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of half2) {
      const p1x = midX + cp1u * scaleU
      const p1y = y - cp1v * scaleV
      const p2x = midX + cp2u * scaleU
      const p2y = y - cp2v * scaleV
      const pex = midX + endu * scaleU
      const pey = y - endv * scaleV
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${x1.toFixed(2)} ${y.toFixed(2)}`)
    d.push(`L ${x1.toFixed(2)} ${(midY - baseHalf).toFixed(2)}`)

    for (let i = 0; i < half1.length; i++) {
      const [cp1u, cp1v, cp2u, cp2v, endu, endv] = half1[i]!
      const p1x = x1 - cp1v * scaleV
      const p1y = midY + cp1u * scaleU
      const p2x = x1 - cp2v * scaleV
      const p2y = midY + cp2u * scaleU
      const pex = i === half1.length - 1 ? x1 - 33.40 * scaleV : x1 - endv * scaleV
      const pey = i === half1.length - 1 ? midY - gapOffset : midY + endu * scaleU
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }
  } else if (corner === 2) {
    const startX = x1 - 33.40 * scaleV
    const startY = midY + gapOffset
    d.push(`M ${startX.toFixed(2)} ${startY.toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of half2) {
      const p1x = x1 - cp1v * scaleV
      const p1y = midY + cp1u * scaleU
      const p2x = x1 - cp2v * scaleV
      const p2y = midY + cp2u * scaleU
      const pex = x1 - endv * scaleV
      const pey = midY + endu * scaleU
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${x1.toFixed(2)} ${y1.toFixed(2)}`)
    d.push(`L ${(midX + baseHalf).toFixed(2)} ${y1.toFixed(2)}`)

    for (let i = 0; i < half1.length; i++) {
      const [cp1u, cp1v, cp2u, cp2v, endu, endv] = half1[i]!
      const p1x = midX - cp1u * scaleU
      const p1y = y1 + cp1v * scaleV
      const p2x = midX - cp2u * scaleU
      const p2y = y1 + cp2v * scaleV
      const pex = i === half1.length - 1 ? midX + gapOffset : midX - endu * scaleU
      const pey = y1 + endv * scaleV
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }
  } else {
    const startX = midX - gapOffset
    const startY = y1 + 33.40 * scaleV
    d.push(`M ${startX.toFixed(2)} ${startY.toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of half2) {
      const p1x = midX - cp1u * scaleU
      const p1y = y1 + cp1v * scaleV
      const p2x = midX - cp2u * scaleU
      const p2y = y1 + cp2v * scaleV
      const pex = midX - endu * scaleU
      const pey = y1 + endv * scaleV
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${x.toFixed(2)} ${y1.toFixed(2)}`)
    d.push(`L ${x.toFixed(2)} ${(midY + baseHalf).toFixed(2)}`)

    for (let i = 0; i < half1.length; i++) {
      const [cp1u, cp1v, cp2u, cp2v, endu, endv] = half1[i]!
      const p1x = x + cp1v * scaleV
      const p1y = midY - cp1u * scaleU
      const p2x = x + cp2v * scaleV
      const p2y = midY - cp2u * scaleU
      const pex = i === half1.length - 1 ? x + 33.40 * scaleV : x + endv * scaleV
      const pey = i === half1.length - 1 ? midY + gapOffset : midY - endu * scaleU
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }
  }

  return d.join(' ')
}

export function Puzzle6Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const rawPieces = data.pieces?.length ? data.pieces : DEFAULT_PIECES
  const pieces = rawPieces

  const W = 1000
  const H = 520
  const cx = W / 2
  const cy = H / 2

  const size = 230
  const x = cx - size / 2
  const y = cy - size / 2

  const scale = (size / 142.02) * 0.92
  const scaleU = scale * 1.20
  const scaleV = scale * 1.24
  const baseHalf = 11.75 * scaleU
  const gapOffset = 13

  const centerTextLines: string[] = data.title
    ? data.title.split('\n')
    : ['MIGSO-PCUBED', 'content and words', 'to be added here', 'as required']

  const cornerDefs = [
    {
      index: 0,
      letterX: 52,
      letterY: y,
      cardX: 95,
      cardY: y - 35,
      lineX1: 280,
      lineY1: y,
      lineX2: cx - baseHalf,
      lineY2: y,
      isLeft: true,
      bbox: { x, y: y - 33.4 * scaleV, width: size / 2 + 33.4 * scaleV, height: size / 2 + 33.4 * scaleV },
    },
    {
      index: 1,
      letterX: 948,
      letterY: y,
      cardX: 725,
      cardY: y - 35,
      lineX1: cx + baseHalf,
      lineY1: y,
      lineX2: 720,
      lineY2: y,
      isLeft: false,
      bbox: { x: cx, y: y - 33.4 * scaleV, width: size / 2 + 33.4 * scaleV, height: size / 2 + 33.4 * scaleV },
    },
    {
      index: 2,
      letterX: 948,
      letterY: y + size,
      cardX: 725,
      cardY: y + size - 35,
      lineX1: cx + baseHalf,
      lineY1: y + size,
      lineX2: 720,
      lineY2: y + size,
      isLeft: false,
      bbox: { x: cx, y: cy, width: size / 2 + 33.4 * scaleV, height: size / 2 + 33.4 * scaleV },
    },
    {
      index: 3,
      letterX: 52,
      letterY: y + size,
      cardX: 95,
      cardY: y + size - 35,
      lineX1: 280,
      lineY1: y + size,
      lineX2: cx - baseHalf,
      lineY2: y + size,
      isLeft: true,
      bbox: { x, y: cy, width: size / 2 + 33.4 * scaleV, height: size / 2 + 33.4 * scaleV },
    },
  ]

  const centerCardId = 'center-card'
  const customCenterPos = templateElementPositions[centerCardId]
  const centerBbox = {
    x: customCenterPos ? customCenterPos.x : cx - 90,
    y: customCenterPos ? customCenterPos.y : cy - 50,
    width: customCenterPos?.width || 180,
    height: customCenterPos?.height || 100,
  }
  const isCenterSelected = selectedIds.has(centerCardId)

  return (
    <g ref={svgRef}>
      <g
        data-element-id={centerCardId}
        onMouseDown={e => startDrag(e, centerCardId, centerBbox)}
        transform={getTransform(centerCardId, centerBbox)}
        style={{ cursor: 'pointer' }}
      >
        <rect
          x={centerBbox.x}
          y={centerBbox.y}
          width={centerBbox.width}
          height={centerBbox.height}
          fill="transparent"
          stroke={isCenterSelected ? '#4a90d9' : 'none'}
          strokeWidth={1.5}
          rx={4}
        />
        {centerTextLines.map((line, lIdx) => (
          <text
            key={lIdx}
            x={centerBbox.x + centerBbox.width / 2}
            y={centerBbox.y + 24 + lIdx * 20}
            textAnchor="middle"
            fontFamily="Arial, Segoe UI, sans-serif"
            fontSize={15}
            fontWeight={600}
            fill="#1e293b"
          >
            {line}
          </text>
        ))}
      </g>

      {pieces.slice(0, 4).map((piece, index) => {
        const cDef = cornerDefs[index]!
        const elementId = `piece-${index}`
        const cardElementId = `card-${index}`

        const defaultColor = piece.color || MIGSO_PALETTE[index % MIGSO_PALETTE.length] || '#2c2b64'
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || color
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 10 : 8)
        const isSelected = selectedIds.has(elementId)
        const isCardSelected = selectedIds.has(cardElementId)

        const customPiecePos = templateElementPositions[elementId]
        const pieceBbox = {
          x: customPiecePos ? customPiecePos.x : cDef.bbox.x,
          y: customPiecePos ? customPiecePos.y : cDef.bbox.y,
          width: customPiecePos?.width || cDef.bbox.width,
          height: customPiecePos?.height || cDef.bbox.height,
        }

        const deltaX = pieceBbox.x - cDef.bbox.x
        const deltaY = pieceBbox.y - cDef.bbox.y
        const path = makeCornerSegmentPath(index, x + deltaX, y + deltaY, size, scaleU, scaleV, baseHalf, gapOffset)

        const cardWidth = 180
        const customCardPos = templateElementPositions[cardElementId]
        const subtitleLines = piece.subtitle
          ? piece.subtitle.split('\n').flatMap(l => wrapTextByWidth(l, Math.max(12, Math.floor(cardWidth / 8.5))))
          : []
        const nominalCardHeight = 28 + (subtitleLines.length > 0 ? 10 + subtitleLines.length * 16 : 0)
        const cardBbox = {
          x: customCardPos ? customCardPos.x : cDef.cardX,
          y: customCardPos ? customCardPos.y : cDef.cardY,
          width: customCardPos?.width || cardWidth,
          height: customCardPos?.height || Math.max(70, nominalCardHeight),
        }

        const letter = piece.value ?? String.fromCharCode(65 + index)

        return (
          <g key={elementId}>
            <line
              x1={cDef.lineX1}
              y1={cDef.lineY1}
              x2={cDef.lineX2}
              y2={cDef.lineY2}
              stroke={color}
              strokeWidth={3}
              strokeDasharray="6 4"
            />

            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, pieceBbox)}
              transform={getTransform(elementId, pieceBbox)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={path}
                fill="none"
                stroke={isSelected ? '#4a90d9' : stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            <text
              x={cDef.letterX}
              y={cDef.letterY}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Arial, Segoe UI, sans-serif"
              fontSize={60}
              fontWeight={800}
              fill={color}
            >
              {letter}
            </text>

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
                strokeWidth={1.5}
                rx={4}
              />
              <text
                x={cardBbox.x}
                y={cardBbox.y + 16}
                textAnchor="start"
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
                  x={cardBbox.x}
                  y={cardBbox.y + 38 + lIdx * 16}
                  textAnchor="start"
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
