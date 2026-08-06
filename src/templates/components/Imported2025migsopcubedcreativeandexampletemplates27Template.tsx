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
        "id": "sp-14",
        "x": 86,
        "y": 315.14678899082566,
        "width": 193.86493506493505,
        "height": 155.16819571865443,
        "localPctX": 0,
        "localPctY": 0.11926605504587141,
        "localPctW": 0.17402597402597403,
        "localPctH": 0.6574923547400612,
        "fillColor": "#3365cc",
        "pathD": "M 39 0 C 35 0, 32 3, 30 7 C 28 11, 27 16, 27 21 C 26 32, 25 44, 24 56 C 20 90, 12 123, 0 155 L 194 155 C 188 150, 183 143, 179 135 C 173 120, 173 102, 170 86 C 168 81, 166 76, 160 76 C 156 75, 152 79, 151 84 C 148 93, 147 103, 144 112 C 142 119, 139 125, 131 126 C 125 126, 120 122, 117 118 C 104 100, 112 76, 109 54 C 108 45, 102 38, 95 40 C 91 41, 89 45, 88 49 C 86 59, 85 69, 85 79 C 84 88, 84 98, 81 107 C 80 111, 78 115, 74 116 C 67 118, 62 110, 61 102 C 56 75, 53 47, 52 20 C 52 14, 51 8, 48 4 C 46 1, 43 0, 39 0 Z"
      },
      {
        "id": "sp-15",
        "x": 225.61168831168828,
        "y": 302.15596330275224,
        "width": 266.925974025974,
        "height": 168.15902140672782,
        "localPctX": 0.1253246753246753,
        "localPctY": 0.06422018348623831,
        "localPctW": 0.2396103896103896,
        "localPctH": 0.7125382262996941,
        "fillColor": "#ff4d38",
        "pathD": "M 178 0 C 168 -1, 162 11, 160 22 C 156 49, 155 76, 144 101 C 140 111, 134 120, 126 127 C 113 140, 95 145, 76 144 C 49 144, 18 136, 3 159 C 2 162, 1 165, 0 168 L 267 168 C 237 150, 214 120, 204 85 C 198 62, 198 39, 192 17 C 190 9, 186 1, 178 0 Z"
      },
      {
        "id": "sp-16",
        "x": 420.9233766233766,
        "y": 327.41590214067276,
        "width": 243.77792207792206,
        "height": 142.89908256880733,
        "localPctX": 0.30064935064935067,
        "localPctY": 0.1712538226299693,
        "localPctW": 0.21883116883116882,
        "localPctH": 0.6055045871559632,
        "fillColor": "#52c49c",
        "pathD": "M 119 0 C 105 3, 104 19, 100 33 C 98 39, 94 45, 88 46 C 82 46, 78 42, 75 36 C 70 24, 67 6, 55 11 C 52 12, 50 16, 49 19 C 44 30, 41 41, 38 53 C 35 64, 32 76, 28 87 C 20 106, 11 125, 0 143 L 244 143 C 235 135, 227 126, 221 116 C 214 105, 210 92, 207 79 C 202 58, 193 35, 175 39 C 171 40, 168 43, 164 44 C 159 46, 155 48, 151 46 C 148 44, 145 40, 143 34 C 139 24, 137 10, 131 4 C 128 1, 123 -1, 119 0 Z"
      },
      {
        "id": "sp-17",
        "x": 567.0454545454545,
        "y": 314.42507645259934,
        "width": 289.35064935064935,
        "height": 155.88990825688072,
        "localPctX": 0.43181818181818177,
        "localPctY": 0.1162079510703362,
        "localPctW": 0.2597402597402597,
        "localPctH": 0.6605504587155963,
        "fillColor": "#ffb900",
        "pathD": "M 209 0 C 202 -1, 197 8, 195 16 C 187 45, 189 80, 165 98 C 159 102, 153 104, 146 102 C 137 99, 135 88, 134 78 C 134 68, 130 58, 121 59 C 115 60, 113 67, 112 74 C 110 96, 107 121, 86 127 C 78 129, 70 127, 62 127 C 53 126, 44 126, 36 130 C 28 133, 21 139, 14 144 C 9 148, 5 152, 0 156 L 289 156 C 272 146, 257 132, 247 115 C 237 99, 232 81, 229 62 C 227 46, 226 30, 222 14 C 220 7, 216 1, 209 0 Z"
      },
      {
        "id": "sp-18",
        "x": 771.0376623376623,
        "y": 307.2079510703364,
        "width": 251.0116883116883,
        "height": 163.10703363914374,
        "localPctX": 0.6149350649350649,
        "localPctY": 0.08562691131498465,
        "localPctW": 0.22532467532467532,
        "localPctH": 0.691131498470948,
        "fillColor": "#ee6d90",
        "pathD": "M 167 0 C 151 -3, 138 13, 136 31 C 132 52, 133 79, 113 85 C 105 87, 96 83, 88 81 C 81 79, 74 79, 70 85 C 65 92, 71 100, 71 108 C 71 117, 62 124, 53 129 C 35 140, 17 151, 0 163 L 251 163 C 239 153, 230 141, 223 127 C 213 108, 207 87, 202 66 C 198 46, 195 27, 182 11 C 178 6, 173 2, 167 0 Z"
      },
      {
        "id": "sp-19",
        "x": 975.7532467532468,
        "y": 306.48623853211006,
        "width": 224.24675324675323,
        "height": 163.82874617737002,
        "localPctX": 0.7987012987012987,
        "localPctY": 0.08256880733944942,
        "localPctW": 0.20129870129870128,
        "localPctH": 0.6941896024464831,
        "fillColor": "#4a90d9",
        "pathD": "M 53 0 C 48 1, 46 5, 44 10 C 42 16, 41 23, 40 30 C 38 64, 37 99, 22 131 C 16 143, 9 154, 0 164 L 224 164 C 224 162, 224 159, 224 157 C 223 148, 222 140, 219 132 C 214 118, 202 108, 188 107 C 179 107, 168 111, 161 105 C 158 101, 157 96, 156 91 C 153 81, 146 72, 136 68 C 127 65, 116 68, 106 68 C 97 69, 87 67, 79 60 C 72 54, 70 44, 69 34 C 69 26, 67 17, 65 11 C 63 4, 60 -1, 53 0 Z"
      },
      {
        "id": "sp-20",
        "x": 1098.7272727272725,
        "y": 287.72171253822626,
        "width": 10,
        "height": 83.71865443425077,
        "localPctX": 0.909090909090909,
        "localPctY": 0.0030581039755349856,
        "localPctW": 0.0008976660682226212,
        "localPctH": 0.3547400611620795,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-21",
        "x": 724.7415584415584,
        "y": 287,
        "width": 10,
        "height": 127.74311926605505,
        "localPctX": 0.5733766233766233,
        "localPctY": 0,
        "localPctW": 0.0008976660682226212,
        "localPctH": 0.5412844036697247,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-22",
        "x": 292.1623376623377,
        "y": 287,
        "width": 10,
        "height": 157.33333333333331,
        "localPctX": 0.18506493506493507,
        "localPctY": 0,
        "localPctW": 0.0008976660682226212,
        "localPctH": 0.6666666666666666,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-23",
        "x": 187.27272727272725,
        "y": 470.3149847094801,
        "width": 10,
        "height": 52.68501529051988,
        "localPctX": 0.09090909090909088,
        "localPctY": 0.7767584097859326,
        "localPctW": 0.0008976660682226212,
        "localPctH": 0.22324159021406728,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-24",
        "x": 525.812987012987,
        "y": 470.3149847094801,
        "width": 10,
        "height": 52.68501529051988,
        "localPctX": 0.3948051948051948,
        "localPctY": 0.7767584097859326,
        "localPctW": 0.0008976660682226212,
        "localPctH": 0.22324159021406728,
        "strokeColor": "#ffffff"
      },
      {
        "id": "sp-25",
        "x": 917.1597402597403,
        "y": 470.3149847094801,
        "width": 10,
        "height": 52.68501529051988,
        "localPctX": 0.7461038961038962,
        "localPctY": 0.7767584097859326,
        "localPctW": 0.0008976660682226212,
        "localPctH": 0.22324159021406728,
        "strokeColor": "#ffffff"
      }
    ],
    "x": 86,
    "y": 287,
    "width": 1114,
    "height": 236
  },
  {
    "id": "sp-0",
    "dataNodeIdx": 3,
    "x": 161,
    "y": 536,
    "width": 62,
    "height": 36,
    "text": "25%",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 0,
    "x": 164,
    "y": 571,
    "width": 318,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 4,
    "x": 497,
    "y": 536,
    "width": 62,
    "height": 36,
    "text": "48%",
    "textColor": "#52c49c",
    "textSize": 16
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 501,
    "y": 571,
    "width": 318,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 5,
    "x": 888,
    "y": 536,
    "width": 62,
    "height": 36,
    "text": "58%",
    "textColor": "#ee6d90",
    "textSize": 16
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 2,
    "x": 892,
    "y": 571,
    "width": 318,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 0,
    "x": 260,
    "y": 149,
    "width": 62,
    "height": 36,
    "text": "30%",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 0,
    "x": 51,
    "y": 183,
    "width": 267,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 690,
    "y": 149,
    "width": 62,
    "height": 36,
    "text": "62%",
    "textColor": "#ffb900",
    "textSize": 16
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 481,
    "y": 183,
    "width": 267,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 2,
    "x": 1064,
    "y": 149,
    "width": 62,
    "height": 36,
    "text": "81%",
    "textColor": "#4a90d9",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 2,
    "x": 856,
    "y": 183,
    "width": 267,
    "height": 44,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
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

export function Imported2025migsopcubedcreativeandexampletemplates27Template({ data }: { data: BrainData }): ReactElement {
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

        {titleLines.length > 0 ? (() => {
          const fs = shapeDef.textSize || (shapeDef.isTitle ? 14 : (shapeDef.isSubtitle ? 10 : 12));
          return (
            <text
              x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)}
              y={bbox.y + fs * 0.9 + (shapeDef.pathD || finalColor ? 10 : 0)}
              fontFamily="Arial, sans-serif"
              fontSize={fs}
              fontWeight={shapeDef.isTitle ? 700 : 400}
              fill={shapeDef.textColor || (shapeDef.isTitle ? '#111827' : '#4b5563')}
            >
              {titleLines.map((line: string, lIdx: number) => (
                <tspan key={lIdx} x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)} dy={lIdx === 0 ? 0 : Math.round(fs * 1.2)}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })() : null}

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
