import { useRef, type ReactElement } from 'react'
import type { Comparison2Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'

const SERIES_A_COLOR = MIGSO_PALETTE[0]!
const SERIES_B_COLOR = MIGSO_PALETTE[1]!
const GRID_OPACITY = 0.12

export function Comparison2Template({ data }: { data: Comparison2Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { seriesAName, seriesBName, dimensions } = data
  const W = 800
  const H = 500
  const cx = W / 2
  const cy = 250
  const maxR = 170
  const dimCount = Math.max(dimensions.length, 3)
  const angleStep = (2 * Math.PI) / dimCount

  const maxVal = Math.max(...dimensions.map(d => Math.max(d.seriesA, d.seriesB)), 100)
  const gridRings = [0.25, 0.5, 0.75, 1]

  const colorA = tplColors['legend-series-a'] || SERIES_A_COLOR
  const colorB = tplColors['legend-series-b'] || SERIES_B_COLOR

  return (
    <g ref={svgRef}>
      {gridRings.map((pct, gi) => (
        <circle key={`grid-${gi}`} cx={cx} cy={cy} r={maxR * pct} fill="none" stroke="#cbd5e0" strokeWidth={gi === 3 ? 1.5 : 0.5} opacity={GRID_OPACITY} />
      ))}

      {dimensions.map((dim, di) => {
        const angle = di * angleStep - Math.PI / 2
        const lx = cx + Math.cos(angle) * (maxR + 24)
        const ly = cy + Math.sin(angle) * (maxR + 24)
        const midX = cx + Math.cos(angle) * (maxR + 10)
        const midY = cy + Math.sin(angle) * (maxR + 10)
        const labelLines = wrapTextByWidth(dim.label, 14)

        return (
          <g key={`axis-${di}`}>
            <line x1={cx} y1={cy} x2={midX} y2={midY} stroke="#e2e8f0" strokeWidth={1} />
            <text x={lx} y={ly + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#555">
              {labelLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={lx} dy={lineIndex === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        )
      })}

      {(() => {
        const pointsA = dimensions.map((dim, di) => {
          const angle = di * angleStep - Math.PI / 2
          const r = (dim.seriesA / maxVal) * maxR
          return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`
        }).join(' ')

        const pointsB = dimensions.map((dim, di) => {
          const angle = di * angleStep - Math.PI / 2
          const r = (dim.seriesB / maxVal) * maxR
          return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`
        }).join(' ')

        return (
          <g>
            <polygon points={pointsA} fill={colorA} opacity={0.25} stroke={colorA} strokeWidth={2} />
            <polygon points={pointsB} fill={colorB} opacity={0.25} stroke={colorB} strokeWidth={2} strokeDasharray="6 3" />
            {dimensions.map((dim, di) => {
              const angle = di * angleStep - Math.PI / 2
              const rA = (dim.seriesA / maxVal) * maxR
              const rB = (dim.seriesB / maxVal) * maxR
              return (
                <g key={`dots-${di}`}>
                  <circle cx={cx + Math.cos(angle) * rA} cy={cy + Math.sin(angle) * rA} r={4} fill={colorA} />
                  <circle cx={cx + Math.cos(angle) * rB} cy={cy + Math.sin(angle) * rB} r={4} fill={colorB} />
                </g>
              )
            })}
          </g>
        )
      })()}

      {/* Series A Legend badge */}
      {(() => {
        const legendId = 'legend-series-a'
        const defaultBbox = { x: 40, y: H - 40, width: 140, height: 30 }
        const customPos = positions[legendId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(legendId)
        const strokeColor = tplStrokeColors[legendId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[legendId] ?? (isSelected ? 2 : 0)

        return (
          <g
            key={legendId}
            data-element-id={legendId}
            onMouseDown={e => startDrag(e, legendId, bbox)}
            transform={getTransform(legendId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            {strokeWidth > 0 && (
              <rect x={bbox.x - 4} y={bbox.y - 4} width={bbox.width + 8} height={bbox.height + 8} rx={4} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            )}
            <rect x={bbox.x} y={bbox.y} width={14} height={14} rx={3} fill={colorA} opacity={0.9} />
            <text x={bbox.x + 22} y={bbox.y + 11} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
              {seriesAName}
            </text>
            {isSelected && renderHandles(bbox, legendId)}
          </g>
        )
      })()}

      {/* Series B Legend badge */}
      {(() => {
        const legendId = 'legend-series-b'
        const defaultBbox = { x: 200, y: H - 40, width: 140, height: 30 }
        const customPos = positions[legendId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(legendId)
        const strokeColor = tplStrokeColors[legendId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[legendId] ?? (isSelected ? 2 : 0)

        return (
          <g
            key={legendId}
            data-element-id={legendId}
            onMouseDown={e => startDrag(e, legendId, bbox)}
            transform={getTransform(legendId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            {strokeWidth > 0 && (
              <rect x={bbox.x - 4} y={bbox.y - 4} width={bbox.width + 8} height={bbox.height + 8} rx={4} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            )}
            <rect x={bbox.x} y={bbox.y} width={14} height={14} rx={3} fill={colorB} opacity={0.9} />
            <text x={bbox.x + 22} y={bbox.y + 11} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
              {seriesBName}
            </text>
            {isSelected && renderHandles(bbox, legendId)}
          </g>
        )
      })()}
    </g>
  )
}
