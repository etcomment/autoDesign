import { useRef, type ReactElement } from 'react'
import type { AgendaData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4', '#607d8b', '#795548']

export function AgendaTemplate({ data }: { data: AgendaData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, items } = data
  const W = 900

  const startX = 220
  const circleX = 140
  const circleR = 20
  const cardW = 520
  const cardH = 64
  const gap = 28
  const startY = title ? 100 : 70

  return (
    <g ref={svgRef}>
      {title && (() => {
        const elementId = 'title'
        // Estimate logical bounding box for the title text
        const defaultBbox = { x: W / 2 - 150, y: 28, width: 300, height: 40 }
        
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
              <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill={TITLE_COLOR}>
                {title}
              </text>
            </g>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })()}

      {items.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || color
        
        // Calculate default y for the item
        const y = startY + i * (cardH + gap)
        // Define default logical bounding box for the entire item card
        const defaultBbox = { x: startX, y, width: cardW, height: cardH } 
        
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
          <g key={i}>
            {/* --- Connecting Line --- */}
            {i < items.length - 1 && (() => {
              const lineId = `line-${i}`
              // Define a default bbox for the line, based on the current item's position
              const defaultLineBbox = {
                x: circleX - 5, // A bit left of the line
                y: defaultBbox.y + cardH + 4,
                width: 10,       // Width of the handle
                height: gap - 4  // Height of the line segment
              }
              const customLinePos = templateElementPositions[lineId]
              const isLineSelected = selectedIds.has(lineId)

              const lineBbox = {
                x: customLinePos?.x ?? defaultLineBbox.x,
                y: customLinePos?.y ?? defaultLineBbox.y,
                width: customLinePos?.width ?? defaultLineBbox.width,
                height: customLinePos?.height ?? defaultLineBbox.height
              }

              const lineScaleX = lineBbox.width / defaultLineBbox.width
              const lineScaleY = lineBbox.height / defaultLineBbox.height

              return (
                <g onMouseDown={e => startDrag(e, lineId, lineBbox)} transform={getTransform(lineId, lineBbox)} style={{ cursor: 'pointer' }}>
                  <g transform={`translate(${lineBbox.x}, ${lineBbox.y}) scale(${lineScaleX}, ${lineScaleY}) translate(${-defaultLineBbox.x}, ${-defaultLineBbox.y})`}>
                    <line x1={circleX} y1={defaultBbox.y + cardH + 4} x2={circleX} y2={defaultBbox.y + cardH + gap} stroke="#cbd5e0" strokeWidth={2} />
                  </g>
                  {isLineSelected && renderHandles(lineBbox, lineId)}
                </g>
              )
            })()}

            {/* --- Agenda Card Item --- */}
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
                <rect x={startX} y={y} width={cardW} height={cardH} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 2.5 : 2} />
                <rect x={startX} y={y} width={8} height={cardH} rx={4} fill={color} />

                <circle cx={circleX} cy={y + cardH / 2} r={circleR} fill={color} />
                <text x={circleX} y={y + cardH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                  {item.number}
                </text>

                <text
                  x={startX + 24}
                  y={item.subtitle ? y + cardH / 2 - 4 : y + cardH / 2 + 6}
                  fontFamily="Arial, sans-serif"
                  fontSize={16}
                  fontWeight={600}
                  fill="#1a202c"
                >
                  {item.title}
                </text>
                {item.subtitle && (
                  <text x={startX + 24} y={y + cardH / 2 + 18} fontFamily="Arial, sans-serif" fontSize={12} fill="#718096">
                    {item.subtitle}
                  </text>
                )}
              </g>
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}