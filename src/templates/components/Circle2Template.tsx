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
  outerFlareR: number, // New parameter for scaled flare
  innerFlareR: number, // New parameter for scaled flare
): string {
  const cos = Math.cos
  const sin = Math.sin
  const midR = (innerR + outerR) / 2

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
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef) // getTransform is no longer needed for redrawing
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  // Helper function to get element position or fallback to default
  const getRect = (id: string, fallback: {x: number, y: number, width: number, height: number}) => positions[id] || fallback;

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
      {data.title && (
        <>
          <text x={50} y={50} fontFamily="Arial, sans-serif" fontSize={32} fontWeight={700} fill="#2D2B55">
            {data.title}
          </text>
          <rect x={50} y={62} width={70} height={5} fill="#2D2B55" rx={2} />
        </>
      )}

      {/* 1. Render all segment ring bodies first */}
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
        const currentBbox = getRect(elementId, defaultBbox);

        // Calculate new center and radii based on currentBbox
        const newCx = currentBbox.x + currentBbox.width / 2;
        const newCy = currentBbox.y + currentBbox.height / 2;
        const newOuterR = currentBbox.width / 2;
        const scaleFactor = currentBbox.width / defaultBbox.width;
        const newInnerR = innerR * scaleFactor;

        return (
          <path
            key={`body-${i}`}
            d={ringArcPath(newCx, newCy, newInnerR, newOuterR, startAngle, endAngle)}
            fill={color}
            stroke={tplStrokeColors[elementId]}
            strokeWidth={tplStrokeWidths[elementId]}
            // Removed transform, path is drawn directly at its final position/size
          />
        )
      })}

      {/* 2. White center hole circle rendered BEFORE arrowheads */}
      {/* This circle is not a draggable element itself, so its position is relative to the overall canvas.
          Keeping it static as it's not a "connector linking elements". */}
      <circle cx={cx} cy={cy} r={innerR - 1} fill="white" />

      {/* 3. Render all arrowheads ON TOP of all bodies with unified interaction & transform */}
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
        const currentBbox = getRect(elementId, defaultBbox);

        // Calculate new center and radii based on currentBbox
        const newCx = currentBbox.x + currentBbox.width / 2;
        const newCy = currentBbox.y + currentBbox.height / 2;
        const newOuterR = currentBbox.width / 2;
        const scaleFactor = currentBbox.width / defaultBbox.width;
        const newInnerR = innerR * scaleFactor;

        // Recalculate icon, number, label positions based on newCx, newCy, newOuterR, newInnerR
        const cosMid = Math.cos(midAngle)
        const sinMid = Math.sin(midAngle)

        const iconRadius = (newInnerR + newOuterR) / 2
        const iconX = newCx + iconRadius * cosMid
        const iconY = newCy + iconRadius * sinMid

        const numberRadius = newOuterR - (25 * scaleFactor) // Scale the offset
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

        const labelRadius = newOuterR + (55 * scaleFactor) // Scale the offset
        const labelX = newCx + labelRadius * cosMid
        const labelY = newCy + labelRadius * sinMid

        const baseAngle = endAngle - 0.03

        // Calculate scaled flare radii for arrowhead
        const scaledOuterFlareR = newOuterR + (28 * scaleFactor);
        const scaledInnerFlareR = newInnerR - (18 * scaleFactor);

        return (
          <g key={i}> {/* Removed transform from this G */}
            {/* Invisible clickable layer over body for unified selection */}
            {/* This path defines the draggable area for the segment.
                It's drawn using the recalculated coordinates. */}
            <path
              d={ringArcPath(newCx, newCy, newInnerR, newOuterR, startAngle, endAngle + gapAngle)}
              fill="transparent"
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, currentBbox)} // Pass currentBbox
              // Removed transform, path is drawn directly at its final position/size
              style={{ cursor: 'pointer' }}
            />
            {/* Visible Triangular Arrowhead extending forward over next segment */}
            <path
              d={arrowheadPath(newCx, newCy, newInnerR, newOuterR, baseAngle, baseAngle + arrowOverlap, scaledOuterFlareR, scaledInnerFlareR)}
              fill={color}
              stroke={isSelected ? '#4a90d9' : (strokeColor || 'none')}
              strokeWidth={isSelected ? 3 : (strokeW || 0)}
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, currentBbox)} // Pass currentBbox
              // Removed transform
              style={{ cursor: 'pointer' }}
            />
            {item.icon && (
              <text x={iconX} y={iconY + 7 * scaleFactor} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={28 * scaleFactor} fill="white">
                {item.icon}
              </text>
            )}
            <text
              x={numberX}
              y={numberY + 7 * scaleFactor}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={24 * scaleFactor}
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
              fontSize={16 * scaleFactor}
              fontWeight={700}
              fill="#111"
            >
              {item.title}
            </text>
            <text
              x={labelX}
              y={labelY + 14 * scaleFactor}
              textAnchor={labelAnchor}
              fontFamily="Arial, sans-serif"
              fontSize={12 * scaleFactor}
              fill="#555"
            >
              {item.description.length > 45 ? item.description.slice(0, 42) + '...' : item.description}
            </text>
            {isSelected && renderHandles(currentBbox, elementId)} {/* Pass currentBbox */}
          </g>
        )
      })}
    </g>
  )
}