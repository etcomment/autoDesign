import { useRef, type ReactElement } from 'react'
import type { StrategyData } from '../types'
import { ChevronArrow, Arrow } from '../shared/primitives'
import { LightbulbIcon } from '../shared/icons'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { renderMultiLineText } from '../shared/primitives'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function StrategyTemplate({ data }: { data: StrategyData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const toggleElement = useTemplateStore(s => s.toggleTemplateElement)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { title, blocks } = data
  const W = 1000
  const blockW = 170
  const blockH = 58
  const gap = 24
  const totalWidth = blocks.length * blockW + (blocks.length - 1) * gap
  const startX = (W - totalWidth) / 2
  const blockY = 200
  const iconSize = 28

  return (
    <g ref={svgRef}>

      {title && (
        <text x={W / 2} y={50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {blocks.map((block, index) => {
        const elementId = `block-${index}`
        const color = tplColors[elementId] ?? PALETTE[index % PALETTE.length]!
        const customPos = positions[elementId]
        const bx = customPos?.x ?? startX + index * (blockW + gap)
        const finalY = customPos?.y ?? blockY
        const finalW = customPos?.width ?? blockW
        const finalH = customPos?.height ?? blockH
        
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: bx, y: finalY, width: finalW, height: finalH }

        return (
          <g key={index}>
            {index === 0 && (
              <g transform={`translate(${bx - iconSize - 8}, ${finalY + (finalH - iconSize) / 2})`}>
                <LightbulbIcon size={iconSize} color={color} />
              </g>
            )}

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} onClick={e => { e.stopPropagation(); toggleElement(elementId); }} style={{ cursor: 'pointer' }}>
              <ChevronArrow x={bx} y={finalY} width={finalW} height={finalH} fill={color} />
              {isSelected && (
                <rect x={bx} y={finalY} width={finalW} height={finalH} rx={2} fill="none" stroke="#4a90d9" strokeWidth={2.5} strokeDasharray="4 2" />
              )}

              {renderMultiLineText(block.number, bx + finalW / 2, finalY + finalH / 2 - 5, { textAnchor: "middle", fontFamily: "Arial, sans-serif", fontSize: 12, fontWeight: 700, fill: "white" })}
              {renderMultiLineText(
                block.title.length > 22 ? block.title.slice(0, 20) + '...' : block.title,
                bx + finalW / 2, finalY + finalH / 2 + 10,
                { textAnchor: "middle", fontFamily: "Arial, sans-serif", fontSize: 10, fill: "white", opacity: 0.95 }
              )}

              {block.subtitle && renderMultiLineText(
                  block.subtitle.length > 30 ? block.subtitle.slice(0, 28) + '...' : block.subtitle,
                  bx + finalW / 2, finalY + finalH + 18,
                  { textAnchor: "middle", fontFamily: "Arial, sans-serif", fontSize: 9, fill: "#666" }
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
