import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { ClipboardList, ClipboardCheck, Clock, CheckSquare } from 'lucide-react'

// Colors for the 4 chevron segments (Dark Navy, Royal Blue, Orange-Red, Golden Yellow)
const CHEVRON_COLORS = [
  '#1F2456', // 1: Dark Navy / Indigo
  '#2F66CE', // 2: Bright Royal Blue
  '#FF5232', // 3: Vibrant Orange-Red
  '#FFB800'  // 4: Golden Yellow
]

const ICONS = [ClipboardList, ClipboardCheck, Clock, CheckSquare]

export function Business9Template({ data }: { data: BusinessData }): ReactElement {
  const W = 1000
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes } = data
  const defaultNodes = [
    { title: 'Your title', description: 'Content and description to be added here as required' },
    { title: 'Your title', description: 'Content and description to be added here as required' },
    { title: 'Your title', description: 'Content and description to be added here as required' },
    { title: 'Your title', description: 'Content and description to be added here as required' }
  ]
  const displayNodes = nodes.length > 0 ? nodes : defaultNodes

  // Chevron definitions (4 diamond/parallelogram polygon shapes forming a W / zigzag line)
  // Polygon 1 (goes down-right): Top-Left (95,340), Top-Right (215,220), Bottom-Right (415,420), Bottom-Left (295,540) -> Wait, let's specify coordinates precisely.
  // Chevron 1: Top-Left (95,345), Peak (215,225), Bottom (220,480) - let's make 4 interlocking chevrons!
  // Chevron 1 (Dark Navy): Point 1 (95,345), Point 2 (215,225), Point 3 (315,325), Point 4 (220,480), Point 5 (95,355)?
  // Let's use clean diamond/rhombus/polyline shapes that interlock seamlessly.
  // Each segment is formed by thick diagonal bands (width ~ 120px) going at 45 degrees up and down.
  // Segment 1 (Navy): Downward slope from (95, 345) down to V-bottom (220, 480).
  // Polygon 1: (95, 345) -> (215, 225) -> (315, 325) -> (220, 480)
  // Segment 2 (Blue): Upward slope from V-bottom (220, 480) up to Peak (410, 170).
  // Polygon 2: (215, 225) -> (410, 170) -> (510, 270) -> (315, 325)
  // Segment 3 (Red): Downward slope from Peak (410, 170) down to V-bottom (600, 480).
  // Polygon 3: (510, 270) -> (600, 480) -> (500, 380) ... wait:
  // Polygon 3: (410, 170) -> (510, 270) -> (700, 320)?
  // Let's refine coordinates so all 4 chevrons are perfectly symmetrical and aligned!
  //
  // X coordinates for peaks & valleys:
  // Start left: x = 95
  // Valley 1: x = 220, y = 480
  // Peak 1:   x = 410, y = 170
  // Valley 2: x = 600, y = 480
  // Peak 2:   x = 790, y = 170
  // End right: x = 905, y = 285
  //
  // Band offset along (+1, +1) direction = (-85, +85) or similar for 120px perpendicular width.
  // Let's define exact 4 polygon path strings:
  // Poly 1 (Navy):  "95,345  215,225  315,325  220,480"
  // Poly 2 (Blue):  "215,225  410,170  510,270  315,325"
  // Poly 3 (Red):   "510,270  410,170 ... wait, Blue top is (410,170) and right corner (510,270), bottom valley corner is (315,325)."
  // Poly 3 (Red):   "510,270  410,170  600,480 ... no, from peak (410,170) down to valley (600,480)."
  // Let's trace shared edges between adjacent blocks:
  // Block 1 & 2 share edge: (215,225) to (315,325)
  // Block 2 & 3 share edge: (410,170) to (510,270)
  // Block 3 & 4 share edge: (600,480) to (700,380) or (500, 380)? Wait:
  //
  // Let's verify shared edges:
  // Block 1: (95,345) -> (215,225) -> (315,325) -> (220,480)
  // Block 2: (215,225) -> (410,170) -> (510,270) -> (315,325)
  // Block 3: (410,170) -> (600,480) -> (700,380) -> (510,270)  (Wait: 410,170 to 600,480 is right edge of peak; 510,270 is right-bottom corner of peak edge)
  // Block 4: (600,480) -> (790,170) -> (905,285) -> (700,380)  (Wait: 790,170 is peak 2 top point, 905,285 is right end point).

  const count = displayNodes.length;
  const chevronPolygons = Array.from({ length: count }).map((_, i) => {
    const spacing = 810 / count;
    const startX = 95 + i * spacing;
    const midX = startX + spacing / 2;
    const endX = startX + spacing;
    
    // zigzag up and down
    const isUp = i % 2 === 0;
    const y1 = isUp ? 345 : 225;
    const y2 = isUp ? 225 : 480;
    const y3 = isUp ? 325 : 380;
    const y4 = isUp ? 480 : 270;

    if (i === 0) return '95,345 215,225 315,325 220,480';
    if (i === 1) return '215,225 410,170 510,270 315,325';
    if (i === 2) return '410,170 600,480 700,380 510,270';
    if (i === 3) return '600,480 790,170 905,285 700,380';
    
    return `${startX},${y1} ${midX},${y2} ${endX},${y3} ${midX + (startX-midX)/2},${y4}`;
  });

  // Positions for numbers 1, 2, 3, 4 (centered inside each chevron block)
  const numberPositions = [
    { x: 222, y: 418 }, // 1 (Navy, near bottom valley)
    { x: 410, y: 245 }, // 2 (Blue, near top peak)
    { x: 597, y: 418 }, // 3 (Red, near bottom valley)
    { x: 785, y: 245 }  // 4 (Yellow, near top peak)
  ]

  // Positions for circular icons (positioned over/under the W peaks and valleys)
  const iconPositions = [
    { x: 222, y: 225 }, // Icon 1: Above Navy valley (Top Left)
    { x: 410, y: 435 }, // Icon 2: Below Blue peak (Bottom Center)
    { x: 597, y: 225 }, // Icon 3: Above Red valley (Top Right)
    { x: 785, y: 435 }  // Icon 4: Below Yellow peak (Bottom Right)
  ]

  // Positions for Text blocks (Title + Description)
  // Nodes 1 & 3 (icons at top): text ABOVE icon (y around 130)
  // Nodes 2 & 4 (icons at bottom): text BELOW icon (y around 525)
  const textPositions = [
    { x: 222, y: 130, align: 'middle' as const, isTop: true },  // 1: Top Left
    { x: 410, y: 525, align: 'middle' as const, isTop: false }, // 2: Bottom Center
    { x: 597, y: 130, align: 'middle' as const, isTop: true },  // 3: Top Right
    { x: 785, y: 525, align: 'middle' as const, isTop: false }  // 4: Bottom Right
  ]

  return (
    <g ref={svgRef}>
      {/* Header Title */}
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

      {/* 4 Interlocking W-Zigzag Chevron Graphic Blocks */}
      <g>
        {chevronPolygons.map((pts, i) => {
          const chevId = `chevron-${i}`
          const color = tplColors[chevId] ?? CHEVRON_COLORS[i % CHEVRON_COLORS.length]!
          return (
            <polygon
              key={chevId}
              points={pts}
              fill={color}
              stroke={tplStrokeColors[chevId] || '#ffffff'}
              strokeWidth={tplStrokeWidths[chevId] !== undefined ? tplStrokeWidths[chevId] : 1.5}
            />
          )
        })}
      </g>

      {/* Numbers 1, 2, 3, 4 rendered on the chevrons */}
      <g style={{ pointerEvents: 'none' }}>
        {numberPositions.map((pos, i) => (
          <text
            key={`num-${i}`}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="sans-serif"
            fontSize={46}
            fontWeight="bold"
            fill="#FFFFFF"
          >
            {i + 1}
          </text>
        ))}
      </g>

      {/* 4 Circles with Icons & Text Cards (Drag & Drop / Color customizable) */}
      {displayNodes.map((node, i) => {
        const elementId = `node-${i}`
        const color = tplColors[elementId] ?? CHEVRON_COLORS[i % CHEVRON_COLORS.length]!
        const isSelected = selectedIds.has(elementId)
        const IconComponent = ICONS[i % ICONS.length]!

        const isUp = i % 2 === 0;
        const defaultIconPos = iconPositions[i] || { x: 222 + i * 188, y: isUp ? 225 : 435 };
        const defaultTextPos = textPositions[i] || { x: 222 + i * 188, y: isUp ? 130 : 525, align: 'middle', isTop: isUp };
        const iconPos = defaultIconPos;
        const textPos = defaultTextPos;

        // Combined visual box for selection / drag-resize
        const defaultBoxW = 280
        const defaultBoxH = 135
        const defaultBoxX = textPos.x - defaultBoxW / 2
        const defaultBoxY = textPos.isTop ? textPos.y - 25 : iconPos.y - 40
        
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultBoxX,
          y: customPos ? customPos.y : defaultBoxY,
          width: customPos?.width || defaultBoxW,
          height: customPos?.height || defaultBoxH,
        }
        
        const dx = visualRect.x - defaultBoxX
        const dy = visualRect.y - defaultBoxY

        const scaleX = visualRect.width / defaultBoxW;
        const scaleY = visualRect.height / defaultBoxH;

        const titleVal = node.title || (node as any)?.percent || (node as any)?.value || 'Your title'
        const textVal = (node as any)?.subtitle || (node as any)?.text || (node as any)?.description || 'Content and description to be added here as required'

        const titleLines = titleVal.split('\n').filter(Boolean)
        const dynamicMaxChars = Math.max(15, Math.floor(visualRect.width / 7))
        const textLines = wrapTextByWidth(textVal, dynamicMaxChars)

        return (
          <g key={i}>
            {/* Circle with Icon */}
            <circle cx={iconPos.x + dx} cy={iconPos.y + dy} r={38} fill={color} />
            <foreignObject x={iconPos.x + dx - 20} y={iconPos.y + dy - 20} width={40} height={40} style={{ pointerEvents: 'none' }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <IconComponent size={28} strokeWidth={2} />
              </div>
            </foreignObject>

            {/* Interactive Text & Selection area */}
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBoxX}, ${-defaultBoxY})`}>
                <rect
                  x={defaultBoxX}
                  y={defaultBoxY}
                  width={defaultBoxW}
                  height={defaultBoxH}
                  fill={tplColors[`bg-${elementId}`] ?? 'transparent'}
                  stroke={tplStrokeColors[elementId] || (isSelected ? '#2F66CE' : 'transparent')}
                  strokeWidth={tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : 1.5}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                  rx={6}
                />
              </g>

              {/* Title */}
              <text
                x={textPos.x + dx}
                y={textPos.y + dy}
                textAnchor="middle"
                fontFamily="sans-serif"
                fontSize={18}
                fontWeight="bold"
                fill="#252B42"
              >
                {titleLines.map((line: string, lIdx: number) => (
                  <tspan key={lIdx} x={textPos.x + dx} dy={lIdx === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>

              {/* Dynamic Description lines */}
              <text
                x={textPos.x + dx}
                y={textPos.y + dy + 22}
                textAnchor="middle"
                fontFamily="sans-serif"
                fontSize={12}
                fill="#555555"
              >
                {textLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={textPos.x + dx} dy={lIdx === 0 ? 0 : 16}>
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

