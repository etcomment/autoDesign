import fs from 'node:fs'
import JSZip from 'jszip'

async function main() {
  const fileData = fs.readFileSync('/media/stiven/ssd_new/autoentreprise/sites/autoDesign/ex/2025 - MIGSO-PCUBED - Creative and Example Templates.potx')
  const zip = await JSZip.loadAsync(fileData)
  
  const slides = Object.keys(zip.files).filter(f => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'))
  const layouts = Object.keys(zip.files).filter(f => f.startsWith('ppt/slideLayouts/slideLayout') && f.endsWith('.xml'))
  
  console.log('Slides:', slides.length)
  console.log('Layouts:', layouts.length)
}

main().catch(console.error)
