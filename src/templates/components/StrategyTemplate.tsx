import { useRef, type ReactElement } from 'react'
import type { StrategyData } from '../types'
import { ChevronArrow, Arrow, wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

function getDynamicIcon(iconName?: string) {
  if (!iconName) return null
  const clean = iconName.trim()
  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? 24} color={props.color ?? 'white'} />
  }
  return null
}

export function StrategyTemplate({ data }: { data: StrategyData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { blocks } = data
  const W = 1000
  const blockW = 170
  const blockH = 64
  const gap = 24
  const totalWidth = blocks.length * blockW + (blocks.length - 1) * gap
  const startX = (W - totalWidth) / 2
  const blockY = 200

  const getBbox = (elementId: string, index: number) => {
    const pos = positions[elementId]
    const defaultX = startX + index * (blockW + gap)
    return {
      x: pos?.x ?? defaultX,
      y: pos?.y ?? blockY,
      width: pos?.width ?? blockW,
      height: pos?.height ?? blockH,
    }
  }

  return (
    <g ref={svgRef}>
      {blocks.map((block, index) => {
        const elementId = `block-${index}`
        const color = tplColors[elementId] ?? block.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2 : 0)
        const bbox = getBbox(elementId, index)
        const nextBbox = index < blocks.length - 1 ? getBbox(`block-${index + 1}`, index + 1) : null
        const IconFn = getDynamicIcon(block.icon)
        const hasIcon = !!IconFn
        const textX = bbox.x + bbox.width / 2 + (hasIcon ? 12 : 0)
        const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
        const titleLines = wrapTextByWidth(block.title, maxChars)
        const subtitleLines = block.subtitle ? wrapTextByWidth(block.subtitle, maxChars) : []

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <ChevronArrow x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />

              {IconFn && (
                <g transform={`translate(${bbox.x + 22}, ${bbox.y + bbox.height / 2 - 14})`}>
                  <IconFn size={28} color="white" />
                </g>
              )}

              {block.number && (
                <text
                  x={textX}
                  y={bbox.y + 18}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={11}
                  fontWeight={700}
                  fill="white"
                >
                  {block.number}
                </text>
              )}

              <text
                x={textX}
                y={bbox.y + (block.number ? 32 : 24)}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fontWeight={600}
                fill="white"
                opacity={0.95}
              >
                {titleLines.map((line, li) => (
                  <tspan key={li} x={textX} dy={li === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>

              {(block.value || block.percent) && (
                <text
                  x={textX}
                  y={bbox.y + bbox.height - 6}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={9}
                  fontWeight={700}
                  fill="white"
                  opacity={0.9}
                >
                  {[block.value, block.percent].filter(Boolean).join(' · ')}
                </text>
              )}

              {subtitleLines.length > 0 && (
                <text
                  x={bbox.x + bbox.width / 2}
                  y={bbox.y + bbox.height + 16}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={9}
                  fill="#666"
                >
                  {subtitleLines.map((line, li) => (
                    <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSelected && (
                <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={2} fill="none" stroke="#4a90d9" strokeWidth={2.5} strokeDasharray="4 2" />
              )}
              {isSelected && renderHandles(bbox, elementId)}
            </g>

            {nextBbox && (
              <Arrow
                from={{ x: bbox.x + bbox.width + 2, y: bbox.y + bbox.height / 2 }}
                to={{ x: nextBbox.x - 2, y: nextBbox.y + nextBbox.height / 2 }}
                color={color}
              />
            )}
          </g>
        )
      })}
    </g>
  )
}
