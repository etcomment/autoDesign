import fs from 'node:fs'
import JSZip from 'jszip'
import { XMLParser } from 'fast-xml-parser'

async function main() {
  const fileData = fs.readFileSync('/media/stiven/ssd_new/autoentreprise/sites/autoDesign/ex/2025 - MIGSO-PCUBED - Creative and Example Templates.potx')
  const zip = await JSZip.loadAsync(fileData)
  
  const slideFiles = Object.keys(zip.files).filter(f => (f.startsWith('ppt/slides/slide') || f.startsWith('ppt/slideLayouts/slideLayout')) && f.endsWith('.xml'))
  
  const parser = new XMLParser({ ignoreAttributes: false })
  let formulas = new Set<string>()

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
        if (spPr?.['a:custGeom']?.['a:pathLst']?.['a:path']) {
          const paths = Array.isArray(spPr['a:custGeom']['a:pathLst']['a:path']) ? spPr['a:custGeom']['a:pathLst']['a:path'] : [spPr['a:custGeom']['a:pathLst']['a:path']]
          for (const p of paths) {
            for (const key of Object.keys(p)) {
              if (key === 'a:moveTo' || key === 'a:lnTo' || key === 'a:cubicBezTo') {
                const arr = Array.isArray(p[key]) ? p[key] : [p[key]]
                for (const item of arr) {
                  const pts = Array.isArray(item['a:pt']) ? item['a:pt'] : [item['a:pt']]
                  for (const pt of pts) {
                    if (pt) {
                      const x = String(pt['@_x'])
                      const y = String(pt['@_y'])
                      if (isNaN(Number(x))) formulas.add(x)
                      if (isNaN(Number(y))) formulas.add(y)
                    }
                  }
                }
              }
            }
          }
        }
      }
      const rawGroups = Array.isArray(node['p:grpSp']) ? node['p:grpSp'] : [node['p:grpSp']].filter(Boolean)
      for (const grp of rawGroups) extractRecursive(grp)
    }
    extractRecursive(tree)
  }
  
  console.log('Formulas found in a:pt:', Array.from(formulas))
}

main().catch(console.error)
