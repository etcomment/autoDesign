import { useRef, type ReactElement } from 'react'
import type { StrategyData } from '../types'
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

export function Strategy7Template({ data }: { data: StrategyData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { blocks } = data
  const W = 800
  const defaultCx = W / 2
  const defaultCy = 290
  const rings = [
    { r: 210, w: 170, count: 2 },
    { r: 140, w: 110, count: 2 },
    { r: 80, w: 55, count: 2 },
  ]

  const ringColor = (ri: number): string => MIGSO_PALETTE[ri % MIGSO_PALETTE.length]!
  const slots = rings.flatMap((ring, ri) =>
    Array.from({ length: ring.count }, (_, s) => ({ ri, ring, within: s })),
  )

  const coreId = 'center-core'
  const defaultCoreBbox = { x: defaultCx - 30, y: defaultCy - 30, width: 60, height: 60 }
  const customCorePos = positions[coreId]
  const coreBbox = {
    x: customCorePos?.x ?? defaultCoreBbox.x,
    y: customCorePos?.y ?? defaultCoreBbox.y,
    width: customCorePos?.width ?? defaultCoreBbox.width,
    height: customCorePos?.height ?? defaultCoreBbox.height,
  }
  const isCoreSelected = selectedIds.has(coreId)
  const cx = coreBbox.x + coreBbox.width / 2
  const cy = coreBbox.y + coreBbox.height / 2
  const coreR = Math.min(coreBbox.width, coreBbox.height) / 2
  const coreColor = tplColors[coreId] ?? ringColor(0)
  const coreStroke = tplStrokeColors[coreId] || (isCoreSelected ? '#4a90d9' : 'none')
  const coreStrokeW = tplStrokeWidths[coreId] !== undefined ? tplStrokeWidths[coreId] : (isCoreSelected ? 2.5 : 0)

  return (
    <g ref={svgRef}>
      {rings.map((ring, ri) => (
        <g key={`ring-${ri}`}>
          <circle cx={cx} cy={cy} r={ring.r} fill="none" stroke={ringColor(ri)} strokeWidth={2} opacity={0.3} />
          <circle cx={cx} cy={cy} r={ring.r - ring.w / 2} fill={ringColor(ri)} opacity={0.06} stroke={ringColor(ri)} strokeWidth={1.5} strokeDasharray="8 4" />
        </g>
      ))}

      {blocks.map((block, index) => {
        const slot = slots[index % slots.length]!
        const ring = slot.ring
        const elementId = `block-${index}`
        const color = tplColors[elementId] ?? block.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2 : 0)

        const rad = ((slot.within / ring.count) * 360 - 90 + (slot.ri * 35)) * (Math.PI / 180)
        const itemR = ring.r - ring.w / 2
        const defaultX = cx + Math.cos(rad) * itemR - 60
        const defaultY = cy + Math.sin(rad) * itemR - 25
        const defaultBbox = { x: defaultX, y: defaultY, width: 120, height: 50 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const IconFn = getDynamicIcon(block.icon)
        const labelX = IconFn ? bbox.x + 30 : bbox.x + bbox.width / 2
        const labelAnchor = IconFn ? 'start' : 'middle'
        const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
        const titleLabel = [block.number ? `${block.number}.` : '', block.title].filter(Boolean).join(' ')
        const titleLines = wrapTextByWidth(titleLabel, maxChars)
        const subLines = block.subtitle ? wrapTextByWidth(block.subtitle, maxChars) : []

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            {IconFn && (
              <g transform={`translate(${bbox.x + 8}, ${bbox.y + bbox.height / 2 - 8})`}>
                <IconFn size={16} color="white" />
              </g>
            )}
            <text x={labelX} y={bbox.y + (subLines.length > 0 ? 16 : bbox.height / 2 + 4)} textAnchor={labelAnchor} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
              {titleLines.map((line, li) => (
                <tspan key={li} x={labelX} dy={li === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            {subLines.length > 0 && (
              <text x={bbox.x + bbox.width / 2} y={bbox.y + 16 + titleLines.length * 13 + 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="rgba(255,255,255,0.9)">
                {subLines.map((line, li) => (
                  <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 11}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}
            {block.value && (
              <text x={bbox.x + bbox.width - 6} y={bbox.y + 16} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                {block.value}
              </text>
            )}
            {block.percent && (
              <text x={bbox.x + bbox.width - 6} y={bbox.y + bbox.height - 8} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                {block.percent}
              </text>
            )}
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      {/* Center Core — Interactive */}
      <g
        data-element-id={coreId}
        onMouseDown={e => startDrag(e, coreId, coreBbox)}
        transform={getTransform(coreId, coreBbox)}
        style={{ cursor: 'pointer' }}
      >
        <circle cx={cx} cy={cy} r={coreR} fill={coreColor} stroke={coreStroke} strokeWidth={coreStrokeW} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
          Core
        </text>
        {isCoreSelected && renderHandles(coreBbox, coreId)}
      </g>
    </g>
  )
}
