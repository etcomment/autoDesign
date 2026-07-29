import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

export function Budget4Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, totalLabel, totalAmount, items } = data
  const W = 900
  const barW = 120
  const gap = 24
  const startX = 120
  const baselineY = 400
  const pxPerUnit = 2.5
  const count = Math.min(items.length, 6)

  let runningTotal = 0

  return (
    <g ref={svgRef}>
      {/* Title */}
      {title && (
        (() => {
          const elementId = 'title'
          const customPos = templateElementPositions[elementId]
          const isSelected = selectedIds.has(elementId)
          const defaultBbox = { x: W / 2 - 50, y: 20, width: 100, height: 25 } // Estimated bbox for the title text

          const bbox = {
            x: customPos?.x ?? defaultBbox.x,
            y: customPos?.y ?? defaultBbox.y,
            width: customPos?.width ?? defaultBbox.width,
            height: customPos?.height ?? defaultBbox.height
          }

          const scaleX = bbox.width / defaultBbox.width
          const scaleY = bbox.height / defaultBbox.height

          return (
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
                <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
                  {title}
                </text>
              </g>
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          )
        })()
      )}

      {/* Items (Bars and Labels) */}
      {items.slice(0, count).map((item, i) => {
        const itemBarId = `item-bar-${i}`
        const itemLabelId = `item-label-${i}`
        const itemLineId = `item-line-${i}`

        const barH = item.percentage * pxPerUnit
        const x = startX + i * (barW + gap)

        const positive = item.percentage >= 0
        const y = positive ? baselineY - runningTotal - barH : baselineY - runningTotal
        const rectColor = positive ? '#2ecc71' : '#e74c3c'
        const visualRect = { x, y: Math.min(y, baselineY - runningTotal), width: barW, height: Math.abs(barH) }

        const currentTop = baselineY - runningTotal
        runningTotal += barH

        // Default Bboxes for dynamic elements
        const defaultBarBbox = { x: x, y: visualRect.y, width: barW, height: visualRect.height }
        const defaultLabelBbox = { x: x, y: baselineY + 30 - 10, width: barW, height: 20 } // Adjusted y for text height
        const defaultLineBbox = { x: x - gap / 2, y: currentTop - 1, width: gap, height: 2 } // Line is small, make it draggable

        const customBarPos = templateElementPositions[itemBarId]
        const isBarSelected = selectedIds.has(itemBarId)
        const customLabelPos = templateElementPositions[itemLabelId]
        const isLabelSelected = selectedIds.has(itemLabelId)
        const customLinePos = templateElementPositions[itemLineId]
        const isLineSelected = selectedIds.has(itemLineId)

        const barBbox = {
          x: customBarPos?.x ?? defaultBarBbox.x,
          y: customBarPos?.y ?? defaultBarBbox.y,
          width: customBarPos?.width ?? defaultBarBbox.width,
          height: customBarPos?.height ?? defaultBarBbox.height
        }
        const barScaleX = barBbox.width / defaultBarBbox.width
        const barScaleY = barBbox.height / defaultBarBbox.height

        const labelBbox = {
          x: customLabelPos?.x ?? defaultLabelBbox.x,
          y: customLabelPos?.y ?? defaultLabelBbox.y,
          width: customLabelPos?.width ?? defaultLabelBbox.width,
          height: customLabelPos?.height ?? defaultLabelBbox.height
        }
        const labelScaleX = labelBbox.width / defaultLabelBbox.width
        const labelScaleY = labelBbox.height / defaultLabelBbox.height

        const lineBbox = {
          x: customLinePos?.x ?? defaultLineBbox.x,
          y: customLinePos?.y ?? defaultLineBbox.y,
          width: customLinePos?.width ?? defaultLineBbox.width,
          height: customLinePos?.height ?? defaultLineBbox.height
        }
        const lineScaleX = lineBbox.width / defaultLineBbox.width
        const lineScaleY = lineBbox.height / defaultLineBbox.height


        return (
          <g key={i}>
            {/* Divider Line */}
            {i > 0 && (
              <g onMouseDown={e => startDrag(e, itemLineId, lineBbox)} transform={getTransform(itemLineId, lineBbox)} style={{ cursor: 'pointer' }}>
                <g transform={`translate(${lineBbox.x}, ${lineBbox.y}) scale(${lineScaleX}, ${lineScaleY}) translate(${-defaultLineBbox.x}, ${-defaultLineBbox.y})`}>
                  <line x1={x - gap / 2} y1={currentTop} x2={x + gap / 2} y2={currentTop} stroke="#aaa" strokeWidth={1} strokeDasharray="3 3" />
                </g>
                {isLineSelected && renderHandles(lineBbox, itemLineId)}
              </g>
            )}

            {/* Bar with Amount Text */}
            <g onMouseDown={e => startDrag(e, itemBarId, barBbox)} transform={getTransform(itemBarId, barBbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${barBbox.x}, ${barBbox.y}) scale(${barScaleX}, ${barScaleY}) translate(${-defaultBarBbox.x}, ${-defaultBarBbox.y})`}>
                <rect x={x} y={visualRect.y} width={barW} height={visualRect.height} rx={4} fill={rectColor} opacity={0.85} stroke={isBarSelected ? '#4a90d9' : rectColor} strokeWidth={isBarSelected ? 2.5 : 0} strokeDasharray={isBarSelected ? '4 2' : undefined} />
                <text x={x + barW / 2} y={visualRect.y + visualRect.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                  {item.amount}
                </text>
              </g>
              {isBarSelected && renderHandles(barBbox, itemBarId)}
            </g>

            {/* Item Label */}
            <g onMouseDown={e => startDrag(e, itemLabelId, labelBbox)} transform={getTransform(itemLabelId, labelBbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${labelBbox.x}, ${labelBbox.y}) scale(${labelScaleX}, ${labelScaleY}) translate(${-defaultLabelBbox.x}, ${-defaultLabelBbox.y})`}>
                <text x={x + barW / 2} y={baselineY + 30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#333">
                  {item.label}
                </text>
              </g>
              {isLabelSelected && renderHandles(labelBbox, itemLabelId)}
            </g>
          </g>
        )
      })}

      {/* Total Label and Amount */}
      {(() => {
        const elementId = 'total-block'
        const defaultBbox = { x: startX - 60, y: baselineY - 100, width: 80, height: 30 } // Bbox for the rect
        const customPos = templateElementPositions[elementId]
        const isSelected = selectedIds.has(elementId)

        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height
        }

        const scaleX = bbox.width / defaultBbox.width
        const scaleY = bbox.height / defaultBbox.height

        return (
          <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
            <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
              <rect x={startX - 60} y={baselineY - 100} width={80} height={30} rx={4} fill="#1a1a2e" />
              <text x={startX - 20} y={baselineY - 80} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                {totalLabel}: {totalAmount}
              </text>
            </g>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })()}
    </g>
  )
}