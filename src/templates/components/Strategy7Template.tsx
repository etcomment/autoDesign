import { useRef, type ReactElement } from 'react'
import type { StrategyData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'
import { wrapTextByWidth } from '../shared/primitives'

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
  const cx = W / 2
  const cy = 340
  const rings = [
    { r: 210, w: 170, count: 2 },
    { r: 140, w: 110, count: 2 },
    { r: 80, w: 55, count: 2 },
  ]

  const ringColor = (ri: number): string => MIGSO_PALETTE[ri % MIGSO_PALETTE.length]!
  const slots = rings.flatMap((ring, ri) =>
    Array.from({ length: ring.count }, (_, s) => ({ ri, ring, within: s })),
  )

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

        const rad = ((slot.within / ring.count) * 360 - 90) * (Math.PI / 180)
        const itemR = ring.r - ring.w / 2
        const defaultX = cx + Math.cos(rad) * itemR
        const defaultY = cy + Math.sin(rad) * itemR + 30
        const defaultBbox = { x: defaultX, y: defaultY, width: 110, height: 46 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const IconFn = block.icon ? TEMPLATE_ICONS[block.icon] : undefined
        const labelX = IconFn ? bbox.x + 28 : bbox.x + bbox.width / 2
        const labelAnchor = IconFn ? 'start' : 'middle'
        const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
        const titleLines = wrapTextByWidth(`${block.number}. ${block.title}`, maxChars)
        const subLines = block.subtitle ? wrapTextByWidth(block.subtitle, maxChars) : []
        const subY = bbox.y + 15 + titleLines.length * 13 + 4

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
              <g transform={`translate(${bbox.x + 8}, ${bbox.y + bbox.height / 2 - 7})`}>
                <IconFn size={14} color="white" />
              </g>
            )}
            <text x={labelX} y={bbox.y + 15} textAnchor={labelAnchor} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
              {titleLines.map((line, li) => (
                <tspan key={li} x={labelX} dy={li === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            {subLines.length > 0 && (
              <text x={bbox.x + 8} y={subY} fontFamily="Arial, sans-serif" fontSize={9} fill="rgba(255,255,255,0.85)">
                {subLines.map((line, li) => (
                  <tspan key={li} x={bbox.x + 8} dy={li === 0 ? 0 : 11}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}
            {block.value && (
              <text x={bbox.x + bbox.width - 6} y={bbox.y + 18} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                {block.value}
              </text>
            )}
            {block.percent && (
              <text x={bbox.x + bbox.width - 6} y={bbox.y + bbox.height - 12} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                {block.percent}
              </text>
            )}
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={24} fill={ringColor(0)} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
        Core
      </text>
    </g>
  )
}
