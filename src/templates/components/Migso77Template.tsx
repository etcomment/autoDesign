import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "grp-0",
    "isGroup": true,
    "children": [
      {
        "id": "sp-45",
        "x": 255,
        "y": 120,
        "width": 167.71720818291215,
        "height": 59,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.18170878459687123,
        "localPctH": 1,
        "text": "",
        "pathD": "M 0 0 L 126 0 L 167.71720818291215 30 L 126 59 L 0 59 L 42 30 Z"
      },
      {
        "id": "sp-46",
        "x": 406.05655836341754,
        "y": 120,
        "width": 167.71720818291215,
        "height": 59,
        "localPctX": 0.1636582430806257,
        "localPctY": 0,
        "localPctW": 0.18170878459687123,
        "localPctH": 1,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 0 0 L 126 0 L 167.71720818291215 30 L 126 59 L 0 59 L 42 30 Z"
      },
      {
        "id": "sp-47",
        "x": 557.1131167268351,
        "y": 120,
        "width": 167.71720818291215,
        "height": 59,
        "localPctX": 0.3273164861612514,
        "localPctY": 0,
        "localPctW": 0.18170878459687123,
        "localPctH": 1,
        "fillColor": "#52c49c",
        "text": "",
        "pathD": "M 0 0 L 126 0 L 167.71720818291215 30 L 126 59 L 0 59 L 42 30 Z"
      },
      {
        "id": "sp-48",
        "x": 708.1696750902527,
        "y": 120,
        "width": 167.71720818291215,
        "height": 59,
        "localPctX": 0.49097472924187724,
        "localPctY": 0,
        "localPctW": 0.18170878459687123,
        "localPctH": 1,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 0 0 L 126 0 L 167.71720818291215 30 L 126 59 L 0 59 L 42 30 Z"
      },
      {
        "id": "sp-49",
        "x": 859.2262334536703,
        "y": 120,
        "width": 167.71720818291215,
        "height": 59,
        "localPctX": 0.654632972322503,
        "localPctY": 0,
        "localPctW": 0.18170878459687123,
        "localPctH": 1,
        "fillColor": "#ee6d90",
        "text": "",
        "pathD": "M 0 0 L 126 0 L 167.71720818291215 30 L 126 59 L 0 59 L 42 30 Z"
      },
      {
        "id": "sp-50",
        "x": 1010.2827918170879,
        "y": 120,
        "width": 167.71720818291215,
        "height": 59,
        "localPctX": 0.8182912154031288,
        "localPctY": 0,
        "localPctW": 0.18170878459687123,
        "localPctH": 1,
        "fillColor": "#4a90d9",
        "text": "",
        "pathD": "M 0 0 L 126 0 L 167.71720818291215 30 L 126 59 L 0 59 L 42 30 Z"
      }
    ],
    "x": 255,
    "y": 120,
    "width": 923,
    "height": 59
  },
  {
    "id": "sp-0",
    "x": 107,
    "y": 135,
    "width": 63,
    "height": 29,
    "text": "Stage"
  },
  {
    "id": "sp-1",
    "x": 90,
    "y": 267,
    "width": 97,
    "height": 29,
    "text": "Sentiment"
  },
  {
    "id": "sp-2",
    "x": 65,
    "y": 396,
    "width": 146,
    "height": 48,
    "text": "Customer needs & Interactions"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 0,
    "x": 78,
    "y": 492,
    "width": 120,
    "height": 48,
    "text": "Customer Expectations"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 1,
    "x": 76,
    "y": 588,
    "width": 126,
    "height": 48,
    "text": "Improvement Opportunities"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 277,
    "y": 378,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 6,
    "x": 277,
    "y": 474,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 12,
    "x": 277,
    "y": 570,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 428,
    "y": 378,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 7,
    "x": 428,
    "y": 474,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 13,
    "x": 428,
    "y": 570,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 2,
    "x": 579,
    "y": 378,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 8,
    "x": 579,
    "y": 474,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 14,
    "x": 579,
    "y": 570,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 5,
    "x": 1032,
    "y": 378,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 11,
    "x": 1032,
    "y": 474,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 17,
    "x": 1032,
    "y": 570,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 4,
    "x": 881,
    "y": 378,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 10,
    "x": 881,
    "y": 474,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 16,
    "x": 881,
    "y": 570,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 3,
    "x": 730,
    "y": 378,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 9,
    "x": 730,
    "y": 474,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 15,
    "x": 730,
    "y": 570,
    "width": 125,
    "height": 84,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 0,
    "x": 88,
    "y": 206,
    "width": 101,
    "height": 29,
    "text": "Positive (+)"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 1,
    "x": 86,
    "y": 328,
    "width": 104,
    "height": 28,
    "text": "Negative (-)"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 277,
    "y": 136,
    "width": 125,
    "height": 24,
    "text": "Stage 1"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 1,
    "x": 428,
    "y": 136,
    "width": 125,
    "height": 24,
    "text": "Stage 2"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 2,
    "x": 579,
    "y": 136,
    "width": 125,
    "height": 24,
    "text": "Stage 3"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 3,
    "x": 730,
    "y": 136,
    "width": 125,
    "height": 24,
    "text": "Stage 4"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 4,
    "x": 881,
    "y": 136,
    "width": 125,
    "height": 24,
    "text": "Stage 5"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 5,
    "x": 1032,
    "y": 136,
    "width": 125,
    "height": 24,
    "text": "Stage 6"
  },
  {
    "id": "sp-31",
    "x": 255,
    "y": 280,
    "width": 924,
    "height": 10,
    "fillColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-32",
    "x": 255,
    "y": 208,
    "width": 923,
    "height": 146,
    "strokeColor": "#ffffff",
    "text": "",
    "pathD": "M 0 13 C 39 4, 77 -6, 112 5 C 147 16, 145 78, 210 81 C 275 84, 407 11, 501 22 C 595 32, 703 132, 774 144 C 844 157, 905 91, 923 96"
  },
  {
    "id": "sp-33",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 277,
    "y": 199,
    "width": 30,
    "height": 30,
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 15 0 Z"
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 381,
    "y": 227,
    "width": 30,
    "height": 30,
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 15 0 Z"
  },
  {
    "id": "sp-35",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 457,
    "y": 276,
    "width": 30,
    "height": 30,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 15 0 Z"
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 565,
    "y": 249,
    "width": 30,
    "height": 30,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 15 0 Z"
  },
  {
    "id": "sp-37",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 675,
    "y": 220,
    "width": 30,
    "height": 30,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 15 0 Z"
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 778,
    "y": 227,
    "width": 30,
    "height": 30,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 15 0 Z"
  },
  {
    "id": "sp-39",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 870,
    "y": 268,
    "width": 30,
    "height": 30,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 15 0 Z"
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 926,
    "y": 299,
    "width": 30,
    "height": 30,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 15 0 Z"
  },
  {
    "id": "sp-41",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 1016,
    "y": 337,
    "width": 30,
    "height": 30,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 15 0 Z"
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 1112,
    "y": 314,
    "width": 30,
    "height": 30,
    "fillColor": "#4a90d9",
    "text": "",
    "pathD": "M 15 0 A 15 15 0 1 1 15 0 Z"
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

export function Migso77Template({ data }: { data: BrainData }): ReactElement {
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
