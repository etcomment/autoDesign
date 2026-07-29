import { TITLE_COLOR } from '../../lib/theme'
import { useRef, type ReactElement } from 'react'
import { wrapTextByWidth } from '../shared/primitives'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const DEFAULT_BLOCKS = [
  {
    num: '01',
    defaultTitle: 'Your title',
    defaultText: 'Content and description to be added here as required',
    color: '#2B2B5C',
    iconType: 'chat',
    iconSide: 'left',
  },
  {
    num: '02',
    defaultTitle: 'Your title',
    defaultText: 'Content and description to be added here as required',
    color: '#346ED8',
    iconType: 'target',
    iconSide: 'left',
  },
  {
    num: '03',
    defaultTitle: 'Your title',
    defaultText: 'Content and description to be added here as required',
    color: '#FF5436',
    iconType: 'megaphone',
    iconSide: 'right',
  },
  {
    num: '04',
    defaultTitle: 'Your title',
    defaultText: 'Content and description to be added here as required',
    color: '#FFB800',
    iconType: 'search',
    iconSide: 'right',
  },
]

function renderIcon(type: string, strokeColor: string) {
  switch (type) {
    case 'chat':
      return (
        <g stroke={strokeColor} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Speech bubble frame */}
          <rect x={-14} y={-10} width={28} height={18} rx={2} />
          {/* Tail */}
          <path d="M 6 8 L 10 13 L 2 8" />
          {/* Lines inside bubble */}
          <line x1={-9} y1={-5} x2={9} y2={-5} strokeDasharray="3 2" />
          <line x1={-9} y1={0} x2={5} y2={0} strokeDasharray="3 2" />
          {/* Keyhole/slider accent at bottom */}
          <circle cx={-5} cy={8} r={2} fill={strokeColor} />
        </g>
      )
    case 'target':
      return (
        <g stroke={strokeColor} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer corners / target frame */}
          <path d="M -12 -6 L -12 -12 L -6 -12" />
          <path d="M 6 -12 L 12 -12 L 12 -6" />
          <path d="M 12 6 L 12 12 L 6 12" />
          <path d="M -6 12 L -12 12 L -12 6" />
          {/* Target circle */}
          <circle cx={0} cy={0} r={5} />
          <circle cx={0} cy={0} r={1.5} fill={strokeColor} />
        </g>
      )
    case 'megaphone':
      return (
        <g stroke={strokeColor} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Megaphone body */}
          <path d="M -10 -3 L -3 -6 L -3 6 L -10 3 Z" />
          <path d="M -3 -6 L 8 -11 L 8 11 L -3 6" />
          {/* Handle */}
          <path d="M -6 4 L -6 10" />
          {/* Sound waves */}
          <path d="M 11 -6 A 7 7 0 0 1 11 6" />
        </g>
      )
    case 'search':
    default:
      return (
        <g stroke={strokeColor} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Envelope base */}
          <path d="M -12 4 L -12 11 L 12 11 L 12 4" />
          <path d="M -12 4 L 0 -3 L 12 4" />
          {/* Magnifying glass */}
          <circle cx={1} cy={-4} r={6} />
          <line x1={5.5} y1={0.5} x2={10} y2={5} />
        </g>
      )
  }
}

export function Business2Template({ data }: { data: BusinessData }): ReactElement {
  const W = 900
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes } = data
  const titleText = title || 'Business 2'

  // Geometry constants for 4 tiles layout
  const topY = 110
  const midY = 300
  const botY = 490

  const xLeftStart = 175
  const xLeftPeak = 450
  const xRightEnd = 725

  const poly01 = `${xLeftStart},${topY} ${xLeftPeak},${topY} 410,${midY} 135,${midY}`
  const poly02 = `135,${midY} 410,${midY} ${xLeftPeak},${botY} ${xLeftStart},${botY}`
  const poly03 = `490,${midY} 765,${midY} ${xRightEnd},${botY} ${xLeftPeak},${botY}`
  const poly04 = `${xLeftPeak},${topY} ${xRightEnd},${topY} 765,${midY} 490,${midY}`

  const polygonPoints = [poly01, poly02, poly03, poly04]

  const blockBboxes = [
    { x: 135, y: topY, width: 315, height: midY - topY },
    { x: 135, y: midY, width: 315, height: botY - midY },
    { x: 450, y: midY, width: 315, height: botY - midY },
    { x: 450, y: topY, width: 315, height: midY - topY },
  ]

  const iconCenters = [
    { cx: 150, cy: (topY + midY) / 2 },
    { cx: 150, cy: (midY + botY) / 2 },
    { cx: 750, cy: (midY + botY) / 2 },
    { cx: 750, cy: (topY + midY) / 2 },
  ]

  // Affichage dynamique, fallback sur le nombre réel
  const displayNodes = nodes.length > 0 ? nodes : DEFAULT_BLOCKS

  return (
    <g ref={svgRef}>
      {/* Header Title */}
      {titleText && (
        <text
          x={W / 2}
          y={48}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight={700}
          fill={TITLE_COLOR}
        >
          {titleText}
        </text>
      )}

      {/* Colored Blocks */}
      {displayNodes.map((item, i) => {
        const nodeData = typeof item === 'object' && item !== null && 'title' in item ? (item as { title?: string; subtitle?: string; color?: string; icon?: string }) : undefined
        const defaultConfig = DEFAULT_BLOCKS[i % DEFAULT_BLOCKS.length]!!
        const elementId = `block-${i}`
        const isSelected = selectedIds.has(elementId)
        const blockColor = tplColors[elementId] ?? (nodeData as any)?.color ?? defaultConfig.color
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 3 : 0)

        const defaultBbox = blockBboxes[i] || {
          x: (i % 2 === 0) ? 135 : 450,
          y: botY + 40 + Math.floor((i - 4) / 2) * 200,
          width: 315,
          height: 180,
        }
        const poly = polygonPoints[i] || `${defaultBbox.x},${defaultBbox.y} ${defaultBbox.x + defaultBbox.width},${defaultBbox.y} ${defaultBbox.x + defaultBbox.width},${defaultBbox.y + defaultBbox.height} ${defaultBbox.x},${defaultBbox.y + defaultBbox.height}`

        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultBbox.x,
          y: customPos ? customPos.y : defaultBbox.y,
          width: customPos?.width || defaultBbox.width,
          height: customPos?.height || defaultBbox.height,
        }

        const dx = bbox.x - defaultBbox.x
        const dy = bbox.y - defaultBbox.y

        const numVal = (nodeData as any)?.num ?? (nodeData as any)?.percent ?? (nodeData as any)?.value ?? (nodeData as any)?.val ?? defaultConfig.num
        const titleVal = (nodeData as any)?.title ?? defaultConfig.defaultTitle
        const textVal = (nodeData as any)?.subtitle ?? (nodeData as any)?.text ?? defaultConfig.defaultText

        const iconPos = iconCenters[i] || {
          cx: (i % 2 === 0) ? 150 : 750,
          cy: defaultBbox.y + 90,
        }
        const isLeft = defaultConfig.iconSide === 'left'

        const textAnchor = isLeft ? 'start' : 'middle'
        const baseTextX = isLeft ? 215 : 625
        const textX = baseTextX + dx

        const titleLines = titleVal.split('\n').filter(Boolean)
        // Dynamically compute character limit based on block width (approx. 7.5px per character at font-size 12)
        const dynamicMaxChars = Math.max(15, Math.floor(bbox.width / 7.5))
        const textLines = wrapTextByWidth(textVal, dynamicMaxChars)

        const baseTopY = ((i === 0 || i === 3) ? topY : (i < 4 ? midY : defaultBbox.y)) + dy

        const scaleX = bbox.width / defaultBbox.width;
        const scaleY = bbox.height / defaultBbox.height;

        return (
          <g key={i}>
            {/* Main Interactive Polygon Block */}
            <g onMouseDown={e => startDrag(e, elementId, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
                <polygon
                  points={poly}
                  fill={blockColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                />
              </g>

              {/* Number (01, 02, 03, 04) */}
              <text
                x={textX}
                y={baseTopY + 50}
                textAnchor={textAnchor}
                fontFamily="Arial, sans-serif"
                fontSize={32}
                fontWeight={700}
                fill="#FFFFFF"
              >
                {numVal}
              </text>

              {/* Title (Supports multi-line \n) */}
              <text
                x={textX}
                y={baseTopY + 82}
                textAnchor={textAnchor}
                fontFamily="Arial, sans-serif"
                fontSize={17}
                fontWeight={700}
                fill="#FFFFFF"
              >
                {titleLines.map((line: string, lIdx: number) => (
                  <tspan key={lIdx} x={textX} dy={lIdx === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>

              {/* Subtitle / Description text */}
              <text
                x={textX}
                y={baseTopY + 82 + (titleLines.length * 20) + 10}
                textAnchor={textAnchor}
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#FFFFFF"
                opacity={0.9}
              >
                {textLines.map((line: string, lIdx: number) => (
                  <tspan key={lIdx} x={textX} dy={lIdx === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>

              {/* Icon Circle */}
              <circle
                cx={iconPos.cx + dx}
                cy={iconPos.cy + dy}
                r={36}
                fill="#FFFFFF"
                stroke={blockColor}
                strokeWidth={4}
              />

              {/* Render vector icon inside circle */}
              <g transform={`translate(${iconPos.cx + dx}, ${iconPos.cy + dy})`}>
                {renderIcon(nodeData?.icon || defaultConfig.iconType, blockColor)}
              </g>

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}

