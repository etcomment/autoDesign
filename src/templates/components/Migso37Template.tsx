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
        "id": "sp-10",
        "x": 394,
        "y": 274.78787878787875,
        "width": 238,
        "height": 237.5757575757576,
        "localPctX": 0,
        "localPctY": 0.24955436720142596,
        "localPctW": 0.5,
        "localPctH": 0.4991087344028521,
        "fillColor": "#ffb900",
        "text": "",
        "pathD": "M 119 0 C 89 0, 58 12, 35 35 C -12 81, -12 156, 35 203 C 58 226, 89 238, 119 238 C 119 207, 131 177, 154 153 C 177 130, 208 119, 238 119 C 238 88, 226 58, 203 35 C 180 12, 149 0, 119 0 Z"
      },
      {
        "id": "sp-11",
        "x": 513,
        "y": 156,
        "width": 238,
        "height": 237.5757575757576,
        "localPctX": 0.25,
        "localPctY": 0,
        "localPctW": 0.5,
        "localPctH": 0.4991087344028521,
        "fillColor": "#3365cc",
        "text": "",
        "pathD": "M 119 0 C 89 0, 58 12, 35 35 C 12 58, 0 88, 0 119 C 30 119, 61 130, 84 153 C 107 177, 119 207, 119 238 C 149 238, 180 226, 203 203 C 250 156, 250 81, 203 35 C 180 12, 149 0, 119 0 Z"
      },
      {
        "id": "sp-12",
        "x": 632,
        "y": 274.78787878787875,
        "width": 238,
        "height": 237.5757575757576,
        "localPctX": 0.5,
        "localPctY": 0.24955436720142596,
        "localPctW": 0.5,
        "localPctH": 0.4991087344028521,
        "fillColor": "#ff4d38",
        "text": "",
        "pathD": "M 119 0 C 119 30, 107 61, 84 84 C 61 107, 30 119, 0 119 C 0 149, 12 180, 35 203 C 81 249, 157 249, 203 203 C 250 156, 250 81, 203 35 C 180 12, 149 0, 119 0 Z"
      },
      {
        "id": "sp-13",
        "x": 513,
        "y": 394.4242424242424,
        "width": 238,
        "height": 237.5757575757576,
        "localPctX": 0.25,
        "localPctY": 0.5008912655971478,
        "localPctW": 0.5,
        "localPctH": 0.4991087344028521,
        "fillColor": "#52c49c",
        "text": "",
        "pathD": "M 119 0 C 89 0, 58 12, 35 35 C -12 81, -12 156, 35 203 C 81 249, 157 249, 203 203 C 226 180, 238 149, 238 119 C 208 119, 177 107, 154 84 C 131 61, 119 30, 119 0 Z"
      },
      {
        "id": "sp-14",
        "x": 722.1,
        "y": 389.33333333333337,
        "width": 68,
        "height": 63.63636363636364,
        "localPctX": 0.6892857142857143,
        "localPctY": 0.49019607843137264,
        "localPctW": 0.14285714285714285,
        "localPctH": 0.13368983957219252,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 4 23 L 13 23 L 13 55 L 21 55 L 21 23 L 30 23 L 30 55 L 38 55 L 38 23 L 47 23 L 47 55 L 55 55 L 55 23 L 64 23 L 64 55 L 68 55 L 68 64 L 0 64 L 0 55 L 4 55 L 4 23 Z M 34 9 C 33 9, 32 9, 32 11 C 32 12, 33 13, 34 13 C 35 13, 36 12, 36 11 C 36 9, 35 9, 34 9 Z M 34 0 L 68 11 L 68 19 L 0 19 L 0 11 L 34 0 Z"
      },
      {
        "id": "sp-15",
        "x": 456.9,
        "y": 387.6363636363636,
        "width": 68,
        "height": 55.151515151515156,
        "localPctX": 0.1321428571428571,
        "localPctY": 0.48663101604278075,
        "localPctW": 0.14285714285714285,
        "localPctH": 0.11586452762923352,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 0 51 L 68 51 L 68 55 L 0 55 L 0 51 Z M 36 0 L 49 0 L 49 42 L 53 42 L 53 11 L 66 11 L 66 42 L 68 42 L 68 47 L 62 47 L 62 15 L 57 15 L 57 47 L 45 47 L 45 4 L 40 4 L 40 47 L 28 47 L 28 19 L 23 19 L 23 47 L 11 47 L 11 30 L 6 30 L 6 47 L 0 47 L 0 42 L 2 42 L 2 25 L 15 25 L 15 42 L 19 42 L 19 15 L 32 15 L 32 42 L 36 42 L 36 0 Z"
      },
      {
        "id": "sp-16",
        "x": 597.15,
        "y": 504.72727272727275,
        "width": 68,
        "height": 63.63636363636364,
        "localPctX": 0.4267857142857142,
        "localPctY": 0.732620320855615,
        "localPctW": 0.14285714285714285,
        "localPctH": 0.13368983957219252,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 60 47 C 64 47, 68 50, 68 55 C 68 60, 64 64, 60 64 C 55 64, 51 60, 51 55 C 51 50, 55 47, 60 47 Z M 34 47 C 39 47, 42 50, 42 55 C 42 60, 39 64, 34 64 C 29 64, 26 60, 26 55 C 26 50, 29 47, 34 47 Z M 8 47 C 13 47, 17 50, 17 55 C 17 60, 13 64, 8 64 C 4 64, 0 60, 0 55 C 0 50, 4 47, 8 47 Z M 32 17 L 36 17 L 36 28 L 56 28 L 62 33 L 62 42 L 57 42 L 57 35 L 54 32 L 36 32 L 36 42 L 32 42 L 32 32 L 14 32 L 11 35 L 11 42 L 6 42 L 6 33 L 12 28 L 32 28 L 32 17 Z M 17 0 L 51 0 L 51 13 L 17 13 L 17 0 Z"
      },
      {
        "id": "sp-17",
        "x": 597.15,
        "y": 266.3030303030303,
        "width": 68,
        "height": 50.909090909090914,
        "localPctX": 0.4267857142857142,
        "localPctY": 0.23172905525846704,
        "localPctW": 0.14285714285714285,
        "localPctH": 0.10695187165775402,
        "fillColor": "#ffffff",
        "text": "",
        "pathD": "M 52 21 L 53 20 C 53 19, 53 18, 52 17 C 51 17, 50 17, 49 18 L 48 21 L 45 21 L 45 11 L 52 11 L 56 21 L 52 21 Z M 51 45 L 51 45 C 50 45, 49 44, 49 42 C 49 41, 50 40, 51 40 C 52 40, 53 41, 53 42 C 53 44, 52 45, 51 45 Z M 21 45 L 21 45 C 20 45, 19 44, 19 42 C 19 41, 20 40, 21 40 C 22 40, 23 41, 23 42 C 23 44, 22 45, 21 45 Z M 61 22 L 55 6 L 40 6 L 40 30 L 38 30 L 38 0 L 0 0 L 0 13 L 15 13 L 15 6 L 20 6 L 29 15 L 20 23 L 15 23 L 15 17 L 0 17 L 0 41 L 3 45 L 11 45 C 11 44, 11 43, 11 42 C 11 38, 14 34, 19 34 C 20 34, 20 34, 20 34 C 16 35, 13 38, 13 42 C 13 47, 17 51, 21 51 C 25 51, 28 48, 29 45 L 40 45 L 41 45 C 40 44, 40 43, 40 42 C 40 38, 44 34, 49 34 C 49 34, 50 34, 50 34 C 46 35, 42 38, 42 42 C 42 47, 46 51, 51 51 C 55 51, 58 48, 59 45 L 65 45 L 68 41 L 68 32 C 68 28, 65 24, 61 22 Z"
      },
      {
        "id": "sp-18",
        "x": 599.7,
        "y": 209.45454545454547,
        "width": 63.75,
        "height": 57.696969696969695,
        "localPctX": 0.4321428571428572,
        "localPctY": 0.11229946524064174,
        "localPctW": 0.13392857142857142,
        "localPctH": 0.12121212121212122,
        "text": "1"
      },
      {
        "id": "sp-19",
        "x": 599.7,
        "y": 449.5757575757576,
        "width": 63.75,
        "height": 57.696969696969695,
        "localPctX": 0.4321428571428572,
        "localPctY": 0.6167557932263815,
        "localPctW": 0.13392857142857142,
        "localPctH": 0.12121212121212122,
        "text": "3"
      },
      {
        "id": "sp-20",
        "x": 724.65,
        "y": 328.24242424242425,
        "width": 63.75,
        "height": 57.696969696969695,
        "localPctX": 0.6946428571428571,
        "localPctY": 0.36185383244206776,
        "localPctW": 0.13392857142857142,
        "localPctH": 0.12121212121212122,
        "text": "2"
      },
      {
        "id": "sp-21",
        "x": 462,
        "y": 329.0909090909091,
        "width": 63.75,
        "height": 57.696969696969695,
        "localPctX": 0.14285714285714285,
        "localPctY": 0.3636363636363637,
        "localPctW": 0.13392857142857142,
        "localPctH": 0.12121212121212122,
        "text": "4"
      }
    ],
    "x": 394,
    "y": 156,
    "width": 476,
    "height": 476
  },
  {
    "id": "sp-0",
    "dataNodeIdx": 3,
    "x": 870,
    "y": 546,
    "width": 330,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 1,
    "x": 870,
    "y": 510,
    "width": 213,
    "height": 36,
    "text": "Marketing Strategy"
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 2,
    "x": 80,
    "y": 548,
    "width": 330,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 512,
    "width": 210,
    "height": 36,
    "text": "Financial Planning"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 1,
    "x": 870,
    "y": 203,
    "width": 330,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 1,
    "x": 870,
    "y": 167,
    "width": 229,
    "height": 36,
    "text": "Products & Services"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 185,
    "width": 330,
    "height": 56,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 149,
    "width": 224,
    "height": 36,
    "text": "Executive Summary"
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

export function Migso37Template({ data }: { data: BrainData }): ReactElement {
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
