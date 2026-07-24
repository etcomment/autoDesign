import { useRef, type ReactElement } from 'react'
import type { CircleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const PALETTE = ['#2D2C59', '#3768D6', '#FF5338']

function segmentArrowPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
): string {
  const cos = Math.cos
  const sin = Math.sin

  // Chevron arrow geometry matching page55-055.png:
  // - Body is an arc ring from startAngle to baseAngle (where the arrow head begins).
  // - At baseAngle, the arrow head flares BOTH outward (to outerR + 25) and inward (to innerR - 18).
  // - The arrow tip is at endAngle, centered on the middle radius midR = (innerR + outerR) / 2.
  
  const midR = (innerR + outerR) / 2
  const headSpan = 0.25 // angular span of arrow head
  const baseAngle = endAngle - headSpan

  const outerFlareR = outerR + 25
  const innerFlareR = innerR - 18

  // 1. Straight radial tail at startAngle (from innerR to outerR)
  const xStartOuter = cx + outerR * cos(startAngle)
  const yStartOuter = cy + outerR * sin(startAngle)

  const xStartInner = cx + innerR * cos(startAngle)
  const yStartInner = cy + innerR * sin(startAngle)

  // 2. Main outer circular arc from startAngle to baseAngle
  const xBaseOuter = cx + outerR * cos(baseAngle)
  const yBaseOuter = cy + outerR * sin(baseAngle)

  // 3. Arrowhead outer wing point (flared outward)
  const xWingOuter = cx + outerFlareR * cos(baseAngle)
  const yWingOuter = cy + outerFlareR * sin(baseAngle)

  // 4. Arrow tip pointing forward at endAngle centered on midR
  const xTip = cx + midR * cos(endAngle)
  const yTip = cy + midR * sin(endAngle)

  // 5. Arrowhead inner wing point (flared inward)
  const xWingInner = cx + innerFlareR * cos(baseAngle)
  const yWingInner = cy + innerFlareR * sin(baseAngle)

  // 6. Body inner base point at baseAngle on innerR
  const xBaseInner = cx + innerR * cos(baseAngle)
  const yBaseInner = cy + innerR * sin(baseAngle)

  const largeArcOuter = baseAngle - startAngle > Math.PI ? 1 : 0
  const largeArcInner = baseAngle - startAngle > Math.PI ? 1 : 0

  return [
    `M ${xStartOuter.toFixed(1)} ${yStartOuter.toFixed(1)}`,
    `A ${outerR} ${outerR} 0 ${largeArcOuter} 1 ${xBaseOuter.toFixed(1)} ${yBaseOuter.toFixed(1)}`,
    `L ${xWingOuter.toFixed(1)} ${yWingOuter.toFixed(1)}`,
    `L ${xTip.toFixed(1)} ${yTip.toFixed(1)}`,
    `L ${xWingInner.toFixed(1)} ${yWingInner.toFixed(1)}`,
    `L ${xBaseInner.toFixed(1)} ${yBaseInner.toFixed(1)}`,
    `A ${innerR} ${innerR} 0 ${largeArcInner} 0 ${xStartInner.toFixed(1)} ${yStartInner.toFixed(1)}`,
    `Z`,
  ].join(' ')
}

export function CircleTemplate({ data }: { data: CircleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)

  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 20
  const innerR = 75
  const outerR = 180

  const segments = data.segments
  const n = segments.length
  if (n < 2)
    return (
      <g>
        <rect width={W} height={H} fill="white" rx={8} />
        <text x={cx} y={cy} textAnchor="middle" fontSize={16} fill="#999">
          Minimum 2 segments
        </text>
      </g>
    )

  const angleStep = (Math.PI * 2) / n
  // Angles aligned with page55-055.png:
  // 01 (Dark Blue): Bottom-Left (approx PI/2 + 0.3 to PI + 0.8)
  // 02 (Bright Blue): Top
  // 03 (Red): Right
  const baseStartAngle = Math.PI * 0.65

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {data.title && (
        <>
          <text x={50} y={50} fontFamily="Arial, sans-serif" fontSize={32} fontWeight={700} fill="#2D2B55">
            {data.title}
          </text>
          <rect x={50} y={62} width={70} height={5} fill="#2D2B55" rx={2} />
        </>
      )}

      {/* Center hole circle under the ring */}
      <circle cx={cx} cy={cy} r={innerR - 1} fill="white" />

      {/* Render segments */}
      {segments.map((item, i) => {
        const elementId = `segment-${i}`
        const startAngle = baseStartAngle + i * angleStep
        const endAngle = startAngle + angleStep
        const midAngle = startAngle + angleStep / 2
        const color = PALETTE[i % PALETTE.length] ?? '#3768D6'
        const isSelected = selectedIds.has(elementId)

        const cosMid = Math.cos(midAngle)
        const sinMid = Math.sin(midAngle)

        const iconRadius = (innerR + outerR) / 2
        const iconX = cx + iconRadius * cosMid
        const iconY = cy + iconRadius * sinMid

        const numberRadius = outerR - 25
        const numberX = cx + numberRadius * cosMid
        const numberY = cy + numberRadius * sinMid

        let labelAnchor: 'start' | 'end' | 'middle' = 'start'
        if (cosMid < -0.2) {
          labelAnchor = 'end'
        } else if (cosMid > 0.2) {
          labelAnchor = 'start'
        } else {
          labelAnchor = 'middle'
        }

        const labelRadius = outerR + 55
        const labelX = cx + labelRadius * cosMid
        const labelY = cy + labelRadius * sinMid

        const bbox = {
          x: cx - outerR,
          y: cy - outerR,
          width: outerR * 2,
          height: outerR * 2,
        }

        return (
          <g key={i}>
            <path
              d={segmentArrowPath(cx, cy, innerR, outerR, startAngle, endAngle)}
              fill={color}
              stroke={isSelected ? '#4a90d9' : 'none'}
              strokeWidth={isSelected ? 3 : 0}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              style={{ cursor: 'pointer' }}
            />
            {item.icon && (
              <text x={iconX} y={iconY + 7} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={28} fill="white">
                {item.icon}
              </text>
            )}
            <text
              x={numberX}
              y={numberY + 7}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={24}
              fontWeight={700}
              fill="white"
            >
              {item.number}
            </text>
            <text
              x={labelX}
              y={labelY - 6}
              textAnchor={labelAnchor}
              fontFamily="Arial, sans-serif"
              fontSize={16}
              fontWeight={700}
              fill="#111"
            >
              {item.title}
            </text>
            <text
              x={labelX}
              y={labelY + 14}
              textAnchor={labelAnchor}
              fontFamily="Arial, sans-serif"
              fontSize={12}
              fill="#555"
            >
              {item.description.length > 45 ? item.description.slice(0, 42) + '...' : item.description}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}