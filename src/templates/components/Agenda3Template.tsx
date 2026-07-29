import { useRef, type ReactElement } from 'react'
import type { AgendaData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4', '#607d8b']

export function Agenda3Template({ data }: { data: AgendaData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions) // Import templateElementPositions
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, items } = data
  const displayItems = items.slice(0, 4)
  const W = 800
  const cardW = 300
  const cardH = 120
  const gap = 24
  const gridX = (W - (cardW * 2 + gap)) / 2
  const topY = title ? 100 : 65

  // Refactor for Title Element
  const titleElementId = 'title'
  // Estimate a logical bounding box for the title text
  // Assuming text x={W/2} (middle anchor) and y={48} (baseline)
  // A reasonable bounding box would be centered around W/2 with height ~ font size
  const titleDefaultBbox = { x: W / 2 - 150, y: 28, width: 300, height: 40 }
  const titleCustomPos = templateElementPositions[titleElementId]
  const titleBbox = {
    x: titleCustomPos?.x ?? titleDefaultBbox.x,
    y: titleCustomPos?.y ?? titleDefaultBbox.y,
    width: titleCustomPos?.width ?? titleDefaultBbox.width,
    height: titleCustomPos?.height ?? titleDefaultBbox.height
  }
  const titleScaleX = titleBbox.width / titleDefaultBbox.width
  const titleScaleY = titleBbox.height / titleDefaultBbox.height
  const isTitleSelected = selectedIds.has(titleElementId)

  return (
    <g ref={svgRef}>
      {title && (
        <g onMouseDown={e => startDrag(e, titleElementId, titleBbox)} style={{ cursor: 'pointer' }}>
          <g transform={`translate(${titleBbox.x}, ${titleBbox.y}) scale(${titleScaleX}, ${titleScaleY}) translate(${-titleDefaultBbox.x}, ${-titleDefaultBbox.y})`}>
            <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill={TITLE_COLOR}>
              {title}
            </text>
          </g>
          {isTitleSelected && renderHandles(titleBbox, titleElementId)}
        </g>
      )}

      {displayItems.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        
        const col = i % 2
        const row = Math.floor(i / 2)
        const cx = gridX + col * (cardW + gap)
        const cy = topY + row * (cardH + gap)
        
        // Use the calculated grid position as the default bounding box for each item
        const itemDefaultBbox = { x: cx, y: cy, width: cardW, height: cardH }
        const itemCustomPos = templateElementPositions[elementId]
        const itemBbox = {
          x: itemCustomPos?.x ?? itemDefaultBbox.x,
          y: itemCustomPos?.y ?? itemDefaultBbox.y,
          width: itemCustomPos?.width ?? itemDefaultBbox.width,
          height: itemCustomPos?.height ?? itemDefaultBbox.height
        }
        const itemScaleX = itemBbox.width / itemDefaultBbox.width
        const itemScaleY = itemBbox.height / itemDefaultBbox.height
        const isItemSelected = selectedIds.has(elementId)

        return (
          // Apply key directly to the interactive group and remove the redundant outer g
          <g key={elementId} onMouseDown={e => startDrag(e, elementId, itemBbox)} style={{ cursor: 'pointer' }}>
            <g transform={`translate(${itemBbox.x}, ${itemBbox.y}) scale(${itemScaleX}, ${itemScaleY}) translate(${-itemDefaultBbox.x}, ${-itemDefaultBbox.y})`}>
              {/* Original static SVG elements go here EXACTLY as they were */}
              <rect x={cx} y={cy} width={cardW} height={cardH} rx={12} fill="white" stroke={isItemSelected ? '#4a90d9' : color} strokeWidth={isItemSelected ? 2.5 : 2} strokeDasharray={isItemSelected ? '4 2' : undefined} />
              <rect x={cx} y={cy} width={cardW} height={4} rx={2} fill={color} />

              <circle cx={cx + 36} cy={cy + cardH / 2} r={22} fill={color} />
              <text x={cx + 36} y={cy + cardH / 2 + 7} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">
                {item.number}
              </text>

              <text x={cx + 74} y={cy + cardH / 2 - 4} fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="#333">
                {item.title}
              </text>
              {item.subtitle && (
                <text x={cx + 74} y={cy + cardH / 2 + 18} fontFamily="Arial, sans-serif" fontSize={11} fill="#777">
                  {item.subtitle.length > 28 ? item.subtitle.slice(0, 26) + '..' : item.subtitle}
                </text>
              )}
            </g>
            {isItemSelected && renderHandles(itemBbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}