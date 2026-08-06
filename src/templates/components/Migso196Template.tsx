import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 271,
    "y": 106,
    "width": 929,
    "height": 544,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 919 0 Q 929 0 929 10 L 929 534 Q 929 544 919 544 L 10 544 Q 0 544 0 534 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 271,
    "y": 188,
    "width": 929,
    "height": 76,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 271,
    "y": 340,
    "width": 929,
    "height": 76,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 271,
    "y": 492,
    "width": 929,
    "height": 76,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 436,
    "y": 123,
    "width": 144,
    "height": 48,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 38 Q 144 48 134 48 L 10 48 Q 0 48 0 38 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 588,
    "y": 123,
    "width": 144,
    "height": 48,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 38 Q 144 48 134 48 L 10 48 Q 0 48 0 38 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 739,
    "y": 123,
    "width": 144,
    "height": 48,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 38 Q 144 48 134 48 L 10 48 Q 0 48 0 38 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 891,
    "y": 123,
    "width": 144,
    "height": 48,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 38 Q 144 48 134 48 L 10 48 Q 0 48 0 38 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1042,
    "y": 123,
    "width": 144,
    "height": 48,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 38 Q 144 48 134 48 L 10 48 Q 0 48 0 38 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 285,
    "y": 123,
    "width": 144,
    "height": 48,
    "text": "",
    "pathD": "M 10 0 L 134 0 Q 144 0 144 10 L 144 38 Q 144 48 134 48 L 10 48 Q 0 48 0 38 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 310,
    "y": 132,
    "width": 93,
    "height": 29,
    "text": "Column 1"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 1,
    "x": 462,
    "y": 132,
    "width": 93,
    "height": 29,
    "text": "Column 2"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 2,
    "x": 613,
    "y": 132,
    "width": 93,
    "height": 29,
    "text": "Column 3"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 3,
    "x": 765,
    "y": 132,
    "width": 93,
    "height": 29,
    "text": "Column 4"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 4,
    "x": 916,
    "y": 132,
    "width": 93,
    "height": 29,
    "text": "Column 5"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 5,
    "x": 1068,
    "y": 132,
    "width": 93,
    "height": 29,
    "text": "Column 6"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 293,
    "y": 204,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 6,
    "x": 293,
    "y": 280,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 12,
    "x": 293,
    "y": 356,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 18,
    "x": 293,
    "y": 432,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 24,
    "x": 293,
    "y": 508,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 30,
    "x": 293,
    "y": 587,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 1,
    "x": 445,
    "y": 204,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 7,
    "x": 445,
    "y": 280,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 13,
    "x": 445,
    "y": 356,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 19,
    "x": 445,
    "y": 432,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 25,
    "x": 445,
    "y": 508,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 31,
    "x": 445,
    "y": 587,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 2,
    "x": 596,
    "y": 204,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 8,
    "x": 596,
    "y": 280,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 14,
    "x": 596,
    "y": 356,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 20,
    "x": 596,
    "y": 432,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 26,
    "x": 596,
    "y": 508,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 32,
    "x": 596,
    "y": 587,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 3,
    "x": 748,
    "y": 204,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 9,
    "x": 748,
    "y": 280,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 15,
    "x": 748,
    "y": 356,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 21,
    "x": 748,
    "y": 432,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 27,
    "x": 748,
    "y": 508,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 33,
    "x": 748,
    "y": 587,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 4,
    "x": 899,
    "y": 204,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 10,
    "x": 899,
    "y": 280,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 16,
    "x": 899,
    "y": 356,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 22,
    "x": 899,
    "y": 432,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 28,
    "x": 899,
    "y": 508,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 34,
    "x": 899,
    "y": 587,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 5,
    "x": 1051,
    "y": 204,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 11,
    "x": 1051,
    "y": 280,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 17,
    "x": 1051,
    "y": 356,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 23,
    "x": 1051,
    "y": 432,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 29,
    "x": 1051,
    "y": 508,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-51",
    "dataNodeIdx": 35,
    "x": 1051,
    "y": 587,
    "width": 127,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-52",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 197,
    "width": 179,
    "height": 58,
    "text": "",
    "pathD": "M 10 0 L 169 0 Q 179 0 179 10 L 179 48 Q 179 58 169 58 L 10 58 Q 0 58 0 48 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-53",
    "dataNodeIdx": 0,
    "x": 136,
    "y": 211,
    "width": 67,
    "height": 29,
    "text": "Row 1"
  },
  {
    "id": "sp-54",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 80,
    "y": 273,
    "width": 179,
    "height": 58,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 10 0 L 169 0 Q 179 0 179 10 L 179 48 Q 179 58 169 58 L 10 58 Q 0 58 0 48 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-55",
    "dataNodeIdx": 1,
    "x": 136,
    "y": 287,
    "width": 67,
    "height": 29,
    "text": "Row 2"
  },
  {
    "id": "sp-56",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 80,
    "y": 349,
    "width": 179,
    "height": 58,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 10 0 L 169 0 Q 179 0 179 10 L 179 48 Q 179 58 169 58 L 10 58 Q 0 58 0 48 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-57",
    "dataNodeIdx": 2,
    "x": 136,
    "y": 363,
    "width": 67,
    "height": 29,
    "text": "Row 3"
  },
  {
    "id": "sp-58",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 80,
    "y": 425,
    "width": 179,
    "height": 58,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 10 0 L 169 0 Q 179 0 179 10 L 179 48 Q 179 58 169 58 L 10 58 Q 0 58 0 48 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-59",
    "dataNodeIdx": 3,
    "x": 136,
    "y": 439,
    "width": 67,
    "height": 29,
    "text": "Row 4"
  },
  {
    "id": "sp-60",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 80,
    "y": 501,
    "width": 179,
    "height": 58,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 10 0 L 169 0 Q 179 0 179 10 L 179 48 Q 179 58 169 58 L 10 58 Q 0 58 0 48 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-61",
    "dataNodeIdx": 4,
    "x": 136,
    "y": 515,
    "width": 67,
    "height": 29,
    "text": "Row 5"
  },
  {
    "id": "sp-62",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 80,
    "y": 580,
    "width": 179,
    "height": 58,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 10 0 L 169 0 Q 179 0 179 10 L 179 48 Q 179 58 169 58 L 10 58 Q 0 58 0 48 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-63",
    "dataNodeIdx": 5,
    "x": 136,
    "y": 594,
    "width": 67,
    "height": 29,
    "text": "Row 6"
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

export function Migso196Template({ data }: { data: BrainData }): ReactElement {
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
