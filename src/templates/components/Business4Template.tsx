import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth, parseNodePercent } from '../shared/primitives'

const DEFAULT_ARROW_COLORS = ['#1D1D4B', '#2A60D3', '#FF4D2D']

export function Business4Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes } = data
  const mainTitle = title || 'Business 4'

  const W = 1000
  const H = 562.5

  const defaultColumns = [
    {
      num: '01',
      defaultTitle: 'Your title 01',
      defaultDesc: 'Content and description to be added here as required',
      fillRatio: 0.50,
    },
    {
      num: '02',
      defaultTitle: 'Your title 02',
      defaultDesc: 'Content and description to be added here as required',
      fillRatio: 0.70,
    },
    {
      num: '03',
      defaultTitle: 'Your title 03',
      defaultDesc: 'Content and description to be added here as required',
      fillRatio: 0.93,
    },
  ]

  const displayNodes = nodes && nodes.length > 0 ? nodes : defaultColumns

  const colWidth = 240
  const startY = 110
  const arrowHeight = 280
  const cardHeight = 410 
  const gap = 45
  const startX = 85

  return (
    <g ref={svgRef}>
      <defs>
        {displayNodes.map((_col, i) => {
          const arrowPathId = `arrow-clip-path-${i}`
          return (
            <clipPath id={arrowPathId} key={arrowPathId}>
              <path d="M 0 95 C 0 80, 15 50, 45 25 L 90 4 C 96 0, 104 0, 110 4 L 155 25 C 185 50, 200 80, 200 95 C 200 115, 185 110, 160 95 L 160 240 C 160 268, 140 280, 100 280 C 60 280, 40 268, 40 240 L 40 95 C 15 110, 0 115, 0 95 Z" />
            </clipPath>
          )
        })}
      </defs>

      {mainTitle && (
        <text
          x={W / 2}
          y={48}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight={700}
          fill="#1e3a5f"
        >
          {mainTitle}
        </text>
      )}

      {displayNodes.map((node, i) => {
        const defCol = defaultColumns[i % defaultColumns.length]!
        const elementId = `node-${i}`
        
        const colTitle = (node as any)?.title || defCol.defaultTitle
        const colDesc = (node as any)?.subtitle || (node as any)?.text || defCol.defaultDesc

        const parsed = parseNodePercent(node, defCol.fillRatio)
        const fillRatio = parsed.ratio

        const defaultX = startX + (i % 3) * (colWidth + gap) + (Math.floor(i / 3) * 15)
        const defaultY = startY + (Math.floor(i / 3) * 15)

        const customPos = positions[elementId]
        const x = customPos ? customPos.x : defaultX
        const y = customPos ? customPos.y : defaultY
        const width = customPos?.width || colWidth
        const height = customPos?.height || cardHeight

        const isSelected = selectedIds.has(elementId)
        const activeColor = tplColors[elementId] ?? (node as any)?.color ?? DEFAULT_ARROW_COLORS[i % DEFAULT_ARROW_COLORS.length]!
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2 : 0)

        const visualRect = { x, y, width, height }
        const defaultRect = { x: defaultX, y: defaultY, width: colWidth, height: cardHeight }
        
        const dx = x - defaultX
        const dy = y - defaultY

        const titleLines = colTitle.split('\n').filter(Boolean)
        const dynamicMaxChars = Math.max(15, Math.floor(width / 7))
        const descLines = wrapTextByWidth(colDesc, dynamicMaxChars)

        const scaleX = width / colWidth
        const scaleY = height / cardHeight

        const arrowWidth = 200
        const arrowX = defaultX + (colWidth - arrowWidth) / 2
        const arrowY = defaultY

        return (
          <g key={i}>
            {i < 2 && displayNodes.length <= 3 && (
              <line
                x1={defaultX + colWidth + gap / 2}
                y1={startY + 15}
                x2={defaultX + colWidth + gap / 2}
                y2={startY + arrowHeight + 20}
                stroke="#E2E8F0"
                strokeWidth={1}
              />
            )}

            <g
              onMouseDown={e => startDrag(e, elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={tplColors[`bg-${elementId}`] ?? 'transparent'}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isSelected ? '4 2' : undefined}
                rx={6}
              />

              <g transform={`translate(${x}, ${y}) scale(${scaleX}, ${scaleY}) translate(${-defaultX}, ${-defaultY})`}>
                <g transform={`translate(${arrowX}, ${arrowY})`}>
                  <g clipPath={`url(#arrow-clip-path-${i})`}>
                    <rect x={0} y={0} width={200} height={280} fill="#DCDCDC" />
                    <rect
                      x={0}
                      y={arrowHeight * (1 - fillRatio)}
                      width={200}
                      height={arrowHeight * fillRatio}
                      fill={activeColor}
                    />
                  </g>
                </g>

                <text
                  x={defaultX + colWidth / 2}
                  y={defaultY + arrowHeight + 42}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={18}
                  fontWeight={700}
                  fill={activeColor}
                >
                  {colTitle}
                </text>

                <text
                  x={defaultX + colWidth / 2}
                  y={defaultY + arrowHeight + 68}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={13}
                  fill="#4A5568"
                >
                  {descLines.map((line: string, lIdx: number) => (
                    <tspan key={lIdx} x={defaultX + colWidth / 2} dy={lIdx === 0 ? 0 : 18}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
              
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}


    </g>
  )
}
