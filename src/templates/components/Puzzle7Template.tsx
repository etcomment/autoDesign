import { useRef, type ReactElement } from 'react'
import type { PuzzleData, PuzzlePiece } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import { PUZZLE2_TAB_BEZIERS } from './Puzzle4Template'

const DEFAULT_PIECES: PuzzlePiece[] = [
  { number: 1, title: 'Improve', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#2c2b64', value: '1', icon: 'inbox' },
  { number: 2, title: 'Innovation', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#3466ce', value: '2', icon: 'database' },
  { number: 3, title: 'Management', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ff4d30', value: '3', icon: 'network' },
  { number: 4, title: 'Identify', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ffb703', value: '4', icon: 'send' },
]

export function makePuzzle7QuadrantPath(
  quadrant: number,
  cx: number,
  cy: number,
  Rout: number,
  Rin: number,
  rOutCorner: number,
  rInCorner: number,
  scaleU: number,
  scaleV: number,
  baseHalf: number,
): string {
  const d: string[] = []
  const midR = (Rout + Rin) / 2

  if (quadrant === 0) {
    d.push(`M ${cx.toFixed(2)} ${(cy - Rin).toFixed(2)}`)
    d.push(`L ${(cx - Rin + rInCorner).toFixed(2)} ${(cy - Rin).toFixed(2)}`)
    d.push(`A ${rInCorner} ${rInCorner} 0 0 1 ${(cx - Rin).toFixed(2)} ${(cy - Rin + rInCorner).toFixed(2)}`)
    d.push(`L ${(cx - Rin).toFixed(2)} ${cy.toFixed(2)}`)
    d.push(`L ${(cx - midR + baseHalf).toFixed(2)} ${cy.toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
      const p1x = cx - midR - cp1u * scaleU
      const p1y = cy - cp1v * scaleV
      const p2x = cx - midR - cp2u * scaleU
      const p2y = cy - cp2v * scaleV
      const pex = cx - midR - endu * scaleU
      const pey = cy - endv * scaleV
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${(cx - Rout).toFixed(2)} ${cy.toFixed(2)}`)
    d.push(`L ${(cx - Rout).toFixed(2)} ${(cy - Rout + rOutCorner).toFixed(2)}`)
    d.push(`A ${rOutCorner} ${rOutCorner} 0 0 1 ${(cx - Rout + rOutCorner).toFixed(2)} ${(cy - Rout).toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${(cy - Rout).toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${(cy - midR - baseHalf).toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
      const p1x = cx + cp1v * scaleV
      const p1y = cy - midR + cp1u * scaleU
      const p2x = cx + cp2v * scaleV
      const p2y = cy - midR + cp2u * scaleU
      const pex = cx + endv * scaleV
      const pey = cy - midR + endu * scaleU
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${cx.toFixed(2)} ${(cy - Rin).toFixed(2)}`)
    d.push('Z')
  } else if (quadrant === 1) {
    d.push(`M ${(cx + Rin).toFixed(2)} ${cy.toFixed(2)}`)
    d.push(`L ${(cx + Rin).toFixed(2)} ${(cy - Rin + rInCorner).toFixed(2)}`)
    d.push(`A ${rInCorner} ${rInCorner} 0 0 1 ${(cx + Rin - rInCorner).toFixed(2)} ${(cy - Rin).toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${(cy - Rin).toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${(cy - midR + baseHalf).toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
      const p1x = cx + cp1v * scaleV
      const p1y = cy - midR - cp1u * scaleU
      const p2x = cx + cp2v * scaleV
      const p2y = cy - midR - cp2u * scaleU
      const pex = cx + endv * scaleV
      const pey = cy - midR - endu * scaleU
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${cx.toFixed(2)} ${(cy - Rout).toFixed(2)}`)
    d.push(`L ${(cx + Rout - rOutCorner).toFixed(2)} ${(cy - Rout).toFixed(2)}`)
    d.push(`A ${rOutCorner} ${rOutCorner} 0 0 1 ${(cx + Rout).toFixed(2)} ${(cy - Rout + rOutCorner).toFixed(2)}`)
    d.push(`L ${(cx + Rout).toFixed(2)} ${cy.toFixed(2)}`)
    d.push(`L ${(cx + midR + baseHalf).toFixed(2)} ${cy.toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
      const p1x = cx + midR + cp1u * scaleU
      const p1y = cy + cp1v * scaleV
      const p2x = cx + midR + cp2u * scaleU
      const p2y = cy + cp2v * scaleV
      const pex = cx + midR + endu * scaleU
      const pey = cy + endv * scaleV
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${(cx + Rin).toFixed(2)} ${cy.toFixed(2)}`)
    d.push('Z')
  } else if (quadrant === 2) {
    d.push(`M ${cx.toFixed(2)} ${(cy + Rin).toFixed(2)}`)
    d.push(`L ${(cx + Rin - rInCorner).toFixed(2)} ${(cy + Rin).toFixed(2)}`)
    d.push(`A ${rInCorner} ${rInCorner} 0 0 1 ${(cx + Rin).toFixed(2)} ${(cy + Rin - rInCorner).toFixed(2)}`)
    d.push(`L ${(cx + Rin).toFixed(2)} ${cy.toFixed(2)}`)
    d.push(`L ${(cx + midR - baseHalf).toFixed(2)} ${cy.toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
      const p1x = cx + midR - cp1u * scaleU
      const p1y = cy + cp1v * scaleV
      const p2x = cx + midR - cp2u * scaleU
      const p2y = cy + cp2v * scaleV
      const pex = cx + midR - endu * scaleU
      const pey = cy + endv * scaleV
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${(cx + Rout).toFixed(2)} ${cy.toFixed(2)}`)
    d.push(`L ${(cx + Rout).toFixed(2)} ${(cy + Rout - rOutCorner).toFixed(2)}`)
    d.push(`A ${rOutCorner} ${rOutCorner} 0 0 1 ${(cx + Rout - rOutCorner).toFixed(2)} ${(cy + Rout).toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${(cy + Rout).toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${(cy + midR + baseHalf).toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
      const p1x = cx - cp1v * scaleV
      const p1y = cy + midR + cp1u * scaleU
      const p2x = cx - cp2v * scaleV
      const p2y = cy + midR + cp2u * scaleU
      const pex = cx - endv * scaleV
      const pey = cy + midR + endu * scaleU
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${cx.toFixed(2)} ${(cy + Rin).toFixed(2)}`)
    d.push('Z')
  } else {
    d.push(`M ${(cx - Rin).toFixed(2)} ${cy.toFixed(2)}`)
    d.push(`L ${(cx - Rin).toFixed(2)} ${(cy + Rin - rInCorner).toFixed(2)}`)
    d.push(`A ${rInCorner} ${rInCorner} 0 0 1 ${(cx - Rin + rInCorner).toFixed(2)} ${(cy + Rin).toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${(cy + Rin).toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${(cy + midR - baseHalf).toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
      const p1x = cx - cp1v * scaleV
      const p1y = cy + midR - cp1u * scaleU
      const p2x = cx - cp2v * scaleV
      const p2y = cy + midR - cp2u * scaleU
      const pex = cx - endv * scaleV
      const pey = cy + midR - endu * scaleU
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${cx.toFixed(2)} ${(cy + Rout).toFixed(2)}`)
    d.push(`L ${(cx - Rout + rOutCorner).toFixed(2)} ${(cy + Rout).toFixed(2)}`)
    d.push(`A ${rOutCorner} ${rOutCorner} 0 0 1 ${(cx - Rout).toFixed(2)} ${(cy + Rout - rOutCorner).toFixed(2)}`)
    d.push(`L ${(cx - Rout).toFixed(2)} ${cy.toFixed(2)}`)
    d.push(`L ${(cx - midR - baseHalf).toFixed(2)} ${cy.toFixed(2)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
      const p1x = cx - midR - cp1u * scaleU
      const p1y = cy - cp1v * scaleV
      const p2x = cx - midR - cp2u * scaleU
      const p2y = cy - cp2v * scaleV
      const pex = cx - midR - endu * scaleU
      const pey = cy - endv * scaleV
      d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
    }

    d.push(`L ${(cx - Rin).toFixed(2)} ${cy.toFixed(2)}`)
    d.push('Z')
  }

  return d.join(' ')
}

export function Puzzle7Template({ data }: { data: PuzzleData }): ReactElement {
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

  const Rout = 185
  const Rin = 90
  const rOutCorner = 50
  const rInCorner = 25

  const scale = ((Rout - Rin) / 142.02) * 1.05
  const scaleU = scale * 1.20
  const scaleV = scale * 1.24
  const baseHalf = 11.75 * scaleU

  const quadrantDefs = [
    {
      index: 0,
      iconCenter: { x: cx - 130, y: cy - 135 },
      numCenter: { x: cx - 55, y: cy - 135 },
      lineY: cy - 135,
      perimeterX: cx - Rout,
      defaultDotX: 190,
      defaultCard: { x: 45, y: cy - 135 - 42, width: 130, height: 85 },
      isLeft: true,
      bbox: { x: cx - Rout, y: cy - Rout, width: Rout + 33.4 * scaleV, height: Rout + 33.4 * scaleV },
    },
    {
      index: 1,
      iconCenter: { x: cx + 130, y: cy - 135 },
      numCenter: { x: cx + 130, y: cy - 55 },
      lineY: cy - 135,
      perimeterX: cx + Rout,
      defaultDotX: 810,
      defaultCard: { x: 825, y: cy - 135 - 42, width: 130, height: 85 },
      isLeft: false,
      bbox: { x: cx, y: cy - Rout, width: Rout, height: Rout + 33.4 * scaleV },
    },
    {
      index: 2,
      iconCenter: { x: cx + 130, y: cy + 135 },
      numCenter: { x: cx + 55, y: cy + 135 },
      lineY: cy + 135,
      perimeterX: cx + Rout,
      defaultDotX: 810,
      defaultCard: { x: 825, y: cy + 135 - 42, width: 130, height: 85 },
      isLeft: false,
      bbox: { x: cx - 33.4 * scaleV, y: cy, width: Rout + 33.4 * scaleV, height: Rout },
    },
    {
      index: 3,
      iconCenter: { x: cx - 130, y: cy + 135 },
      numCenter: { x: cx - 130, y: cy + 55 },
      lineY: cy + 135,
      perimeterX: cx - Rout,
      defaultDotX: 190,
      defaultCard: { x: 45, y: cy + 135 - 42, width: 130, height: 85 },
      isLeft: true,
      bbox: { x: cx - Rout, y: cy - 33.4 * scaleV, width: Rout, height: Rout + 33.4 * scaleV },
    },
  ]

  return (
    <g ref={svgRef}>
      {pieces.slice(0, 4).map((piece, index) => {
        const qDef = quadrantDefs[index]!
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
          x: customPiecePos ? customPiecePos.x : qDef.bbox.x,
          y: customPiecePos ? customPiecePos.y : qDef.bbox.y,
          width: customPiecePos?.width || qDef.bbox.width,
          height: customPiecePos?.height || qDef.bbox.height,
        }

        const customCardPos = templateElementPositions[cardElementId]
        const cardWidth = customCardPos?.width || qDef.defaultCard.width
        const subtitleLines = piece.subtitle
          ? piece.subtitle.split('\n').flatMap(l => wrapTextByWidth(l, Math.max(12, Math.floor(cardWidth / 7.5))))
          : []
        const nominalCardHeight = 28 + (subtitleLines.length > 0 ? 12 + subtitleLines.length * 16 : 0)
        const cardBbox = {
          x: customCardPos ? customCardPos.x : qDef.defaultCard.x,
          y: customCardPos ? customCardPos.y : qDef.defaultCard.y,
          width: cardWidth,
          height: customCardPos?.height || Math.max(70, nominalCardHeight),
        }

        const deltaX = pieceBbox.x - qDef.bbox.x
        const deltaY = pieceBbox.y - qDef.bbox.y
        const currentCx = cx + deltaX
        const currentCy = cy + deltaY
        const path = makePuzzle7QuadrantPath(
          index,
          currentCx,
          currentCy,
          Rout,
          Rin,
          rOutCorner,
          rInCorner,
          scaleU,
          scaleV,
          baseHalf,
        )

        const iconX = qDef.iconCenter.x + deltaX
        const iconY = qDef.iconCenter.y + deltaY
        const numX = qDef.numCenter.x + deltaX
        const numY = qDef.numCenter.y + deltaY

        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined
        const iconSize = 42

        const cardConnX = qDef.isLeft ? cardBbox.x + cardBbox.width : cardBbox.x
        const lineY = qDef.lineY + deltaY
        const piecePerimeterX = qDef.perimeterX + deltaX

        const dotX = qDef.isLeft
          ? Math.min(piecePerimeterX - 8, Math.max(cardConnX + 16, qDef.defaultDotX + deltaX))
          : Math.max(piecePerimeterX + 8, Math.min(cardConnX - 16, qDef.defaultDotX + deltaX))

        const numVal = piece.value ?? (piece.number !== undefined ? String(piece.number) : String(index + 1))

        return (
          <g key={elementId}>
            <line
              x1={piecePerimeterX}
              y1={lineY}
              x2={dotX}
              y2={lineY}
              stroke={color}
              strokeWidth={3.5}
            />
            <circle
              cx={dotX}
              cy={lineY}
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
                d={path}
                fill={color}
                stroke={isSelected ? '#4a90d9' : stroke}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />

              {IconComponent && (
                <g transform={`translate(${iconX - iconSize / 2}, ${iconY - iconSize / 2})`}>
                  <IconComponent size={iconSize} color="white" />
                </g>
              )}

              {numVal && (
                <text
                  x={numX}
                  y={numY}
                  dominantBaseline="central"
                  textAnchor="middle"
                  fontFamily="Arial, Segoe UI, sans-serif"
                  fontSize={52}
                  fontWeight={800}
                  fill="white"
                >
                  {numVal}
                </text>
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
                x={qDef.isLeft ? cardBbox.x + cardBbox.width : cardBbox.x}
                y={cardBbox.y + 16}
                textAnchor={qDef.isLeft ? 'end' : 'start'}
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
                  x={qDef.isLeft ? cardBbox.x + cardBbox.width : cardBbox.x}
                  y={cardBbox.y + 40 + lIdx * 16}
                  textAnchor={qDef.isLeft ? 'end' : 'start'}
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