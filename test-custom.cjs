const pptxgen = require('pptxgenjs')
const pres = new pptxgen()
console.log(Object.keys(pres.ShapeType).filter(k => k.toLowerCase().includes('custom') || k.toLowerCase().includes('path') || k.toLowerCase().includes('free')))
