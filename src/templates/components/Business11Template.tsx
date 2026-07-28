import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'

const DEFAULT_COLORS = ['#2B2B60', '#3266CC', '#FF4D2D', '#E5A500']

export function Business11Template({ data }: { data: BusinessData }): ReactElement {
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

  const cx = 450
  const cy = 270
  const R = 120

  const defaultTitles = [
    'Executive Summary',
    'Products & Services',
    'Marketing Strategy',
    'Financial Planning',
  ]

  const defaultIcons = [
    // Truck / Delivery icon (01 - Top)
    <path key="icon-0" d="M19 17H22V13L19 9H14V17H16M19 17C19 18.1 18.1 19 17 19C15.9 19 15 18.1 15 17M19 17C19 15.9 18.1 15 17 15C15.9 15 15 15.9 15 17M7 17C7 18.1 6.1 19 5 19C3.9 19 3 18.1 3 17C3 15.9 3.9 15 5 15C6.1 15 7 15.9 7 17ZM3 15V6C3 4.9 3.9 4 5 4H14V15H3Z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round" transform="scale(1.2)" />,
    // Bank / Institution icon (02 - Right)
    <path key="icon-1" d="M4 10V17M9 10V17M14 10V17M19 10V17M2 20H21M11.5 3L2 8H21L11.5 3Z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="scale(1.1)" />,
    // Structure / Hierarchy icon (03 - Bottom)
    <g key="icon-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" transform="scale(1.1)">
      <path d="M12 3V11M6 11H18M6 11V15M18 11V15" />
      <circle cx="6" cy="17" r="2" fill="white" />
      <circle cx="12" cy="17" r="2" fill="white" />
      <circle cx="18" cy="17" r="2" fill="white" />
    </g>,
    // Bar chart / Growth icon (04 - Left)
    <g key="icon-3" stroke="white" strokeWidth="2.5" strokeLinecap="round" transform="scale(1.1)">
      <line x1="4" y1="20" x2="4" y2="12" />
      <line x1="9" y1="20" x2="9" y2="8" />
      <line x1="14" y1="20" x2="14" y2="14" />
      <line x1="19" y1="20" x2="19" y2="4" />
    </g>,
  ]

  // Petal arrangement parameters: Top (01), Right (02), Bottom (03), Left (04)
  // Center of each circle forming the pinwheel pattern
  const petalCenters = [
    { x: cx, y: cy - R / 2, angle: 0 },
    { x: cx + R / 2, y: cy, angle: 90 },
    { x: cx, y: cy + R / 2, angle: 180 },
    { x: cx - R / 2, y: cy, angle: 270 },
  ]

  // Positions for the text blocks around the pinwheel
  const textPositions = [
    { x: 60, y: 130, align: 'start' },   // Top-Left (01)
    { x: 620, y: 150, align: 'start' },  // Top-Right (02)
    { x: 620, y: 390, align: 'start' },  // Bottom-Right (03)
    { x: 60, y: 390, align: 'start' },   // Bottom-Left (04)
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
          fill="#1e3a5f"
        >
          {title}
        </text>
      )}

      {(nodes.length > 0 ? nodes : Array.from({ length: 4 })).slice(0, count).map((item, i) => {
        const node = typeof item === 'object' && item !== null ? (item as any) : {}
        const elementId = `node-${i}`
        const color = tplColors[elementId] ?? node?.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        const isSelected = selectedIds.has(elementId)
        const center = petalCenters[i] || { x: cx + R * Math.cos((i * 90) * Math.PI/180), y: cy + R * Math.sin((i * 90) * Math.PI/180), angle: i * 90 }
        const textPos = textPositions[i] || { x: center.x, y: center.y + R + 20, align: 'start' }
        const itemTitle = node.title || defaultTitles[i] || `Section ${i + 1}`
        const itemDesc = node.subtitle || node.text || 'Content and description to be added here as required'
        const numStr = node.percent ?? node.value ?? node.val ?? node.num ?? `0${i + 1}`

        // Bounding rect for drag&drop interaction of the petal
        const defaultRect = {
          x: center.x - R / 2 - 10,
          y: center.y - R / 2 - 10,
          width: R + 20,
          height: R + 20,
        }
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
        
        const titleVal = itemTitle
        const textVal = itemDesc
        const titleLines = titleVal.split('\n').filter(Boolean)
        const dynamicMaxChars = Math.max(15, Math.floor(visualRect.width / 7))
        const textLines = wrapTextByWidth(textVal, dynamicMaxChars)

        // SVG Path for pinwheel slice (3/4 of a circle starting from center)
        // A quarter-circle arc clipped at origin (0,0) relative to petal center
        const petalPath = `M 0 0 L 0 ${-R} A ${R} ${R} 0 0 1 ${R} 0 Z`

        return (
          <g key={i}>
            {/* Interactive Petal */}
            <g
              transform={`translate(${center.x + dx}, ${center.y + dy}) rotate(${center.angle})`}
              onMouseDown={e => startDrag(e, elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <g transform={`scale(${scaleX}, ${scaleY})`}>
                  <path
                    d={petalPath}
                    fill={color}
                    stroke={tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#FFFFFF')}
                    strokeWidth={tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 3 : 1.5)}
                    strokeDasharray={isSelected ? '4 2' : undefined}
                  />
                </g>
            </g>

            {/* Petal Content (Number + Icon) placed over the petal center offset */}
            <g pointerEvents="none">
              {/* Number */}
              <text
                x={center.x + dx + (i === 1 ? 15 : i === 3 ? -15 : 0)}
                y={center.y + dy + (i === 0 ? -35 : i === 2 ? 30 : -10)}
                fontFamily="Arial, sans-serif"
                fontSize={24}
                fontWeight={800}
                fill="#FFFFFF"
                textAnchor="middle"
              >
                {numStr}
              </text>

              {/* Icon */}
              <g
                transform={`translate(${
                  center.x + dx + (i === 1 ? 5 : i === 3 ? -25 : -12)
                }, ${
                  center.y + dy + (i === 0 ? -12 : i === 2 ? 40 : 5)
                })`}
              >
                {defaultIcons[i % defaultIcons.length]}
              </g>
            </g>

            {isSelected && renderHandles(visualRect, elementId)}

            {/* External Text Card */}
            <g transform={`translate(${textPos.x + dx}, ${textPos.y + dy})`}>
              <text
                x={0}
                y={0}
                fontFamily="Arial, sans-serif"
                fontSize={16}
                fontWeight={700}
                fill={color}
              >
                {titleLines.map((line: string, lIdx: number) => (
                  <tspan key={lIdx} x={0} dy={lIdx === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>
              <text
                x={0}
                y={22}
                fontFamily="Arial, sans-serif"
                fontSize={11.5}
                fill="#555555"
              >
                {textLines.map((line: string, lIdx: number) => (
                  <tspan key={lIdx} x={0} dy={lIdx === 0 ? 0 : 15}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          </g>
        )
      })}
    </g>
  )
}

