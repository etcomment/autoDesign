import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap4Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

const CHEVRON_OFFSET = 16

export function ProductRoadmap4Template({ data }: { data: ProductRoadmap4Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, quarters, milestones } = data
  const W = 1100
  const H = 420
  const topMargin = 80
  const stepW = 200
  const stepH = 100
  const gap = 8

  const sorted = [...milestones].sort((a, b) => {
    const qiA = quarters.findIndex(q => q.label === a.quarter)
    const qiB = quarters.findIndex(q => q.label === b.quarter)
    return qiA - qiB
  })

  if (sorted.length === 0) {
    return (
      <g ref={svgRef}>
        <rect width={W} height={H} fill="white" rx={8} />
        {title && <text x={W / 2} y={36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="#1a1a2e">{title}</text>}
      </g>
    )
  }

  const leftOffset = Math.max(20, (W - sorted.length * (stepW + gap) + gap) / 2)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="#1a1a2e">
          {title}
        </text>
      )}

      {sorted.map((milestone, mi) => {
        const elementId = `milestone-${mi}`
        const qi = quarters.findIndex(q => q.label === milestone.quarter)
        const color = tplColors[elementId] ?? PALETTE[qi >= 0 ? qi % PALETTE.length : mi % PALETTE.length]
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const x = leftOffset + mi * (stepW + gap)
        const y = topMargin + (H - topMargin - stepH) / 2
        const visualRect = { x, y, width: stepW, height: stepH }

        const points = [
          `${x},${y}`,
          `${x + stepW},${y}`,
          `${x + stepW + CHEVRON_OFFSET},${y + stepH / 2}`,
          `${x + stepW},${y + stepH}`,
          `${x},${y + stepH}`,
          `${x + CHEVRON_OFFSET},${y + stepH / 2}`,
        ].join(' ')

        return (
          <g key={`m-${mi}`}>
            {mi < sorted.length - 1 && (
              <g>
                <line
                  x1={x + stepW + CHEVRON_OFFSET}
                  y1={y + stepH / 2}
                  x2={leftOffset + (mi + 1) * (stepW + gap)}
                  y2={y + stepH / 2}
                  stroke={color}
                  strokeWidth={2}
                  markerEnd={`url(#arrow-${mi % PALETTE.length})`}
                />
              </g>
            )}
            <defs>
              <marker id={`arrow-${mi % PALETTE.length}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
              </marker>
            </defs>

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <polygon
                points={points}
                fill={color}
                opacity={isSelected ? 0.25 : 0.12}
                stroke={isSelected ? '#4a90d9' : stroke}
                strokeWidth={isSelected ? 2.5 : 1.5}
              />
              <text x={x + stepW / 2 + CHEVRON_OFFSET / 2} y={y + stepH / 2 - 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={700} fill={color}>
                {mi + 1}
              </text>
              <text x={x + stepW / 2 + CHEVRON_OFFSET / 2} y={y + stepH / 2 + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>
                {milestone.title.length > 16 ? milestone.title.slice(0, 14) + '...' : milestone.title}
              </text>
              {milestone.subtitle && (
                <text x={x + stepW / 2 + CHEVRON_OFFSET / 2} y={y + stepH / 2 + 30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#666">
                  {milestone.subtitle.length > 22 ? milestone.subtitle.slice(0, 20) + '...' : milestone.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
