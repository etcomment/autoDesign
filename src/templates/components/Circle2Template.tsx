import { useRef, type ReactElement } from 'react'
import type { CircleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'

const PALETTE = ['#2D2C59', '#3768D6', '#FF5338', '#00bcd4', '#4caf50', '#ff9800']

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
    'Z',
  ].join(' ')
}

function arrowheadPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  baseAngle: number,
  tipAngle: number,
  outerFlareR: number,
  innerFlareR: number,
): string {
  const cos = Math.cos
  const sin = Math.sin
  const midR = (innerR + outerR) / 2

  const xWingOuter = cx + outerFlareR * cos(baseAngle)
  const yWingOuter = cy + outerFlareR * sin(baseAngle)

  const xTip = cx + midR * cos(tipAngle)
  const yTip = cy + midR * sin(tipAngle)

  const xWingInner = cx + innerFlareR * cos(baseAngle)
  const yWingInner = cy + innerFlareR * sin(baseAngle)

  return [
    `M ${xWingOuter.toFixed(1)} ${yWingOuter.toFixed(1)}`,
    `L ${xTip.toFixed(1)} ${yTip.toFixed(1)}`,
    `L ${xWingInner.toFixed(1)} ${yWingInner.toFixed(1)}`,
    'Z',
  ].join(' ')
}

export function Circle2Template({ data }: { data: CircleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const getRect = (id: string, fallback: { x: number; y: number; width: number; height: number }) => positions[id] || fallback

  const W = 900
  const H = 500
  const cx = W / 2
  const cy = H / 2
  const innerR = 75
  const outerR = 170

  const segments = data.segments
  const n = segments.length
  if (n < 2) {
    return (
      <g>
        <text x={cx} y={cy} textAnchor="middle" fontSize={16} fill="#999">
          Minimum 2 segments
        </text>
      </g>
    )
  }

  const angleStep = (Math.PI * 2) / n
  const gapAngle = 0.005
  const arrowOverlap = 0.35
  const baseStartAngle = -Math.PI / 2 + 0.15

  return (
    <g ref={svgRef}>
      {/* Segment ring bodies */}
      {segments.map((_, i) => {
        const elementId = `segment-${i}`
        const startAngle = baseStartAngle + i * angleStep
        const endAngle = baseStartAngle + (i + 1) * angleStep + gapAngle
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length] ?? '#3768D6'

        const defaultBbox = {
          x: cx - outerR,
          y: cy - outerR,
          width: outerR * 2,
          height: outerR * 2,
        }
        const currentBbox = getRect(elementId, defaultBbox)

        const newCx = currentBbox.x + currentBbox.width / 2
        const newCy = currentBbox.y + currentBbox.height / 2
        const newOuterR = currentBbox.width / 2
        const scaleFactor = currentBbox.width / defaultBbox.width
        const newInnerR = innerR * scaleFactor

        return (
          <path
            key={`body-${i}`}
            d={ringArcPath(newCx, newCy, newInnerR, newOuterR, startAngle, endAngle)}
            fill={color}
            stroke={tplStrokeColors[elementId]}
            strokeWidth={tplStrokeWidths[elementId]}
          />
        )
      })}

      {/* Center hole */}
      <circle cx={cx} cy={cy} r={innerR - 1} fill="white" />

      {/* Interactive Arrowheads, Numbers and Labels */}
      {segments.map((item, i) => {
        const elementId = `segment-${i}`
        const startAngle = baseStartAngle + i * angleStep
        const endAngle = baseStartAngle + (i + 1) * angleStep
        const midAngle = (startAngle + endAngle) / 2
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length] ?? '#3768D6'
        const strokeColor = tplStrokeColors[elementId]
        const strokeW = tplStrokeWidths[elementId]
        const isSelected = selectedIds.has(elementId)

        const defaultBbox = {
          x: cx - outerR,
          y: cy - outerR,
          width: outerR * 2,
          height: outerR * 2,
        }
        const currentBbox = getRect(elementId, defaultBbox)

        const newCx = currentBbox.x + currentBbox.width / 2
        const newCy = currentBbox.y + currentBbox.height / 2
        const newOuterR = currentBbox.width / 2
        const scaleFactor = currentBbox.width / defaultBbox.width
        const newInnerR = innerR * scaleFactor

        const cosMid = Math.cos(midAngle)
        const sinMid = Math.sin(midAngle)

        const iconRadius = (newInnerR + newOuterR) / 2
        const iconX = newCx + iconRadius * cosMid
        const iconY = newCy + iconRadius * sinMid

        const numberRadius = newOuterR - (25 * scaleFactor)
        const numberX = newCx + numberRadius * cosMid
        const numberY = newCy + numberRadius * sinMid

        let labelAnchor: 'start' | 'end' | 'middle' = 'start'
        if (cosMid < -0.2) {
          labelAnchor = 'end'
        } else if (cosMid > 0.2) {
          labelAnchor = 'start'
        } else {
          labelAnchor = 'middle'
        }

        const labelRadius = newOuterR + (55 * scaleFactor)
        const labelX = newCx + labelRadius * cosMid
        const labelY = newCy + labelRadius * sinMid

        const baseAngle = endAngle - 0.03
        const scaledOuterFlareR = newOuterR + (28 * scaleFactor)
        const scaledInnerFlareR = newInnerR - (18 * scaleFactor)

        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined
        const titleLines = wrapTextByWidth(item.title, 18)
        const descLines = item.description ? wrapTextByWidth(item.description, 24) : []

        return (
          <g key={i}>
            <path
              d={ringArcPath(newCx, newCy, newInnerR, newOuterR, startAngle, endAngle + gapAngle)}
              fill="transparent"
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, currentBbox)}
              style={{ cursor: 'pointer' }}
            />
            <path
              d={arrowheadPath(newCx, newCy, newInnerR, newOuterR, baseAngle, baseAngle + arrowOverlap, scaledOuterFlareR, scaledInnerFlareR)}
              fill={color}
              stroke={isSelected ? '#4a90d9' : (strokeColor || 'none')}
              strokeWidth={isSelected ? 3 : (strokeW || 0)}
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, currentBbox)}
              style={{ cursor: 'pointer' }}
            />

            {IconComponent ? (
              <g transform={`translate(${iconX - 12}, ${iconY - 12})`}>
                <IconComponent size={24 * scaleFactor} color="white" />
              </g>
            ) : item.icon ? (
              <text x={iconX} y={iconY + 7 * scaleFactor} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={26 * scaleFactor} fill="white">
                {item.icon}
              </text>
            ) : null}

            <text
              x={numberX}
              y={numberY + 7 * scaleFactor}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={22 * scaleFactor}
              fontWeight={700}
              fill="white"
            >
              {item.number}
            </text>

            <text
              x={labelX}
              y={labelY - 6 * scaleFactor}
              textAnchor={labelAnchor}
              fontFamily="Arial, sans-serif"
              fontSize={15 * scaleFactor}
              fontWeight={700}
              fill="#111"
            >
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={labelX} dy={lineIndex === 0 ? 0 : 16 * scaleFactor}>
                  {line}
                </tspan>
              ))}
            </text>

            {item.description && (
              <text
                x={labelX}
                y={labelY + (titleLines.length * 16 + 2) * scaleFactor}
                textAnchor={labelAnchor}
                fontFamily="Arial, sans-serif"
                fontSize={11 * scaleFactor}
                fill="#555"
              >
                {descLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={labelX} dy={lineIndex === 0 ? 0 : 13 * scaleFactor}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}

            {isSelected && renderHandles(currentBbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}

export { Circle2Template as CircleTemplate }