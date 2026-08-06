import fs from 'node:fs'
import JSZip from 'jszip'

async function main() {
  const fileData = fs.readFileSync('/media/stiven/ssd_new/autoentreprise/sites/autoDesign/ex/2025 - MIGSO-PCUBED - Creative and Example Templates.potx')
  const zip = await JSZip.loadAsync(fileData)
  
  const slideFiles = Object.keys(zip.files).filter(f => (f.startsWith('ppt/slides/slide') || f.startsWith('ppt/slideLayouts/slideLayout')) && f.endsWith('.xml'))
  
  for (const file of slideFiles) {
    const xml = await zip.file(file)!.async('text')
    if (xml.includes('<a:custGeom')) {
      console.log('Found in', file)
      console.log(xml.substring(xml.indexOf('<a:custGeom'), xml.indexOf('</a:custGeom>') + 13).substring(0, 1000))
      break
    }
  }
}

main().catch(console.error)
