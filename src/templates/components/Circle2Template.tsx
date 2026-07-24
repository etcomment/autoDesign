import { useRef, type ReactElement } from 'react'
import type { CircleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const PALETTE = ['#2D2B55', '#4169E1', '#FF6347', '#E74C3C', '#2ECC71', '#F39C12', '#9B59B6', '#1ABC9C']

function createSegmentPath(
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
  const arrowBaseAngle = endAngle - 0.1
  const arrowBaseOuter = {
    x: cx + outerR * cos(arrowBaseAngle),
    y: cy + outerR * sin(arrowBaseAngle),
  }
  const arrowBaseInner = {
    x: cx + innerR * cos(arrowBaseAngle),
    y: cy + innerR * sin(arrowBaseAngle),
  }

  const sweep = 1
  const large = endAngle - startAngle > Math.PI ? 1 : 0

  return [
    `M ${outerStart.x.toFixed(1)} ${outerStart.y.toFixed(1)}`,
    `A ${outerR} ${outerR} 0 ${large} ${sweep} ${outerEnd.x.toFixed(1)} ${outerEnd.y.toFixed(1)}`,
    `L ${arrowTip.x.toFixed(1)} ${arrowTip.y.toFixed(1)}`,
    `L ${arrowBaseOuter.x.toFixed(1)} ${arrowBaseOuter.y.toFixed(1)}`,
    `L ${arrowBaseInner.x.toFixed(1)} ${arrowBaseInner.y.toFixed(1)}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${innerStart.x.toFixed(1)} ${innerStart.y.toFixed(1)}`,
    'Z',
  ].join(' ')
}

function labelSide(angle: number): { align: 'start' | 'end'; offsetX: number } {
  const normalized = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
  if (normalized < Math.PI) {
    return { align: 'end', offsetX: -20 }
  }
  return { align: 'start', offsetX: 20 }
}

export function CircleTemplate({ data }: { data: CircleData }): ReactElement {
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
  const labelDistance = outerR + arrowSize + 40

  const segments = data.segments
  const n = segments.length
  if (n < 2) return <g><rect width={W} height={H} fill="white" rx={8} /><text x={cx} y={cy} textAnchor="middle" fontSize={16} fill="#999">Minimum 2 segments</text></g>

  const segmentAngle = (Math.PI * 2) / n
  const gap = 0.1

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {data.title && (
        <>
          <text x={50} y={42} fontFamily="Arial, sans-serif" fontSize={28} fontWeight={700} fill="#2D2B55">
            {data.title}
          </text>
          <rect x={50} y={52} width={60} height={5} fill="#2D2B55" rx={2} />
        </>
      )}

      <circle cx={cx} cy={cy} r={innerR} fill="white" stroke="#ddd" strokeWidth={1} />

      {segments.map((item, i) => {
        const elementId = `segment-${i}`
        const startAngle = i * segmentAngle + gap
        const endAngle = (i + 1) * segmentAngle - gap
        const midAngle = (startAngle + endAngle) / 2
        const color = PALETTE[i % PALETTE.length] ?? '#4169E1'
        const isSelected = selectedIds.has(elementId)

        const midR = innerR + (outerR - innerR) / 2
        const iconX = cx + midR * Math.cos(midAngle)
        const iconY = cy + midR * Math.sin(midAngle)
        const numberX = cx + (outerR - 28) * Math.cos(midAngle)
        const numberY = cy + (outerR - 28) * Math.sin(midAngle)

        const labelX = cx + labelDistance * Math.cos(midAngle)
        const labelY = cy + labelDistance * Math.sin(midAngle)
        const side = labelSide(midAngle)

        return (
          <g key={i}>
            <path
              d={createSegmentPath(cx, cy, innerR, outerR, startAngle, endAngle, arrowSize)}
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
              fontSize={22}
              fontWeight={700}
              fill="white"
            >
              {item.number}
            </text>
            {item.icon && (
              <text x={iconX} y={iconY + 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={26} fill="white">
                {item.icon}
              </text>
            )}
            <text
              x={labelX}
              y={labelY - 14}
              textAnchor={side.align}
              fontFamily="Arial, sans-serif"
              fontSize={16}
              fontWeight={700}
              fill="#222"
            >
              {item.title}
            </text>
            <text
              x={labelX}
              y={labelY + 6}
              textAnchor={side.align}
              fontFamily="Arial, sans-serif"
              fontSize={12}
              fill="#444"
            >
              {item.description.length > 45 ? item.description.slice(0, 42) + '...' : item.description}
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
