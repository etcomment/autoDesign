import { useRef, type ReactElement } from 'react'
import type { ValueChainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const SUPPORT_COLORS = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af']
const PRIMARY_COLORS = [...MIGSO_PALETTE, '#0284c7', '#0369a1', '#075985']

export function ValueChainTemplate({ data }: { data: ValueChainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { support = [], primary = [] } = data
  const W = 900
  const startX = 40
  const mainW = 700
  const marginW = 100
  const startY = 40

  const supportCount = Math.max(1, support.length)
  const primaryCount = Math.max(1, primary.length)

  const supportH = 42
  const supportGap = 6
  const totalSupportH = supportCount * supportH + (supportCount - 1) * supportGap

  const primaryTopY = startY + totalSupportH + 16
  const primaryH = 180
  const primaryColW = (mainW - (primaryCount - 1) * 8) / primaryCount
  const totalH = totalSupportH + 16 + primaryH

  return (
    <g ref={svgRef}>
      {/* Support Activities (Horizontal Rows) */}
      {support.map((act, index) => {
        const elementId = `support-${index}`
        const y = startY + index * (supportH + supportGap)
        const defaultRect = { x: startX, y, width: mainW, height: supportH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const defaultColor = act.color || SUPPORT_COLORS[index % SUPPORT_COLORS.length]!
        const color = tplColors[elementId] ?? defaultColor
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : '#bfdbfe')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = act.icon ? TEMPLATE_ICONS[act.icon] : undefined

        const maxChars = Math.max(10, Math.floor((bbox.width - 60) / 8))
        const titleLines = wrapTextByWidth(act.title, maxChars)

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill="#eff6ff" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x={bbox.x} y={bbox.y} width={6} height={bbox.height} rx={3} fill={color} />

              {IconComponent && (
                <g transform={`translate(${bbox.x + 16}, ${bbox.y + bbox.height / 2 - 8})`}>
                  <IconComponent size={16} color={color} />
                </g>
              )}

              <text x={bbox.x + (IconComponent ? 40 : 20)} y={bbox.y + bbox.height / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#1e40af">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={bbox.x + (IconComponent ? 40 : 20)} dy={lineIndex === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {/* Primary Activities (Vertical Columns) */}
      {primary.map((act, index) => {
        const elementId = `primary-${index}`
        const x = startX + index * (primaryColW + 8)
        const defaultRect = { x, y: primaryTopY, width: primaryColW, height: primaryH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const defaultColor = act.color || PRIMARY_COLORS[index % PRIMARY_COLORS.length]!
        const color = tplColors[elementId] ?? defaultColor
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = act.icon ? TEMPLATE_ICONS[act.icon] : undefined

        const centerCx = bbox.x + bbox.width / 2
        const maxChars = Math.max(6, Math.floor((bbox.width - 20) / 8))
        const nameLines = wrapTextByWidth(act.title, maxChars)
        const descLines = act.subtitle ? wrapTextByWidth(act.subtitle, maxChars) : []

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={6} rx={3} fill={color} />

              <circle cx={centerCx} cy={bbox.y + 32} r={18} fill={color} opacity={0.15} />
              {IconComponent ? (
                <g transform={`translate(${centerCx - 9}, ${bbox.y + 23})`}>
                  <IconComponent size={18} color={color} />
                </g>
              ) : (
                <text x={centerCx} y={bbox.y + 37} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>
                  {index + 1}
                </text>
              )}

              <text x={centerCx} y={bbox.y + 74} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1a202c">
                {nameLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={centerCx} dy={lineIndex === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>

              {act.subtitle && (
                <text x={centerCx} y={bbox.y + 74 + nameLines.length * 13 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#64748b">
                  {descLines.map((line, lineIndex) => (
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

      {/* Margin Right Wedge */}
      {(() => {
        const marginId = 'margin-wedge'
        const mx = startX + mainW + 12
        const defaultRect = { x: mx, y: startY, width: marginW, height: totalH }
        const customPos = positions[marginId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(marginId)
        const wedgeColor = tplColors[marginId] || '#f59e0b'
        const strokeColor = tplStrokeColors[marginId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[marginId] ?? (isSelected ? 2.5 : 0)

        const topX = bbox.x
        const topY = bbox.y
        const tipX = bbox.x + bbox.width
        const tipY = bbox.y + bbox.height / 2
        const botX = bbox.x
        const botY = bbox.y + bbox.height

        const pathD = `M ${topX} ${topY} L ${tipX} ${tipY} L ${botX} ${botY} Z`

        return (
          <g
            key={marginId}
            data-element-id={marginId}
            onMouseDown={e => startDrag(e, marginId, bbox)}
            transform={getTransform(marginId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path d={pathD} fill={wedgeColor} opacity={0.9} stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x={bbox.x + bbox.width * 0.35} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={800} fill="white" transform={`rotate(90, ${bbox.x + bbox.width * 0.35}, ${bbox.y + bbox.height / 2 + 5})`}>
              MARGIN
            </text>
            {isSelected && renderHandles(bbox, marginId)}
          </g>
        )
      })()}
    </g>
  )
}