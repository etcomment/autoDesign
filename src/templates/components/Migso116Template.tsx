import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 781,
    "y": 183,
    "width": 354,
    "height": 179,
    "fillColor": "#52c49c",
    "text": ""
  },
  {
    "id": "sp-1",
    "x": 871,
    "y": 443,
    "width": 319,
    "height": 112,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-2",
    "x": 347,
    "y": 443,
    "width": 454,
    "height": 63,
    "fillColor": "#ffb900",
    "text": ""
  },
  {
    "id": "sp-3",
    "x": 477,
    "y": 236,
    "width": 346,
    "height": 127,
    "fillColor": "#ff4d38",
    "text": ""
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 87,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 180,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 272,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 364,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 457,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 549,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 642,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 734,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 826,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 919,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 1011,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 1104,
    "y": 371,
    "width": 89,
    "height": 63,
    "text": ""
  },
  {
    "id": "sp-16",
    "x": 121,
    "y": 299,
    "width": 555,
    "height": 63,
    "fillColor": "#3365cc",
    "text": ""
  },
  {
    "id": "sp-56",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 121,
    "y": 205,
    "width": 10,
    "height": 150,
    "text": ""
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 107,
    "y": 355,
    "width": 27,
    "height": 27,
    "fillColor": "#ffffff",
    "strokeColor": "#000000",
    "text": "",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 2,
    "x": 118,
    "y": 194,
    "width": 43,
    "height": 28,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 27 14 L 43 0 L 27 0 Z M 27 28 L 43 28 L 27 14 Z M 0 28 L 27 28 L 27 0 L 0 0 Z"
  },
  {
    "id": "sp-57",
    "x": 476,
    "y": 173,
    "width": 10,
    "height": 182,
    "text": ""
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 463,
    "y": 355,
    "width": 27,
    "height": 27,
    "fillColor": "#ffffff",
    "strokeColor": "#000000",
    "text": "",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 473,
    "y": 163,
    "width": 43,
    "height": 28,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 27 14 L 43 0 L 27 0 Z M 27 28 L 43 28 L 27 14 Z M 0 28 L 27 28 L 27 0 L 0 0 Z"
  },
  {
    "id": "sp-58",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 346,
    "y": 449,
    "width": 10,
    "height": 150,
    "text": ""
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 4,
    "x": 332,
    "y": 422,
    "width": 27,
    "height": 27,
    "fillColor": "#ffffff",
    "strokeColor": "#000000",
    "text": "",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 14,
    "x": 343,
    "y": 582,
    "width": 43,
    "height": 28,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 27 14 L 43 28 L 27 28 Z M 27 0 L 43 0 L 27 14 Z M 0 0 L 27 0 L 27 28 L 0 28 Z"
  },
  {
    "id": "sp-59",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 871,
    "y": 449,
    "width": 10,
    "height": 150,
    "text": ""
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 5,
    "x": 857,
    "y": 422,
    "width": 27,
    "height": 27,
    "fillColor": "#ffffff",
    "strokeColor": "#000000",
    "text": "",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 15,
    "x": 868,
    "y": 582,
    "width": 43,
    "height": 28,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 27 14 L 43 0 L 27 0 Z M 27 28 L 43 28 L 27 14 Z M 0 28 L 27 28 L 27 0 L 0 0 Z"
  },
  {
    "id": "sp-60",
    "x": 1135,
    "y": 130,
    "width": 10,
    "height": 226,
    "text": ""
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 2,
    "x": 1122,
    "y": 355,
    "width": 27,
    "height": 27,
    "fillColor": "#ffffff",
    "strokeColor": "#000000",
    "text": "",
    "pathD": "M 14 0 A 14 14 0 1 1 13 0 Z"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 0,
    "x": 1133,
    "y": 102,
    "width": 43,
    "height": 28,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 27 14 L 43 0 L 27 0 Z M 27 28 L 43 28 L 27 14 Z M 0 28 L 27 28 L 27 0 L 0 0 Z"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 3,
    "x": 110,
    "y": 389,
    "width": 42,
    "height": 27,
    "text": "Jan"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 4,
    "x": 203,
    "y": 389,
    "width": 43,
    "height": 27,
    "text": "Feb"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 5,
    "x": 296,
    "y": 389,
    "width": 43,
    "height": 27,
    "text": "Mar"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 6,
    "x": 388,
    "y": 389,
    "width": 42,
    "height": 27,
    "text": "Apr"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 7,
    "x": 477,
    "y": 389,
    "width": 48,
    "height": 27,
    "text": "May"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 8,
    "x": 572,
    "y": 389,
    "width": 43,
    "height": 27,
    "text": "Jun"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 3,
    "x": 667,
    "y": 389,
    "width": 37,
    "height": 27,
    "text": "Jul"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 9,
    "x": 755,
    "y": 389,
    "width": 46,
    "height": 27,
    "text": "Aug"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 10,
    "x": 849,
    "y": 389,
    "width": 44,
    "height": 27,
    "text": "Sep"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 11,
    "x": 943,
    "y": 389,
    "width": 41,
    "height": 27,
    "text": "Oct"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 12,
    "x": 1032,
    "y": 389,
    "width": 46,
    "height": 27,
    "text": "Nov"
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 13,
    "x": 1127,
    "y": 389,
    "width": 44,
    "height": 27,
    "text": "Dec"
  },
  {
    "id": "sp-39",
    "x": 131,
    "y": 306,
    "width": 511,
    "height": 27,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-40",
    "x": 485,
    "y": 241,
    "width": 329,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-41",
    "x": 837,
    "y": 194,
    "width": 285,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-42",
    "x": 885,
    "y": 494,
    "width": 298,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-43",
    "x": 358,
    "y": 448,
    "width": 398,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 3,
    "x": 165,
    "y": 191,
    "width": 85,
    "height": 36,
    "text": "Goal 1"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 5,
    "x": 167,
    "y": 223,
    "width": 87,
    "height": 24,
    "text": "12/Jan/2019"
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 1,
    "x": 526,
    "y": 155,
    "width": 85,
    "height": 36,
    "text": "Goal 3"
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 4,
    "x": 528,
    "y": 187,
    "width": 83,
    "height": 24,
    "text": "8/May/2019"
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 6,
    "x": 397,
    "y": 577,
    "width": 85,
    "height": 36,
    "text": "Goal 2"
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 8,
    "x": 399,
    "y": 609,
    "width": 88,
    "height": 24,
    "text": "28/Mar/2019"
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 7,
    "x": 920,
    "y": 578,
    "width": 85,
    "height": 36,
    "text": "Goal 4"
  },
  {
    "id": "sp-51",
    "dataNodeIdx": 9,
    "x": 922,
    "y": 611,
    "width": 89,
    "height": 24,
    "text": "15/Sep/2019"
  },
  {
    "id": "sp-52",
    "dataNodeIdx": 0,
    "x": 1035,
    "y": 98,
    "width": 85,
    "height": 36,
    "text": "Goal 5"
  },
  {
    "id": "sp-53",
    "dataNodeIdx": 2,
    "x": 1031,
    "y": 130,
    "width": 89,
    "height": 24,
    "text": "12/Dec/2019"
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

export function Migso116Template({ data }: { data: BrainData }): ReactElement {
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
