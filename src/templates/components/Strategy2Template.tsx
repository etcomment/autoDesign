import { useRef, type ReactElement } from 'react'
import type { Strategy2Data } from '../types'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Strategy2Template({ data }: { data: Strategy2Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { blocks } = data
  const W = 940
  const minW = 260
  const maxW = 620
  const blockH = 48
  const gap = 6
  const topBlockY = 100

  const getBlockW = (index: number) =>
    blocks.length > 1
      ? minW + (index / (blocks.length - 1)) * (maxW - minW)
      : (minW + maxW) / 2

  const getBbox = (elementId: string, index: number) => {
    const blockW = getBlockW(index)
    const defaultX = (W - blockW) / 2
    const defaultY = topBlockY + index * (blockH + gap)
    const pos = positions[elementId]
    return {
      x: pos?.x ?? defaultX,
      y: pos?.y ?? defaultY,
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
        const Icon = block.icon ? TEMPLATE_ICONS[block.icon] : undefined
        const badge = block.value ?? block.percent
        const titleX = bbox.x + bbox.width / 2 + (Icon ? 10 : 0)
        const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
        const titleLines = wrapTextByWidth(`${block.number} ${block.title}`, maxChars)
        const subtitleLines = block.subtitle ? wrapTextByWidth(block.subtitle, maxChars) : []

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
              {Icon && (
                <g transform={`translate(${bbox.x + 14}, ${bbox.y + bbox.height / 2 - 7})`}>
                  <Icon size={14} color="white" />
                </g>
              )}
              <text
                x={titleX}
                y={bbox.y + 18}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fontWeight={700}
                fill="white"
              >
                {titleLines.map((line, li) => (
                  <tspan key={li} x={titleX} dy={li === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
              {block.subtitle && (
                <text
                  x={bbox.x + bbox.width / 2}
                  y={bbox.y + 34}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={10}
                  fill="rgba(255,255,255,0.8)"
                >
                  {subtitleLines.map((line, li) => (
                    <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
              {badge && (
                <g transform={`translate(${bbox.x + bbox.width - 26}, ${bbox.y + 12})`}>
                  <rect x={-14} y={-9} width={28} height={18} rx={9} fill="white" opacity={0.85} />
                  <text x={0} y={3} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fontWeight={700} fill={color}>
                    {badge}
                  </text>
                </g>
              )}
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
