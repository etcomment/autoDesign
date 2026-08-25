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

export function Goals5Template({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { metrics } = data
  const W = 1000
  const thermoW = 54
  const thermoH = 240
  const bulbR = 32
  const gap = 90
  const startY = 80
  const count = Math.min(metrics.length, 4)
  const totalW = count * thermoW + (count - 1) * gap
  const startX = (W - totalW) / 2

  return (
    <g ref={svgRef}>
      {metrics.slice(0, count).map((metric, i) => {
        const elementId = `thermo-${i}`
        const targetNum = parseFloat(metric.target.replace(/[^0-9.]/g, '')) || 100
        const valueNum = parseFloat(metric.value.replace(/[^0-9.]/g, '')) || 0
        const pct = Math.min(valueNum / targetNum, 1)
        const x = startX + i * (thermoW + gap)

        const defaultBbox = { x: x - thermoW / 2 - 40, y: startY, width: thermoW + 80, height: thermoH + 100 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const centerThermoX = bbox.x + bbox.width / 2
        const tubeH = thermoH - bulbR
        const fillH = pct * tubeH
        const defaultFill = pct >= 0.8 ? '#2ecc71' : pct >= 0.5 ? '#f39c12' : '#e74c3c'
        const fillColor = tplColors[elementId] ?? metric.color ?? defaultFill
        const isSelected = selectedIds.has(elementId)
        const stroke = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 0)

        const maxChars = 18
        const labelLines = wrapTextByWidth(metric.label, maxChars)
        const IconFn = getDynamicIcon(metric.icon)

        return (
          <g key={i}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              {/* Thermometer glass background tube & bulb */}
              <rect x={centerThermoX - thermoW / 2 + 6} y={bbox.y} width={thermoW - 12} height={tubeH} rx={thermoW / 2 - 6} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth={1.5} />
              <circle cx={centerThermoX} cy={bbox.y + tubeH} r={bulbR} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth={1.5} />

              {/* Target Line */}
              <line x1={centerThermoX - thermoW / 2 - 14} y1={bbox.y + tubeH * 0.15} x2={centerThermoX + thermoW / 2 + 14} y2={bbox.y + tubeH * 0.15} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="3 3" />
              <text x={centerThermoX + thermoW / 2 + 18} y={bbox.y + tubeH * 0.15 + 4} fontFamily="Arial, sans-serif" fontSize={9} fontWeight={700} fill="#94a3b8">
                TARGET
              </text>

              {/* Liquid fill */}
              {fillH > 0 && (
                <>
                  <rect x={centerThermoX - thermoW / 2 + 6} y={bbox.y + tubeH - fillH} width={thermoW - 12} height={fillH} rx={fillH >= tubeH - 6 ? thermoW / 2 - 6 : 0} fill={fillColor} opacity={0.9} stroke={stroke} strokeWidth={strokeWidth} />
                  <circle cx={centerThermoX} cy={bbox.y + tubeH} r={bulbR - 2} fill={fillColor} opacity={0.9} />
                </>
              )}

              {/* Percentage label in bulb */}
              <text x={centerThermoX} y={bbox.y + tubeH + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={800} fill="white">
                {Math.round(pct * 100)}%
              </text>

              {/* Icon if provided */}
              {IconFn && (
                <g transform={`translate(${centerThermoX - 8}, ${bbox.y - 24})`}>
                  <IconFn size={16} color={fillColor} />
                </g>
              )}

              {/* Metric Label & Target info */}
              <text x={centerThermoX} y={bbox.y + tubeH + bulbR + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#1e293b">
                {labelLines.map((line, li) => (
                  <tspan key={li} x={centerThermoX} dy={li === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
              <text x={centerThermoX} y={bbox.y + tubeH + bulbR + 24 + labelLines.length * 14 + 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#64748b">
                {metric.value} / {metric.target}
                {metric.change && (
                  <tspan dx={6} fontWeight={700} fill={metric.change.startsWith('+') ? '#16a34a' : '#dc2626'}>
                    {metric.change}
                  </tspan>
                )}
              </text>

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
