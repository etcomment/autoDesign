import { useRef, type ReactElement } from 'react'
import type { PuzzleData, PuzzlePiece } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import { PUZZLE2_TAB_BEZIERS } from './Puzzle4Template'

const DEFAULT_PIECES: PuzzlePiece[] = [
  { number: 1, title: 'Improve', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#2c2b64', icon: 'image' },
  { number: 2, title: 'Innovation', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#3466ce', icon: 'list-todo' },
  { number: 3, title: 'Management', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ff4d30', icon: 'archive' },
  { number: 4, title: 'Identify', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ffb703', icon: 'sliders' },
]

export function makeCircularPuzzlePiecePath(
  cx: number,
  cy: number,
  R: number,
  index: number,
  total: number = 4,
): string {
  if (total === 4) {
    const scale = R / 142.02
    const scaleU = scale * 1.20
    const scaleV = scale * 1.24
    const baseHalf = 11.75 * scaleU

    const angleRad = (index * 90 * Math.PI) / 180
    const cosA = Math.cos(angleRad)
    const sinA = Math.sin(angleRad)

    const rot = (px: number, py: number): string => {
      const rx = px * cosA - py * sinA + cx
      const ry = px * sinA + py * cosA + cy
      return `${rx.toFixed(2)} ${ry.toFixed(2)}`
    }

    const d: string[] = []
    d.push(`M ${rot(0, 0)}`)
    d.push(`L ${rot(0, -R / 2 + baseHalf)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
      const p1 = rot(cp1v * scaleV, -R / 2 - cp1u * scaleU)
      const p2 = rot(cp2v * scaleV, -R / 2 - cp2u * scaleU)
      const pend = rot(endv * scaleV, -R / 2 - endu * scaleU)
      d.push(`C ${p1} ${p2} ${pend}`)
    }

    d.push(`L ${rot(0, -R)}`)
    d.push(`A ${R.toFixed(2)} ${R.toFixed(2)} 0 0 0 ${rot(-R, 0)}`)
    d.push(`L ${rot(-R / 2 - baseHalf, 0)}`)

    for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
      const p1 = rot(-R / 2 + cp1u * scaleU, -cp1v * scaleV)
      const p2 = rot(-R / 2 + cp2u * scaleU, -cp2v * scaleV)
      const pend = rot(-R / 2 + endu * scaleU, -endv * scaleV)
      d.push(`C ${p1} ${p2} ${pend}`)
    }

    d.push(`L ${rot(0, 0)}`)
    d.push('Z')

    return d.join(' ')
  }

  // Dynamic sector piece for N != 4
  const step = (2 * Math.PI) / total
  const startAngle = -Math.PI + index * step
  const endAngle = startAngle + step

  const scale = (R / 142.02) * Math.min(1.0, (4.0 / Math.max(total, 4)) * 1.05)
  const scaleU = scale * 1.20
  const scaleV = scale * 1.24
  const baseHalf = 11.75 * scaleU

  const rTab = R * 0.5

  const ux = Math.cos(startAngle)
  const uy = Math.sin(startAngle)
  const nx = -Math.sin(startAngle)
  const ny = Math.cos(startAngle)

  const d: string[] = []
  d.push(`M ${cx.toFixed(2)} ${cy.toFixed(2)}`)
  d.push(`L ${(cx + (rTab - baseHalf) * ux).toFixed(2)} ${(cy + (rTab - baseHalf) * uy).toFixed(2)}`)

  for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
    const p1x = cx + (rTab + cp1u * scaleU) * ux + (cp1v * scaleV) * nx
    const p1y = cy + (rTab + cp1u * scaleU) * uy + (cp1v * scaleV) * ny
    const p2x = cx + (rTab + cp2u * scaleU) * ux + (cp2v * scaleV) * nx
    const p2y = cy + (rTab + cp2u * scaleU) * uy + (cp2v * scaleV) * ny
    const pex = cx + (rTab + endu * scaleU) * ux + (endv * scaleV) * nx
    const pey = cy + (rTab + endu * scaleU) * uy + (endv * scaleV) * ny
    d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
  }

  d.push(`L ${(cx + R * ux).toFixed(2)} ${(cy + R * uy).toFixed(2)}`)

  const diff = endAngle - startAngle
  const large = diff > Math.PI ? 1 : 0
  d.push(`A ${R.toFixed(2)} ${R.toFixed(2)} 0 ${large} 1 ${(cx + R * Math.cos(endAngle)).toFixed(2)} ${(cy + R * Math.sin(endAngle)).toFixed(2)}`)

  const ex = Math.cos(endAngle)
  const ey = Math.sin(endAngle)
  const enx = -Math.sin(endAngle)
  const eny = Math.cos(endAngle)

  d.push(`L ${(cx + (rTab + baseHalf) * ex).toFixed(2)} ${(cy + (rTab + baseHalf) * ey).toFixed(2)}`)

  for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
    const p1x = cx + (rTab - cp1u * scaleU) * ex + (cp1v * scaleV) * enx
    const p1y = cy + (rTab - cp1u * scaleU) * ey + (cp1v * scaleV) * eny
    const p2x = cx + (rTab - cp2u * scaleU) * ex + (cp2v * scaleV) * enx
    const p2y = cy + (rTab - cp2u * scaleU) * ey + (cp2v * scaleV) * eny
    const pex = cx + (rTab - endu * scaleU) * ex + (endv * scaleV) * enx
    const pey = cy + (rTab - endu * scaleU) * ey + (endv * scaleV) * eny
    d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
  }

  d.push(`L ${cx.toFixed(2)} ${cy.toFixed(2)}`)
  d.push('Z')

  return d.join(' ')
}

export function PuzzleTemplate({ data }: { data: PuzzleData }): ReactElement {
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
  const cx = W / 2
  const cy = H / 2
  const R = 175

  const tabDepth = (R / 142.02) * 1.24 * 33.4

  const quadrantDefs = pieces.map((_, index) => {
    if (count === 4) {
      if (index === 0) {
        return {
          bbox: { x: cx - R, y: cy - R, width: R + tabDepth, height: R },
          iconCenter: { x: cx - R * 0.50, y: cy - R * 0.50 },
          lineY: cy - R * 0.50,
          perimeterX: cx - R * 0.866,
          defaultDotX: cx - R - 55,
          defaultCard: { x: 50, y: cy - R * 0.50 - 45, width: 200, height: 90 },
          isLeft: true,
        }
      }
      if (index === 1) {
        return {
          bbox: { x: cx, y: cy - R, width: R, height: R + tabDepth },
          iconCenter: { x: cx + R * 0.50, y: cy - R * 0.50 },
          lineY: cy - R * 0.50,
          perimeterX: cx + R * 0.866,
          defaultDotX: cx + R + 55,
          defaultCard: { x: cx + R + 75, y: cy - R * 0.50 - 45, width: 200, height: 90 },
          isLeft: false,
        }
      }
      if (index === 2) {
        return {
          bbox: { x: cx - tabDepth, y: cy, width: R + tabDepth, height: R },
          iconCenter: { x: cx + R * 0.50, y: cy + R * 0.50 },
          lineY: cy + R * 0.50,
          perimeterX: cx + R * 0.866,
          defaultDotX: cx + R + 55,
          defaultCard: { x: cx + R + 75, y: cy + R * 0.50 - 45, width: 200, height: 90 },
          isLeft: false,
        }
      }
      return {
        bbox: { x: cx - R, y: cy - tabDepth, width: R, height: R + tabDepth },
        iconCenter: { x: cx - R * 0.50, y: cy + R * 0.50 },
        lineY: cy + R * 0.50,
        perimeterX: cx - R * 0.866,
        defaultDotX: cx - R - 55,
        defaultCard: { x: 50, y: cy + R * 0.50 - 45, width: 200, height: 90 },
        isLeft: true,
      }
    }

    // Dynamic sector calculation for any N
    const step = (2 * Math.PI) / count
    const startAngle = -Math.PI + index * step
    const endAngle = startAngle + step
    const midAngle = (startAngle + endAngle) / 2
    const cosMid = Math.cos(midAngle)
    const sinMid = Math.sin(midAngle)
    const isLeft = cosMid < 0

    const lineY = cy + R * sinMid
    const perimeterX = isLeft
      ? cx - Math.sqrt(Math.max(0, R * R - (lineY - cy) * (lineY - cy)))
      : cx + Math.sqrt(Math.max(0, R * R - (lineY - cy) * (lineY - cy)))

    const defaultDotX = isLeft ? cx - R - 55 : cx + R + 55
    const defaultCard = {
      x: isLeft ? 50 : cx + R + 75,
      y: lineY - 45,
      width: 200,
      height: 90,
    }

    const minX = Math.min(cx, cx + R * Math.cos(startAngle), cx + R * Math.cos(endAngle), cx + R * cosMid) - tabDepth
    const maxX = Math.max(cx, cx + R * Math.cos(startAngle), cx + R * Math.cos(endAngle), cx + R * cosMid) + tabDepth
    const minY = Math.min(cy, cy + R * Math.sin(startAngle), cy + R * Math.sin(endAngle), cy + R * sinMid) - tabDepth
    const maxY = Math.max(cy, cy + R * Math.sin(startAngle), cy + R * Math.sin(endAngle), cy + R * sinMid) + tabDepth

    return {
      bbox: { x: minX, y: minY, width: maxX - minX, height: maxY - minY },
      iconCenter: { x: cx + R * 0.70 * cosMid, y: cy + R * 0.70 * sinMid },
      lineY,
      perimeterX,
      defaultDotX,
      defaultCard,
      isLeft,
    }
  })

  return (
    <g ref={svgRef}>
      {pieces.map((piece, index) => {
        const qDef = quadrantDefs[index % quadrantDefs.length]!
        const elementId = `piece-${index}`
        const cardElementId = `card-${index}`

        const defaultColor = piece.color || MIGSO_PALETTE[index % MIGSO_PALETTE.length] || '#2c2b64'
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || '#ffffff'
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3.5 : 2.5)
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
        const path = makeCircularPuzzlePiecePath(currentCx, currentCy, R, index, count)

        const iconX = qDef.iconCenter.x + deltaX
        const iconY = qDef.iconCenter.y + deltaY
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined
        const badgeSize = count > 5 ? 38 : 44
        const iconSize = count > 5 ? 22 : 26
        const badgeHalf = badgeSize / 2
        const iconHalf = iconSize / 2

        const cardConnX = qDef.isLeft ? cardBbox.x + cardBbox.width : cardBbox.x
        const lineY = qDef.lineY + deltaY
        const piecePerimeterX = qDef.perimeterX + deltaX

        const dotX = qDef.isLeft
          ? Math.min(piecePerimeterX - 8, Math.max(cardConnX + 16, qDef.defaultDotX + deltaX))
          : Math.max(piecePerimeterX + 8, Math.min(cardConnX - 16, qDef.defaultDotX + deltaX))

        return (
          <g key={elementId}>
            {/* Horizontal connector with outer dot */}
            <line
              x1={piecePerimeterX}
              y1={lineY}
              x2={dotX}
              y2={lineY}
              stroke={color}
              strokeWidth={3}
            />
            <circle
              cx={dotX}
              cy={lineY}
              r={7}
              fill={color}
            />

            {/* Circular Puzzle Quadrant */}
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

              {/* Icon with light square badge outline */}
              <rect
                x={iconX - badgeHalf}
                y={iconY - badgeHalf}
                width={badgeSize}
                height={badgeSize}
                rx={6}
                fill="none"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth={2}
              />
              {IconComponent ? (
                <g transform={`translate(${iconX - iconHalf}, ${iconY - iconHalf})`}>
                  <IconComponent size={iconSize} color="white" />
                </g>
              ) : (
                <text
                  x={iconX}
                  y={iconY}
                  dominantBaseline="central"
                  textAnchor="middle"
                  fontFamily="Arial, Segoe UI, sans-serif"
                  fontSize={count > 5 ? 16 : 20}
                  fontWeight={700}
                  fill="white"
                >
                  {piece.number !== undefined ? piece.number : index + 1}
                </text>
              )}
            </g>

            {/* Side Text Card (Interactive) */}
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
