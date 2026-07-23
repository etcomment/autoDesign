import type { ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { CircleBadge, ChevronArrow } from '../shared/primitives'

const PALETTE = ['#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function RoadmapTemplate({ data }: { data: RoadmapData }): ReactElement {
  const { title, milestones, startLabel = 'START', finishLabel = 'FINISH' } = data
  const W = 1000
  const H = 600
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
    <g>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <line x1={marginX} y1={timelineY} x2={W - marginX} y2={timelineY} stroke="#bbb" strokeWidth={2} />

      <text x={marginX - 16} y={timelineY - 18} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888" letterSpacing={1}>
        {startLabel}
      </text>

      <text x={W - marginX + 16} y={timelineY - 18} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888" letterSpacing={1}>
        {finishLabel}
      </text>

      <circle cx={marginX} cy={timelineY} r={6} fill="#bbb" />
      <circle cx={W - marginX} cy={timelineY} r={6} fill="#bbb" />

      {milestones.map((milestone, index) => {
        const color = PALETTE[index % PALETTE.length]!
        const x = marginX + index * milestoneSpacing
        const isAbove = index % 2 === 0
        const rectX = x - rectW / 2
        const rectY = isAbove ? timelineY - circleR - gap - rectH : timelineY + circleR + gap
        const number = String(index + 1)

        return (
          <g key={index}>
            <line
              x1={x} y1={isAbove ? timelineY - circleR : timelineY + circleR}
              x2={x} y2={isAbove ? rectY + rectH : rectY}
              stroke={color} strokeWidth={1.5} opacity={0.6}
            />

            <rect x={rectX} y={rectY} width={rectW} height={rectH} rx={10} fill="white" stroke={color} strokeWidth={1.5} />

            <path
              d={`M ${rectX + 10} ${rectY} L ${rectX + rectW - 10} ${rectY} Q ${rectX + rectW} ${rectY} ${rectX + rectW} ${rectY + 10} L ${rectX + rectW} ${rectY + headerH} L ${rectX} ${rectY + headerH} L ${rectX} ${rectY + 10} Q ${rectX} ${rectY} ${rectX + 10} ${rectY} Z`}
              fill={color}
            />

            <text x={rectX + rectW / 2} y={rectY + headerH / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
              {milestone.title}
            </text>

            {milestone.subtitle && (
              <text x={rectX + rectW / 2} y={rectY + headerH + 28} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#555">
                {milestone.subtitle.length > 28 ? milestone.subtitle.slice(0, 25) + '...' : milestone.subtitle}
              </text>
            )}

            <CircleBadge cx={x} cy={timelineY} r={circleR} fill={color} label={number} />

            {index < milestones.length - 1 && (
              <ChevronArrow
                x={x + circleR + 3}
                y={timelineY - 6}
                width={milestoneSpacing - circleR * 2 - 6}
                height={12}
                fill="#ddd"
              />
            )}
          </g>
        )
      })}
    </g>
  )
}
