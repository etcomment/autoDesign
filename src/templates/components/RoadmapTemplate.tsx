import { useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { CircleBadge, ChevronArrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const PALETTE = ['#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']
const W = 1000
const H = 600

export function RoadmapTemplate({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, milestones, startLabel = 'START', finishLabel = 'FINISH' } = data
  const timelineY = 260
  const circleR = 14
  const marginX = 100
  const availableW = W - marginX * 2
  const milestoneSpacing = milestones.length > 1 ? availableW / (milestones.length - 1) : availableW / 2
  const rectW = 140
  const rectH = 95
  const headerH = 30
  const gap = 12

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <line x1={marginX} y1={timelineY} x2={W - marginX} y2={timelineY} stroke="#bbb" strokeWidth={2} />
      <text x={marginX - 16} y={timelineY - 18} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888">{startLabel}</text>
      <text x={W - marginX + 16} y={timelineY - 18} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888">{finishLabel}</text>
      <circle cx={marginX} cy={timelineY} r={6} fill="#bbb" />
      <circle cx={W - marginX} cy={timelineY} r={6} fill="#bbb" />

      {milestones.map((milestone, index) => {
        const elementId = `milestone-${index}`
        const color = tplColors[elementId] ?? PALETTE[index % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const x = marginX + index * milestoneSpacing
        const isAbove = index % 2 === 0
        const rectX = x - rectW / 2
        const rectY = isAbove ? timelineY - circleR - gap - rectH : timelineY + circleR + gap
        const num = String(index + 1)
        const visualRect = { x: rectX, y: rectY, width: rectW, height: rectH }

        return (
          <g key={index}>
            <line x1={x} y1={isAbove ? timelineY - circleR : timelineY + circleR} x2={x} y2={isAbove ? rectY + rectH : rectY} stroke={color} strokeWidth={1.5} opacity={0.6} />

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={rectX} y={rectY} width={rectW} height={rectH} rx={10} fill="white" stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <path d={`M ${rectX + 10} ${rectY} L ${rectX + rectW - 10} ${rectY} Q ${rectX + rectW} ${rectY} ${rectX + rectW} ${rectY + 10} L ${rectX + rectW} ${rectY + headerH} L ${rectX} ${rectY + headerH} L ${rectX} ${rectY + 10} Q ${rectX} ${rectY} ${rectX + 10} ${rectY} Z`} fill={color} />
              <text x={rectX + rectW / 2} y={rectY + headerH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">{milestone.title}</text>
              {milestone.subtitle && (
                <text x={rectX + rectW / 2} y={rectY + headerH + 28} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#555">{milestone.subtitle.length > 28 ? milestone.subtitle.slice(0, 25) + '...' : milestone.subtitle}</text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            <CircleBadge cx={x} cy={timelineY} r={circleR} fill={color} label={num} />

            {index < milestones.length - 1 && (
              <ChevronArrow x={x + circleR + 3} y={timelineY - 6} width={milestoneSpacing - circleR * 2 - 6} height={12} fill="#ddd" />
            )}
          </g>
        )
      })}
    </g>
  )
}
