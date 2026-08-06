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
    "x": 188,
    "y": 174,
    "width": 272,
    "height": 216,
    "strokeColor": "#3365cc",
    "text": "",
    "pathD": "M 0 216 L 174 0 L 272 0"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 272,
    "y": 162,
    "width": 24,
    "height": 24,
    "fillColor": "#3365cc",
    "strokeColor": "#3365cc",
    "text": "",
    "pathD": "M 12 0 A 12 12 0 1 1 12 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 340,
    "y": 242,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#3365cc",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 397,
    "y": 314,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#3365cc",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 358,
    "y": 393,
    "width": 272,
    "height": 216,
    "strokeColor": "#3365cc",
    "text": "",
    "pathD": "M 0 216 L 174 0 L 272 0"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 442,
    "y": 597,
    "width": 24,
    "height": 24,
    "fillColor": "#3365cc",
    "strokeColor": "#3365cc",
    "text": "",
    "pathD": "M 12 0 A 12 12 0 1 1 12 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 21,
    "x": 511,
    "y": 527,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#3365cc",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 19,
    "x": 566,
    "y": 458,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#3365cc",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-51",
    "x": 62,
    "y": 391,
    "width": 1137,
    "height": 10,
    "fillColor": "#3365cc",
    "strokeColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 536,
    "y": 175,
    "width": 272,
    "height": 216,
    "strokeColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 216 L 174 0 L 272 0"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 620,
    "y": 163,
    "width": 24,
    "height": 24,
    "fillColor": "#ff4d38",
    "strokeColor": "#ff4d38",
    "text": "",
    "pathD": "M 12 0 A 12 12 0 1 1 12 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 687,
    "y": 242,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ff4d38",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 744,
    "y": 314,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ff4d38",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 707,
    "y": 393,
    "width": 272,
    "height": 216,
    "strokeColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 216 L 174 0 L 272 0"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 791,
    "y": 596,
    "width": 24,
    "height": 24,
    "fillColor": "#ff4d38",
    "strokeColor": "#ff4d38",
    "text": "",
    "pathD": "M 12 0 A 12 12 0 1 1 12 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 22,
    "x": 859,
    "y": 529,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ff4d38",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 20,
    "x": 916,
    "y": 458,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ff4d38",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 888,
    "y": 175,
    "width": 272,
    "height": 216,
    "strokeColor": "#52c49c",
    "text": "",
    "pathD": "M 0 216 L 174 0 L 272 0"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 972,
    "y": 163,
    "width": 24,
    "height": 24,
    "fillColor": "#52c49c",
    "strokeColor": "#52c49c",
    "text": "",
    "pathD": "M 12 0 A 12 12 0 1 1 12 0 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 1038,
    "y": 242,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#52c49c",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1097,
    "y": 314,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#52c49c",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 97,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 185,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 17,
    "x": 1061,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 273,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 360,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 448,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 18,
    "x": 1151,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 16,
    "x": 973,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 623,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 15,
    "x": 886,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 798,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 711,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 535,
    "y": 385,
    "width": 12,
    "height": 12,
    "fillColor": "#ffffff",
    "strokeColor": "#ee6d90",
    "text": "",
    "pathD": "M 6 0 A 6 6 0 1 1 6 0 Z"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 0,
    "x": 169,
    "y": 134,
    "width": 101,
    "height": 37,
    "text": "TITLE 1"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 3,
    "x": 339,
    "y": 614,
    "width": 101,
    "height": 37,
    "text": "TITLE 2"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 4,
    "x": 689,
    "y": 614,
    "width": 101,
    "height": 37,
    "text": "TITLE 4"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 2,
    "x": 871,
    "y": 135,
    "width": 101,
    "height": 37,
    "text": "TITLE 5"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 1,
    "x": 518,
    "y": 135,
    "width": 101,
    "height": 37,
    "text": "TITLE 3"
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 236,
    "width": 235,
    "height": 28,
    "text": "Add words"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 1,
    "x": 441,
    "y": 236,
    "width": 236,
    "height": 28,
    "text": "Add words"
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 2,
    "x": 793,
    "y": 236,
    "width": 236,
    "height": 28,
    "text": "Add words"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 3,
    "x": 149,
    "y": 307,
    "width": 236,
    "height": 28,
    "text": "Add words"
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 4,
    "x": 500,
    "y": 307,
    "width": 236,
    "height": 28,
    "text": "Add words"
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 5,
    "x": 852,
    "y": 307,
    "width": 236,
    "height": 28,
    "text": "Add words"
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 6,
    "x": 310,
    "y": 448,
    "width": 236,
    "height": 28,
    "text": "Add words"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 7,
    "x": 663,
    "y": 448,
    "width": 236,
    "height": 28,
    "text": "Add words"
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 8,
    "x": 251,
    "y": 517,
    "width": 236,
    "height": 28,
    "text": "Add words"
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 9,
    "x": 604,
    "y": 517,
    "width": 236,
    "height": 28,
    "text": "Add words"
  },
  {
    "id": "sp-48",
    "x": 1195,
    "y": 371,
    "width": 30,
    "height": 40,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 15 0 L 30 40 L 0 40 Z"
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

export function Migso96Template({ data }: { data: BrainData }): ReactElement {
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
