import { useRef, type ReactElement } from 'react'
import type { CircleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const PALETTE = ['#2D2C59', '#3768D6', '#FF5338']

function ringArcPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
): string {
  const cos = Math.cos
  const sin = Math.sin

  const xStartOuter = cx + outerR * cos(startAngle)
  const yStartOuter = cy + outerR * sin(startAngle)

  const xEndOuter = cx + outerR * cos(endAngle)
  const yEndOuter = cy + outerR * sin(endAngle)

  const xEndInner = cx + innerR * cos(endAngle)
  const yEndInner = cy + innerR * sin(endAngle)

  const xStartInner = cx + innerR * cos(startAngle)
  const yStartInner = cy + innerR * sin(startAngle)

  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

  return [
    `M ${xStartOuter.toFixed(1)} ${yStartOuter.toFixed(1)}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${xEndOuter.toFixed(1)} ${yEndOuter.toFixed(1)}`,
    `L ${xEndInner.toFixed(1)} ${yEndInner.toFixed(1)}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${xStartInner.toFixed(1)} ${yStartInner.toFixed(1)}`,
    `Z`,
  ].join(' ')
}

function arrowheadPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  baseAngle: number,
  tipAngle: number,
): string {
  const cos = Math.cos
  const sin = Math.sin
  const midR = (innerR + outerR) / 2

  const outerFlareR = outerR + 28
  const innerFlareR = innerR - 18

  // Base outer wing
  const xWingOuter = cx + outerFlareR * cos(baseAngle)
  const yWingOuter = cy + outerFlareR * sin(baseAngle)

  // Arrow tip pointing along midR at tipAngle
  const xTip = cx + midR * cos(tipAngle)
  const yTip = cy + midR * sin(tipAngle)

  // Base inner wing
  const xWingInner = cx + innerFlareR * cos(baseAngle)
  const yWingInner = cy + innerFlareR * sin(baseAngle)

  return [
    `M ${xWingOuter.toFixed(1)} ${yWingOuter.toFixed(1)}`,
    `L ${xTip.toFixed(1)} ${yTip.toFixed(1)}`,
    `L ${xWingInner.toFixed(1)} ${yWingInner.toFixed(1)}`,
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
  const gapAngle = 0.005
  const arrowOverlap = 0.35 // Arrowhead tip extends 0.35 rad into the next segment
  const baseStartAngle = -Math.PI / 2 + 0.15

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

      {/* Render each unified segment (Ring Body + Overlapping Triangular Arrowhead + Text/Icons) */}
      {segments.map((item, i) => {
        const elementId = `segment-${i}`
        const startAngle = baseStartAngle + i * angleStep
        const endAngle = baseStartAngle + (i + 1) * angleStep
        const midAngle = (startAngle + endAngle) / 2
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

        // Shift baseAngle slightly backward (~0.03 rad / ~2-3px) inside the segment body to remove any trait
        const baseAngle = endAngle - 0.03

        return (
          <g key={i}>
            {/* Segment Body */}
            <path
              d={ringArcPath(cx, cy, innerR, outerR, startAngle, endAngle + gapAngle)}
              fill={color}
              stroke={isSelected ? '#4a90d9' : 'none'}
              strokeWidth={isSelected ? 3 : 0}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              style={{ cursor: 'pointer' }}
            />
            {/* Triangular Arrowhead starting ~2-3px inside end of body and extending forward */}
            <path
              d={arrowheadPath(cx, cy, innerR, outerR, baseAngle, baseAngle + arrowOverlap)}
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