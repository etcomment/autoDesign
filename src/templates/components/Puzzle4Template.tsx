import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9b59b6', '#00bcd4']
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
  const hs = midY - TAB_H / 2
  const he = midY + TAB_H / 2
  const vs = midX - TAB_H / 2
  const ve = midX + TAB_H / 2
  let d = 'M ' + x + ' ' + y
  d += t.topIndent ? ' L ' + vs + ' ' + y + ' C ' + vs + ' ' + (y + TAB_D) + ' ' + ve + ' ' + (y + TAB_D) + ' ' + ve + ' ' + y + ' L ' + r + ' ' + y : ' L ' + r + ' ' + y
  d += t.right ? ' L ' + r + ' ' + hs + ' C ' + (r + TAB_D) + ' ' + hs + ' ' + (r + TAB_D) + ' ' + he + ' ' + r + ' ' + he + ' L ' + r + ' ' + b : ' L ' + r + ' ' + b
  d += t.bottom ? ' L ' + ve + ' ' + b + ' C ' + ve + ' ' + (b + TAB_D) + ' ' + vs + ' ' + (b + TAB_D) + ' ' + vs + ' ' + b + ' L ' + x + ' ' + b : ' L ' + x + ' ' + b
  d += t.leftIndent ? ' L ' + x + ' ' + he + ' C ' + (x + TAB_D) + ' ' + he + ' ' + (x + TAB_D) + ' ' + hs + ' ' + x + ' ' + hs : ''
  return d + ' Z'
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
        const defaultColor = piece.color || PALETTE[index % PALETTE.length]!
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
