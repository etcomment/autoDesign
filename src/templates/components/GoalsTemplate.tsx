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
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? 14} color={props.color ?? '#4a90d9'} />
  }
  return null
}

export function GoalsTemplate({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { centerGoal, metrics } = data
  const W = 900
  const H = 600
  const defaultCx = W / 2
  const defaultCy = H / 2
  const ringColors = ['#e8f4fd', '#cce5ff', '#99ccff', '#66b2ff', '#3399ff']

  const centerId = 'center-goal'
  const defaultCenterBbox = { x: defaultCx - 45, y: defaultCy - 45, width: 90, height: 90 }
  const customCenterPos = positions[centerId]
  const centerBbox = {
    x: customCenterPos?.x ?? defaultCenterBbox.x,
    y: customCenterPos?.y ?? defaultCenterBbox.y,
    width: customCenterPos?.width ?? defaultCenterBbox.width,
    height: customCenterPos?.height ?? defaultCenterBbox.height,
  }
  const isCenterSelected = selectedIds.has(centerId)
  const cx = centerBbox.x + centerBbox.width / 2
  const cy = centerBbox.y + centerBbox.height / 2
  const centerR = Math.min(centerBbox.width, centerBbox.height) / 2
  const centerFill = tplColors[centerId] ?? '#1a1a2e'
  const centerStroke = tplStrokeColors[centerId] || (isCenterSelected ? '#4a90d9' : 'none')
  const centerStrokeW = tplStrokeWidths[centerId] !== undefined ? tplStrokeWidths[centerId] : (isCenterSelected ? 2.5 : 0)

  const centerMaxChars = Math.max(8, Math.floor(centerBbox.width / 7.5))
  const centerLines = wrapTextByWidth(centerGoal, centerMaxChars)
  const centerStartY = (centerBbox.height - (centerLines.length - 1) * 12) / 2 + 4 + centerBbox.y

  return (
    <g ref={svgRef}>
      {metrics.map((_, i) => {
        const r = 55 + i * 50
        const color = ringColors[i % ringColors.length]!
        const strokeColor = i === metrics.length - 1 ? '#4a90d9' : '#a0c4e8'
        return (
          <g key={`ring-${i}`}>
            <circle cx={cx} cy={cy} r={r} fill={color} stroke={strokeColor} strokeWidth={1.5} opacity={0.25 + i * 0.08} />
          </g>
        )
      })}

      {/* Target Arrow pointer */}
      <line x1={cx} y1={cy - centerR} x2={cx} y2={cy - 220} stroke="#4a90d9" strokeWidth={2} strokeDasharray="4 3" />
      <polygon points={`${cx - 6},${cy - 220} ${cx + 6},${cy - 220} ${cx},${cy - 236}`} fill="#4a90d9" />

      {/* Metric Cards & dynamic spoke lines */}
      {metrics.map((metric, i) => {
        const elementId = `metric-${i}`
        const angle = -1.2 + (i / Math.max(metrics.length - 1, 1)) * 2.4
        const r = 85 + i * 50
        const labelX = cx + r * Math.cos(angle)
        const labelY = cy + r * Math.sin(angle)
        const boxW = 120
        const boxH = 56
        const defaultBbox = { x: labelX - boxW / 2, y: labelY - boxH / 2, width: boxW, height: boxH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const isSelected = selectedIds.has(elementId)
        const color = tplColors[elementId] ?? metric.color ?? '#4a90d9'
        const stroke = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 1.5)

        const maxChars = Math.max(10, Math.floor(bbox.width / 7))
        const labelLines = wrapTextByWidth(metric.label, maxChars)
        const IconFn = getDynamicIcon(metric.icon)

        const cardCx = bbox.x + bbox.width / 2
        const cardCy = bbox.y + bbox.height / 2

        return (
          <g key={`label-${i}`}>
            <line x1={cx} y1={cy} x2={cardCx} y2={cardCy} stroke="#aaa" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill="white" stroke={stroke} strokeWidth={strokeWidth} filter="drop-shadow(0 2px 6px rgba(0,0,0,0.08))" />
              <rect x={bbox.x} y={bbox.y} width={4} height={bbox.height} rx={2} fill={color} />

              {IconFn && (
                <g transform={`translate(${bbox.x + bbox.width - 20}, ${bbox.y + 8})`}>
                  <IconFn size={13} color={color} />
                </g>
              )}

              <text x={bbox.x + 10} y={bbox.y + 16} fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="#1e293b">
                {labelLines.map((line, li) => (
                  <tspan key={li} x={bbox.x + 10} dy={li === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
              </text>
              <text x={bbox.x + 10} y={bbox.y + 16 + labelLines.length * 12 + 2} fontFamily="Arial, sans-serif" fontSize={9} fontWeight={600} fill="#64748b">
                {metric.value} {metric.target ? `/ ${metric.target}` : ''}
              </text>
              {metric.change && (
                <text x={bbox.x + bbox.width - 8} y={bbox.y + bbox.height - 6} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={9} fontWeight={700} fill={metric.change.startsWith('+') ? '#16a34a' : '#dc2626'}>
                  {metric.change}
                </text>
              )}
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {/* Center Goal — Interactive */}
      <g
        data-element-id={centerId}
        onMouseDown={e => startDrag(e, centerId, centerBbox)}
        transform={getTransform(centerId, centerBbox)}
        style={{ cursor: 'pointer' }}
      >
        <circle cx={cx} cy={cy} r={centerR} fill={centerFill} stroke={centerStroke} strokeWidth={centerStrokeW} />
        <text x={cx} y={centerStartY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
          {centerLines.map((line, li) => (
            <tspan key={li} x={cx} dy={li === 0 ? 0 : 13}>
              {line}
            </tspan>
          ))}
        </text>
        {isCenterSelected && renderHandles(centerBbox, centerId)}
      </g>
    </g>
  )
}
