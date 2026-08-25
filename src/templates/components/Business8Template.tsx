import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function renderDynamicIcon(iconName?: string, size = 20, color = '#FFFFFF'): ReactElement | null {
  if (!iconName) return null
  const clean = iconName.trim()
  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn({ size, color })

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const lucideRecord = LucideIcons as Record<string, unknown>
  const LucideFn = (lucideRecord[pascalName] || lucideRecord[clean] || lucideRecord[clean.toUpperCase()]) as
    | React.ComponentType<{ size?: number; color?: string }>
    | undefined

  if (LucideFn) {
    return <LucideFn size={size} color={color} />
  }
  return null
}

const SLICE_COLORS = [
  '#1F2456',
  '#2F66CE',
  '#FF5232',
  '#FFB800',
  '#4ECB99',
  '#9E0B36',
  '#1F2456',
]

const DEFAULT_ICONS = ['newspaper', 'printer', 'award', 'home', 'crown', 'wrench', 'file-text']

export function Business8Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const displayNodes =
    nodes.length > 0
      ? nodes
      : Array(6).fill({
          title: 'Your title',
          subtitle: 'Content and description to be added here as required',
        })

  const cx = 500
  const cy = 280
  const radius = 140

  const getElementRect = (elementId: string, defaultRect: Rect): Rect => {
    const stored = positions[elementId]
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width ?? defaultRect.width,
      height: stored?.height ?? defaultRect.height,
    }
  }

  const getConfig = (i: number, total: number) => {
    const angleStep = 360 / total
    const startDeg = -90 + i * angleStep
    const endDeg = -90 + (i + 1) * angleStep
    const midRad = (((startDeg + endDeg) / 2) * Math.PI) / 180

    const iconR = 210
    const iconX = cx + iconR * Math.cos(midRad)
    const iconY = cy + iconR * Math.sin(midRad)

    return {
      sliceAngleStart: startDeg,
      sliceAngleEnd: endDeg,
      iconPos: { x: iconX, y: iconY },
      textPos: {
        x: iconX + (Math.cos(midRad) > 0 ? 45 : -45),
        y: iconY - 15,
        align: Math.cos(midRad) > 0 ? ('start' as const) : ('end' as const),
      },
    }
  }

  const getSlicePath = (startDeg: number, endDeg: number, r: number) => {
    const startRad = (startDeg * Math.PI) / 180
    const endRad = (endDeg * Math.PI) / 180
    const x1 = cx + r * Math.cos(startRad)
    const y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad)
    const y2 = cy + r * Math.sin(endRad)
    const largeArc = endDeg - startDeg > 180 ? 1 : 0
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  const centerDefaultRect: Rect = { x: cx - 45, y: cy - 45, width: 90, height: 90 }
  const centerVisualRect = getElementRect('center-badge', centerDefaultRect)
  const centerLabel = data.centerLabel ?? 'CORE'

  return (
    <g ref={svgRef}>
      <g>
        {displayNodes.map((_, i) => {
          const config = getConfig(i, displayNodes.length)
          const sliceId = `slice-${i}`
          const isSliceSelected = selectedIds.has(sliceId)
          const color = templateColors[sliceId] ?? SLICE_COLORS[i % SLICE_COLORS.length]!
          const stroke = templateStrokeColors[sliceId] ?? (isSliceSelected ? '#4a90d9' : '#ffffff')
          const strokeWidth = templateStrokeWidths[sliceId] ?? (isSliceSelected ? 3 : 2)

          return (
            <path
              key={sliceId}
              d={getSlicePath(config.sliceAngleStart, config.sliceAngleEnd, radius)}
              fill={color}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          )
        })}

        <path
          d={`M ${cx - 110} ${cy - 75} Q ${cx - 20} ${cy - 10} ${cx + 130} ${cy - 35}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth={3}
          opacity={0.7}
        />
        <path
          d={`M ${cx - 130} ${cy + 25} Q ${cx} ${cy + 10} ${cx + 80} ${cy + 110}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth={3}
          opacity={0.7}
        />
      </g>

      <g
        data-element-id="center-badge"
        onMouseDown={event => startDrag(event, 'center-badge', centerVisualRect)}
        transform={getTransform('center-badge', centerVisualRect)}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={centerVisualRect.x + centerVisualRect.width / 2}
          cy={centerVisualRect.y + centerVisualRect.height / 2}
          r={centerVisualRect.width / 2}
          fill={templateColors['center-badge'] ?? '#FFFFFF'}
          stroke={templateStrokeColors['center-badge'] ?? '#28285C'}
          strokeWidth={templateStrokeWidths['center-badge'] ?? 3}
        />
        <text
          x={centerVisualRect.x + centerVisualRect.width / 2}
          y={centerVisualRect.y + centerVisualRect.height / 2 + 5}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={13}
          fontWeight={700}
          fill="#28285C"
        >
          {centerLabel}
        </text>
        {selectedIds.has('center-badge') && renderHandles(centerVisualRect, 'center-badge')}
      </g>

      {displayNodes.map((node, i) => {
        const itemObject = typeof node === 'object' && node !== null ? node : {}
        const config = getConfig(i, displayNodes.length)
        const elementId = `node-${i}`
        const color = templateColors[elementId] ?? SLICE_COLORS[i % SLICE_COLORS.length]!
        const isSelected = selectedIds.has(elementId)

        const defaultIcon = DEFAULT_ICONS[i % DEFAULT_ICONS.length]!
        const iconName = 'icon' in itemObject && typeof itemObject.icon === 'string' ? itemObject.icon : defaultIcon

        const { iconPos, textPos } = config
        const isRight = textPos.align === 'start'

        const defaultRectW = 230
        const defaultRectH = 65
        const defaultRectX = isRight ? textPos.x - 10 : textPos.x - defaultRectW + 10
        const defaultRectY = textPos.y - 20
        const defaultRect: Rect = { x: defaultRectX, y: defaultRectY, width: defaultRectW, height: defaultRectH }

        const visualRect = getElementRect(elementId, defaultRect)
        const dx = visualRect.x - defaultRectX
        const dy = visualRect.y - defaultRectY

        const currentIconX = iconPos.x + dx
        const currentIconY = iconPos.y + dy

        const midAngle = (((config.sliceAngleStart + config.sliceAngleEnd) / 2) * Math.PI) / 180
        const pieEdgeX = cx + (radius - 20) * Math.cos(midAngle)
        const pieEdgeY = cy + (radius - 20) * Math.sin(midAngle)
        const linePath = `M ${pieEdgeX} ${pieEdgeY} Q ${(pieEdgeX + currentIconX) / 2} ${(pieEdgeY + currentIconY) / 2} ${currentIconX} ${currentIconY}`

        const titleVal =
          'title' in itemObject && typeof itemObject.title === 'string' && itemObject.title
            ? itemObject.title
            : 'percent' in itemObject && typeof itemObject.percent === 'string'
              ? itemObject.percent
              : 'value' in itemObject && typeof itemObject.value === 'string'
                ? itemObject.value
                : 'Your title'

        const textVal =
          'subtitle' in itemObject && typeof itemObject.subtitle === 'string' && itemObject.subtitle
            ? itemObject.subtitle
            : 'text' in itemObject && typeof itemObject.text === 'string' && itemObject.text
              ? itemObject.text
              : 'Content and description to be added here as required'

        const dynamicMaxChars = Math.max(12, Math.floor(visualRect.width / 7))
        const titleLines = wrapTextByWidth(titleVal, dynamicMaxChars)
        const textLines = wrapTextByWidth(textVal, dynamicMaxChars)

        const iconElement = renderDynamicIcon(iconName, 20, '#FFFFFF')

        return (
          <g key={elementId}>
            <path d={linePath} fill="none" stroke="#D1D5DB" strokeWidth={3.5} strokeLinecap="round" />

            <circle cx={currentIconX} cy={currentIconY} r={26} fill={color} />
            <g transform={`translate(${currentIconX - 10}, ${currentIconY - 10})`}>
              {iconElement ?? <circle cx="10" cy="10" r="5" fill="#FFFFFF" />}
            </g>

            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={visualRect.x}
                y={visualRect.y}
                width={visualRect.width}
                height={visualRect.height}
                fill={templateColors[`bg-${elementId}`] ?? 'transparent'}
                stroke={templateStrokeColors[elementId] ?? (isSelected ? '#2F66CE' : 'transparent')}
                strokeWidth={templateStrokeWidths[elementId] ?? 1.5}
                strokeDasharray={isSelected ? '4 2' : undefined}
                rx={4}
              />

              <text
                x={textPos.x + dx}
                y={textPos.y + dy}
                textAnchor={textPos.align}
                fontFamily="Arial, sans-serif"
                fontSize={16}
                fontWeight={700}
                fill="#252B42"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={textPos.x + dx} dy={lineIndex === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>

              <text
                x={textPos.x + dx}
                y={textPos.y + dy + titleLines.length * 18 + 4}
                textAnchor={textPos.align}
                fontFamily="Arial, sans-serif"
                fontSize={11.5}
                fill="#555555"
              >
                {textLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={textPos.x + dx} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}

