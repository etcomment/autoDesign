import { useRef, type ReactElement } from 'react'
import type { StrategyData } from '../types'
import { Arrow, wrapTextByWidth } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const STEP_W = 190
const STEP_H = 64
const STEP_GAP = 28
const STEP_OFFSET_X = 65
const START_Y = 60

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

export function Strategy8Template({ data }: { data: StrategyData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { blocks } = data
  const count = Math.min(blocks.length, 6)
  const visibleBlocks = blocks.slice(0, count)

  const rects = visibleBlocks.map((block, index) => {
    const elementId = `step-${index}`
    const sx = 40 + index * STEP_OFFSET_X
    const sy = START_Y + index * (STEP_H + STEP_GAP)
    const customPos = positions[elementId]
    return {
      elementId,
      block,
      bbox: {
        x: customPos?.x ?? sx,
        y: customPos?.y ?? sy,
        width: customPos?.width ?? STEP_W,
        height: customPos?.height ?? STEP_H,
      },
    }
  })

  const stepColor = (index: number, block: { color?: string }): string =>
    tplColors[rects[index]!.elementId] ?? block.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!

  return (
    <g ref={svgRef}>
      {rects.map(({ elementId, block, bbox }, index) => {
        const color = stepColor(index, block)
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2 : 0)
        const IconFn = getDynamicIcon(block.icon)
        const labelX = IconFn ? bbox.x + 32 : bbox.x + bbox.width / 2
        const labelAnchor = IconFn ? 'start' : 'middle'
        const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
        const titleLabel = [block.number ? `${block.number}.` : '', block.title].filter(Boolean).join(' ')
        const titleLines = wrapTextByWidth(titleLabel, maxChars)
        const subLines = block.subtitle ? wrapTextByWidth(block.subtitle, maxChars) : []
        const titleBaseY = bbox.y + (subLines.length > 0 ? 18 : bbox.height / 2 + 4)
        const subY = titleBaseY + 4 + titleLines.length * 13

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} opacity={isSelected ? 1 : 0.9} stroke={strokeColor} strokeWidth={strokeWidth} />
            {IconFn && (
              <g transform={`translate(${bbox.x + 8}, ${bbox.y + bbox.height / 2 - 8})`}>
                <IconFn size={16} color="white" />
              </g>
            )}
            <text x={labelX} y={titleBaseY} textAnchor={labelAnchor} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
              {titleLines.map((line, li) => (
                <tspan key={li} x={labelX} dy={li === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            {subLines.length > 0 && (
              <text x={bbox.x + bbox.width / 2} y={subY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.85)">
                {subLines.map((line, li) => (
                  <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}
            {block.value && (
              <text x={bbox.x + bbox.width - 10} y={bbox.y + 16} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                {block.value}
              </text>
            )}
            {block.percent && (
              <text x={bbox.x + bbox.width - 10} y={bbox.y + bbox.height - 10} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                {block.percent}
              </text>
            )}
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      {rects.slice(0, -1).map((rect, i) => {
        const next = rects[i + 1]!
        return (
          <Arrow
            key={`arrow-${i}`}
            from={{ x: rect.bbox.x + rect.bbox.width / 2, y: rect.bbox.y + rect.bbox.height }}
            to={{ x: next.bbox.x + next.bbox.width / 2, y: next.bbox.y }}
            color={stepColor(i, rect.block)}
          />
        )
      })}
    </g>
  )
}
