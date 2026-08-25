import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6']
const CELL_W = 260
const CELL_H = 170
const TAB_W = 50
const TAB_D = 22

function piecePath(
  x: number,
  y: number,
  opts: { right?: boolean; bottom?: boolean; leftIndent?: boolean; topIndent?: boolean },
): string {
  const r = x + CELL_W
  const b = y + CELL_H
  const midX = x + CELL_W / 2
  const midY = y + CELL_H / 2
  const ts = midY - TAB_W / 2
  const te = midY + TAB_W / 2
  const bs = midX - TAB_W / 2
  const be = midX + TAB_W / 2

  let d = 'M ' + x + ' ' + y

  if (opts.topIndent) {
    d += ' L ' + bs + ' ' + y + ' C ' + bs + ' ' + (y + TAB_D) + ' ' + be + ' ' + (y + TAB_D) + ' ' + be + ' ' + y + ' L ' + r + ' ' + y
  } else {
    d += ' L ' + r + ' ' + y
  }

  if (opts.right) {
    d += ' L ' + r + ' ' + ts + ' C ' + (r + TAB_D) + ' ' + ts + ' ' + (r + TAB_D) + ' ' + te + ' ' + r + ' ' + te + ' L ' + r + ' ' + b
  } else {
    d += ' L ' + r + ' ' + b
  }

  if (opts.bottom) {
    d += ' L ' + be + ' ' + b + ' C ' + be + ' ' + (b + TAB_D) + ' ' + bs + ' ' + (b + TAB_D) + ' ' + bs + ' ' + b + ' L ' + x + ' ' + b
  } else {
    d += ' L ' + x + ' ' + b
  }

  if (opts.leftIndent) {
    d += ' L ' + x + ' ' + te + ' C ' + (x + TAB_D) + ' ' + te + ' ' + (x + TAB_D) + ' ' + ts + ' ' + x + ' ' + ts
  }

  d += ' Z'
  return d
}

const PIECE_LAYOUTS = [
  { tabs: { right: true, bottom: true } as const },
  { tabs: { bottom: true, leftIndent: true } as const },
  { tabs: { right: true, topIndent: true } as const },
  { tabs: { leftIndent: true, topIndent: true } as const },
]

export function PuzzleTemplate({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { pieces } = data
  const W = 900
  const gridX = (W - CELL_W * 2) / 2
  const gridY = 40

  return (
    <g ref={svgRef}>
      {pieces.map((piece, index) => {
        const layout = PIECE_LAYOUTS[index % PIECE_LAYOUTS.length]!
        const col = index % 2
        const row = Math.floor(index / 2)
        const px = gridX + col * CELL_W
        const py = gridY + row * CELL_H
        const path = piecePath(px, py, layout.tabs)

        const elementId = `piece-${index}`
        const color = tplColors[elementId] ?? piece.color ?? PALETTE[index % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || 'white'
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3.5 : 3)
        const isSelected = selectedIds.has(elementId)

        const defaultRect = { x: px, y: py, width: CELL_W, height: CELL_H }
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined
        const centerCx = bbox.x + bbox.width / 2
        const centerCy = bbox.y + bbox.height / 2
        const maxChars = Math.max(10, Math.floor((bbox.width - 60) / 8))
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

              <circle cx={bbox.x + 36} cy={bbox.y + 44} r={16} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
              {IconComponent ? (
                <g transform={`translate(${bbox.x + 28}, ${bbox.y + 36})`}>
                  <IconComponent size={16} color="white" />
                </g>
              ) : (
                <text x={bbox.x + 36} y={bbox.y + 50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                  {piece.number}
                </text>
              )}

              <text x={centerCx + 10} y={centerCy + (subtitleLines.length > 0 ? -4 : 4) - (titleLines.length > 1 ? (titleLines.length - 1) * 6 : 0)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="white">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={centerCx + 10} dy={lineIndex === 0 ? 0 : 15}>
                    {line}
                  </tspan>
                ))}
              </text>
              {piece.subtitle && (
                <text x={centerCx + 10} y={centerCy + titleLines.length * 15 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.85)">
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={centerCx + 10} dy={lineIndex === 0 ? 0 : 13}>
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
