import { useRef, type ReactElement } from 'react'
import type { GoalsData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

function getDynamicIcon(iconName?: string) {
  if (!iconName) return null
  const clean = iconName.trim()
  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? 16} color={props.color ?? '#333'} />
  }
  return null
}

export function Goals4Template({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { metrics } = data
  const barMaxW = 420
  const barH = 38
  const gap = 34
  const startX = 260
  const startY = 70

  return (
    <g ref={svgRef}>
      {metrics.slice(0, 6).map((metric, i) => {
        const elementId = `bar-${i}`
        const targetNum = parseFloat(metric.target.replace(/[^0-9.]/g, '')) || 100
        const valueNum = parseFloat(metric.value.replace(/[^0-9.]/g, '')) || 0
        const pct = Math.min(valueNum / targetNum, 1)

        const defaultBbox = { x: startX, y: startY + i * (barH + gap), width: barMaxW, height: barH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const barWidth = pct * bbox.width
        const defaultFill = pct >= 0.8 ? '#2ecc71' : pct >= 0.5 ? '#f39c12' : '#e74c3c'
        const fillColor = tplColors[elementId] ?? metric.color ?? defaultFill
        const isSelected = selectedIds.has(elementId)
        const stroke = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 0)

        const maxChars = 24
        const labelLines = wrapTextByWidth(metric.label, maxChars)
        const IconFn = getDynamicIcon(metric.icon)

        return (
          <g key={i}>
            {/* Label on the left */}
            <g transform={`translate(${bbox.x - 18}, ${bbox.y + bbox.height / 2})`}>
              {IconFn && (
                <g transform="translate(-24, -8)">
                  <IconFn size={16} color={fillColor} />
                </g>
              )}
              <text x={0} y={4 - (labelLines.length - 1) * 6} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#1e293b">
                {labelLines.map((line, li) => (
                  <tspan key={li} x={0} dy={li === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>

            {/* Interactive Progress Bar */}
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              {/* Background track */}
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth={1} />

              {/* Progress fill */}
              <rect x={bbox.x} y={bbox.y} width={barWidth} height={bbox.height} rx={8} fill={fillColor} opacity={0.9} stroke={stroke} strokeWidth={strokeWidth} />

              {/* Percentage label */}
              <text x={bbox.x + barWidth / 2} y={bbox.y + bbox.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={800} fill="white">
                {Math.round(pct * 100)}%
              </text>

              {isSelected && renderHandles(bbox, elementId)}
            </g>

            {/* Value / Target on the right */}
            <text x={bbox.x + bbox.width + 16} y={bbox.y + bbox.height / 2 + 4} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#64748b">
              {metric.value} / {metric.target}
              {metric.change && (
                <tspan dx={8} fontWeight={700} fill={metric.change.startsWith('+') ? '#16a34a' : '#dc2626'}>
                  {metric.change}
                </tspan>
              )}
            </text>
          </g>
        )
      })}
    </g>
  )
}
