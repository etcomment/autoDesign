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
    "x": 122,
    "y": 304,
    "width": 241,
    "height": 91,
    "fillColor": "#282a5d",
    "strokeColor": "#ffffff",
    "text": "19"
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

export function Migso135Template({ data }: { data: BrainData }): ReactElement {
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
