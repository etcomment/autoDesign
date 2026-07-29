import { TITLE_COLOR } from '../../lib/theme'
import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const DEFAULT_STEP_COLORS = [
  '#2E2D6A', // Step 1: Navy
  '#FFB800', // Step 2: Yellow
  '#2F6EE5', // Step 3: Royal Blue
  '#4CB994', // Step 4: Teal
  '#FF523B', // Step 5: Coral
  '#E62E6B', // Step 6: Magenta
  '#2E2D6A', // Step 7: Navy
  '#FFB800', // Step 8: Yellow
  '#2F6EE5', // Step 9: Royal Blue
  '#4CB994', // Step 10: Teal
  '#FF523B', // Step 11: Coral
  '#E62E6B', // Step 12: Magenta
]

interface StepConfig {
  num: number
  path: string
  rect: { x: number; y: number; width: number; height: number }
  centerY: number
}

function getStepsConfig(): StepConfig[] {
  const colW = 190
  const rowH = 85
  const gapY = 50

  const x0 = 120 // Col 1
  const x1 = x0 + colW // 310 - Col 2
  const x2 = x1 + colW // 500 - Col 3
  const x3 = x2 + colW // 690 - Col 4
  const xEnd = x3 + colW // 880

  const y1 = 110 // Row 1
  const y2 = y1 + rowH + gapY // 245 - Row 2
  const y3 = y2 + rowH + gapY // 380 - Row 3

  const midY12 = y1 + rowH + gapY / 2 // 220 (Halfway between Row 1 & Row 2)
  const midY23 = y2 + rowH + gapY / 2 // 355 (Halfway between Row 2 & Row 3)

  const r = 20 // Corner radius

  return [
    {
      num: 1,
      path: `M ${x0 + r} ${y1} L ${x1} ${y1} L ${x1} ${y1 + rowH} L ${x0} ${y1 + rowH} L ${x0} ${y1 + r} A ${r} ${r} 0 0 1 ${x0 + r} ${y1} Z`,
      rect: { x: x0, y: y1, width: colW, height: rowH },
      centerY: y1 + rowH / 2,
    },
    {
      num: 2,
      path: `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y1 + rowH} L ${x1} ${y1 + rowH} Z`,
      rect: { x: x1, y: y1, width: colW, height: rowH },
      centerY: y1 + rowH / 2,
    },
    {
      num: 3,
      path: `M ${x2} ${y1} L ${x3} ${y1} L ${x3} ${y1 + rowH} L ${x2} ${y1 + rowH} Z`,
      rect: { x: x2, y: y1, width: colW, height: rowH },
      centerY: y1 + rowH / 2,
    },
    {
      num: 4,
      path: `M ${x3} ${y1} L ${xEnd - r} ${y1} A ${r} ${r} 0 0 1 ${xEnd} ${y1 + r} L ${xEnd} ${midY12} L ${x3} ${midY12} Z`,
      rect: { x: x3, y: y1, width: colW, height: midY12 - y1 },
      centerY: y1 + rowH / 2,
    },
    {
      num: 5,
      path: `M ${x3} ${midY12} L ${xEnd} ${midY12} L ${xEnd} ${y2 + rowH} L ${x3} ${y2 + rowH} Z`,
      rect: { x: x3, y: midY12, width: colW, height: y2 + rowH - midY12 },
      centerY: y2 + rowH / 2,
    },
    {
      num: 6,
      path: `M ${x2} ${y2} L ${x3} ${y2} L ${x3} ${y2 + rowH} L ${x2} ${y2 + rowH} Z`,
      rect: { x: x2, y: y2, width: colW, height: rowH },
      centerY: y2 + rowH / 2,
    },
    {
      num: 7,
      path: `M ${x1} ${y2} L ${x2} ${y2} L ${x2} ${y2 + rowH} L ${x1} ${y2 + rowH} Z`,
      rect: { x: x1, y: y2, width: colW, height: rowH },
      centerY: y2 + rowH / 2,
    },
    {
      num: 8,
      path: `M ${x0} ${y2} L ${x1} ${y2} L ${x1} ${midY23} L ${x0} ${midY23} Z`,
      rect: { x: x0, y: y2, width: colW, height: midY23 - y2 },
      centerY: y2 + rowH / 2,
    },
    {
      num: 9,
      path: `M ${x0} ${midY23} L ${x1} ${midY23} L ${x1} ${y3 + rowH} L ${x0 + r} ${y3 + rowH} A ${r} ${r} 0 0 1 ${x0} ${y3 + rowH - r} Z`,
      rect: { x: x0, y: midY23, width: colW, height: y3 + rowH - midY23 },
      centerY: y3 + rowH / 2,
    },
    {
      num: 10,
      path: `M ${x1} ${y3} L ${x2} ${y3} L ${x2} ${y3 + rowH} L ${x1} ${y3 + rowH} Z`,
      rect: { x: x1, y: y3, width: colW, height: rowH },
      centerY: y3 + rowH / 2,
    },
    {
      num: 11,
      path: `M ${x2} ${y3} L ${x3} ${y3} L ${x3} ${y3 + rowH} L ${x2} ${y3 + rowH} Z`,
      rect: { x: x2, y: y3, width: colW, height: rowH },
      centerY: y3 + rowH / 2,
    },
    {
      num: 12,
      path: `M ${x3} ${y3} L ${xEnd} ${y3} L ${xEnd} ${y3 + rowH - r} A ${r} ${r} 0 0 1 ${xEnd - r} ${y3 + rowH} L ${x3} ${y3 + rowH} Z`,
      rect: { x: x3, y: y3, width: colW, height: rowH },
      centerY: y3 + rowH / 2,
    },
  ]
}

export function Business3Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const mainTitle = data.title || 'Business 3'
  const nodes = data.nodes ?? []
  const stepsConfig = getStepsConfig()
  
  const displayNodes = nodes.length > 0 ? nodes : Array.from({ length: 12 })

  const W = 1000
  const H = 562.5

  return (
    <g ref={svgRef}>
      {/* Slide Title */}
      {mainTitle && (
        <text
          x={W / 2}
          y={48}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight={700}
          fill={TITLE_COLOR}
        >
          {mainTitle}
        </text>
      )}

      <g transform="translate(90, 152.5)">
        <text
          transform="rotate(-90)"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={16}
          fontWeight={800}
          fill="#1D1D4B"
          letterSpacing="3"
        >
          START
        </text>
      </g>

      <g transform="translate(910, 422.5)">
        <text
          transform="rotate(90)"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={16}
          fontWeight={800}
          fill="#1D1D4B"
          letterSpacing="3"
        >
          END
        </text>
      </g>

      {displayNodes.map((item, i) => {
        const nodeData = typeof item === 'object' && item !== null ? (item as any) : undefined
        const cfg = stepsConfig[i % stepsConfig.length]!
        const elementId = `step-${i}`
        const isSelected = selectedIds.has(elementId)

        const color = tplColors[elementId] ?? (nodeData as any)?.color ?? DEFAULT_STEP_COLORS[i % DEFAULT_STEP_COLORS.length]!
        
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 0)

        const defaultRect = cfg.rect
        const customPos = positions[elementId]

        const x = customPos ? customPos.x : defaultRect.x
        const y = customPos ? customPos.y : defaultRect.y
        const width = customPos?.width || defaultRect.width
        const height = customPos?.height || defaultRect.height

        const dx = x - defaultRect.x
        const dy = y - defaultRect.y

        const scaleX = width / defaultRect.width
        const scaleY = height / defaultRect.height

        const visualRect = { x, y, width, height }

        const titleVal = (nodeData as any)?.title || 'Title'
        const descVal = (nodeData as any)?.subtitle || (nodeData as any)?.text || 'Content and description to be added here as required'
        const numVal = (nodeData as any)?.num ?? (nodeData as any)?.value ?? (nodeData as any)?.percent ?? (i + 1)
        
        const fullDescLines = descVal.split('\n').flatMap((line: string) => {
          const words = line.split(' ');
          const lines: string[] = []
          let currentLine = ''
          for (const word of words) {
            if ((currentLine + ' ' + word).trim().length <= 20) {
              currentLine = (currentLine + ' ' + word).trim()
            } else {
              if (currentLine) lines.push(currentLine)
              currentLine = word
            }
          }
          if (currentLine) lines.push(currentLine)
          return lines
        })

        const isDoubleDigit = String(numVal).length >= 2
        const numX = defaultRect.x + (isDoubleDigit ? 14 : 20)
        const textX = defaultRect.x + (isDoubleDigit ? 62 : 52)
        const centerY = cfg.centerY

        return (
          <g key={i}>
            <g
              onMouseDown={e => startDrag(e, elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRect.x}, ${-defaultRect.y})`}>
                <path
                  d={cfg.path}
                  fill={color}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                />

                <text
                  x={numX}
                  y={centerY + 12}
                  fontFamily="Arial, sans-serif"
                  fontSize={isDoubleDigit ? 30 : 36}
                  fontWeight={700}
                  fill="#FFFFFF"
                >
                  {numVal}
                </text>

                <text
                  x={textX}
                  y={centerY - 14}
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fontWeight={700}
                  fill="#FFFFFF"
                >
                  {titleVal}
                </text>

                <text x={textX} y={centerY - 1} fontFamily="Arial, sans-serif" fontSize={10} fill="#FFFFFF" opacity={0.92}>
                  {fullDescLines.slice(0, 3).map((line: string, idx: number) => (
                    <tspan key={idx} x={textX} dy={idx === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            </g>

            {isSelected && renderHandles(visualRect, elementId)}
          </g>
        )
      })}


    </g>
  )
}
