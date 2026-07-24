import { useRef, type ReactElement } from 'react'
import type { Circle2Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const COLORS = ['#2D2B55', '#4169E1', '#FF6347']

function createArcPath(cx: number, cy: number, innerR: number, outerR: number, startAngle: number, endAngle: number, arrowSize: number): string {
  const startOuter = {
    x: cx + outerR * Math.cos(startAngle),
    y: cy + outerR * Math.sin(startAngle),
  }
  const endOuter = {
    x: cx + outerR * Math.cos(endAngle),
    y: cy + outerR * Math.sin(endAngle),
  }
  const startInner = {
    x: cx + innerR * Math.cos(endAngle),
    y: cy + innerR * Math.sin(endAngle),
  }
  const endInner = {
    x: cx + innerR * Math.cos(startAngle),
    y: cy + innerR * Math.sin(startAngle),
  }

  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

  const arrowAngle = endAngle
  const arrowTip = {
    x: cx + (outerR + arrowSize) * Math.cos(arrowAngle),
    y: cy + (outerR + arrowSize) * Math.sin(arrowAngle),
  }
  const arrowLeft = {
    x: cx + outerR * Math.cos(arrowAngle - 0.15),
    y: cy + outerR * Math.sin(arrowAngle - 0.15),
  }

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${arrowTip.x} ${arrowTip.y}`,
    `L ${arrowLeft.x} ${arrowLeft.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 0 ${startInner.x} ${startInner.y}`,
    `L ${endInner.x} ${endInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${startOuter.x} ${startOuter.y}`,
    'Z',
  ].join(' ')
}

export function Circle2Template({ data }: { data: Circle2Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 20
  const innerR = 70
  const outerR = 160
  const arrowSize = 25

  const items = data.items.slice(0, 3)
  const segmentAngle = (Math.PI * 2) / 3
  const gap = 0.08

  const labelPositions = [
    { x: 140, y: H / 2 + 60, align: 'start' as const },
    { x: 140, y: H / 2 - 100, align: 'start' as const },
    { x: W - 140, y: H / 2, align: 'end' as const },
  ]

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {data.title && (
        <>
          <text x={50} y={45} fontFamily="Arial, sans-serif" fontSize={28} fontWeight={700} fill="#2D2B55">
            {data.title}
          </text>
          <rect x={50} y={55} width={60} height={5} fill="#2D2B55" rx={2} />
        </>
      )}

      <circle cx={cx} cy={cy} r={innerR} fill="white" />

      {items.map((item, i) => {
        const elementId = `segment-${i}`
        const startAngle = i * segmentAngle + gap
        const endAngle = (i + 1) * segmentAngle - gap
        const midAngle = (startAngle + endAngle) / 2
        const color = COLORS[i] ?? '#4169E1'
        const isSelected = selectedIds.has(elementId)

        const iconX = cx + (innerR + (outerR - innerR) / 2) * Math.cos(midAngle)
        const iconY = cy + (innerR + (outerR - innerR) / 2) * Math.sin(midAngle)
        const numberX = cx + (outerR - 30) * Math.cos(midAngle)
        const numberY = cy + (outerR - 30) * Math.sin(midAngle)

        const labelPos = labelPositions[i] ?? { x: cx, y: cy, align: 'middle' as const }

        return (
          <g key={i}>
            <path
              d={createArcPath(cx, cy, innerR, outerR, startAngle, endAngle, arrowSize)}
              fill={color}
              stroke={isSelected ? '#4a90d9' : 'none'}
              strokeWidth={isSelected ? 3 : 0}
              onMouseDown={e => startDrag(e, elementId, { x: cx - outerR, y: cy - outerR, width: outerR * 2, height: outerR * 2 })}
              style={{ cursor: 'pointer' }}
            />
            <text x={numberX} y={numberY + 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={24} fontWeight={700} fill="white">
              {item.number}
            </text>
            <text x={iconX} y={iconY + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={28} fill="white">
              {item.icon}
            </text>
            {labelPos && (
              <g>
                <text x={labelPos.x} y={labelPos.y - 20} textAnchor={labelPos.align} fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="#222">
                  {item.title}
                </text>
                <text x={labelPos.x} y={labelPos.y} textAnchor={labelPos.align} fontFamily="Arial, sans-serif" fontSize={12} fill="#444">
                  {item.description}
                </text>
              </g>
            )}
            {isSelected && renderHandles({ x: cx - outerR, y: cy - outerR, width: outerR * 2, height: outerR * 2 }, elementId)}
          </g>
        )
      })}
    </g>
  )
}
