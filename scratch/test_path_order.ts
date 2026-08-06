import fs from 'node:fs'
import JSZip from 'jszip'

async function main() {
  const fileData = fs.readFileSync('/media/stiven/ssd_new/autoentreprise/sites/autoDesign/ex/2025 - MIGSO-PCUBED - Creative and Example Templates.potx')
  const zip = await JSZip.loadAsync(fileData)
  
  const slideFile = Object.keys(zip.files).find(f => f.startsWith('ppt/slideLayouts/slideLayout') && f.endsWith('.xml'))!
  const xml = await zip.file(slideFile)!.async('text')
  
  const pathMatches = xml.match(/<a:path[^>]*>.*?<\/a:path>/g)
  if (pathMatches) {
    for (let i = 0; i < Math.min(5, pathMatches.length); i++) {
      console.log(`Path ${i + 1}:`)
      const tags = pathMatches[i].match(/<a:(moveTo|lnTo|cubicBezTo|quadBezTo|arcTo|close)/g)
      console.log(tags)
    }
  }
}

main().catch(console.error)
