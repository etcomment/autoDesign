import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import * as LucideIcons from 'lucide-react'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 733,
    "y": 269,
    "width": 381,
    "height": 51,
    "fillColor": "#282a5d",
    "strokeColor": "#ffffff",
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-1",
    "x": 729,
    "y": 229,
    "width": 163,
    "height": 36,
    "fillColor": "#3365cc",
    "strokeColor": "#ffffff",
    "text": "Your title here"
  },
  {
    "id": "sp-2",
    "x": 392,
    "y": 112,
    "width": 260,
    "height": 392,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "text": "Item 3",
    "pathD": "M 0 0 L 10 0 C 149 7, 260 122, 260 263 C 260 309, 248 351, 228 389 L 226 392 L 135 339 L 135 338 C 147 316, 154 290, 154 263 C 154 179, 88 110, 5 106 L 0 106 L 0 0 Z"
  },
  {
    "id": "sp-3",
    "x": 126,
    "y": 112,
    "width": 260,
    "height": 392,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff",
    "text": "Item 4",
    "pathD": "M 260 0 L 260 106 L 255 106 C 172 110, 106 179, 106 263 C 106 290, 113 316, 125 338 L 125 339 L 34 392 L 32 389 C 12 351, 0 309, 0 263 C 0 122, 111 7, 250 0 L 260 0 Z"
  },
  {
    "id": "sp-4",
    "x": 162,
    "y": 457,
    "width": 453,
    "height": 182,
    "fillColor": "#52c49c",
    "strokeColor": "#ffffff",
    "text": "Item 5",
    "pathD": "M 92 0 L 96 7 C 124 49, 172 76, 226 76 C 281 76, 329 49, 357 7 L 361 0 L 453 53 L 452 55 C 406 131, 322 182, 226 182 C 131 182, 47 131, 1 55 L 0 53 L 92 0 Z"
  },
  {
    "id": "sp-5",
    "x": 259,
    "y": 224,
    "width": 260,
    "height": 94,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff",
    "text": "Item 6",
    "pathD": "M 130 0 C 182 0, 229 27, 256 67 L 260 74 L 225 94 L 222 90 C 202 60, 168 40, 130 40 C 92 40, 58 60, 38 90 L 35 94 L 0 74 L 4 67 C 31 27, 78 0, 130 0 Z"
  },
  {
    "id": "sp-6",
    "x": 238,
    "y": 303,
    "width": 148,
    "height": 224,
    "fillColor": "#ee6d90",
    "strokeColor": "#ffffff",
    "text": "Item 7",
    "pathD": "M 18 0 L 53 20 L 49 29 C 43 42, 40 57, 40 72 C 40 130, 84 177, 140 183 L 148 184 L 148 224 L 143 224 C 64 220, 0 154, 0 72 C 0 46, 7 22, 18 0 L 18 0 Z"
  },
  {
    "id": "sp-7",
    "x": 392,
    "y": 303,
    "width": 148,
    "height": 224,
    "fillColor": "#4a90d9",
    "strokeColor": "#ffffff",
    "text": "Item 8",
    "pathD": "M 130 0 L 130 0 C 141 22, 148 46, 148 72 C 148 154, 84 220, 4 224 L 0 224 L 0 184 L 8 183 C 64 177, 108 130, 108 72 C 108 57, 105 42, 99 29 L 95 20 L 130 0 Z"
  },
  {
    "id": "sp-8",
    "x": 315,
    "y": 348,
    "width": 149,
    "height": 55,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "text": "Lean Manufacturing"
  },
  {
    "id": "sp-9",
    "x": 122,
    "y": 268,
    "width": 169,
    "height": 32,
    "fillColor": "#ffb900",
    "strokeColor": "#ffffff",
    "text": "SHORT CYCLES"
  },
  {
    "id": "sp-10",
    "x": 492,
    "y": 256,
    "width": 162,
    "height": 55,
    "fillColor": "#52c49c",
    "strokeColor": "#ffffff",
    "text": "CONTINUOUS IMPROVEMENT"
  },
  {
    "id": "sp-11",
    "x": 305,
    "y": 553,
    "width": 170,
    "height": 55,
    "fillColor": "#ee6d90",
    "strokeColor": "#ffffff",
    "text": "TOTAL QUALITY FOCUS"
  },
  {
    "id": "sp-12",
    "x": 337,
    "y": 235,
    "width": 104,
    "height": 29,
    "fillColor": "#282a5d",
    "strokeColor": "#ffffff",
    "text": "ProcessES"
  },
  {
    "id": "sp-13",
    "x": 181,
    "y": 177,
    "width": 399,
    "height": 395,
    "fillColor": "#3365cc",
    "strokeColor": "#ffffff",
    "text": "TECHNOLOGY",
    "pathD": "M 200 0 A 200 198 0 1 1 199 0 Z"
  },
  {
    "id": "sp-14",
    "x": 193,
    "y": 168,
    "width": 399,
    "height": 395,
    "fillColor": "#ff4d38",
    "strokeColor": "#ffffff",
    "text": "PEOPLE",
    "pathD": "M 200 0 A 200 198 0 1 1 199 0 Z"
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

export function Migso131Template({ data }: { data: BrainData }): ReactElement {
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
