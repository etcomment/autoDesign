import fs from 'node:fs'
import JSZip from 'jszip'
import { XMLParser } from 'fast-xml-parser'

async function main() {
  const fileData = fs.readFileSync('/media/stiven/ssd_new/autoentreprise/sites/autoDesign/ex/2025 - MIGSO-PCUBED - Creative and Example Templates.potx')
  const zip = await JSZip.loadAsync(fileData)
  
  const slideFiles = Object.keys(zip.files).filter(f => (f.startsWith('ppt/slides/slide') || f.startsWith('ppt/slideLayouts/slideLayout')) && f.endsWith('.xml'))
  
  const parser = new XMLParser({ ignoreAttributes: false })
  const prstCounts: Record<string, number> = {}
  let custGeomCount = 0

  for (const file of slideFiles) {
    const xml = await zip.file(file)!.async('text')
    const jsonObj = parser.parse(xml)
    
    const tree = jsonObj['p:sld']?.['p:cSld']?.['p:spTree'] || jsonObj['p:sldLayout']?.['p:cSld']?.['p:spTree']
    if (!tree) continue

    function extractRecursive(node: any) {
      if (!node) return
      const rawSp = Array.isArray(node['p:sp']) ? node['p:sp'] : [node['p:sp']].filter(Boolean)
      for (const sp of rawSp) {
        const spPr = sp['p:spPr']
        if (spPr) {
          if (spPr['a:custGeom']) custGeomCount++
          const prst = spPr['a:prstGeom']?.['@_prst']
          if (prst) prstCounts[prst] = (prstCounts[prst] || 0) + 1
        }
      }
      const rawGroups = Array.isArray(node['p:grpSp']) ? node['p:grpSp'] : [node['p:grpSp']].filter(Boolean)
      for (const grp of rawGroups) extractRecursive(grp)
    }
    extractRecursive(tree)
  }
  
  console.log('Custom Geoms:', custGeomCount)
  console.log('Preset Geoms:', prstCounts)
}

main().catch(console.error)
