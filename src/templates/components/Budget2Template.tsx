import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Budget2Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, items } = data
  const W = 680

  const labelX = 24
  const trackX = 180
  const trackWidth = 360
  const rowHeight = 46
  const barHeight = 34
  const startY = title ? 84 : 44

  const getInteractiveProps = (elementId: string, defaultBbox: { x: number; y: number; width: number; height: number }) => {
    const customPos = templateElementPositions[elementId]
    const bbox = {
      x: customPos?.x ?? defaultBbox.x,
      y: customPos?.y ?? defaultBbox.y,
      width: customPos?.width ?? defaultBbox.width,
      height: customPos?.height ?? defaultBbox.height,
    }
    const isSelected = selectedIds.has(elementId)
    const scaleX = bbox.width / defaultBbox.width
    const scaleY = bbox.height / defaultBbox.height

    return { bbox, isSelected, scaleX, scaleY }
  }

  return (
    <g ref={svgRef}>
      {title && (() => {
        const elementId = 'title'
        const defaultBbox = { x: W / 2 - 150, y: 20, width: 300, height: 44 }
        const { bbox, isSelected, scaleX, scaleY } = getInteractiveProps(elementId, defaultBbox)

        return (
          <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
            <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
              <text x={W / 2} y={52} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={24} fontWeight={700} fill="#222">
                {title}
              </text>
            </g>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })()}

      {items.map((item, i) => {
        const rowY = startY + i * rowHeight
        const color = tplColors[`item-${i}`] ?? item.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const pct = Math.max(0, Math.min(100, item.percentage || 0))
        const fillWidth = (pct / 100) * trackWidth

        const elementId = `item-${i}`
        const defaultBbox = { x: labelX, y: rowY - 6, width: W - labelX - 30, height: rowHeight }
        const { bbox, isSelected, scaleX, scaleY } = getInteractiveProps(elementId, defaultBbox)

        return (
          <g key={i}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
                {/* Label */}
                <text x={labelX} y={rowY + barHeight / 2 - 4} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill="#333">
                  {item.label}
                </text>
                {item.amount && (
                  <text x={labelX} y={rowY + barHeight / 2 + 14} fontFamily="Arial, sans-serif" fontSize={11} fill="#888">
                    {item.amount}
                  </text>
                )}

                {/* Track (barre totale grise) */}
                <rect x={trackX} y={rowY} width={trackWidth} height={barHeight} fill="#f0f0f0" />

                {/* Fill (barre colorée proportionnelle au pourcentage) */}
                {fillWidth > 0 && (
                  <rect x={trackX} y={rowY} width={fillWidth} height={barHeight} fill={color} />
                )}

                {/* Pourcentage */}
                <text x={trackX + trackWidth + 16} y={rowY + barHeight / 2 + 5} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={color}>
                  {Math.round(pct)}%
                </text>
              </g>
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
