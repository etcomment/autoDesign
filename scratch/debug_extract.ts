import fs from 'node:fs'
import JSZip from 'jszip'
import { XMLParser } from 'fast-xml-parser'

function parseEMU(val: any): number {
  if (val === undefined || val === null) return 0
  const num = typeof val === 'number' ? val : Number.parseInt(String(val), 10)
  if (Number.isNaN(num)) return 0
  return Math.round((num / 914400) * 96)
}

function extractShapePathD(spPr: any, w: number, h: number): string | undefined {
  if (!spPr) return undefined

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

      const rawCmds = Array.isArray(p['a:pathCmd']) ? p['a:pathCmd'] : [p['a:pathCmd']].filter(Boolean)

      for (const cmd of rawCmds) {
        const type = cmd['@_type']
        if (type === 'moveTo') {
          const pt = cmd['a:pt']
          if (pt) {
            const x = Math.round(parseEMU(pt['@_x']) * scaleX)
            const y = Math.round(parseEMU(pt['@_y']) * scaleY)
            commands.push(`M ${x} ${y}`)
          }
        } else if (type === 'lnTo') {
          const pt = cmd['a:pt']
          if (pt) {
            const x = Math.round(parseEMU(pt['@_x']) * scaleX)
            const y = Math.round(parseEMU(pt['@_y']) * scaleY)
            commands.push(`L ${x} ${y}`)
          }
        } else if (type === 'cubicBezTo') {
          const pts = Array.isArray(cmd['a:pt']) ? cmd['a:pt'] : [cmd['a:pt']].filter(Boolean)
          if (pts.length >= 3) {
            const x1 = Math.round(parseEMU(pts[0]['@_x']) * scaleX), y1 = Math.round(parseEMU(pts[0]['@_y']) * scaleY)
            const x2 = Math.round(parseEMU(pts[1]['@_x']) * scaleX), y2 = Math.round(parseEMU(pts[1]['@_y']) * scaleY)
            const x3 = Math.round(parseEMU(pts[2]['@_x']) * scaleX), y3 = Math.round(parseEMU(pts[2]['@_y']) * scaleY)
            commands.push(`C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`)
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
  return undefined
}

async function main() {
  const fileData = fs.readFileSync('/media/stiven/ssd_new/autoentreprise/sites/autoDesign/ex/2025 - MIGSO-PCUBED - Creative and Example Templates.potx')
  const zip = await JSZip.loadAsync(fileData)
  const xml = await zip.file('ppt/slides/slide4.xml')!.async('text')
  
  let processedXml = xml
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
    .replace(/<a:close([^>]*)>/g, '<a:pathCmd type="close"$1></a:pathCmd>')

  const parser = new XMLParser({ ignoreAttributes: false })
  const jsonObj = parser.parse(processedXml)
  
  const tree = jsonObj['p:sld']?.['p:cSld']?.['p:spTree']
  const rawSp = Array.isArray(tree['p:sp']) ? tree['p:sp'] : [tree['p:sp']].filter(Boolean)
  
  for (let i = 0; i < Math.min(10, rawSp.length); i++) {
    const sp = rawSp[i]
    const spPr = sp['p:spPr']
    const ext = spPr?.['a:xfrm']?.['a:ext']
    const w = parseEMU(ext?.['@_cx']) || 100
    const h = parseEMU(ext?.['@_cy']) || 100
    
    const pathD = extractShapePathD(spPr, w, h)
    if (pathD) {
      console.log(`Shape ${i} pathD:`, pathD)
    }
  }
}

main().catch(console.error)
