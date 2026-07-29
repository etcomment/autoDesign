import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Budget2Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, items } = data
  const W = 900
  const barW = 70
  const maxBarH = 300
  const baselineY = 430
  const gap = 60
  const count = Math.min(items.length, 8)
  const totalW = count * barW + (count - 1) * gap
  const startX = (W - totalW) / 2

  // --- Utility to get bounding box and scale ---
  const getInteractiveProps = (elementId: string, defaultBbox: { x: number; y: number; width: number; height: number }) => {
    const customPos = templateElementPositions[elementId]
    const bbox = {
      x: customPos?.x ?? defaultBbox.x,
      y: customPos?.y ?? defaultBbox.y,
      width: customPos?.width ?? defaultBbox.width,
      height: customPos?.height ?? defaultBbox.height
    }
    const isSelected = selectedIds.has(elementId)
    const scaleX = bbox.width / defaultBbox.width
    const scaleY = bbox.height / defaultBbox.height

    return { bbox, isSelected, scaleX, scaleY }
  }

  return (
    <g ref={svgRef}>
      {/* Title */}
      {title && (
        (() => {
          const elementId = 'title'
          const defaultBbox = { x: W / 2 - 100, y: 20, width: 200, height: 40 } // Estimated for a centered title
          const { bbox, isSelected, scaleX, scaleY } = getInteractiveProps(elementId, defaultBbox)

          return (
            <g onMouseDown={e => startDrag(e, elementId, bbox)} style={{ cursor: 'pointer' }}>
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

      {/* Baseline */}
      {(() => {
        const elementId = 'baseline'
        const lineStrokeWidth = 2
        // Default bbox for the line, giving it a small height for interaction
        const defaultBbox = { x: startX - 20, y: baselineY - lineStrokeWidth / 2 - 5, width: totalW + 40, height: 10 }
        const { bbox, isSelected, scaleX, scaleY } = getInteractiveProps(elementId, defaultBbox)

        return (
          <g onMouseDown={e => startDrag(e, elementId, bbox)} style={{ cursor: 'pointer' }}>
            <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
              <line x1={startX - 20} y1={baselineY} x2={startX + totalW + 20} y2={baselineY} stroke="#ccc" strokeWidth={lineStrokeWidth} />
            </g>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })()}

      {items.slice(0, count).map((item, i) => {
        const x = startX + i * (barW + gap)
        const barHeight = (item.percentage / 100) * maxBarH
        const y = baselineY - barHeight
        const color = tplColors[`item-${i}`] ?? item.color ?? PALETTE[i % PALETTE.length]!

        // --- Interactive Bar Group (Rect + Amount Text + Percentage Text) ---
        const itemElementId = `item-${i}`
        const amountTextFontSize = 12
        const amountTextOffset = 10 // y-10
        const percentageTextFontSize = 10
        const percentageTextYOffsetFromBarCenter = 4

        // Default bounding box for the entire bar group including texts
        const defaultBarBbox = {
          x: x,
          y: y - amountTextOffset - amountTextFontSize, // Top of amount text
          width: barW,
          height: barHeight + amountTextOffset + amountTextFontSize + percentageTextYOffsetFromBarCenter + percentageTextFontSize / 2 // Covers all
        }
        const { bbox: barBbox, isSelected: isBarSelected, scaleX: barScaleX, scaleY: barScaleY } = getInteractiveProps(itemElementId, defaultBarBbox)

        // --- Interactive Label Text ---
        const labelElementId = `item-label-${i}`
        const labelTextFontSize = 12
        const labelTextY = baselineY + 20
        const labelTextWidth = 100 // Estimate
        const defaultLabelBbox = {
          x: (x + barW / 2) - labelTextWidth / 2, // Centered horizontally
          y: labelTextY - labelTextFontSize / 2, // Centered vertically
          width: labelTextWidth,
          height: labelTextFontSize
        }
        const { bbox: labelBbox, isSelected: isLabelSelected, scaleX: labelScaleX, scaleY: labelScaleY } = getInteractiveProps(labelElementId, defaultLabelBbox)

        return (
          <g key={i}>
            {/* Bar and its internal/amount texts */}
            <g onMouseDown={e => startDrag(e, itemElementId, barBbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${barBbox.x}, ${barBbox.y}) scale(${barScaleX}, ${barScaleY}) translate(${-defaultBarBbox.x}, ${-defaultBarBbox.y})`}>
                {/* Bar */}
                <rect x={x} y={y} width={barW} height={barHeight} rx={4} fill={color} opacity={0.85} stroke={isBarSelected ? '#4a90d9' : color} strokeWidth={isBarSelected ? 2.5 : 0} strokeDasharray={isBarSelected ? '4 2' : undefined} />
                {/* Amount */}
                <text x={x + barW / 2} y={y - amountTextOffset} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={amountTextFontSize} fontWeight={700} fill={color}>
                  {item.amount}
                </text>
                {/* Percentage */}
                <text x={x + barW / 2} y={y + barHeight / 2 + percentageTextYOffsetFromBarCenter} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={percentageTextFontSize} fontWeight={700} fill="white">
                  {Math.round(item.percentage)}%
                </text>
              </g>
              {isBarSelected && renderHandles(barBbox, itemElementId)}
            </g>

            {/* Label text */}
            <g onMouseDown={e => startDrag(e, labelElementId, labelBbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${labelBbox.x}, ${labelBbox.y}) scale(${labelScaleX}, ${labelScaleY}) translate(${-defaultLabelBbox.x}, ${-defaultLabelBbox.y})`}>
                <text x={x + barW / 2} y={labelTextY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={labelTextFontSize} fontWeight={600} fill="#333">
                  {item.label}
                </text>
              </g>
              {isLabelSelected && renderHandles(labelBbox, labelElementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}