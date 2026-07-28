import PptxGenJS from 'pptxgenjs'
const pres = new PptxGenJS()
const slide = pres.addSlide()
const svg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="red"/></svg>`
const base64 = Buffer.from(svg).toString('base64')
slide.addImage({ data: `data:image/svg+xml;base64,${base64}`, x: 1, y: 1, w: 2, h: 2 })
pres.writeFile({ fileName: 'test.pptx' }).then(() => console.log('success')).catch(console.error)
