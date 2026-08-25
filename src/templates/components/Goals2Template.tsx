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
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? 14} color={props.color ?? '#4caf50'} />
  }
  return null
}

export function Goals2Template({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { centerGoal, metrics } = data
  const W = 900
  const peakX = W / 2
  const peakY = 110
  const baseY = 450
  const halfBase = 320

  const pathD = `M ${peakX - halfBase} ${baseY} L ${peakX - halfBase * 0.5} ${peakY + 140} L ${peakX - halfBase * 0.2} ${peakY + 60} L ${peakX} ${peakY} L ${peakX + halfBase * 0.2} ${peakY + 60} L ${peakX + halfBase * 0.5} ${peakY + 140} L ${peakX + halfBase} ${baseY} Z`

  const goalId = 'goal-peak'
  const defaultGoalBbox = { x: peakX - 80, y: peakY - 30, width: 160, height: 75 }
  const customGoalPos = positions[goalId]
  const goalBbox = {
    x: customGoalPos?.x ?? defaultGoalBbox.x,
    y: customGoalPos?.y ?? defaultGoalBbox.y,
    width: customGoalPos?.width ?? defaultGoalBbox.width,
    height: customGoalPos?.height ?? defaultGoalBbox.height,
  }
  const isGoalSelected = selectedIds.has(goalId)
  const goalFill = tplColors[goalId] ?? '#4caf50'
  const goalStroke = tplStrokeColors[goalId] || (isGoalSelected ? '#4a90d9' : 'none')
  const goalStrokeW = tplStrokeWidths[goalId] !== undefined ? tplStrokeWidths[goalId] : (isGoalSelected ? 2.5 : 0)

  const goalMaxChars = Math.max(10, Math.floor(goalBbox.width / 7.5))
  const goalLines = wrapTextByWidth(centerGoal, goalMaxChars)

  const stepPositions = metrics.slice(0, 4).map((_, i) => {
    const t = 0.15 + i * 0.23
    const sx = peakX - halfBase + (i + 1) * (halfBase * 2) / 5
    const sy = peakY + (baseY - peakY) * (1 - t) + i * 40
    return { x: sx, y: sy }
  })

  return (
    <g ref={svgRef}>
      <path d={pathD} fill="#e8f5e9" stroke="#4caf50" strokeWidth={2} opacity={0.6} />

      {/* Flag at peak */}
      <polygon points={`${peakX - 16},${peakY + 8} ${peakX + 16},${peakY + 8} ${peakX},${peakY - 16}`} fill="#4caf50" />
      <rect x={peakX - 16} y={peakY - 2} width={12} height={20} rx={1} fill="#4caf50" />

      {/* Goal Peak — Interactive */}
      <g
        data-element-id={goalId}
        onMouseDown={e => startDrag(e, goalId, goalBbox)}
        transform={getTransform(goalId, goalBbox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={goalBbox.x} y={goalBbox.y} width={goalBbox.width} height={goalBbox.height} rx={10} fill="white" stroke={goalStroke || goalFill} strokeWidth={goalStrokeW || 2} filter="drop-shadow(0 2px 8px rgba(0,0,0,0.10))" />
        <rect x={goalBbox.x} y={goalBbox.y} width={goalBbox.width} height={6} rx={3} fill={goalFill} />
        <text x={goalBbox.x + goalBbox.width / 2} y={goalBbox.y + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={800} fill={goalFill} letterSpacing="1px">
          GOAL
        </text>
        <text x={goalBbox.x + goalBbox.width / 2} y={goalBbox.y + 36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#1a1a2e">
          {goalLines.map((line, li) => (
            <tspan key={li} x={goalBbox.x + goalBbox.width / 2} dy={li === 0 ? 0 : 13}>
              {line}
            </tspan>
          ))}
        </text>
        {isGoalSelected && renderHandles(goalBbox, goalId)}
      </g>

      {metrics.slice(0, 4).map((metric, i) => {
        const elementId = `step-${i}`
        const pos = stepPositions[i]!
        const boxW = 140
        const boxH = 56
        const defaultBbox = { x: pos.x - boxW / 2, y: pos.y - boxH / 2, width: boxW, height: boxH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const isSelected = selectedIds.has(elementId)
        const color = tplColors[elementId] ?? metric.color ?? '#4caf50'
        const stroke = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#4caf50')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 1.5)

        const maxChars = Math.max(10, Math.floor(bbox.width / 7))
        const labelLines = wrapTextByWidth(metric.label, maxChars)
        const IconFn = getDynamicIcon(metric.icon)

        return (
          <g key={i}>
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
    </g>
  )
}
