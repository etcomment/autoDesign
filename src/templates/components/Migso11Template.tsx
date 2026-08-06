import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 85,
    "y": 148,
    "width": 500,
    "height": 101,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 85,
    "y": 148,
    "width": 11,
    "height": 101,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 85,
    "y": 281,
    "width": 500,
    "height": 101,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 85,
    "y": 281,
    "width": 11,
    "height": 101,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 85,
    "y": 414,
    "width": 500,
    "height": 101,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 85,
    "y": 414,
    "width": 11,
    "height": 101,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 85,
    "y": 547,
    "width": 500,
    "height": 101,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 85,
    "y": 547,
    "width": 11,
    "height": 101,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 657,
    "y": 148,
    "width": 500,
    "height": 101,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 657,
    "y": 148,
    "width": 11,
    "height": 101,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 657,
    "y": 281,
    "width": 500,
    "height": 101,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 657,
    "y": 281,
    "width": 11,
    "height": 101,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 657,
    "y": 414,
    "width": 500,
    "height": 101,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 657,
    "y": 414,
    "width": 11,
    "height": 101,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 657,
    "y": 547,
    "width": 500,
    "height": 101,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 657,
    "y": 547,
    "width": 11,
    "height": 101,
    "fillColor": "#4a90d9",
    "text": ""
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 218,
    "y": 159,
    "width": 179,
    "height": 36,
    "text": "Agenda item 01"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 222,
    "y": 192,
    "width": 353,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 218,
    "y": 292,
    "width": 179,
    "height": 36,
    "text": "Agenda item 03"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 222,
    "y": 325,
    "width": 353,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 4,
    "x": 218,
    "y": 425,
    "width": 179,
    "height": 36,
    "text": "Agenda item 05"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 4,
    "x": 222,
    "y": 458,
    "width": 353,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 6,
    "x": 218,
    "y": 558,
    "width": 179,
    "height": 36,
    "text": "Agenda item 07"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 6,
    "x": 222,
    "y": 591,
    "width": 353,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 1,
    "x": 787,
    "y": 159,
    "width": 179,
    "height": 36,
    "text": "Agenda item 02"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 1,
    "x": 792,
    "y": 192,
    "width": 354,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 3,
    "x": 787,
    "y": 292,
    "width": 179,
    "height": 36,
    "text": "Agenda item 04"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 3,
    "x": 792,
    "y": 325,
    "width": 354,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 5,
    "x": 787,
    "y": 425,
    "width": 179,
    "height": 36,
    "text": "Agenda item 06"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 5,
    "x": 792,
    "y": 458,
    "width": 354,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 7,
    "x": 787,
    "y": 558,
    "width": 179,
    "height": 36,
    "text": "Agenda item 08"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 7,
    "x": 792,
    "y": 591,
    "width": 354,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 0,
    "x": 123,
    "y": 170,
    "width": 72,
    "height": 56,
    "text": "1"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 2,
    "x": 123,
    "y": 303,
    "width": 72,
    "height": 56,
    "text": "3"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 4,
    "x": 123,
    "y": 436,
    "width": 72,
    "height": 56,
    "text": "5"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 6,
    "x": 123,
    "y": 569,
    "width": 72,
    "height": 56,
    "text": "7"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 1,
    "x": 693,
    "y": 170,
    "width": 72,
    "height": 56,
    "text": "2"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 3,
    "x": 693,
    "y": 303,
    "width": 72,
    "height": 56,
    "text": "4"
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 5,
    "x": 693,
    "y": 436,
    "width": 72,
    "height": 56,
    "text": "6"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 7,
    "x": 693,
    "y": 569,
    "width": 72,
    "height": 56,
    "text": "8"
  }
]

const DEFAULT_COLORS = ["#282a5d","#3365cc","#ff4d38","#ffb900","#52c49c","#ee6d90"]

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

export function Migso11Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const branches = data?.branches && data.branches.length > 0 ? data.branches : []

  const renderShape = (shapeDef: any, parentBbox: any) => {
    const id = shapeDef.id
    const isRoot = parentBbox === null
    
    let bbox = { x: shapeDef.x, y: shapeDef.y, width: shapeDef.width || shapeDef.w, height: shapeDef.height || shapeDef.h }
    
    if (isRoot) {
      const pos = positions[id]
      bbox = {
        x: pos?.x ?? bbox.x,
        y: pos?.y ?? bbox.y,
        width: pos?.width ?? bbox.width,
        height: pos?.height ?? bbox.height,
      }
    } else if (parentBbox && shapeDef.localPctX !== undefined) {
      bbox = {
        x: parentBbox.x + shapeDef.localPctX * parentBbox.width,
        y: parentBbox.y + shapeDef.localPctY * parentBbox.height,
        width: Math.max(1, shapeDef.localPctW * parentBbox.width),
        height: Math.max(1, shapeDef.localPctH * parentBbox.height),
      }
    }

    const isSelected = selectedIds.has(id)
    
    const branch = (shapeDef.dataNodeIdx !== undefined && shapeDef.dataNodeIdx !== -1 && shapeDef.dataNodeIdx < branches.length) 
      ? branches[shapeDef.dataNodeIdx] 
      : null

    let finalColor = shapeDef.fillColor
    let finalStroke = shapeDef.strokeColor
    if (shapeDef.isColorNode && branch) {
      const branchColor = branch.color || DEFAULT_COLORS[shapeDef.dataNodeIdx % DEFAULT_COLORS.length]
      if (finalColor && finalColor.toLowerCase() !== '#ffffff' && finalColor.toLowerCase() !== '#000000') {
        finalColor = branchColor
      }
      if (finalStroke && finalStroke.toLowerCase() !== '#ffffff' && finalStroke.toLowerCase() !== '#000000') {
        finalStroke = branchColor
      }
    }
    
    finalColor = tplColors[id] ?? finalColor

    let finalText = shapeDef.text
    if (shapeDef.isTitle && branch?.title) {
      finalText = branch.title
    }
    if (shapeDef.isSubtitle && branch?.subtitle) {
      finalText = branch.subtitle
    }

    if (shapeDef.isGroup) {
      return (
        <g key={id} onMouseDown={isRoot ? (e => startDrag(e, id, bbox)) : undefined} transform={isRoot ? getTransform(id, bbox) : undefined} style={{ cursor: isRoot ? 'pointer' : 'default' }}>
          {shapeDef.children?.map((child: any) => renderShape(child, bbox))}
          {isRoot && isSelected && renderHandles(bbox, id)}
        </g>
      )
    }

    const titleLines = finalText ? wrapText(finalText, Math.max(10, Math.floor(bbox.width / 6))) : []

    return (
      <g key={id} onMouseDown={isRoot ? (e => startDrag(e, id, bbox)) : undefined} transform={isRoot ? getTransform(id, bbox) : undefined} style={{ cursor: isRoot ? 'pointer' : 'default' }}>
        {shapeDef.pathD ? (
          <path
            d={shapeDef.pathD}
            transform={`translate(${bbox.x}, ${bbox.y}) scale(${bbox.width / Math.max(1, shapeDef.width || shapeDef.w)}, ${bbox.height / Math.max(1, shapeDef.height || shapeDef.h)})`}
            fill={finalColor || 'transparent'}
            opacity={isSelected && isRoot ? 0.88 : 1}
            stroke={isSelected && isRoot ? '#4a90d9' : (finalStroke || 'transparent')}
            strokeWidth={isSelected && isRoot ? 2.5 : (finalStroke ? 1.5 : 0)}
          />
        ) : (
          (finalColor || finalStroke) && (
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              rx={8}
              fill={finalColor || 'transparent'}
              opacity={isSelected && isRoot ? 0.88 : 1}
              stroke={isSelected && isRoot ? '#4a90d9' : (finalStroke || 'transparent')}
              strokeWidth={isSelected && isRoot ? 2.5 : (finalStroke ? 1.5 : 0)}
            />
          )
        )}

        {titleLines.length > 0 && (
          <text
            x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)}
            y={bbox.y + (shapeDef.pathD || finalColor ? 20 : 10)}
            fontFamily="Arial, sans-serif"
            fontSize={shapeDef.isTitle ? 14 : (shapeDef.isSubtitle ? 10 : 12)}
            fontWeight={shapeDef.isTitle ? 700 : 400}
            fill={shapeDef.isTitle ? '#111827' : '#4b5563'}
          >
            {titleLines.map((line: string, lIdx: number) => (
              <tspan key={lIdx} x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)} dy={lIdx === 0 ? 0 : (shapeDef.isTitle ? 18 : 14)}>
                {line}
              </tspan>
            ))}
          </text>
        )}

        {isRoot && isSelected && renderHandles(bbox, id)}
      </g>
    )
  }

  return (
    <g ref={svgRef}>
      {PPTX_EXTRACTED_SHAPES.map((shapeDef) => renderShape(shapeDef, null))}
    </g>
  )
}
