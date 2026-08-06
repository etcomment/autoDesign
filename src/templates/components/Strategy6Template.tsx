import { useRef, type ReactElement } from 'react'
import type { Strategy6Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'

const QUADRANT_COLORS = ['#e3f2fd', '#fff3e0', '#e8f5e9', '#fce4ec']

export function Strategy6Template({ data }: { data: Strategy6Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { axisX, axisY, quadrants } = data
  const W = 800
  const boxSize = 260
  const centerX = W / 2
  const centerY = 340
  const half = boxSize / 2
  const qw = half - 10
  const qh = half - 10

  return (
    <g ref={svgRef}>
      <line x1={centerX - half} y1={centerY} x2={centerX + half} y2={centerY} stroke="#333" strokeWidth={2} />
      <line x1={centerX} y1={centerY - half} x2={centerX} y2={centerY + half} stroke="#333" strokeWidth={2} />

      {axisX && (
        <text x={centerX + half + 12} y={centerY + 4} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#555">
          {axisX}
        </text>
      )}
      {axisY && (
        <text x={centerX + 6} y={centerY - half - 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#555">
          {axisY}
        </text>
      )}

      {[0, 1, 2, 3].map(i => {
        const qx = i % 2 === 0 ? centerX - half + 6 : centerX + 6
        const qy = i < 2 ? centerY - half + 6 : centerY + 6
        const quadrant = quadrants[i]
        const elementId = `quadrant-${i}`
        const bgColor = tplColors[elementId] ?? quadrant?.color ?? QUADRANT_COLORS[i]!
        const accent = tplColors[elementId] ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#cbd5e0')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 1)
        const defaultBbox = { x: qx, y: qy, width: qw, height: qh }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        return (
          <g key={`q-${i}`}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={bgColor} stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx={bbox.x + bbox.width / 2} cy={bbox.y + 32} r={18} fill={accent} />
              <text x={bbox.x + bbox.width / 2} y={bbox.y + 37} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {String(i + 1)}
              </text>
              {quadrant && (() => {
                const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
                const titleLines = wrapTextByWidth(quadrant.title, maxChars)
                const subLines = quadrant.subtitle ? wrapTextByWidth(quadrant.subtitle, maxChars) : []
                const subY = bbox.y + 66 + titleLines.length * 16 + 4
                return (
                  <>
                    <text x={bbox.x + bbox.width / 2} y={bbox.y + 66} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#333">
                      {titleLines.map((line, li) => (
                        <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 16}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                    {subLines.length > 0 && (
                      <text x={bbox.x + bbox.width / 2} y={subY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#666">
                        {subLines.map((line, li) => (
                          <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 12}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    )}
                  </>
                )
              })()}
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      <circle cx={centerX} cy={centerY} r={22} fill="white" stroke="#333" strokeWidth={2} />
      <text x={centerX} y={centerY + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="#333">
        {axisX} × {axisY}
      </text>
    </g>
  )
}
