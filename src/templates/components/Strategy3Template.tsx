import { useRef, type ReactElement } from 'react'
import type { Strategy3Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'
import { wrapTextByWidth } from '../shared/primitives'

function getDynamicIcon(iconName?: string) {
  if (!iconName) return null
  const clean = iconName.trim()
  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? 16} color={props.color ?? 'white'} />
  }
  return null
}

export function Strategy3Template({ data }: { data: Strategy3Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { blocks } = data
  const W = 1000
  const defaultCx = W / 2
  const defaultCy = 290
  const hubR = 50
  const spokeLen = 185
  const cardW = 160
  const cardH = 80
  const count = Math.max(1, blocks.length)
  const angleStep = (2 * Math.PI) / count
  const startAngle = -Math.PI / 2

  const hubId = 'center-hub'
  const defaultHubBbox = { x: defaultCx - hubR, y: defaultCy - hubR, width: hubR * 2, height: hubR * 2 }
  const customHubPos = positions[hubId]
  const hubBbox = {
    x: customHubPos?.x ?? defaultHubBbox.x,
    y: customHubPos?.y ?? defaultHubBbox.y,
    width: customHubPos?.width ?? defaultHubBbox.width,
    height: customHubPos?.height ?? defaultHubBbox.height,
  }
  const isHubSelected = selectedIds.has(hubId)
  const hubColor = tplColors[hubId] ?? '#ececf2'
  const hubStroke = tplStrokeColors[hubId] || (isHubSelected ? '#4a90d9' : '#d2d2dc')
  const hubStrokeW = tplStrokeWidths[hubId] !== undefined ? tplStrokeWidths[hubId] : (isHubSelected ? 2.5 : 1.5)
  const hubCx = hubBbox.x + hubBbox.width / 2
  const hubCy = hubBbox.y + hubBbox.height / 2
  const effectiveHubR = Math.min(hubBbox.width, hubBbox.height) / 2

  return (
    <g ref={svgRef}>
      {/* Center Hub — Interactive */}
      <g
        data-element-id={hubId}
        onMouseDown={e => startDrag(e, hubId, hubBbox)}
        transform={getTransform(hubId, hubBbox)}
        style={{ cursor: 'pointer' }}
      >
        <circle cx={hubCx} cy={hubCy} r={effectiveHubR} fill={hubColor} stroke={hubStroke} strokeWidth={hubStrokeW} />
        <circle cx={hubCx} cy={hubCy} r={Math.max(10, effectiveHubR - 14)} fill="#e2e2ea" stroke="#c6c6d2" strokeWidth={1} strokeDasharray="3 2" />
        <text x={hubCx} y={hubCy - 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
          Core Focus
        </text>
        <text x={hubCx} y={hubCy + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#777">
          Strategy Hub
        </text>
        {isHubSelected && renderHandles(hubBbox, hubId)}
      </g>

      {blocks.map((block, index) => {
        const elementId = `block-${index}`
        const color = tplColors[elementId] ?? block.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 1)
        const angle = startAngle + index * angleStep
        const cardCx = hubCx + spokeLen * Math.cos(angle)
        const cardCy = hubCy + spokeLen * Math.sin(angle)
        const defaultBbox = { x: cardCx - cardW / 2, y: cardCy - cardH / 2, width: cardW, height: cardH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const cardCenterX = bbox.x + bbox.width / 2
        const cardCenterY = bbox.y + bbox.height / 2
        const currentHubAngle = Math.atan2(cardCenterY - hubCy, cardCenterX - hubCx)
        const spokeX = hubCx + effectiveHubR * Math.cos(currentHubAngle)
        const spokeY = hubCy + effectiveHubR * Math.sin(currentHubAngle)
        const IconFn = getDynamicIcon(block.icon)
        const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
        const titleLines = wrapTextByWidth(block.title, maxChars)
        const subtitleLines = block.subtitle ? wrapTextByWidth(block.subtitle, maxChars) : []

        return (
          <g key={elementId}>
            <line x1={spokeX} y1={spokeY} x2={cardCenterX} y2={cardCenterY} stroke={color} strokeWidth={2} strokeOpacity={0.6} />

            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} fillOpacity={0.14} stroke={strokeColor} strokeWidth={strokeWidth} strokeDasharray={isSelected ? '4 2' : undefined} />

              <circle cx={bbox.x + 18} cy={bbox.y + 18} r={12} fill={color} />
              {IconFn ? (
                <g transform={`translate(${bbox.x + 10}, ${bbox.y + 10})`}>
                  <IconFn size={16} color="white" />
                </g>
              ) : (
                <text x={bbox.x + 18} y={bbox.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                  {block.number || String(index + 1)}
                </text>
              )}

              {block.number && IconFn && (
                <text x={bbox.x + bbox.width - 10} y={bbox.y + 18} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={color}>
                  {block.number}
                </text>
              )}

              <text x={cardCenterX} y={bbox.y + 36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#222">
                {titleLines.map((line, li) => (
                  <tspan key={li} x={cardCenterX} dy={li === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>

              {subtitleLines.length > 0 && (
                <text x={cardCenterX} y={bbox.y + 36 + titleLines.length * 13 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#666">
                  {subtitleLines.map((line, li) => (
                    <tspan key={li} x={cardCenterX} dy={li === 0 ? 0 : 11}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {(block.value || block.percent) && (
                <text x={cardCenterX} y={bbox.y + bbox.height - 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={color}>
                  {[block.value, block.percent].filter(Boolean).join(' · ')}
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
