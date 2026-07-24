import { useRef, type ReactElement } from 'react'
import type { StrategyData } from '../types'
import { ChevronArrow, Arrow } from '../shared/primitives'
import { LightbulbIcon } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function StrategyTemplate({ data }: { data: StrategyData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const toggleElement = useTemplateStore(s => s.toggleTemplateElement)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, blocks } = data
  const W = 1000
  const H = 500
  const blockW = 170
  const blockH = 58
  const gap = 24
  const totalWidth = blocks.length * blockW + (blocks.length - 1) * gap
  const startX = (W - totalWidth) / 2
  const blockY = 200
  const iconSize = 28

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {blocks.map((block, index) => {
        const elementId = `block-${index}`
        const color = tplColors[elementId] ?? PALETTE[index % PALETTE.length]!
        
        const isSelected = selectedIds.has(elementId)
        const bx = startX + index * (blockW + gap)
        const visualRect = { x: bx, y: blockY, width: blockW, height: blockH }

        return (
          <g key={index}>
            {index === 0 && (
              <g transform={`translate(${bx - iconSize - 8}, ${blockY + (blockH - iconSize) / 2})`}>
                <LightbulbIcon size={iconSize} color={color} />
              </g>
            )}

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} onClick={e => { e.stopPropagation(); toggleElement(elementId); }} style={{ cursor: 'pointer' }}>
              <ChevronArrow x={bx} y={blockY} width={blockW} height={blockH} fill={color} />
              {isSelected && (
                <rect x={bx} y={blockY} width={blockW} height={blockH} rx={2} fill="none" stroke="#4a90d9" strokeWidth={2.5} strokeDasharray="4 2" />
              )}

              <text x={bx + blockW / 2} y={blockY + blockH / 2 - 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                {block.number}
              </text>
              <text x={bx + blockW / 2} y={blockY + blockH / 2 + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="white" opacity={0.95}>
                {block.title.length > 22 ? block.title.slice(0, 20) + '...' : block.title}
              </text>

              {block.subtitle && (
                <text x={bx + blockW / 2} y={blockY + blockH + 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#666">
                  {block.subtitle.length > 30 ? block.subtitle.slice(0, 28) + '...' : block.subtitle}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {index < blocks.length - 1 && (
              <Arrow
                from={{ x: bx + blockW + 2, y: blockY + blockH / 2 }}
                to={{ x: bx + blockW + gap - 2, y: blockY + blockH / 2 }}
                color={color}
              />
            )}
          </g>
        )
      })}
    </g>
  )
}
