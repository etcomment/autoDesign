import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import * as LucideIcons from 'lucide-react'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-2",
    "x": 529,
    "y": 92,
    "width": 416,
    "height": 359.3333333333333,
    "fillColor": "#282a5d",
    "strokeColor": "#ffffff",
    "text": "Item 1",
    "pathD": "M 208 0 L 312 179 L 208 359 L 416 359 L 416 359 L 0 359 Z"
  },
  {
    "id": "sp-3",
    "x": 737,
    "y": 92,
    "width": 416,
    "height": 359.3333333333333,
    "fillColor": "#3365cc",
    "strokeColor": "#ffffff",
    "text": "Item 2",
    "pathD": "M 208 0 L 416 359 L 0 359 L 0 359 L 208 359 L 104 179 Z"
  },
  {
    "id": "sp-4",
    "x": 633.2275711159738,
    "y": 450.4213197969543,
    "width": 416,
    "height": 180.57868020304568,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "text": "Item 3",
    "pathD": "M 104 0 L 312 0 L 416 181 L 0 181 Z"
  },
  {
    "id": "sp-5",
    "x": 737,
    "y": 270.75465313028764,
    "width": 208,
    "height": 179.66666666666666,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff",
    "text": "Item 4",
    "pathD": "M 104 0 L 208 179.66666666666666 L 0 179.66666666666666 Z"
  },
  {
    "id": "sp-6",
    "x": 919.512035010941,
    "y": 406.1886632825719,
    "width": 208,
    "height": 179.66666666666666,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "text": "Item 5",
    "pathD": "M 104 0 L 208 179.66666666666666 L 0 179.66666666666666 Z"
  },
  {
    "id": "sp-7",
    "x": 554.487964989059,
    "y": 406.1886632825719,
    "width": 208,
    "height": 179.66666666666666,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "text": "Item 6",
    "pathD": "M 104 0 L 208 179.66666666666666 L 0 179.66666666666666 Z"
  },
  {
    "id": "sp-8",
    "x": 737,
    "y": 92,
    "width": 208,
    "height": 179.66666666666666,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "text": "Item 7",
    "pathD": "M 104 0 L 208 179.66666666666666 L 0 179.66666666666666 Z"
  },
  {
    "id": "sp-9",
    "x": 764.308533916849,
    "y": 369.25211505922164,
    "width": 156.1137855579869,
    "height": 61.56091370558376,
    "fillColor": "#3365cc",
    "strokeColor": "#ffffff",
    "text": "Lean Manufacturing"
  },
  {
    "id": "sp-10",
    "x": 866.7155361050329,
    "y": 293.5549915397631,
    "width": 228.0262582056893,
    "height": 45.14467005076142,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "text": "TECHNOLOGY"
  },
  {
    "id": "sp-11",
    "x": 629.1312910284464,
    "y": 293.5549915397631,
    "width": 160.6652078774617,
    "height": 45.14467005076142,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff",
    "text": "SYSTEMS"
  },
  {
    "id": "sp-12",
    "x": 771.1356673960613,
    "y": 522.0143824027073,
    "width": 139.27352297592998,
    "height": 45.14467005076142,
    "fillColor": "#52c49c",
    "strokeColor": "#ffffff",
    "text": "PEOPLE"
  },
  {
    "id": "sp-13",
    "x": 784.3347921225384,
    "y": 110.69627749576989,
    "width": 113.7855579868709,
    "height": 87.55329949238579,
    "fillColor": "#ee6d90",
    "strokeColor": "#ffffff",
    "text": "TOTAL QUALITY FOCUS"
  },
  {
    "id": "sp-14",
    "x": 550.8468271334792,
    "y": 474.5896785109983,
    "width": 163.8512035010941,
    "height": 87.55329949238579,
    "fillColor": "#282a5d",
    "strokeColor": "#ffffff",
    "text": "CONTINUOUS IMPROVE- MENT"
  },
  {
    "id": "sp-15",
    "x": 995.9759299781183,
    "y": 487.3578680203046,
    "width": 106.50328227571116,
    "height": 61.56091370558376,
    "fillColor": "#3365cc",
    "strokeColor": "#ffffff",
    "text": "SHORT CYCLES"
  },
  {
    "id": "sp-0",
    "x": 80,
    "y": 227,
    "width": 382,
    "height": 52,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-1",
    "x": 76,
    "y": 187,
    "width": 163,
    "height": 36,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff",
    "text": "Your title here"
  }
]

const DEFAULT_COLORS = ["#282a5d","#3365cc","#ff4d38","#ffb900","#52c49c","#ee6d90"]
const DEFAULT_ICONS = ["wrench","lightbulb","zap","git-branch","target","mouse-pointer"]

function getDynamicIcon(iconName?: string, size = 24) {
  if (!iconName) return null
  const clean = iconName.trim()

  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? size} color={props.color ?? 'white'} />
  }

  return null
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  if (!text) return []
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim()
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}

export function Migso133Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const branches = data?.branches && data.branches.length > 0 ? data.branches : []

  return (
    <g ref={svgRef}>
      {PPTX_EXTRACTED_SHAPES.map((shapeDef, i) => {
        const id = shapeDef.id || `item-${i}`
        const branch = branches[i]
        const color = tplColors[id] ?? branch?.color ?? shapeDef.fillColor ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(id)

        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? shapeDef.x,
          y: pos?.y ?? shapeDef.y,
          width: pos?.width ?? shapeDef.width,
          height: pos?.height ?? shapeDef.height,
        }

        const titleText = branch?.title || shapeDef.text || `Item ${i + 1}`
        const iconKey = branch?.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length]
        const IconFn = getDynamicIcon(iconKey, 20)
        const titleLines = wrapText(titleText, Math.max(8, Math.floor(bbox.width / 10)))

        return (
          <g key={id} onMouseDown={e => startDrag(e, id, bbox)} transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
            {shapeDef.pathD ? (
              <path
                d={shapeDef.pathD}
                transform={"translate(" + bbox.x + ", " + bbox.y + ")"}
                fill={color}
                opacity={isSelected ? 0.88 : 1}
                stroke={isSelected ? '#4a90d9' : (shapeDef.strokeColor || '#ffffff')}
                strokeWidth={isSelected ? 2.5 : 1}
              />
            ) : (
              <rect
                x={bbox.x}
                y={bbox.y}
                width={bbox.width}
                height={bbox.height}
                rx={8}
                fill={color}
                opacity={isSelected ? 0.88 : 1}
                stroke={isSelected ? '#4a90d9' : (shapeDef.strokeColor || '#ffffff')}
                strokeWidth={isSelected ? 2.5 : 1}
              />
            )}

            {IconFn && (
              <g transform={`translate(${bbox.x + 10}, ${bbox.y + 10})`}>
                <IconFn size={20} color="#ffffff" />
              </g>
            )}

            <text
              x={bbox.x + (IconFn ? 38 : 12)}
              y={bbox.y + 20}
              fontFamily="Arial, sans-serif"
              fontSize={12}
              fontWeight={700}
              fill="#ffffff"
            >
              {titleLines.map((line, lIdx) => (
                <tspan key={lIdx} x={bbox.x + (IconFn ? 38 : 12)} dy={lIdx === 0 ? 0 : 15}>
                  {line}
                </tspan>
              ))}
            </text>

            {branch?.subtitle && (
              <text
                x={bbox.x + (IconFn ? 38 : 12)}
                y={bbox.y + 24 + titleLines.length * 13}
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fontWeight={400}
                fill="#ffffff"
                opacity={0.85}
              >
                {branch.subtitle}
              </text>
            )}

            {isSelected && renderHandles(bbox, id)}
          </g>
        )
      })}
    </g>
  )
}
