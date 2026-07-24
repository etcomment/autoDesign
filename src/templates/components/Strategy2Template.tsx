import { useRef, type ReactElement } from 'react'
import type { Strategy2Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Strategy2Template({ data }: { data: Strategy2Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const toggleElement = useTemplateStore(s => s.toggleTemplateElement)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, blocks } = data
  const W = 940
  const H = 520
  const minW = 260
  const maxW = 620
  const blockH = 48
  const gap = 6
  const topBlockY = 100

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {blocks.map((block, index) => {
        const elementId = `block-${index}`
        const color = tplColors[elementId] ?? PALETTE[index % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const blockW = blocks.length > 1
          ? minW + (index / (blocks.length - 1)) * (maxW - minW)
          : (minW + maxW) / 2
        const bx = (W - blockW) / 2
        const by = topBlockY + index * (blockH + gap)
        const visualRect = { x: bx, y: by, width: blockW, height: blockH }

        const labelY1 = by + blockH / 2 - 5
        const labelY2 = by + blockH / 2 + 12

        return (
          <g key={index}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} onClick={e => { e.stopPropagation(); toggleElement(elementId); }} style={{ cursor: 'pointer' }}>
              <rect x={bx} y={by} width={blockW} height={blockH} rx={6} fill={color} />

              {isSelected && (
                <rect x={bx - 1} y={by - 1} width={blockW + 2} height={blockH + 2} rx={6} fill="none" stroke="#4a90d9" strokeWidth={2.5} strokeDasharray="4 2" />
              )}

              <text x={bx + blockW / 2} y={labelY1} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                {block.number} {block.title.length > 24 ? block.title.slice(0, 22) + '...' : block.title}
              </text>

              {block.subtitle && (
                <text x={bx + blockW / 2} y={labelY2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.8)">
                  {block.subtitle.length > 36 ? block.subtitle.slice(0, 34) + '...' : block.subtitle}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
