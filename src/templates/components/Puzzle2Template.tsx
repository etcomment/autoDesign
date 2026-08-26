import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const CELL_W = 150
const CELL_H = 130

type Tab = { right?: boolean; bottom?: boolean; leftIndent?: boolean; topIndent?: boolean }

function piecePathStaggered(x: number, y: number, t: Tab): string {
  const r = x + CELL_W
  const b = y + CELL_H
  const midX = x + CELL_W / 2
  const midY = y + CELL_H / 2
  const neckW = 18
  const headR = 14
  const neckR = 6

  const hMid = midY
  const vMid = midX

  let d = `M ${x} ${y}`

  if (t.topIndent) {
    d += ` L ${vMid - neckW / 2 - neckR} ${y}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${vMid - neckW / 2} ${y + neckR}`
    d += ` A ${headR} ${headR} 0 1 0 ${vMid + neckW / 2} ${y + neckR}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${vMid + neckW / 2 + neckR} ${y}`
    d += ` L ${r} ${y}`
  } else {
    d += ` L ${r} ${y}`
  }

  if (t.right) {
    d += ` L ${r} ${hMid - neckW / 2 - neckR}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${r + neckR} ${hMid - neckW / 2}`
    d += ` A ${headR} ${headR} 0 1 1 ${r + neckR} ${hMid + neckW / 2}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${r} ${hMid + neckW / 2 + neckR}`
    d += ` L ${r} ${b}`
  } else {
    d += ` L ${r} ${b}`
  }

  if (t.bottom) {
    d += ` L ${vMid + neckW / 2 + neckR} ${b}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${vMid + neckW / 2} ${b + neckR}`
    d += ` A ${headR} ${headR} 0 1 1 ${vMid - neckW / 2} ${b + neckR}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${vMid - neckW / 2 - neckR} ${b}`
    d += ` L ${x} ${b}`
  } else {
    d += ` L ${x} ${b}`
  }

  if (t.leftIndent) {
    d += ` L ${x} ${hMid + neckW / 2 + neckR}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${x + neckR} ${hMid + neckW / 2}`
    d += ` A ${headR} ${headR} 0 1 0 ${x + neckR} ${hMid - neckW / 2}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${x} ${hMid - neckW / 2 - neckR}`
    d += ` L ${x} ${y}`
  }

  d += ' Z'
  return d
}

const PIECE_CONFIGS: { xOffset: number; yOffset: number; tabs: Tab }[] = [
  { xOffset: 250, yOffset: 80, tabs: { right: true, bottom: true } },
  { xOffset: 350, yOffset: 175, tabs: { right: true, bottom: true, leftIndent: true, topIndent: true } },
  { xOffset: 450, yOffset: 80, tabs: { right: true, bottom: true, leftIndent: true, topIndent: true } },
  { xOffset: 550, yOffset: 175, tabs: { leftIndent: true, topIndent: true } },
]

const DEFAULT_COLORS_P2 = ['#2c2b64', '#3466ce', '#ff5338', '#ffc000']
const DEFAULT_ICONS_P2 = ['clock', 'gear', 'briefcase', 'user']

export function Puzzle2Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { pieces } = data

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
      {pieces.slice(0, 4).map((piece, index) => {
        const config = PIECE_CONFIGS[index % PIECE_CONFIGS.length]!
        const px = config.xOffset
        const py = config.yOffset
        const path = piecePathStaggered(px, py, config.tabs)

        const defaultColor = piece.color || DEFAULT_COLORS_P2[index] || MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const pieceId = `piece-${index}`
        const color = tplColors[pieceId] ?? defaultColor
        const stroke = tplStrokeColors[pieceId] || 'white'
        const strokeWidth = tplStrokeWidths[pieceId] ?? (selectedIds.has(pieceId) ? 3.5 : 2)
        const isPieceSelected = selectedIds.has(pieceId)

        const pieceRect = getElementPos(pieceId, { x: px, y: py, width: CELL_W, height: CELL_H })
        const centerCx = pieceRect.x + pieceRect.width / 2
        const centerCy = pieceRect.y + pieceRect.height / 2

        const iconName = piece.icon || DEFAULT_ICONS_P2[index]
        const IconComponent = iconName ? TEMPLATE_ICONS[iconName] || TEMPLATE_ICONS[iconName.toLowerCase()] : undefined

        const isLeft = index < 2
        const isTop = index % 2 === 0
        const cardId = `card-${index}`
        const defaultCardX = isLeft ? 50 : 720
        const defaultCardY = isTop ? 75 : 235
        const cardRect = getElementPos(cardId, { x: defaultCardX, y: defaultCardY, width: 230, height: 95 })
        const isCardSelected = selectedIds.has(cardId)
        const cardColor = tplColors[cardId] ?? color

        const dotId = `dot-${index}`
        const dotX = isLeft ? cardRect.x + cardRect.width + 12 : cardRect.x - 12
        const dotY = cardRect.y + 16

        const titleMaxChars = Math.max(10, Math.floor(cardRect.width / 10))
        const subtitleMaxChars = Math.max(12, Math.floor(cardRect.width / 7.5))
        const titleLines = wrapTextByWidth(piece.title, titleMaxChars)
        const subtitleLines = piece.subtitle ? wrapTextByWidth(piece.subtitle, subtitleMaxChars) : []

        return (
          <g key={`item-p2-${index}`}>
            {/* POINT D'INDICATION */}
            <g data-element-id={dotId}>
              <circle
                cx={dotX}
                cy={dotY}
                r={6}
                fill={cardColor}
              />
            </g>

            {/* PIECE DE PUZZLE */}
            <g
              data-element-id={pieceId}
              onMouseDown={e => startDrag(e, pieceId, pieceRect)}
              transform={getTransform(pieceId, pieceRect)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={path}
                fill={color}
                stroke={isPieceSelected ? '#4a90d9' : stroke}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
              <circle
                cx={centerCx}
                cy={centerCy}
                r={22}
                fill="rgba(255,255,255,0.2)"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth={2}
              />
              {IconComponent ? (
                <g data-icon="true" transform={`translate(${centerCx - 11}, ${centerCy - 11})`}>
                  <IconComponent size={22} color="white" />
                </g>
              ) : (
                <text
                  x={centerCx}
                  y={centerCy + 6}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={16}
                  fontWeight={700}
                  fill="white"
                >
                  {piece.number ?? index + 1}
                </text>
              )}
              {isPieceSelected && renderHandles(pieceRect, pieceId)}
            </g>

            {/* CARTE DE TEXTE EXTERNE */}
            <g
              data-element-id={cardId}
              onMouseDown={e => startDrag(e, cardId, cardRect)}
              transform={getTransform(cardId, cardRect)}
              style={{ cursor: 'pointer' }}
            >
              <text
                x={isLeft ? cardRect.x + cardRect.width : cardRect.x}
                y={cardRect.y + 16}
                textAnchor={isLeft ? 'end' : 'start'}
                fontFamily="Arial, sans-serif"
                fontSize={18}
                fontWeight="bold"
                fill={cardColor}
              >
                {titleLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={isLeft ? cardRect.x + cardRect.width : cardRect.x} dy={lIdx === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>

              {subtitleLines.length > 0 && (
                <text
                  x={isLeft ? cardRect.x + cardRect.width : cardRect.x}
                  y={cardRect.y + 22 + titleLines.length * 20}
                  textAnchor={isLeft ? 'end' : 'start'}
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fill="#555555"
                >
                  {subtitleLines.map((line, lIdx) => (
                    <tspan key={lIdx} x={isLeft ? cardRect.x + cardRect.width : cardRect.x} dy={lIdx === 0 ? 0 : 15}>
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

