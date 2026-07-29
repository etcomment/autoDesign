import { TITLE_COLOR } from '../../lib/theme'
import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth, parseNodePercent } from '../shared/primitives'

const DEFAULT_COLORS = ['#2B2B60', '#3266CC', '#FF4D2D', '#E5A500']
const DEFAULT_PERCENTAGES = ['25%', '50%', '75%', '100%']

export function Business10Template({ data }: { data: BusinessData }): ReactElement {
  const W = 900
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes } = data
  const count = nodes.length > 0 ? nodes.length : 4
  const startX = 60
  const startY = 100
  const rowHeight = 70
  const rowGap = 16
  const arrowWidth = 360
  const headWidth = 35

  const defaultTitles = [
    'Executing Summary',
    'Market Analysis',
    'Products & Services',
    'Financial Planning',
  ]

  const defaultIcons = [
    // Folder icon
    <path key="icon-0" d="M12 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H14L12 4Z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    // Calendar icon
    <path key="icon-1" d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4ZM3 10H21M16 2V6M8 2V6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    // Document icon
    <path key="icon-2" d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM14 2V8H20M16 13H8M16 17H8M10 9H8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    // Printer icon
    <path key="icon-3" d="M6 9V2H18V9M6 18H4C2.9 18 2 17.1 2 16V11C2 9.9 2.9 9 4 9H20C21.1 9 22 9.9 22 11V16C22 17.1 21.1 18 20 18H18M6 14H18V22H6V14Z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  ]

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

      {/* Light vertical accent bar on the left */}
      <rect x={startX} y={startY - 20} width={40} height={count * (rowHeight + rowGap) + 20} rx={20} fill="#EAEAEA" opacity={0.5} />

      {nodes.slice(0, count).map((node, i) => {
        const elementId = `node-${i}`
        const y = startY + i * (rowHeight + rowGap)
        const color = tplColors[elementId] ?? (node as any)?.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        const isSelected = selectedIds.has(elementId)
        const defaultRect = { x: startX, y, width: arrowWidth, height: rowHeight }
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const dx = visualRect.x - defaultRect.x
        const dy = visualRect.y - defaultRect.y
        const scaleX = visualRect.width / defaultRect.width
        const scaleY = visualRect.height / defaultRect.height
        
        const titleVal = (node as any).title || defaultTitles[i] || `Step ${i + 1}`
        const textVal = (node as any).subtitle || (node as any).text || 'Content and description to be added here as required'
        const titleLines = titleVal.split('\n').filter(Boolean)
        const dynamicMaxChars = Math.max(15, Math.floor(visualRect.width / 7))
        const textLines = wrapTextByWidth(textVal, dynamicMaxChars)

        const parsed = parseNodePercent(node, 0.25 * (i + 1))
        const percentage = (node as any)?.percent ?? (node as any)?.value ?? (node as any)?.pct ?? (node as any)?.val ?? parsed.percentStr ?? DEFAULT_PERCENTAGES[i % DEFAULT_PERCENTAGES.length]!

        // Arrow shape coordinates
        const points = [
          `${startX},${y}`,
          `${startX + arrowWidth - headWidth},${y}`,
          `${startX + arrowWidth},${y + rowHeight / 2}`,
          `${startX + arrowWidth - headWidth},${y + rowHeight}`,
          `${startX},${y + rowHeight}`
        ].join(' ')

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              {/* Arrow body */}
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRect.x}, ${-defaultRect.y})`}>
                <polygon
                  points={points}
                  fill={color}
                  stroke={tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')}
                  strokeWidth={tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 0)}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                />
              </g>

              {/* Icon container divider line */}
              <line x1={startX + 40 + dx} y1={y + dy} x2={startX + 40 + dx} y2={y + rowHeight + dy} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />

              {/* Icon */}
              <g transform={`translate(${startX + 18 + dx}, ${y + dy + rowHeight / 2 - 12}) scale(0.9)`}>
                {defaultIcons[i % defaultIcons.length]}
              </g>

              {/* Arrow title */}
              <text
                x={startX + 65 + dx}
                y={y + dy + rowHeight / 2 + 6}
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                fill="#FFFFFF"
              >
                {titleLines.map((line: string, lIdx: number) => (
                  <tspan key={lIdx} x={startX + 65 + dx} dy={lIdx === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {/* Percentage text */}
            <text
              x={startX + arrowWidth + 70 + dx}
              y={y + dy + rowHeight / 2 + 10}
              fontFamily="Arial, sans-serif"
              fontSize={32}
              fontWeight={800}
              fill={color}
              textAnchor="end"
            >
              {percentage}
            </text>

            {/* Description text */}
            <text
              x={startX + arrowWidth + 95 + dx}
              y={y + dy + rowHeight / 2 - 4}
              fontFamily="Arial, sans-serif"
              fontSize={12}
              fill="#555555"
              width={260}
            >
              {textLines.map((line: string, lIdx: number) => (
                  <tspan key={lIdx} x={startX + arrowWidth + 95 + dx} dy={lIdx === 0 ? 0 : 16}>
                    {line}
                  </tspan>
              ))}
            </text>
          </g>
        )
      })}
    </g>
  )
}

