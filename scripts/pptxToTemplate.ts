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
  fillColor?: string
  strokeColor?: string
  text?: string
  pathD?: string
  isGroup?: boolean
  children?: ShapeInfo[]
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

function hexFromColorVal(clrObj: any): string | undefined {
  if (!clrObj) return undefined
  if (clrObj['a:srgbClr']?.['@_val']) {
    return `#${clrObj['a:srgbClr']['@_val']}`
  }
  if (clrObj['a:sysClr']?.['@_lastClr']) {
    return `#${clrObj['a:sysClr']['@_lastClr']}`
  }
  return undefined
}

function extractTextFromSp(sp: any): string {
  const txBody = sp['p:txBody']
  if (!txBody) return ''
  const paragraphs = Array.isArray(txBody['a:p']) ? txBody['a:p'] : [txBody['a:p']].filter(Boolean)
  const textParts: string[] = []
  for (const p of paragraphs) {
    const runs = Array.isArray(p['a:r']) ? p['a:r'] : [p['a:r']].filter(Boolean)
    for (const r of runs) {
      if (r['a:t']) {
        const textVal = typeof r['a:t'] === 'object' ? r['a:t']['#text'] : r['a:t']
        if (textVal) textParts.push(String(textVal))
      }
    }
  }
  return textParts.join(' ').trim()
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
      const pW = parseEMU(p['@_w']) || w || 1
      const pH = parseEMU(p['@_h']) || h || 1
      const scaleX = w > 0 ? w / pW : 1
      const scaleY = h > 0 ? h / pH : 1

      for (const key of Object.keys(p)) {
        if (key === 'a:moveTo') {
          const pt = p['a:moveTo']?.['a:pt']
          if (pt) {
            const x = Math.round(parseEMU(pt['@_x']) * scaleX)
            const y = Math.round(parseEMU(pt['@_y']) * scaleY)
            commands.push(`M ${x} ${y}`)
          }
        } else if (key === 'a:lnTo') {
          const rawPts = Array.isArray(p['a:lnTo']) ? p['a:lnTo'] : [p['a:lnTo']].filter(Boolean)
          for (const item of rawPts) {
            const pt = item['a:pt']
            if (pt) {
              const x = Math.round(parseEMU(pt['@_x']) * scaleX)
              const y = Math.round(parseEMU(pt['@_y']) * scaleY)
              commands.push(`L ${x} ${y}`)
            }
          }
        } else if (key === 'a:cubicBezTo') {
          const rawPts = Array.isArray(p['a:cubicBezTo']) ? p['a:cubicBezTo'] : [p['a:cubicBezTo']].filter(Boolean)
          for (const item of rawPts) {
            const pts = Array.isArray(item['a:pt']) ? item['a:pt'] : [item['a:pt']].filter(Boolean)
            if (pts.length >= 3) {
              const x1 = Math.round(parseEMU(pts[0]['@_x']) * scaleX), y1 = Math.round(parseEMU(pts[0]['@_y']) * scaleY)
              const x2 = Math.round(parseEMU(pts[1]['@_x']) * scaleX), y2 = Math.round(parseEMU(pts[1]['@_y']) * scaleY)
              const x3 = Math.round(parseEMU(pts[2]['@_x']) * scaleX), y3 = Math.round(parseEMU(pts[2]['@_y']) * scaleY)
              commands.push(`C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`)
            }
          }
        } else if (key === 'a:close') {
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
      default:
        return undefined
    }
  }

  return undefined
}

function parseSp(sp: any, idx: number): ShapeInfo | null {
  const spPr = sp['p:spPr']
  if (!spPr) return null

  const xfrm = spPr['a:xfrm']
  const off = xfrm?.['a:off']
  const ext = xfrm?.['a:ext']

  const x = parseEMU(off?.['@_x'])
  const y = parseEMU(off?.['@_y'])
  const w = parseEMU(ext?.['@_cx'])
  const h = parseEMU(ext?.['@_cy'])

  const solidFill = spPr['a:solidFill']
  const fillColor = hexFromColorVal(solidFill)

  const ln = spPr['a:ln']
  const strokeColor = hexFromColorVal(ln?.['a:solidFill'])

  const text = extractTextFromSp(sp)
  const name = sp['p:nvSpPr']?.['p:cNvPr']?.['@_name'] ?? `Shape_${idx}`
  const pathD = extractShapePathD(spPr, w, h)

  return {
    id: `sp-${idx}`,
    name,
    x, y, w, h,
    fillColor,
    strokeColor,
    text,
    pathD,
  }
}

function parsePptxSlide(slideXml: string): ShapeInfo[] {
  const parser = new XMLParser({ ignoreAttributes: false })
  const jsonObj = parser.parse(slideXml)
  const spTree = jsonObj['p:sld']?.['p:cSld']?.['p:spTree'] || jsonObj['p:sldLayout']?.['p:cSld']?.['p:spTree']
  if (!spTree) return []

  const shapes: ShapeInfo[] = []

  function extractRecursive(tree: any, parentX = 0, parentY = 0) {
    if (!tree) return
    const rawSp = Array.isArray(tree['p:sp']) ? tree['p:sp'] : [tree['p:sp']].filter(Boolean)
    rawSp.forEach((sp: any, i: number) => {
      const s = parseSp(sp, shapes.length)
      if (s) {
        s.x += parentX
        s.y += parentY
        shapes.push(s)
      }
    })

    const rawCxn = Array.isArray(tree['p:cxnSp']) ? tree['p:cxnSp'] : [tree['p:cxnSp']].filter(Boolean)
    rawCxn.forEach((cxn: any, i: number) => {
      const s = parseSp(cxn, shapes.length)
      if (s) {
        s.x += parentX
        s.y += parentY
        shapes.push(s)
      }
    })

    const rawGroups = Array.isArray(tree['p:grpSp']) ? tree['p:grpSp'] : [tree['p:grpSp']].filter(Boolean)
    rawGroups.forEach((grp: any) => {
      const grpXfrm = grp['p:grpSpPr']?.['a:xfrm']
      const gx = parentX + parseEMU(grpXfrm?.['a:off']?.['@_x'])
      const gy = parentY + parseEMU(grpXfrm?.['a:off']?.['@_y'])
      extractRecursive(grp, gx, gy)
    })
  }

  extractRecursive(spTree)
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

function clusterShapes(shapes: ShapeInfo[]): ClusteringResult {
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

  if (repeatingItems.length === 0 && shapes.length > 0) {
    repeatingItems.push(shapes)
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
  const defaultIcons = ['wrench', 'lightbulb', 'zap', 'git-branch', 'target', 'mouse-pointer']

  const sanitizedShapes = shapes.map((s, i) => ({
    id: s.id || `sp-${i}`,
    x: s.x || (60 + (i % 3) * 240),
    y: s.y || (60 + Math.floor(i / 3) * 120),
    width: Math.max(40, s.w || 200),
    height: Math.max(25, s.h || 90),
    fillColor: s.fillColor || defaultColors[i % defaultColors.length]!,
    strokeColor: s.strokeColor || '#ffffff',
    text: s.text || `Item ${i + 1}`,
    pathD: s.pathD || undefined,
  }))

  const shapesConst = `const PPTX_EXTRACTED_SHAPES = ${JSON.stringify(sanitizedShapes, null, 2)}\n`

  return `import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import * as LucideIcons from 'lucide-react'

${shapesConst}
const DEFAULT_COLORS = ${JSON.stringify(defaultColors)}
const DEFAULT_ICONS = ${JSON.stringify(defaultIcons)}

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

export function ${componentName}({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const branches = data?.branches && data.branches.length > 0 ? data.branches : []

  return (
    <g ref={svgRef}>
      {PPTX_EXTRACTED_SHAPES.map((shapeDef, i) => {
        const id = shapeDef.id || \`item-\${i}\`
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

        const titleText = branch?.title || shapeDef.text || \`Item \${i + 1}\`
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
              <g transform={\`translate(\${bbox.x + 10}, \${bbox.y + 10})\`}>
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

  if (!nameArg || useTimestamp) {
    const now = new Date()
    const ts = now.toISOString().replace(/[-:T.]/g, '').slice(0, 14)
    const base = pptxPath ? path.basename(pptxPath, path.extname(pptxPath)).replace(/[^a-zA-Z0-9]/g, '') : 'Template'
    nameArg = nameArg ? `Import_${ts}_${nameArg}` : `Import_${ts}_${base}`
  }

  if (!pptxPath) {
    console.error('Error: Please provide a valid .pptx file path.')
    process.exit(1)
  }

  console.log(`🚀 Reading PowerPoint file: ${pptxPath}`)
  const fileData = fs.readFileSync(pptxPath)
  const zip = await JSZip.loadAsync(fileData)

  const isPotx = pptxPath.toLowerCase().endsWith('.potx')
  let slideFiles = isPotx
    ? Object.keys(zip.files).filter(f => f.startsWith('ppt/slideLayouts/slideLayout') && f.endsWith('.xml'))
    : Object.keys(zip.files).filter(f => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'))

  if (slideFiles.length === 0) {
    slideFiles = Object.keys(zip.files).filter(f => f.startsWith('ppt/slides/slide') || f.startsWith('ppt/slideLayouts/slideLayout') && f.endsWith('.xml'))
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

    const { repeatingItems, staticElements } = clusterShapes(shapes)

    // Check if this slide is a Category Title / Section Header Slide
    const textShapes = shapes.filter(s => s.text && s.text.length > 0)
    const isCategoryTitleSlide = shapes.length <= 4 && repeatingItems.length === 0 && textShapes.length >= 1

    if (isCategoryTitleSlide) {
      const headerTitle = textShapes[0]!.text
      currentCategory = headerTitle
      console.log(`  📌 Detected Section Header Slide! Setting category for subsequent slides to: "${currentCategory}"`)
      continue
    }

    console.log(`  Detected ${repeatingItems.length} repeating shape clusters and ${staticElements.length} static elements.`)

    const slideCleanName = slidesToProcess.length === 1 ? cleanName : `${cleanName}${slideNum}`
    const pascalName = slideCleanName.charAt(0).toUpperCase() + slideCleanName.slice(1)
    const templateFileName = `${pascalName}Template.tsx`
    const targetPath = path.join(process.cwd(), 'src/templates/components', templateFileName)

    if (fs.existsSync(targetPath) && !args.includes('--force')) {
      console.error(`  ⚠️ Attention : Le fichier ${templateFileName} existe déjà. Ignoré (utilisez --force pour le remplacer).`)
      continue
    }

    const componentTsx = generateComponentTsx(pascalName, shapes, svgPaths)
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
        typesContent = typesContent.replace('export type TemplateType =', `export type TemplateType = | '${slideCleanName}' |`)
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
