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

  return {
    id: `sp-${idx}`,
    name,
    x, y, w, h,
    fillColor,
    strokeColor,
    text,
  }
}

function parsePptxSlide(slideXml: string): ShapeInfo[] {
  const parser = new XMLParser({ ignoreAttributes: false })
  const jsonObj = parser.parse(slideXml)
  const spTree = jsonObj['p:sld']?.['p:cSld']?.['p:spTree']
  if (!spTree) return []

  const shapes: ShapeInfo[] = []
  const rawShapes = Array.isArray(spTree['p:sp']) ? spTree['p:sp'] : [spTree['p:sp']].filter(Boolean)
  rawShapes.forEach((sp: any, i: number) => {
    const s = parseSp(sp, i)
    if (s) shapes.push(s)
  })

  // Also parse group shapes
  const rawGroups = Array.isArray(spTree['p:grpSp']) ? spTree['p:grpSp'] : [spTree['p:grpSp']].filter(Boolean)
  rawGroups.forEach((grp: any, i: number) => {
    const grpSpPr = grp['p:grpSpPr']
    const xfrm = grpSpPr?.['a:xfrm']
    const x = parseEMU(xfrm?.['a:off']?.['@_x'])
    const y = parseEMU(xfrm?.['a:off']?.['@_y'])
    const w = parseEMU(xfrm?.['a:ext']?.['@_cx'])
    const h = parseEMU(xfrm?.['a:ext']?.['@_cy'])

    const innerRaw = Array.isArray(grp['p:sp']) ? grp['p:sp'] : [grp['p:sp']].filter(Boolean)
    const children: ShapeInfo[] = []
    innerRaw.forEach((sp: any, j: number) => {
      const s = parseSp(sp, j)
      if (s) children.push(s)
    })

    shapes.push({
      id: `grp-${i}`,
      name: grp['p:nvGrpSpPr']?.['p:cNvPr']?.['@_name'] ?? `Group_${i}`,
      x, y, w, h,
      isGroup: true,
      children,
    })
  })

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

  const hasSvgPaths = svgPaths.length > 0
  const svgPathsConst = hasSvgPaths
    ? `const SVG_VECTOR_PATHS = ${JSON.stringify(svgPaths, null, 2)}\n`
    : ''

  return `import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'
import * as LucideIcons from 'lucide-react'

${svgPathsConst}
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

  const centerId = 'center-elem'
  const centerDef = { x: 330, y: 220, width: 240, height: 320 }
  const centerPos = positions[centerId]
  const centerBbox = {
    x: centerPos?.x ?? centerDef.x,
    y: centerPos?.y ?? centerDef.y,
    width: centerPos?.width ?? centerDef.width,
    height: centerPos?.height ?? centerDef.height,
  }
  const isCenterSelected = selectedIds.has(centerId)

  const branches = data.branches && data.branches.length > 0 ? data.branches : [
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'wrench', color: '#282a5d' },
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'lightbulb', color: '#3365cc' },
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'zap', color: '#ff4d38' },
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'git-branch', color: '#ffb900' },
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'target', color: '#52c49c' },
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'mouse-pointer', color: '#ee6d90' },
  ]
  const count = Math.max(1, branches.length)
  const scaleFactor = Math.min(1.2, Math.max(0.6, 6 / count))

  return (
    <g ref={svgRef}>
      {/* 1. Dynamic PPTX Item Blocks (Interactive & Resizable) */}
      {branches.map((branch, i) => {
        const id = \`item-\${i}\`
        const color = tplColors[id] ?? branch.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(id)

        const defaultW = Math.max(120, 220 * scaleFactor)
        const defaultH = Math.max(60, 90 * scaleFactor)
        const defaultX = 60 + (i % 3) * (defaultW + 30)
        const defaultY = 60 + Math.floor(i / 3) * (defaultH + 30)

        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? defaultX,
          y: pos?.y ?? defaultY,
          width: pos?.width ?? defaultW,
          height: pos?.height ?? defaultH,
        }

        const iconKey = branch.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length]
        const IconFn = getDynamicIcon(iconKey, Math.round(24 * scaleFactor))
        const titleLines = wrapText(branch.title, Math.max(8, Math.floor(bbox.width / 10)))

        return (
          <g key={id} onMouseDown={e => startDrag(e, id, bbox)} transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              rx={10}
              fill={color}
              opacity={isSelected ? 0.88 : 1}
              stroke={isSelected ? '#4a90d9' : '#ffffff'}
              strokeWidth={isSelected ? 2.5 : 1}
              filter="drop-shadow(0 4px 12px rgba(0,0,0,0.1))"
            />

            {IconFn && (
              <g transform={\`translate(\${bbox.x + 14}, \${bbox.y + 14})\`}>
                <IconFn size={Math.round(24 * scaleFactor)} color="#ffffff" />
              </g>
            )}

            <text
              x={bbox.x + (IconFn ? 46 : 16)}
              y={bbox.y + 24}
              fontFamily="Arial, sans-serif"
              fontSize={Math.round(13 * scaleFactor)}
              fontWeight={700}
              fill="#ffffff"
            >
              {titleLines.map((line, lIdx) => (
                <tspan key={lIdx} x={bbox.x + (IconFn ? 46 : 16)} dy={lIdx === 0 ? 0 : 16}>
                  {line}
                </tspan>
              ))}
            </text>

            {branch.subtitle && (
              <text
                x={bbox.x + (IconFn ? 46 : 16)}
                y={bbox.y + 28 + titleLines.length * 14}
                fontFamily="Arial, sans-serif"
                fontSize={Math.round(11 * scaleFactor)}
                fontWeight={400}
                fill="#ffffff"
                opacity={0.9}
              >
                {branch.subtitle}
              </text>
            )}

            {isSelected && renderHandles(bbox, id)}
          </g>
        )
      })}

      {/* 2. Central Static Silhouette / Element */}
      <g
        transform={getTransform(centerId, centerBbox)}
        style={{ cursor: 'pointer' }}
        onMouseDown={e => startDrag(e, centerId, centerBbox)}
      >
        <path
          d={HEAD_PATH}
          transform={\`translate(\${centerBbox.x},\${centerBbox.y}) scale(\${centerBbox.width / 300},\${centerBbox.height / 420})\`}
          fill="#111319"
          stroke={isCenterSelected ? '#4a90d9' : 'none'}
          strokeWidth={isCenterSelected ? 3 : 0}
        />
        {isCenterSelected && renderHandles(centerBbox, centerId)}
      </g>
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
  let nameArg = 'CustomPPTX'

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--name' && args[i + 1]) {
      nameArg = args[i + 1]!
      i++
    } else if (args[i]!.endsWith('.pptx')) {
      pptxPath = args[i]!
    } else if (args[i]!.endsWith('.svg')) {
      svgPath = args[i]!
    }
  }

  if (!pptxPath) {
    console.error('Error: Please provide a valid .pptx file path.')
    process.exit(1)
  }

  console.log(`🚀 Reading PowerPoint file: ${pptxPath}`)
  const fileData = fs.readFileSync(pptxPath)
  const zip = await JSZip.loadAsync(fileData)

  const slideFiles = Object.keys(zip.files).filter(f => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'))
  if (slideFiles.length === 0) {
    console.error('Error: No slides found in .pptx file.')
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
    ? slideFiles.filter(f => f.endsWith(`slide${slideNumberArg}.xml`))
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
  }

  console.log(`\n🎉 Tous les templates de votre PowerPoint ont été générés avec succès !`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
