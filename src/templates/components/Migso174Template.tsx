import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 80,
    "y": 540,
    "width": 1120,
    "height": 12,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 1110 0 Q 1120 0 1120 10 L 1120 2 Q 1120 12 1110 12 L 10 12 Q 0 12 0 2 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 377,
    "y": 513,
    "width": 65,
    "height": 65,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 65 32 L 65 32 C 65 15, 50 0, 33 0 L 33 0 C 15 0, 0 15, 0 32 L 0 32 C 0 50, 15 65, 33 65 L 33 65 C 50 65, 65 50, 65 32"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 395,
    "y": 530,
    "width": 29,
    "height": 29,
    "text": "",
    "pathD": "M 29 14 L 29 14 C 29 6, 23 0, 14 0 L 14 0 C 7 0, 0 6, 0 14 L 0 14 C 0 22, 7 29, 14 29 L 14 29 C 23 29, 29 22, 29 14"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 310,
    "y": 155,
    "width": 198,
    "height": 327,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 173 0 L 25 0 L 25 0 C 11 0, 0 11, 0 25 L 0 240 L 0 240 C 0 254, 11 265, 25 265 L 59 265 L 92 321 L 92 321 C 95 327, 103 327, 106 321 L 139 265 L 173 265 L 173 265 C 187 265, 198 254, 198 240 L 198 25 L 198 25 C 198 11, 187 0, 173 0"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 147,
    "y": 513,
    "width": 65,
    "height": 65,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 65 32 L 65 32 C 65 15, 50 0, 33 0 L 33 0 C 15 0, 0 15, 0 32 L 0 32 C 0 50, 15 65, 33 65 L 33 65 C 50 65, 65 50, 65 32"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 164,
    "y": 530,
    "width": 29,
    "height": 29,
    "text": "",
    "pathD": "M 29 14 L 29 14 C 29 6, 22 0, 15 0 L 15 0 C 7 0, 0 6, 0 14 L 0 14 C 0 22, 7 29, 15 29 L 15 29 C 22 29, 29 22, 29 14"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 155,
    "width": 198,
    "height": 327,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 173 0 L 25 0 L 25 0 C 11 0, 0 11, 0 25 L 0 240 L 0 240 C 0 254, 11 265, 25 265 L 59 265 L 91 321 L 91 321 C 95 327, 103 327, 106 321 L 139 265 L 173 265 L 173 265 C 187 265, 198 254, 198 240 L 198 25 L 198 25 C 198 11, 187 0, 173 0"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 608,
    "y": 513,
    "width": 65,
    "height": 65,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 65 32 L 65 32 C 65 15, 50 0, 32 0 L 32 0 C 15 0, 0 15, 0 32 L 0 32 C 0 50, 15 65, 32 65 L 32 65 C 50 65, 65 50, 65 32"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 625,
    "y": 530,
    "width": 29,
    "height": 29,
    "text": "",
    "pathD": "M 29 14 L 29 14 C 29 6, 22 0, 14 0 L 14 0 C 6 0, 0 6, 0 14 L 0 14 C 0 22, 6 29, 14 29 L 14 29 C 22 29, 29 22, 29 14"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 541,
    "y": 155,
    "width": 198,
    "height": 327,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 173 0 L 25 0 L 25 0 C 11 0, 0 11, 0 25 L 0 240 L 0 240 C 0 254, 11 265, 25 265 L 59 265 L 92 321 L 92 321 C 95 327, 103 327, 106 321 L 139 265 L 173 265 L 173 265 C 187 265, 198 254, 198 240 L 198 25 L 198 25 C 198 11, 187 0, 173 0"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 838,
    "y": 513,
    "width": 65,
    "height": 65,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 65 32 L 65 32 C 65 15, 50 0, 32 0 L 32 0 C 15 0, 0 15, 0 32 L 0 32 C 0 50, 15 65, 32 65 L 32 65 C 50 65, 65 50, 65 32"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 856,
    "y": 530,
    "width": 29,
    "height": 29,
    "text": "",
    "pathD": "M 29 14 L 29 14 C 29 6, 22 0, 14 0 L 14 0 C 6 0, 0 6, 0 14 L 0 14 C 0 22, 6 29, 14 29 L 14 29 C 22 29, 29 22, 29 14"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 771,
    "y": 155,
    "width": 198,
    "height": 327,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 173 0 L 25 0 L 25 0 C 11 0, 0 11, 0 25 L 0 240 L 0 240 C 0 254, 11 265, 25 265 L 59 265 L 92 321 L 92 321 C 95 327, 103 327, 106 321 L 139 265 L 173 265 L 173 265 C 187 265, 198 254, 198 240 L 198 25 L 198 25 C 198 11, 187 0, 173 0"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1069,
    "y": 513,
    "width": 65,
    "height": 65,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 65 32 L 65 32 C 65 15, 50 0, 32 0 L 32 0 C 15 0, 0 15, 0 32 L 0 32 C 0 50, 15 65, 32 65 L 32 65 C 50 65, 65 50, 65 32"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1086,
    "y": 530,
    "width": 29,
    "height": 29,
    "text": "",
    "pathD": "M 29 14 L 29 14 C 29 6, 22 0, 14 0 L 14 0 C 6 0, 0 6, 0 14 L 0 14 C 0 22, 6 29, 14 29 L 14 29 C 22 29, 29 22, 29 14"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 1002,
    "y": 155,
    "width": 198,
    "height": 327,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 173 0 L 25 0 L 25 0 C 11 0, 0 11, 0 25 L 0 240 L 0 240 C 0 254, 11 265, 25 265 L 59 265 L 92 321 L 92 321 C 95 327, 103 327, 106 321 L 139 265 L 173 265 L 173 265 C 187 265, 198 254, 198 240 L 198 25 L 198 25 C 198 11, 187 0, 173 0"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 0,
    "x": 119,
    "y": 181,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 0,
    "x": 94,
    "y": 217,
    "width": 169,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 350,
    "y": 181,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 325,
    "y": 217,
    "width": 169,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 2,
    "x": 580,
    "y": 181,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 2,
    "x": 555,
    "y": 217,
    "width": 169,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 3,
    "x": 811,
    "y": 181,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 3,
    "x": 786,
    "y": 217,
    "width": 169,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 4,
    "x": 1041,
    "y": 181,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 4,
    "x": 1016,
    "y": 217,
    "width": 169,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 0,
    "x": 147,
    "y": 593,
    "width": 63,
    "height": 36,
    "text": "2020"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 1,
    "x": 378,
    "y": 593,
    "width": 63,
    "height": 36,
    "text": "2021"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 2,
    "x": 608,
    "y": 593,
    "width": 63,
    "height": 36,
    "text": "2022"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 3,
    "x": 839,
    "y": 593,
    "width": 63,
    "height": 36,
    "text": "2023"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 4,
    "x": 1069,
    "y": 593,
    "width": 63,
    "height": 36,
    "text": "2024"
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

export function Migso174Template({ data }: { data: BrainData }): ReactElement {
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
