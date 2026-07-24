import { useRef, type ReactElement } from 'react'
import type { Strategy6Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const QUADRANT_COLORS = ['#e3f2fd', '#fff3e0', '#e8f5e9', '#fce4ec']

export function Strategy6Template({ data }: { data: Strategy6Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, axisX, axisY, quadrants } = data
  const W = 800
  const H = title ? 620 : 580
  const boxSize = 260
  const centerX = W / 2
  const centerY = title ? 380 : 340
  const half = boxSize / 2
  const qw = half - 10
  const qh = half - 10

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

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
        const bgColor = quadrant?.color ?? QUADRANT_COLORS[i]!
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: qx, y: qy, width: qw, height: qh }

        return (
          <g key={`q-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={qx} y={qy} width={qw} height={qh} rx={8} fill={bgColor} stroke={isSelected ? '#4a90d9' : '#cbd5e0'} strokeWidth={isSelected ? 2.5 : 1} />
              {quadrant && (
                <>
                  <circle cx={qx + qw / 2} cy={qy + 32} r={18} fill={color} />
                  <text x={qx + qw / 2} y={qy + 32 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                    {String(i + 1)}
                  </text>
                  <text x={qx + qw / 2} y={qy + 70} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="#333">
                    {quadrant.title}
                  </text>
                  {quadrant.subtitle && (
                    <text x={qx + qw / 2} y={qy + 92} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#666">
                      {quadrant.subtitle.length > 24 ? quadrant.subtitle.slice(0, 22) + '..' : quadrant.subtitle}
                    </text>
                  )}
                </>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
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
