import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { randomMigsoColor } from '../../lib/theme'

const CELL_W = 220
const CELL_H = 100
const TAB_W = 50
const TAB_D = 20

function piecePathV(
  x: number,
  y: number,
  opts: { bottomTab?: boolean; topIndent?: boolean },
): string {
  const r = x + CELL_W
  const b = y + CELL_H
  const mid = x + CELL_W / 2
  const neckW = 20
  const headR = 15
  const neckR = 7

  const vMid = mid

  let d = `M ${x} ${y} L ${r} ${y} L ${r} ${b}`
  if (opts.bottomTab) {
    d += ` L ${vMid + neckW / 2 + neckR} ${b}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${vMid + neckW / 2} ${b + neckR}`
    d += ` A ${headR} ${headR} 0 1 1 ${vMid - neckW / 2} ${b + neckR}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${vMid - neckW / 2 - neckR} ${b}`
    d += ` L ${x} ${b}`
  } else {
    d += ` L ${x} ${b}`
  }
  if (opts.topIndent) {
    d += ` L ${x} ${y} L ${vMid - neckW / 2 - neckR} ${y}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${vMid - neckW / 2} ${y + neckR}`
    d += ` A ${headR} ${headR} 0 1 0 ${vMid + neckW / 2} ${y + neckR}`
    d += ` A ${neckR} ${neckR} 0 0 1 ${vMid + neckW / 2 + neckR} ${y}`
  }
  d += ' Z'
  return d
}

function getTabsForPiece(i: number, total: number) {
  return {
    bottomTab: i < total - 1,
    topIndent: i > 0,
  }
}

export function Puzzle3Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { pieces } = data
  const W = 600
  const startX = (W - CELL_W) / 2
  const startY = 40

  return (
    <g ref={svgRef}>
      {pieces.map((piece, index) => {
        const tabs = getTabsForPiece(index, pieces.length)
        const px = startX
        const py = startY + index * CELL_H
        const path = piecePathV(px, py, tabs)
        const defaultColor = piece.color || randomMigsoColor(index)
        const elementId = `piece-${index}`
        const color = tplColors[elementId] ?? defaultColor
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
        const centerCx = bbox.x + bbox.width / 2
        const centerCy = bbox.y + bbox.height / 2
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined
        const maxChars = Math.max(8, Math.floor((bbox.width - 70) / 8))
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
              <circle cx={bbox.x + 32} cy={centerCy} r={16} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
              {IconComponent ? (
                <g transform={`translate(${bbox.x + 24}, ${centerCy - 8})`}>
                  <IconComponent size={16} color="white" />
                </g>
              ) : (
                <text x={bbox.x + 32} y={centerCy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                  {piece.number}
                </text>
              )}
              <text x={centerCx + 20} y={centerCy + (subtitleLines.length > 0 ? -4 : 5) - (titleLines.length > 1 ? (titleLines.length - 1) * 6 : 0)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={centerCx + 20} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
              {piece.subtitle && (
                <text x={centerCx + 20} y={centerCy + titleLines.length * 14 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.85)">
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={centerCx + 20} dy={lineIndex === 0 ? 0 : 12}>
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
