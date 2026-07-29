import { TITLE_COLOR } from '../../lib/theme'
import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { parseNodePercent } from '../shared/primitives'

const TRIANGLE_COLORS = ['#1d2151', '#2b62d9', '#ff4d2d', '#ffc107', '#4ecdc4']

const DEFAULT_ITEMS = [
  { title: 'Your title', value: '£0.8M', ratio: 0.20 },
  { title: 'Your title', value: '£2.0M', ratio: 0.50 },
  { title: 'Your title', value: '£3.1M', ratio: 0.77 },
  { title: 'Your title', value: '£2.6M', ratio: 0.65 },
  { title: 'Your title', value: '£3.9M', ratio: 0.95 },
]

export function Business5Template({ data }: { data: BusinessData }): ReactElement {
  const W = 900
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes = [] } = data

  const itemsConfig = [
    { xLeft: 125, xPeak: 165, xRight: 195, defaultRatio: 0.20 },
    { xLeft: 185, xPeak: 265, xRight: 335, defaultRatio: 0.50 },
    { xLeft: 315, xPeak: 415, xRight: 515, defaultRatio: 0.77 },
    { xLeft: 495, xPeak: 575, xRight: 655, defaultRatio: 0.65 },
    { xLeft: 635, xPeak: 750, xRight: 865, defaultRatio: 0.95 },
  ]

  const yBase = 420
  const displayNodes = nodes.length > 0 ? nodes : DEFAULT_ITEMS

  return (
    <g ref={svgRef}>
      {title && (
        <text
          x={W / 2}
          y={48}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight={700}
          fill={TITLE_COLOR}
        >
          {title}
        </text>
      )}

      {displayNodes.map((item, idx) => {
        const cfg = itemsConfig[idx % itemsConfig.length]!
        const elementId = `mountain-${idx}`
        
        const nodeData = typeof item === 'object' && item !== null ? (item as any) : {}
        const defaultItem = DEFAULT_ITEMS[idx % DEFAULT_ITEMS.length]!
        const parsed = parseNodePercent(item, cfg.defaultRatio)

        const displayTitle = nodeData.title || defaultItem.title
        const displayValue = nodeData.value ?? nodeData.percent ?? nodeData.amount ?? nodeData.subtitle ?? defaultItem.value
        const color = tplColors[elementId] ?? nodeData.color ?? TRIANGLE_COLORS[idx % TRIANGLE_COLORS.length]
        
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#007acc' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2 : 0)

        // Calculate dynamic yPeak based on DSL numeric percentage / ratio
        const peakHeight = Math.max(70, Math.min(270, parsed.ratio * 280))
        const yPeak = yBase - peakHeight
        const pinY = yPeak - 25
        const titleY = pinY - 25

        const width = cfg.xRight - cfg.xLeft
        const height = yBase - (titleY - 20)
        
        const defaultRect = {
          x: cfg.xLeft,
          y: titleY - 20,
          width,
          height,
        }
        
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        
        const scaleX = visualRect.width / defaultRect.width
        const scaleY = visualRect.height / defaultRect.height

        const titleLines = String(displayTitle).split('\n').filter(Boolean)
        const valLines = String(displayValue).split('\n').filter(Boolean)

        return (
          <g key={elementId}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRect.x}, ${-defaultRect.y})`}>
                <text
                  x={cfg.xPeak}
                  y={titleY}
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  fontSize={14}
                  fontWeight={700}
                  fill="#1d2151"
                >
                  {titleLines.map((line: string, lIdx: number) => (
                    <tspan key={lIdx} x={cfg.xPeak} dy={lIdx === 0 ? 0 : 16}>{line}</tspan>
                  ))}
                </text>

                <line
                  x1={cfg.xPeak}
                  y1={pinY}
                  x2={cfg.xPeak}
                  y2={yPeak}
                  stroke={color}
                  strokeWidth={3}
                />
                <circle cx={cfg.xPeak} cy={pinY} r={5} fill={color} />

                <polygon
                  points={`${cfg.xLeft},${yBase} ${cfg.xPeak},${yPeak} ${cfg.xRight},${yBase}`}
                  fill={color}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                />

                <text
                  x={cfg.xPeak}
                  y={yBase - 22}
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  fontSize={15}
                  fontWeight={700}
                  fill="#ffffff"
                >
                  {valLines.map((line: string, lIdx: number) => (
                    <tspan key={lIdx} x={cfg.xPeak} dy={lIdx === 0 ? 0 : 18}>{line}</tspan>
                  ))}
                </text>
              </g>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <text x={450} y={460} textAnchor="middle" fontFamily="sans-serif" fontSize={12} fill="#555555">
        Content and description to be added here as required
      </text>
    </g>
  )
}
