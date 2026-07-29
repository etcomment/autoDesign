import { useRef, type ReactElement } from 'react'
import type { AgendaData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4']

export function Agenda4Template({ data }: { data: AgendaData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions) // Imported from store

  const { title, items } = data
  const W = 700
  const cardW = 420
  const cardH = 70
  const offsetX = 30
  const offsetY = 16
  const headerH = 28
  const displayItems = items.slice(0, 4)
  const topY = title ? 110 : 70

  return (
    <g ref={svgRef}>
      {/* Refactor Title Element */}
      {title && (
        (() => {
          const elementId = 'title'
          // Estimated logical bounding box for the title text
          const defaultBbox = { x: W / 2 - 100, y: 20, width: 200, height: 40 }
          
          // Get custom position from store, fallback to default
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
            <g onMouseDown={e => startDrag(e, elementId, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
                {/* Original title text, with coordinates adjusted relative to defaultBbox.x, defaultBbox.y */}
                <text
                  x={W / 2 - defaultBbox.x} // Centered within the original W, now relative to defaultBbox.x
                  y={48 - defaultBbox.y} // Original y, now relative to defaultBbox.y
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={22}
                  fontWeight={700}
                  fill={TITLE_COLOR}
                >
                  {title}
                </text>
              </g>
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          )
        })()
      )}

      {/* Refactor Item Cards */}
      {displayItems.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        
        // Calculate the default position and size for this item card
        const stackIndex = displayItems.length - 1 - i
        const defaultCx = (W - cardW) / 2 + stackIndex * offsetX
        const defaultCy = topY + stackIndex * offsetY
        const defaultBbox = { x: defaultCx, y: defaultCy, width: cardW, height: cardH }

        // Get custom position from store, fallback to default
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
          <g key={`item-wrapper-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
                {/* Original static SVG elements of the card, with coordinates adjusted relative to defaultBbox.x, defaultBbox.y */}
                <rect x={3} y={3} width={cardW} height={cardH} rx={10} fill="#000" opacity={0.06} />
                <rect x={0} y={0} width={cardW} height={cardH} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : '#cbd5e0'} strokeWidth={isSelected ? 2.5 : 1.5} />

                <rect x={0} y={0} width={cardW} height={headerH} rx={10} fill={color} />
                <rect x={0} y={headerH - 10} width={cardW} height={10} fill={color} />

                <text x={28} y={headerH / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                  {item.number}
                </text>

                <text x={28} y={headerH + 28} fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="#333">
                  {item.title}
                </text>

                {item.subtitle && (
                  <text x={28} y={cardH - 12} fontFamily="Arial, sans-serif" fontSize={11} fill="#777">
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