import { useRef, type ReactElement } from 'react'
import type { PuzzleData, PuzzlePiece } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import { PUZZLE2_TAB_BEZIERS } from './Puzzle4Template'

const DEFAULT_PIECES: PuzzlePiece[] = [
  { number: 1, title: 'Identify', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#2c2b64', icon: 'list-todo' },
  { number: 2, title: 'Innovation', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#3466ce', icon: 'archive' },
  { number: 3, title: 'Management', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ff4d30', icon: 'image' },
  { number: 4, title: 'Improve', subtitle: 'MIGSO-PCUBED\ncontent and words to\nbe added here as\nrequired', color: '#ffb703', icon: 'sliders' },
]

export function makeAnnularPuzzlePiecePath(
  cx: number,
  cy: number,
  Rout: number,
  Rin: number,
  index: number,
  total: number = 4,
): string {
  const step = (2 * Math.PI) / total
  const startAngle = -Math.PI + index * step
  const endAngle = startAngle + step

  const scale = ((Rout - Rin) / 142.02) * Math.min(1.0, (4.0 / Math.max(total, 4)) * 1.05)
  const scaleU = scale * 1.20
  const scaleV = scale * 1.24
  const baseHalf = 11.75 * scaleU

  const rTab = (Rout + Rin) / 2

  const ux = Math.cos(startAngle)
  const uy = Math.sin(startAngle)
  const nx = -Math.sin(startAngle)
  const ny = Math.cos(startAngle)

  const d: string[] = []
  d.push(`M ${(cx + Rin * ux).toFixed(2)} ${(cy + Rin * uy).toFixed(2)}`)
  d.push(`L ${(cx + (rTab - baseHalf) * ux).toFixed(2)} ${(cy + (rTab - baseHalf) * uy).toFixed(2)}`)

  for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
    const p1x = cx + (rTab + cp1u * scaleU) * ux - (cp1v * scaleV) * nx
    const p1y = cy + (rTab + cp1u * scaleU) * uy - (cp1v * scaleV) * ny
    const p2x = cx + (rTab + cp2u * scaleU) * ux - (cp2v * scaleV) * nx
    const p2y = cy + (rTab + cp2u * scaleU) * uy - (cp2v * scaleV) * ny
    const pex = cx + (rTab + endu * scaleU) * ux - (endv * scaleV) * nx
    const pey = cy + (rTab + endu * scaleU) * uy - (endv * scaleV) * ny
    d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
  }

  d.push(`L ${(cx + Rout * ux).toFixed(2)} ${(cy + Rout * uy).toFixed(2)}`)

  const diff = endAngle - startAngle
  const large = diff > Math.PI ? 1 : 0
  d.push(`A ${Rout.toFixed(2)} ${Rout.toFixed(2)} 0 ${large} 1 ${(cx + Rout * Math.cos(endAngle)).toFixed(2)} ${(cy + Rout * Math.sin(endAngle)).toFixed(2)}`)

  const ex = Math.cos(endAngle)
  const ey = Math.sin(endAngle)
  const enx = -Math.sin(endAngle)
  const eny = Math.cos(endAngle)

  d.push(`L ${(cx + (rTab + baseHalf) * ex).toFixed(2)} ${(cy + (rTab + baseHalf) * ey).toFixed(2)}`)

  for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
    const p1x = cx + (rTab - cp1u * scaleU) * ex - (cp1v * scaleV) * enx
    const p1y = cy + (rTab - cp1u * scaleU) * ey - (cp1v * scaleV) * eny
    const p2x = cx + (rTab - cp2u * scaleU) * ex - (cp2v * scaleV) * enx
    const p2y = cy + (rTab - cp2u * scaleU) * ey - (cp2v * scaleV) * eny
    const pex = cx + (rTab - endu * scaleU) * ex - (endv * scaleV) * enx
    const pey = cy + (rTab - endu * scaleU) * ey - (endv * scaleV) * eny
    d.push(`C ${p1x.toFixed(2)} ${p1y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
  }

  d.push(`L ${(cx + Rin * ex).toFixed(2)} ${(cy + Rin * ey).toFixed(2)}`)
  d.push(`A ${Rin.toFixed(2)} ${Rin.toFixed(2)} 0 ${large} 0 ${(cx + Rin * ux).toFixed(2)} ${(cy + Rin * uy).toFixed(2)}`)
  d.push('Z')

  return d.join(' ')
}

export function Puzzle3Template({ data }: { data: PuzzleData }): ReactElement {
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
  const Rout = 175
  const Rin = 75
  const Rmid = (Rout + Rin) / 2

  const tabDepth = (((Rout - Rin) / 142.02) * 1.24 * 33.4)

  const pieceDefs = pieces.map((_, index) => {
    const step = (2 * Math.PI) / count
    const startAngle = -Math.PI + index * step
    const endAngle = startAngle + step
    const midAngle = (startAngle + endAngle) / 2
    const cosMid = Math.cos(midAngle)
    const sinMid = Math.sin(midAngle)
    const isLeft = cosMid < 0

    const lineY = cy + Rmid * sinMid
    const perimeterX = isLeft
      ? cx - Math.sqrt(Math.max(0, Rout * Rout - (lineY - cy) * (lineY - cy)))
      : cx + Math.sqrt(Math.max(0, Rout * Rout - (lineY - cy) * (lineY - cy)))

    const defaultDotX = isLeft ? cx - Rout - 55 : cx + Rout + 55
    const defaultCard = {
      x: isLeft ? 50 : cx + Rout + 75,
      y: lineY - 45,
      width: 200,
      height: 90,
    }

    const minX = Math.min(
      cx + Rin * Math.cos(startAngle),
      cx + Rout * Math.cos(startAngle),
      cx + Rin * Math.cos(endAngle),
      cx + Rout * Math.cos(endAngle),
      cx + Rout * cosMid,
      cx + Rin * cosMid,
    ) - tabDepth
    const maxX = Math.max(
      cx + Rin * Math.cos(startAngle),
      cx + Rout * Math.cos(startAngle),
      cx + Rin * Math.cos(endAngle),
      cx + Rout * Math.cos(endAngle),
      cx + Rout * cosMid,
      cx + Rin * cosMid,
    ) + tabDepth
    const minY = Math.min(
      cy + Rin * Math.sin(startAngle),
      cy + Rout * Math.sin(startAngle),
      cy + Rin * Math.sin(endAngle),
      cy + Rout * Math.sin(endAngle),
      cy + Rout * sinMid,
      cy + Rin * sinMid,
    ) - tabDepth
    const maxY = Math.max(
      cy + Rin * Math.sin(startAngle),
      cy + Rout * Math.sin(startAngle),
      cy + Rin * Math.sin(endAngle),
      cy + Rout * Math.sin(endAngle),
      cy + Rout * sinMid,
      cy + Rin * sinMid,
    ) + tabDepth

    return {
      bbox: { x: minX, y: minY, width: maxX - minX, height: maxY - minY },
      iconCenter: { x: cx + Rmid * cosMid, y: cy + Rmid * sinMid },
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
        const pDef = pieceDefs[index % pieceDefs.length]!
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
        const currentCx = cx + deltaX
        const currentCy = cy + deltaY
        const path = makeAnnularPuzzlePiecePath(currentCx, currentCy, Rout, Rin, index, count)

        const iconX = pDef.iconCenter.x + deltaX
        const iconY = pDef.iconCenter.y + deltaY
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined
        const badgeSize = count > 5 ? 38 : 44
        const iconSize = count > 5 ? 22 : 26
        const badgeHalf = badgeSize / 2
        const iconHalf = iconSize / 2

        const cardConnX = pDef.isLeft ? cardBbox.x + cardBbox.width : cardBbox.x
        const lineY = pDef.lineY + deltaY
        const piecePerimeterX = pDef.perimeterX + deltaX

        const dotX = pDef.isLeft
          ? Math.min(piecePerimeterX - 8, Math.max(cardConnX + 16, pDef.defaultDotX + deltaX))
          : Math.max(piecePerimeterX + 8, Math.min(cardConnX - 16, pDef.defaultDotX + deltaX))

        return (
          <g key={elementId}>
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
              {(IconComponent || piece.value) && (
                <>
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
                      {piece.value}
                    </text>
                  )}
                </>
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
                x={pDef.isLeft ? cardBbox.x + cardBbox.width : cardBbox.x}
                y={cardBbox.y + 16}
                textAnchor={pDef.isLeft ? 'end' : 'start'}
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
                  x={pDef.isLeft ? cardBbox.x + cardBbox.width : cardBbox.x}
                  y={cardBbox.y + 40 + lIdx * 16}
                  textAnchor={pDef.isLeft ? 'end' : 'start'}
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
