import { TITLE_COLOR } from '../../lib/theme'
import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { Newspaper, Printer, Award, Home, Crown, Wrench, FileText } from 'lucide-react'

// Colors for the 7 slices matching page 34:
// 0 (top): Dark Navy #1F2456
// 1 (top-right/middle-right): Bright Blue #2F66CE
// 2 (bottom-right): Coral Red #FF5232
// 3 (bottom-center): Yellow / Amber #FFB800
// 4 (bottom-left): Teal / Greenish #4ECB99
// 5 (top-left): Crimson / Magenta Red #9E0B36
// 6 (center slice): Dark Indigo/Navy #28285C (or center piece if pie)
const SLICE_COLORS = [
  '#1F2456', // 0: Top Navy
  '#2F66CE', // 1: Blue
  '#FF5232', // 2: Coral
  '#FFB800', // 3: Yellow
  '#4ECB99', // 4: Mint/Teal
  '#9E0B36', // 5: Crimson Red
  '#1F2456'  // Backup/extra
]

const ICONS = [Newspaper, Printer, Award, Home, Crown, Wrench, FileText]

export function Business8Template({ data }: { data: BusinessData }): ReactElement {
  const W = 1000
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes } = data

  // Center of pie chart
  const cx = 500
  const cy = 300
  const radius = 150

  // 7 Items configuration around the pie chart matching page 34 layout
  // Page 34 layout has 7 slices formed by curved/wavy dividing lines, and 7 surrounding icons with text.
  // 1: Top (Newspaper icon) -> (x: 535, y: 140)
  // 2: Top Left (Printer icon) -> (x: 270, y: 245)
  // 3: Bottom Left (Award icon) -> (x: 300, y: 430)
  // 4: Bottom Center (Home icon) -> (x: 545, y: 560)
  // 5: Bottom Right (Crown icon) -> (x: 618, y: 500)
  // 6: Middle Right (Wrench icon) -> (x: 706, y: 290)
  // [Note: 7 items total - 7th can be placed or styled seamlessly]

  const itemsConfig = [
    // 0: Top
    {
      sliceAngleStart: -85, sliceAngleEnd: -25,
      iconPos: { x: 535, y: 140 },
      textPos: { x: 585, y: 125, align: 'start' as const }
    },
    // 1: Middle Right
    {
      sliceAngleStart: -25, sliceAngleEnd: 45,
      iconPos: { x: 706, y: 290 },
      textPos: { x: 755, y: 275, align: 'start' as const }
    },
    // 2: Bottom Right
    {
      sliceAngleStart: 45, sliceAngleEnd: 95,
      iconPos: { x: 618, y: 500 },
      textPos: { x: 665, y: 485, align: 'start' as const }
    },
    // 3: Bottom Center
    {
      sliceAngleStart: 95, sliceAngleEnd: 155,
      iconPos: { x: 545, y: 560 },
      textPos: { x: 495, y: 535, align: 'end' as const }
    },
    // 4: Bottom Left
    {
      sliceAngleStart: 155, sliceAngleEnd: 205,
      iconPos: { x: 300, y: 430 },
      textPos: { x: 250, y: 410, align: 'end' as const }
    },
    // 5: Top Left
    {
      sliceAngleStart: 205, sliceAngleEnd: 275,
      iconPos: { x: 271, y: 245 },
      textPos: { x: 225, y: 230, align: 'end' as const }
    },
    // 6: Extra / Center
    {
      sliceAngleStart: 275, sliceAngleEnd: 275,
      iconPos: { x: 670, y: 170 },
      textPos: { x: 720, y: 155, align: 'start' as const }
    }
  ]

  const displayNodes = nodes.length > 0 ? nodes : Array(7).fill({ title: 'Your title', subtitle: 'Content and description to be added here as required' });
  const getConfig = (i: number, total: number) => {
    if (total === 7 && i < itemsConfig.length) return itemsConfig[i]!;
    const angleStep = 360 / total;
    const startDeg = -90 + i * angleStep;
    const endDeg = -90 + (i + 1) * angleStep;
    const midRad = ((startDeg + endDeg) / 2 * Math.PI) / 180;
    
    const iconR = 210;
    const iconX = cx + iconR * Math.cos(midRad);
    const iconY = cy + iconR * Math.sin(midRad);
    
    return {
      sliceAngleStart: startDeg,
      sliceAngleEnd: endDeg,
      iconPos: { x: iconX, y: iconY },
      textPos: { x: iconX + (Math.cos(midRad) > 0 ? 50 : -50), y: iconY - 15, align: Math.cos(midRad) > 0 ? 'start' : 'end' }
    };
  };

  // Helper function to create standard pie slice SVG path
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

  return (
    <g ref={svgRef}>
      {/* Page Title & Subtitle */}
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

      {/* Central Pie Graphic (7 slices) */}
      <g>
        {displayNodes.map((_, i) => {
          const config = getConfig(i, displayNodes.length);
          // removed itemsConfig[i]
          if (config.sliceAngleStart === config.sliceAngleEnd) return null
          const color = tplColors[`slice-${i}`] ?? SLICE_COLORS[i % SLICE_COLORS.length]!
          return (
            <path
              key={`slice-${i}`}
              d={getSlicePath(config.sliceAngleStart, config.sliceAngleEnd, radius)}
              fill={color}
              stroke={tplStrokeColors[`slice-${i}`] || '#ffffff'}
              strokeWidth={tplStrokeWidths[`slice-${i}`] !== undefined ? tplStrokeWidths[`slice-${i}`] : 2}
            />
          )
        })}

        {/* Dynamic organic curve lines running through pie chart (as seen in Page 34 template) */}
        <path d={`M ${cx - 120} ${cy - 80} Q ${cx - 20} ${cy - 10} ${cx + 145} ${cy - 40}`} fill="none" stroke="#ffffff" strokeWidth={3} opacity={0.7} />
        <path d={`M ${cx - 145} ${cy + 30} Q ${cx} ${cy + 10} ${cx + 90} ${cy + 120}`} fill="none" stroke="#ffffff" strokeWidth={3} opacity={0.7} />
      </g>

      {/* Connecting lines & nodes */}
      {displayNodes.map((node, i) => {
        const config = getConfig(i, displayNodes.length);
        // removed itemsConfig[i]
        const elementId = `node-${i}`
        const color = tplColors[elementId] ?? SLICE_COLORS[i % SLICE_COLORS.length]!
        const isSelected = selectedIds.has(elementId)
        const IconComponent = ICONS[i % ICONS.length]!

        const { iconPos, textPos } = config
        const isRight = textPos.align === 'start'

        // Calculate connecting curve from pie edge to icon circle center
        const midAngle = ((config.sliceAngleStart + config.sliceAngleEnd) / 2 * Math.PI) / 180
        const pieEdgeX = cx + (radius - 20) * Math.cos(midAngle)
        const pieEdgeY = cy + (radius - 20) * Math.sin(midAngle)

        const linePath = `M ${pieEdgeX} ${pieEdgeY} Q ${(pieEdgeX + iconPos.x) / 2} ${(pieEdgeY + iconPos.y) / 2} ${iconPos.x} ${iconPos.y}`

        const defaultRectW = 240
        const defaultRectH = 65
        const defaultRectX = isRight ? textPos.x - 10 : textPos.x - defaultRectW + 10
        const defaultRectY = textPos.y - 20
        
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultRectX,
          y: customPos ? customPos.y : defaultRectY,
          width: customPos?.width || defaultRectW,
          height: customPos?.height || defaultRectH,
        }
        
        const dx = visualRect.x - defaultRectX
        const dy = visualRect.y - defaultRectY

        const scaleX = visualRect.width / defaultRectW;
        const scaleY = visualRect.height / defaultRectH;

        const titleVal = node.title || (node as any).percent || (node as any).value || 'Your title'
        const textVal = node.subtitle || (node as any).text || (node as any).description || 'Content and description to be added here as required'

        const titleLines = titleVal.split('\n').filter(Boolean)
        const dynamicMaxChars = Math.max(15, Math.floor(visualRect.width / 7))
        const textLines = wrapTextByWidth(textVal, dynamicMaxChars)

        return (
          <g key={i}>
            {/* Connecting silver stroke line */}
            <path d={linePath} fill="none" stroke="#D1D5DB" strokeWidth={3.5} strokeLinecap="round" />

            {/* Circular Icon badge */}
            <circle cx={iconPos.x + dx} cy={iconPos.y + dy} r={30} fill={color} />
            <foreignObject x={iconPos.x + dx - 16} y={iconPos.y + dy - 16} width={32} height={32} style={{ pointerEvents: 'none' }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <IconComponent size={22} strokeWidth={1.8} />
              </div>
            </foreignObject>

            {/* Interactive Text Box & Selection */}
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, visualRect)} transform={getTransform(elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRectX}, ${-defaultRectY})`}>
                <rect
                  x={defaultRectX}
                  y={defaultRectY}
                  width={defaultRectW}
                  height={defaultRectH}
                  fill={tplColors[`bg-${elementId}`] ?? 'transparent'}
                  stroke={tplStrokeColors[elementId] || (isSelected ? '#2F66CE' : 'transparent')}
                  strokeWidth={tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : 1.5}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                  rx={4}
                />
              </g>

              {/* Title */}
              <text
                x={textPos.x + dx}
                y={textPos.y + dy}
                textAnchor={textPos.align as 'start' | 'middle' | 'end'}
                fontFamily="sans-serif"
                fontSize={17}
                fontWeight="bold"
                fill="#252B42"
              >
                {titleLines.map((line: string, lIdx: number) => (
                  <tspan key={lIdx} x={textPos.x + dx} dy={lIdx === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>

              {/* Description body lines */}
              <text
                x={textPos.x + dx}
                y={textPos.y + dy + 20}
                textAnchor={textPos.align as 'start' | 'middle' | 'end'}
                fontFamily="sans-serif"
                fontSize={11.5}
                fill="#555555"
              >
                {textLines.map((line: string, lIdx: number) => (
                  <tspan key={lIdx} x={textPos.x + dx} dy={lIdx === 0 ? 0 : 15}>
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

