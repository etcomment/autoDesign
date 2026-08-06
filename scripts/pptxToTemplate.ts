import fs from 'node:fs'
import path from 'node:path'
import JSZip from 'jszip'
import { XMLParser } from 'fast-xml-parser'

interface ShapeInfo {
  id: string
  name: string
  x: number
  y: number
  w: number
  h: number
  localPctX?: number
  localPctY?: number
  localPctW?: number
  localPctH?: number
  fillColor?: string
  strokeColor?: string
  text?: string
  textColor?: string
  textSize?: number
  pathD?: string
  isGroup?: boolean
  children?: ShapeInfo[]
  idx?: number
}

interface ClusteringResult {
  repeatingItems: ShapeInfo[][]
  staticElements: ShapeInfo[]
}

function parseEMU(val?: string | number): number {
  if (val === undefined || val === null) return 0
  const num = typeof val === 'number' ? val : Number.parseInt(String(val), 10)
  if (Number.isNaN(num)) return 0
  // Convert PowerPoint EMUs (English Metric Units: 914400 EMUs = 1 inch = 96 px)
  return Math.round((num / 914400) * 96)
}

const THEME_COLORS: Record<string, string> = {
  accent1: '#3365cc',
  accent2: '#ff4d38',
  accent3: '#52c49c',
  accent4: '#ffb900',
  accent5: '#ee6d90',
  accent6: '#4a90d9',
  dk1: '#000000',
  lt1: '#ffffff',
  dk2: '#282a5d',
  lt2: '#f0f0f0',
  bg1: '#ffffff',
  bg2: '#f0f0f0',
}

function hexFromColorVal(clrObj: any): string | undefined {
  if (!clrObj) return undefined
  if (clrObj['a:srgbClr']?.['@_val']) {
    return `#${clrObj['a:srgbClr']['@_val']}`
  }
  if (clrObj['a:sysClr']?.['@_lastClr']) {
    return `#${clrObj['a:sysClr']['@_lastClr']}`
  }
  if (clrObj['a:schemeClr']?.['@_val']) {
    const val = clrObj['a:schemeClr']['@_val']
    return THEME_COLORS[val] || undefined
  }
  return undefined
}

function extractTextFromSp(sp: any): { text: string; textColor?: string; textSize?: number } {
  const txBody = sp['p:txBody']
  if (!txBody) return { text: '' }
  const paragraphs = Array.isArray(txBody['a:p']) ? txBody['a:p'] : [txBody['a:p']].filter(Boolean)
  const textParts: string[] = []
  let textColor: string | undefined = undefined
  let textSize: number | undefined = undefined

  let lstTextSize: number | undefined = undefined
  let lstTextColor: string | undefined = undefined
  if (txBody['a:lstStyle']) {
    const lst = txBody['a:lstStyle']
    const defRPr = lst['a:defPPr']?.['a:defRPr'] || lst['a:lvl1pPr']?.['a:defRPr'] || lst['a:lvl2pPr']?.['a:defRPr']
    if (defRPr) {
      if (defRPr['@_sz']) lstTextSize = Number.parseInt(defRPr['@_sz'], 10) / 100
      if (defRPr['a:solidFill']) lstTextColor = hexFromColorVal(defRPr['a:solidFill'])
    }
  }

  for (const p of paragraphs) {
    let defTextSize: number | undefined = undefined
    let defTextColor: string | undefined = undefined

    if (p['a:pPr'] && p['a:pPr']['a:defRPr']) {
      const defRPr = p['a:pPr']['a:defRPr']
      if (defRPr['@_sz']) defTextSize = Number.parseInt(defRPr['@_sz'], 10) / 100
      if (defRPr['a:solidFill']) defTextColor = hexFromColorVal(defRPr['a:solidFill'])
    }

    const runs = Array.isArray(p['a:r']) ? p['a:r'] : [p['a:r']].filter(Boolean)
    for (const r of runs) {
      if (r['a:t']) {
        const textVal = typeof r['a:t'] === 'object' ? r['a:t']['#text'] : r['a:t']
        if (textVal) {
          textParts.push(String(textVal))
          if (r['a:rPr']) {
            if (!textSize && r['a:rPr']['@_sz']) textSize = Number.parseInt(r['a:rPr']['@_sz'], 10) / 100
            if (!textColor && r['a:rPr']['a:solidFill']) textColor = hexFromColorVal(r['a:rPr']['a:solidFill'])
          }
          if (!textSize && defTextSize) textSize = defTextSize
          if (!textColor && defTextColor) textColor = defTextColor
          if (!textSize && lstTextSize) textSize = lstTextSize
          if (!textColor && lstTextColor) textColor = lstTextColor
        }
      }
    }
  }
  return {
    text: textParts.join(' ').trim(),
    textColor,
    textSize,
  }
}

function parseLocalCoord(val: any): number {
  if (val === undefined || val === null) return 0
  const num = typeof val === 'number' ? val : Number.parseInt(String(val), 10)
  if (Number.isNaN(num)) return 0
  return num
}

function extractShapePathD(spPr: any, w: number, h: number): string | undefined {
  if (!spPr) return undefined

  // 1. Custom Geometry (a:custGeom)
  const custGeom = spPr['a:custGeom']
  if (custGeom && custGeom['a:pathLst']) {
    const pathLst = custGeom['a:pathLst']
    const paths = Array.isArray(pathLst['a:path']) ? pathLst['a:path'] : [pathLst['a:path']].filter(Boolean)
    const commands: string[] = []

    for (const p of paths) {
      const pW = parseLocalCoord(p['@_w']) || w || 1
      const pH = parseLocalCoord(p['@_h']) || h || 1
      const scaleX = w > 0 ? w / pW : 1
      const scaleY = h > 0 ? h / pH : 1

      const rawCmds = Array.isArray(p['a:pathCmd']) ? p['a:pathCmd'] : [p['a:pathCmd']].filter(Boolean)

      for (const cmd of rawCmds) {
        const type = cmd['@_type']
        if (type === 'moveTo') {
          const pt = cmd['a:pt']
          if (pt) {
            const x = Math.round(parseLocalCoord(pt['@_x']) * scaleX)
            const y = Math.round(parseLocalCoord(pt['@_y']) * scaleY)
            commands.push(`M ${x} ${y}`)
          }
        } else if (type === 'lnTo') {
          const pt = cmd['a:pt']
          if (pt) {
            const x = Math.round(parseLocalCoord(pt['@_x']) * scaleX)
            const y = Math.round(parseLocalCoord(pt['@_y']) * scaleY)
            commands.push(`L ${x} ${y}`)
          }
        } else if (type === 'cubicBezTo') {
          const pts = Array.isArray(cmd['a:pt']) ? cmd['a:pt'] : [cmd['a:pt']].filter(Boolean)
          if (pts.length >= 3) {
            const x1 = Math.round(parseLocalCoord(pts[0]['@_x']) * scaleX), y1 = Math.round(parseLocalCoord(pts[0]['@_y']) * scaleY)
            const x2 = Math.round(parseLocalCoord(pts[1]['@_x']) * scaleX), y2 = Math.round(parseLocalCoord(pts[1]['@_y']) * scaleY)
            const x3 = Math.round(parseLocalCoord(pts[2]['@_x']) * scaleX), y3 = Math.round(parseLocalCoord(pts[2]['@_y']) * scaleY)
            commands.push(`C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`)
          }
        } else if (type === 'quadBezTo') {
          const pts = Array.isArray(cmd['a:pt']) ? cmd['a:pt'] : [cmd['a:pt']].filter(Boolean)
          if (pts.length >= 2) {
            const x1 = Math.round(parseLocalCoord(pts[0]['@_x']) * scaleX), y1 = Math.round(parseLocalCoord(pts[0]['@_y']) * scaleY)
            const x2 = Math.round(parseLocalCoord(pts[1]['@_x']) * scaleX), y2 = Math.round(parseLocalCoord(pts[1]['@_y']) * scaleY)
            commands.push(`Q ${x1} ${y1}, ${x2} ${y2}`)
          }
        } else if (type === 'close') {
          commands.push('Z')
        }
      }
    }

    if (commands.length > 0) {
      return commands.join(' ')
    }
  }

  // 2. Preset Geometry (a:prstGeom)
  const prst = spPr['a:prstGeom']?.['@_prst']
  if (prst) {
    switch (prst) {
      case 'ellipse':
        return `M ${Math.round(w / 2)} 0 A ${Math.round(w / 2)} ${Math.round(h / 2)} 0 1 1 ${Math.round(w / 2 - 0.01)} 0 Z`
      case 'triangle':
        return `M ${Math.round(w / 2)} 0 L ${w} ${h} L 0 ${h} Z`
      case 'diamond':
        return `M ${Math.round(w / 2)} 0 L ${w} ${Math.round(h / 2)} L ${Math.round(w / 2)} ${h} L 0 ${Math.round(h / 2)} Z`
      case 'chevron':
        return `M 0 0 L ${Math.round(w * 0.75)} 0 L ${w} ${Math.round(h / 2)} L ${Math.round(w * 0.75)} ${h} L 0 ${h} L ${Math.round(w * 0.25)} ${Math.round(h / 2)} Z`
      case 'rightArrow':
        return `M 0 ${Math.round(h * 0.25)} L ${Math.round(w * 0.6)} ${Math.round(h * 0.25)} L ${Math.round(w * 0.6)} 0 L ${w} ${Math.round(h * 0.5)} L ${Math.round(w * 0.6)} ${h} L ${Math.round(w * 0.6)} ${Math.round(h * 0.75)} L 0 ${Math.round(h * 0.75)} Z`
      case 'leftArrow':
        return `M ${w} ${Math.round(h * 0.25)} L ${Math.round(w * 0.4)} ${Math.round(h * 0.25)} L ${Math.round(w * 0.4)} 0 L 0 ${Math.round(h * 0.5)} L ${Math.round(w * 0.4)} ${h} L ${Math.round(w * 0.4)} ${Math.round(h * 0.75)} L ${w} ${Math.round(h * 0.75)} Z`
      case 'hexagon':
        return `M ${Math.round(w * 0.25)} 0 L ${Math.round(w * 0.75)} 0 L ${w} ${Math.round(h * 0.5)} L ${Math.round(w * 0.75)} ${h} L ${Math.round(w * 0.25)} ${h} L 0 ${Math.round(h * 0.5)} Z`
      case 'pentagon':
        return `M ${Math.round(w * 0.5)} 0 L ${w} ${Math.round(h * 0.38)} L ${Math.round(w * 0.81)} ${h} L ${Math.round(w * 0.19)} ${h} L 0 ${Math.round(h * 0.38)} Z`
      case 'star5':
        return `M ${Math.round(w * 0.5)} 0 L ${Math.round(w * 0.62)} ${Math.round(h * 0.38)} L ${w} ${Math.round(h * 0.38)} L ${Math.round(w * 0.69)} ${Math.round(h * 0.62)} L ${Math.round(w * 0.81)} ${h} L ${Math.round(w * 0.5)} ${Math.round(h * 0.75)} L ${Math.round(w * 0.19)} ${h} L ${Math.round(w * 0.31)} ${Math.round(h * 0.62)} L 0 ${Math.round(h * 0.38)} L ${Math.round(w * 0.38)} ${Math.round(h * 0.38)} Z`
      case 'roundRect':
        return `M 10 0 L ${w-10} 0 Q ${w} 0 ${w} 10 L ${w} ${h-10} Q ${w} ${h} ${w-10} ${h} L 10 ${h} Q 0 ${h} 0 ${h-10} L 0 10 Q 0 0 10 0 Z`
      case 'parallelogram':
        return `M ${Math.round(w * 0.2)} 0 L ${w} 0 L ${Math.round(w * 0.8)} ${h} L 0 ${h} Z`
      case 'upArrow':
        return `M ${Math.round(w * 0.25)} ${h} L ${Math.round(w * 0.25)} ${Math.round(h * 0.4)} L 0 ${Math.round(h * 0.4)} L ${Math.round(w * 0.5)} 0 L ${w} ${Math.round(h * 0.4)} L ${Math.round(w * 0.75)} ${Math.round(h * 0.4)} L ${Math.round(w * 0.75)} ${h} Z`
      case 'downArrow':
        return `M ${Math.round(w * 0.25)} 0 L ${Math.round(w * 0.75)} 0 L ${Math.round(w * 0.75)} ${Math.round(h * 0.6)} L ${w} ${Math.round(h * 0.6)} L ${Math.round(w * 0.5)} ${h} L 0 ${Math.round(h * 0.6)} L ${Math.round(w * 0.25)} ${Math.round(h * 0.6)} Z`
      default:
        return undefined
    }
  }

  return undefined
}

function parseSp(sp: any, idx: number, gx: number, gy: number, scaleX: number, scaleY: number): ShapeInfo | null {
  const spPr = sp['p:spPr']
  if (!spPr) return null

  const xfrm = spPr['a:xfrm']
  const off = xfrm?.['a:off']
  const ext = xfrm?.['a:ext']

  const x = gx + (parseEMU(off?.['@_x']) * scaleX)
  const y = gy + (parseEMU(off?.['@_y']) * scaleY)
  const w = Math.max(1, parseEMU(ext?.['@_cx']) * scaleX)
  const h = Math.max(1, parseEMU(ext?.['@_cy']) * scaleY)

  const solidFill = spPr['a:solidFill']
  const fillColor = hexFromColorVal(solidFill)

  const ln = spPr['a:ln']
  const strokeColor = hexFromColorVal(ln?.['a:solidFill'])

  const textInfo = extractTextFromSp(sp)
  const name = sp['p:nvSpPr']?.['p:cNvPr']?.['@_name'] ?? `Shape_${idx}`
  const pathD = extractShapePathD(spPr, w, h)

  return {
    id: `sp-${idx}`,
    name,
    x, y, w, h,
    fillColor,
    strokeColor,
    text: textInfo.text || undefined,
    textColor: textInfo.textColor,
    textSize: textInfo.textSize,
    pathD,
    idx: sp['@_data-idx'] !== undefined ? Number.parseInt(sp['@_data-idx'], 10) : idx,
  }
}

function parsePptxSlide(slideXml: string): ShapeInfo[] {
  let elementIndex = 0
  let processedXml = slideXml
    .replace(/<(p:sp|p:grpSp|p:cxnSp)\b/g, (match) => {
      return `${match} data-idx="${elementIndex++}"`
    })
    .replace(/<a:moveTo/g, '<a:pathCmd type="moveTo"')
    .replace(/<\/a:moveTo>/g, '</a:pathCmd>')
    .replace(/<a:lnTo/g, '<a:pathCmd type="lnTo"')
    .replace(/<\/a:lnTo>/g, '</a:pathCmd>')
    .replace(/<a:cubicBezTo/g, '<a:pathCmd type="cubicBezTo"')
    .replace(/<\/a:cubicBezTo>/g, '</a:pathCmd>')
    .replace(/<a:quadBezTo/g, '<a:pathCmd type="quadBezTo"')
    .replace(/<\/a:quadBezTo>/g, '</a:pathCmd>')
    .replace(/<a:arcTo/g, '<a:pathCmd type="arcTo"')
    .replace(/<\/a:arcTo>/g, '</a:pathCmd>')
    .replace(/<a:close/g, '<a:pathCmd type="close"')
    .replace(/<\/a:close>/g, '</a:pathCmd>')

  const parser = new XMLParser({ ignoreAttributes: false })
  const jsonObj = parser.parse(processedXml)
  const spTree = jsonObj['p:sld']?.['p:cSld']?.['p:spTree'] || jsonObj['p:sldLayout']?.['p:cSld']?.['p:spTree']
  if (!spTree) return []

  const shapes: ShapeInfo[] = []
  let globalIdCounter = 0

  function extractRecursive(tree: any, parentX = 0, parentY = 0, scaleX = 1, scaleY = 1, targetArray: ShapeInfo[] = shapes) {
    if (!tree) return
    const rawSp = Array.isArray(tree['p:sp']) ? tree['p:sp'] : [tree['p:sp']].filter(Boolean)
    rawSp.forEach((sp: any) => {
      const s = parseSp(sp, globalIdCounter++, parentX, parentY, scaleX, scaleY)
      if (s) {
        targetArray.push(s)
      }
    })

    const rawCxn = Array.isArray(tree['p:cxnSp']) ? tree['p:cxnSp'] : [tree['p:cxnSp']].filter(Boolean)
    rawCxn.forEach((cxn: any) => {
      const s = parseSp(cxn, globalIdCounter++, parentX, parentY, scaleX, scaleY)
      if (s) {
        targetArray.push(s)
      }
    })

    const rawGroups = Array.isArray(tree['p:grpSp']) ? tree['p:grpSp'] : [tree['p:grpSp']].filter(Boolean)
    rawGroups.forEach((grp: any) => {
      const grpXfrm = grp['p:grpSpPr']?.['a:xfrm']
      
      const offX = parseEMU(grpXfrm?.['a:off']?.['@_x'])
      const offY = parseEMU(grpXfrm?.['a:off']?.['@_y'])
      const extCX = parseEMU(grpXfrm?.['a:ext']?.['@_cx']) || 1
      const extCY = parseEMU(grpXfrm?.['a:ext']?.['@_cy']) || 1
      
      const chOffX = parseEMU(grpXfrm?.['a:chOff']?.['@_x'])
      const chOffY = parseEMU(grpXfrm?.['a:chOff']?.['@_y'])
      const chExtCX = parseEMU(grpXfrm?.['a:chExt']?.['@_cx']) || extCX
      const chExtCY = parseEMU(grpXfrm?.['a:chExt']?.['@_cy']) || extCY
      
      const childScaleX = scaleX * (extCX / chExtCX)
      const childScaleY = scaleY * (extCY / chExtCY)
      
      const gx = parentX + (offX * scaleX) - (chOffX * childScaleX)
      const gy = parentY + (offY * scaleY) - (chOffY * childScaleY)
      
      // Calculate group's own bounding box
      const groupX = parentX + (offX * scaleX)
      const groupY = parentY + (offY * scaleY)
      const groupW = extCX * scaleX
      const groupH = extCY * scaleY
      
      const groupIdx = grp['@_data-idx'] !== undefined ? Number.parseInt(grp['@_data-idx'], 10) : globalIdCounter++
      const groupName = grp['p:nvGrpSpPr']?.['p:cNvPr']?.['@_name'] ?? `Group_${groupIdx}`

      const groupShape: ShapeInfo = {
         id: `grp-${groupIdx}`,
         name: groupName,
         x: groupX,
         y: groupY,
         w: groupW,
         h: groupH,
         isGroup: true,
         children: [],
         idx: groupIdx
      }

      // Extract children into the group's children array
      extractRecursive(grp, gx, gy, childScaleX, childScaleY, groupShape.children)
      
      if (groupShape.children && groupShape.children.length > 0) {
         groupShape.children.sort((a, b) => (a.idx ?? 0) - (b.idx ?? 0))
         
         // Calculate local percentages for precise resizing
         for (const child of groupShape.children) {
            child.localPctX = groupW === 0 ? 0 : (child.x - groupX) / groupW
            child.localPctY = groupH === 0 ? 0 : (child.y - groupY) / groupH
            child.localPctW = groupW === 0 ? 1 : child.w / groupW
            child.localPctH = groupH === 0 ? 1 : child.h / groupH
         }
         
         targetArray.push(groupShape)
      }
    })
  }

  extractRecursive(spTree)
  shapes.sort((a, b) => (a.idx ?? 0) - (b.idx ?? 0))
  return shapes
}

function parseSvgPaths(svgContent: string): string[] {
  const pathRegex = /d=["']([^"']+)["']/g
  const paths: string[] = []
  let match: RegExpExecArray | null = null
  while ((match = pathRegex.exec(svgContent)) !== null) {
    if (match[1] && match[1].length > 10) {
      paths.push(match[1])
    }
  }
  return paths
}

interface ClusteringResult {
  repeatingItems: ShapeInfo[][]
  staticElements: ShapeInfo[]
}

function clusterShapes(shapes: ShapeInfo[]) {
  const sizeMap: Record<string, ShapeInfo[]> = {}
  for (const s of shapes) {
    const key = `${Math.round(s.w / 15) * 15}x${Math.round(s.h / 15) * 15}`
    if (!sizeMap[key]) sizeMap[key] = []
    sizeMap[key].push(s)
  }

  const repeatingItems: ShapeInfo[][] = []
  const staticElements: ShapeInfo[] = []

  for (const [_, list] of Object.entries(sizeMap)) {
    if (list.length >= 2) {
      repeatingItems.push(list)
    } else {
      staticElements.push(...list)
    }
  }

  for (const cluster of repeatingItems) {
    cluster.sort((a, b) => {
      if (Math.abs(a.y - b.y) > 30) return a.y - b.y
      return a.x - b.x
    })

    const hasText = cluster.some(s => s.text && s.text.trim().length > 0)
    let role = 'none'

    if (hasText) {
      const texts = cluster.map(s => s.text || '').filter(t => t.length > 0)
      const isNumeric = texts.every(t => !isNaN(Number(t.replace(/[^0-9]/g, ''))))
      if (isNumeric) {
        role = 'numeric'
      } else {
        const avgLen = texts.reduce((sum, t) => sum + t.length, 0) / texts.length
        if (avgLen < 30) role = 'title'
        else role = 'subtitle'
      }
    } else {
      role = 'color'
    }

    cluster.forEach((s, i) => {
      s.dataNodeIdx = i
      if (role === 'title') s.isTitle = true
      if (role === 'subtitle') s.isSubtitle = true
      if (role === 'color') s.isColorNode = true
    })
  }

  return { repeatingItems, staticElements }
}

function generateComponentTsx(
  templateName: string,
  shapes: ShapeInfo[],
  svgPaths: string[]
): string {
  const componentName = `${templateName.charAt(0).toUpperCase()}${templateName.slice(1)}Template`

  const defaultColors = ['#282a5d', '#3365cc', '#ff4d38', '#ffb900', '#52c49c', '#ee6d90']
  
  const sanitizeShape = (s: ShapeInfo, idx: number): any => {
    return {
      id: s.id || `sp-${idx}`,
      isGroup: s.isGroup,
      children: s.children?.map((c, i) => sanitizeShape(c, i)),
      isTitle: s.isTitle,
      isSubtitle: s.isSubtitle,
      isColorNode: s.isColorNode,
      dataNodeIdx: s.dataNodeIdx,
      x: s.x,
      y: s.y,
      width: Math.max(10, s.w),
      height: Math.max(10, s.h),
      localPctX: s.localPctX,
      localPctY: s.localPctY,
      localPctW: s.localPctW,
      localPctH: s.localPctH,
      fillColor: s.fillColor,
      strokeColor: s.strokeColor,
      text: s.text,
      textColor: s.textColor,
      textSize: s.textSize,
      pathD: s.pathD,
    }
  }

  const sanitizedShapes = shapes.map((s, i) => sanitizeShape(s, i))
  const shapesConst = `const PPTX_EXTRACTED_SHAPES = ${JSON.stringify(sanitizedShapes, null, 2)}\n`

  return `import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

${shapesConst}
const DEFAULT_COLORS = ${JSON.stringify(defaultColors)}

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

export function ${componentName}({ data }: { data: BrainData }): ReactElement {
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
            transform={\`translate(\${bbox.x}, \${bbox.y}) scale(\${bbox.width / Math.max(1, shapeDef.width || shapeDef.w)}, \${bbox.height / Math.max(1, shapeDef.height || shapeDef.h)})\`}
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
`
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage:
  npm run template:from-pptx -- <slide.pptx> [slide.svg] --name <TemplateName>

Example:
  npm run template:from-pptx -- my_presentation.pptx --name MyCustom
  npm run template:from-pptx -- my_presentation.pptx dessin-2.svg --name BrainCustom
`)
    process.exit(0)
  }

  let pptxPath = ''
  let svgPath = ''
  let nameArg = ''
  let useTimestamp = false

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--name' && args[i + 1]) {
      nameArg = args[i + 1]!
      i++
    } else if (args[i] === '--timestamp' || args[i] === '-t') {
      useTimestamp = true
    } else if (args[i]!.endsWith('.pptx') || args[i]!.endsWith('.potx')) {
      pptxPath = args[i]!
    } else if (args[i]!.endsWith('.svg')) {
      svgPath = args[i]!
    }
  }

  if (!nameArg) {
    const base = pptxPath ? path.basename(pptxPath, path.extname(pptxPath)).replace(/[^a-zA-Z0-9]/g, '') : 'Template'
    nameArg = `Imported_${base}`
  }

  if (!pptxPath) {
    console.error('Error: Please provide a valid .pptx file path.')
    process.exit(1)
  }

  console.log(`🚀 Reading PowerPoint file: ${pptxPath}`)
  const fileData = fs.readFileSync(pptxPath)
  const zip = await JSZip.loadAsync(fileData)

  let slideFiles = Object.keys(zip.files).filter(f => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'))

  if (slideFiles.length === 0) {
    slideFiles = Object.keys(zip.files).filter(f => f.startsWith('ppt/slideLayouts/slideLayout') && f.endsWith('.xml'))
  }

  if (slideFiles.length === 0) {
    console.error('Error: No slides or slide layouts found in .pptx / .potx file.')
    process.exit(1)
  }

  let slideNumberArg: number | null = null
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--slide' && args[i + 1]) {
      slideNumberArg = Number.parseInt(args[i + 1]!, 10)
      i++
    }
  }

  // Sort slide files naturally (slide1.xml, slide2.xml, slide10.xml...)
  slideFiles.sort((a, b) => {
    const numA = Number.parseInt(a.replace(/[^0-9]/g, '') || '0', 10)
    const numB = Number.parseInt(b.replace(/[^0-9]/g, '') || '0', 10)
    return numA - numB
  })

  const slidesToProcess = slideNumberArg
    ? slideFiles.filter(f => f.endsWith(`slideLayout${slideNumberArg}.xml`) || f.endsWith(`slide${slideNumberArg}.xml`))
    : slideFiles

  if (slidesToProcess.length === 0) {
    console.error(`Error: Slide ${slideNumberArg} not found in .pptx file. Found ${slideFiles.length} slides.`)
    process.exit(1)
  }

  console.log(`✨ Processing ${slidesToProcess.length} slide(s) from presentation...`)

  let svgPaths: string[] = []
  if (svgPath && fs.existsSync(svgPath)) {
    console.log(`🎨 Reading vector SVG file: ${svgPath}`)
    const svgContent = fs.readFileSync(svgPath, 'utf-8')
    svgPaths = parseSvgPaths(svgContent)
    console.log(`⚡ Extracted ${svgPaths.length} clean SVG path vectors.`)
  }

  const cleanName = nameArg.toLowerCase().replace(/[^a-z0-9]/g, '')
  let currentCategory = 'Other'

  for (let idx = 0; idx < slidesToProcess.length; idx++) {
    const slideFile = slidesToProcess[idx]!
    const slideNum = slideFile.replace(/[^0-9]/g, '')
    console.log(`\n📄 Analyzing Slide ${slideNum} (${slideFile})...`)
    const slideXml = await zip.file(slideFile)!.async('text')

    const shapes = parsePptxSlide(slideXml)
    console.log(`  Found ${shapes.length} shapes/groups in Slide ${slideNum}.`)

    const { repeatingItems, staticElements, primaryDataNodes } = clusterShapes(shapes)

    console.log(`  Detected ${repeatingItems.length} repeating shape clusters and ${staticElements.length} static elements.`)

    const slideCleanName = slidesToProcess.length === 1 ? cleanName : `${cleanName}${slideNum}`
    const pascalName = slideCleanName.charAt(0).toUpperCase() + slideCleanName.slice(1)
    const templateFileName = `${pascalName}Template.tsx`
    const targetPath = path.join(process.cwd(), 'src/templates/components', templateFileName)

    if (fs.existsSync(targetPath) && !args.includes('--force')) {
      console.error(`  ⚠️ Attention : Le fichier ${templateFileName} existe déjà. Ignoré (utilisez --force pour le remplacer).`)
      continue
    }

    const componentTsx = generateComponentTsx(pascalName, shapes, svgPaths, primaryDataNodes)
    fs.writeFileSync(targetPath, componentTsx, 'utf-8')
    console.log(`  ✅ Created Template Component: src/templates/components/${templateFileName}`)

    // Auto-register in src/templates/registry.ts with detected category
    const registryPath = path.join(process.cwd(), 'src/templates/registry.ts')
    if (fs.existsSync(registryPath)) {
      let registryContent = fs.readFileSync(registryPath, 'utf-8')
      if (!registryContent.includes(`type: '${slideCleanName}'`)) {
        const newEntry = `  {
    type: '${slideCleanName}' as any,
    label: '${pascalName} PowerPoint Template (Slide ${slideNum})',
    description: 'Template auto-généré depuis PowerPoint (${path.basename(pptxPath)}, slide ${slideNum})',
    category: '${currentCategory}',
    defaultData: {
      type: 'brain',
      branches: [
        { title: 'Item 1', subtitle: 'Description 1', color: '#282a5d' },
        { title: 'Item 2', subtitle: 'Description 2', color: '#3365cc' },
        { title: 'Item 3', subtitle: 'Description 3', color: '#ff4d38' },
      ],
    },
  },`
        registryContent = registryContent.replace('export const TEMPLATES: TemplateDefinition[] = [', `export const TEMPLATES: TemplateDefinition[] = [\n${newEntry}`)
        fs.writeFileSync(registryPath, registryContent, 'utf-8')
        console.log(`  🎉 Auto-registered '${slideCleanName}' under category "${currentCategory}" in src/templates/registry.ts!`)
      }
    }

    // Auto-register in src/templates/types.ts
    const typesPath = path.join(process.cwd(), 'src/templates/types.ts')
    if (fs.existsSync(typesPath)) {
      let typesContent = fs.readFileSync(typesPath, 'utf-8')
      if (!typesContent.includes(`'${slideCleanName}'`)) {
        typesContent = typesContent.replace('export type TemplateType =', `export type TemplateType = '${slideCleanName}' |`)
        fs.writeFileSync(typesPath, typesContent, 'utf-8')
        console.log(`  📝 Auto-registered '${slideCleanName}' in TemplateType (src/templates/types.ts)!`)
      }
    }

    // Auto-register in src/templates/TemplateRenderer.tsx
    const rendererPath = path.join(process.cwd(), 'src/templates/TemplateRenderer.tsx')
    if (fs.existsSync(rendererPath)) {
      let rendererContent = fs.readFileSync(rendererPath, 'utf-8')
      if (!rendererContent.includes(`import { ${pascalName}Template }`)) {
        rendererContent = `import { ${pascalName}Template } from './components/${pascalName}Template'\n` + rendererContent
        const mapEntry = `  '${slideCleanName}': ({ data }: { data: any }) => <${pascalName}Template data={data as any} />,`
        rendererContent = rendererContent.replace('const TEMPLATE_MAP: Record<TemplateType, TemplateComponent> = {', `const TEMPLATE_MAP: Record<TemplateType, TemplateComponent> = {\n${mapEntry}`)
        fs.writeFileSync(rendererPath, rendererContent, 'utf-8')
        console.log(`  ⚛️ Auto-registered '${pascalName}Template' in src/templates/TemplateRenderer.tsx!`)
      }
    }
  }

  console.log(`\n🎉 Tous les templates de votre PowerPoint ont été générés avec succès !`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
