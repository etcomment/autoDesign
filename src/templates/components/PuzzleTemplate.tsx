import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const CELL_W = 160
const CELL_H = 130

type Tab = { right?: boolean; bottom?: boolean; leftIndent?: boolean; topIndent?: boolean }

function getTabForCell(row: number, col: number, totalRows: number, cols: number): Tab {
  return {
    right: col < cols - 1,
    bottom: row < totalRows - 1,
    leftIndent: col > 0,
    topIndent: row > 0,
  }
}

function gridPath(x: number, y: number, t: Tab): string {
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

const DEFAULT_COLORS = ['#2c2b64', '#3466ce', '#ffc000', '#ff5338']
const DEFAULT_ICONS = ['gear', 'chart', 'lightbulb', 'user']

export function PuzzleTemplate({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { pieces } = data
  const W = 1000
  const cols = 2
  const totalRows = 2
  const gridW = cols * CELL_W
  const startX = (W - gridW) / 2
  const startY = 140

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
        const row = Math.floor(index / cols)
        const col = index % cols
        const tabOpts = getTabForCell(row, col, totalRows, cols)
        const px = startX + col * CELL_W
        const py = startY + row * CELL_H
        const path = gridPath(px, py, tabOpts)

        const defaultColor = piece.color || DEFAULT_COLORS[index] || MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const pieceId = `piece-${index}`
        const color = tplColors[pieceId] ?? defaultColor
        const stroke = tplStrokeColors[pieceId] || 'white'
        const strokeWidth = tplStrokeWidths[pieceId] ?? (selectedIds.has(pieceId) ? 3.5 : 2)
        const isPieceSelected = selectedIds.has(pieceId)

        const pieceRect = getElementPos(pieceId, { x: px, y: py, width: CELL_W, height: CELL_H })
        const centerCx = pieceRect.x + pieceRect.width / 2
        const centerCy = pieceRect.y + pieceRect.height / 2

        const iconName = piece.icon || DEFAULT_ICONS[index]
        const IconComponent = iconName ? TEMPLATE_ICONS[iconName] || TEMPLATE_ICONS[iconName.toLowerCase()] : undefined

        const isLeft = col === 0
        const cardId = `card-${index}`
        const defaultCardX = isLeft ? 60 : 700
        const defaultCardY = py + 15
        const cardRect = getElementPos(cardId, { x: defaultCardX, y: defaultCardY, width: 240, height: 100 })
        const isCardSelected = selectedIds.has(cardId)
        const cardColor = tplColors[cardId] ?? color

        const connId = `conn-${index}`
        const connLineY = cardRect.y + 16
        const connPointX = isLeft ? cardRect.x + cardRect.width + 12 : cardRect.x - 12
        const connStartX = isLeft ? connPointX + 12 : connPointX - 12
        const connEndX = isLeft ? pieceRect.x - 10 : pieceRect.x + pieceRect.width + 10

        const titleMaxChars = Math.max(10, Math.floor(cardRect.width / 10))
        const subtitleMaxChars = Math.max(12, Math.floor(cardRect.width / 7.5))
        const titleLines = wrapTextByWidth(piece.title, titleMaxChars)
        const subtitleLines = piece.subtitle ? wrapTextByWidth(piece.subtitle, subtitleMaxChars) : []

        return (
          <g key={`item-${index}`}>
            {/* CONNECTEUR DYNAMIQUE */}
            <g data-element-id={connId} opacity={0.9}>
              <line
                x1={connStartX}
                y1={connLineY}
                x2={connEndX}
                y2={connLineY}
                stroke={cardColor}
                strokeWidth={2}
                strokeDasharray="4 3"
              />
              <circle
                cx={connPointX}
                cy={connLineY}
                r={4}
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
                <g transform={`translate(${centerCx - 11}, ${centerCy - 11})`}>
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

