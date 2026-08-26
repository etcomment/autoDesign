import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { randomMigsoColor } from '../../lib/theme'


function circularSegmentPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
): string {
  const sRad = (startAngle * Math.PI) / 180
  const eRad = (endAngle * Math.PI) / 180
  const x1 = cx + outerR * Math.cos(sRad)
  const y1 = cy + outerR * Math.sin(sRad)
  const x2 = cx + outerR * Math.cos(eRad)
  const y2 = cy + outerR * Math.sin(eRad)
  const x3 = cx + innerR * Math.cos(eRad)
  const y3 = cy + innerR * Math.sin(eRad)
  const x4 = cx + innerR * Math.cos(sRad)
  const y4 = cy + innerR * Math.sin(sRad)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`
}

export function Puzzle5Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { pieces } = data
  const W = 600
  const H = 450
  const cx = W / 2
  const cy = H / 2
  const outerR = 175
  const innerR = 75
  const count = pieces.length
  const angleStep = 360 / count

  return (
    <g ref={svgRef}>
      {pieces.map((piece, index) => {
        const startAngle = index * angleStep - 90
        const endAngle = startAngle + angleStep
        const path = circularSegmentPath(cx, cy, innerR, outerR, startAngle, endAngle)
        const defaultColor = piece.color || randomMigsoColor(index)
        const elementId = `piece-${index}`
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'white'
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 3.5 : 2.5)
        const isSelected = selectedIds.has(elementId)

        const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180
        const labelR = (innerR + outerR) / 2
        const lx = cx + labelR * Math.cos(midAngle)
        const ly = cy + labelR * Math.sin(midAngle)

        const defaultRect = { x: lx - 45, y: ly - 35, width: 90, height: 70 }
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined
        const maxChars = Math.max(6, Math.floor(bbox.width / 8))
        const titleLines = wrapTextByWidth(piece.title, maxChars)

        return (
          <g key={elementId}>
            <path d={path} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={strokeWidth} />
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              {IconComponent ? (
                <g transform={`translate(${bbox.x + bbox.width / 2 - 8}, ${bbox.y + 6})`}>
                  <IconComponent size={16} color="white" />
                </g>
              ) : (
                <text x={bbox.x + bbox.width / 2} y={bbox.y + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                  {piece.number}
                </text>
              )}
              <text x={bbox.x + bbox.width / 2} y={bbox.y + 32} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={bbox.x + bbox.width / 2} dy={lineIndex === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={innerR - 4} fill="white" stroke="#e2e8f0" strokeWidth={2} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#333">
        PUZZLE
      </text>
    </g>
  )
}
