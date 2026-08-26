import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { randomMigsoColor } from '../../lib/theme'

const CELL_W = 160
const CELL_H = 130
const TAB_H = 40
const TAB_D = 18

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

export function Puzzle4Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { pieces } = data
  const W = 700
  const cols = 3
  const totalRows = Math.ceil(pieces.length / cols)
  const gridW = cols * CELL_W
  const startX = (W - gridW) / 2
  const startY = 40

  return (
    <g ref={svgRef}>
      {pieces.map((piece, index) => {
        const row = Math.floor(index / cols)
        const col = index % cols
        const tabOpts = getTabForCell(row, col, totalRows, cols)
        const px = startX + col * CELL_W
        const py = startY + row * CELL_H
        const path = gridPath(px, py, tabOpts)
        const defaultColor = piece.color || randomMigsoColor(index)
        const elementId = `piece-${index}`
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'white'
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3.5 : 3)
        const isSelected = selectedIds.has(elementId)
        const trueWidth = CELL_W + (tabOpts.right ? TAB_D : 0)
        const trueHeight = CELL_H + (tabOpts.bottom ? TAB_D : 0)
        const defaultRect = { x: px, y: py, width: trueWidth, height: trueHeight }
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const centerCx = bbox.x + bbox.width / 2
        const centerCy = bbox.y + bbox.height / 2
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined
        const maxChars = Math.max(8, Math.floor((bbox.width - 40) / 8))
        const titleLines = wrapTextByWidth(piece.title, maxChars)
        const subtitleLines = piece.subtitle ? wrapTextByWidth(piece.subtitle, maxChars) : []

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path d={path} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
              <circle cx={centerCx} cy={centerCy - 20} r={14} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
              {IconComponent ? (
                <g transform={`translate(${centerCx - 7}, ${centerCy - 27})`}>
                  <IconComponent size={14} color="white" />
                </g>
              ) : (
                <text x={centerCx} y={centerCy - 15} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                  {piece.number}
                </text>
              )}
              <text x={centerCx} y={centerCy + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
              {piece.subtitle && (
                <text x={centerCx} y={centerCy + 10 + titleLines.length * 13 + 3} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.85)">
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 11}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
