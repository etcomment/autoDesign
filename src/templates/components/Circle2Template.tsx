import { useRef, type ReactElement } from 'react'
import type { Circle2Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const COLORS = ['#2D2B55', '#4169E1', '#FF6347']

function createArcPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
  arrowSize: number,
): string {
  const cos = Math.cos
  const sin = Math.sin

  const outerStart = { x: cx + outerR * cos(startAngle), y: cy + outerR * sin(startAngle) }
  const outerEnd = { x: cx + outerR * cos(endAngle), y: cy + outerR * sin(endAngle) }
  const innerStart = { x: cx + innerR * cos(startAngle), y: cy + innerR * sin(startAngle) }

  const arrowTip = {
    x: cx + (outerR + arrowSize) * cos(endAngle),
    y: cy + (outerR + arrowSize) * sin(endAngle),
  }
  const arrowBaseAngle = endAngle - 0.12
  const arrowBaseOuter = {
    x: cx + outerR * cos(arrowBaseAngle),
    y: cy + outerR * sin(arrowBaseAngle),
  }
  const arrowBaseInner = {
    x: cx + innerR * cos(arrowBaseAngle),
    y: cy + innerR * sin(arrowBaseAngle),
  }

  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${arrowTip.x} ${arrowTip.y}`,
    `L ${arrowBaseOuter.x} ${arrowBaseOuter.y}`,
    `L ${arrowBaseInner.x} ${arrowBaseInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
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
  const gap = 0.12

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

      <circle cx={cx} cy={cy} r={innerR} fill="white" stroke="#ccc" strokeWidth={1} />

      {items.map((item, i) => {
        const elementId = `segment-${i}`
        const startAngle = i * segmentAngle + gap
        const endAngle = (i + 1) * segmentAngle - gap
        const midAngle = (startAngle + endAngle) / 2
        const color = COLORS[i] ?? '#4169E1'
        const isSelected = selectedIds.has(elementId)

        const midR = innerR + (outerR - innerR) / 2
        const iconX = cx + midR * Math.cos(midAngle)
        const iconY = cy + midR * Math.sin(midAngle)
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
              onMouseDown={e =>
                startDrag(e, elementId, {
                  x: cx - outerR - arrowSize,
                  y: cy - outerR - arrowSize,
                  width: (outerR + arrowSize) * 2,
                  height: (outerR + arrowSize) * 2,
                })
              }
              style={{ cursor: 'pointer' }}
            />
            <text
              x={numberX}
              y={numberY + 8}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={24}
              fontWeight={700}
              fill="white"
            >
              {item.number}
            </text>
            <text x={iconX} y={iconY + 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={28} fill="white">
              {item.icon}
            </text>
            <text
              x={labelPos.x}
              y={labelPos.y - 20}
              textAnchor={labelPos.align}
              fontFamily="Arial, sans-serif"
              fontSize={16}
              fontWeight={700}
              fill="#222"
            >
              {item.title}
            </text>
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor={labelPos.align}
              fontFamily="Arial, sans-serif"
              fontSize={12}
              fill="#444"
            >
              {item.description}
            </text>
            {isSelected &&
              renderHandles(
                {
                  x: cx - outerR - arrowSize,
                  y: cy - outerR - arrowSize,
                  width: (outerR + arrowSize) * 2,
                  height: (outerR + arrowSize) * 2,
                },
                elementId,
              )}
          </g>
        )
      })}
    </g>
  )
}
