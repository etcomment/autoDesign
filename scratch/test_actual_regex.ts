import { XMLParser } from 'fast-xml-parser'

const slideXml = `<a:pathLst><a:path w="614" h="810"><a:moveTo><a:pt x="507" y="505"/></a:moveTo><a:lnTo><a:pt x="507" y="505"/></a:lnTo><a:cubicBezTo><a:pt x="485" y="527"/><a:pt x="470" y="553"/><a:pt x="462" y="582"/></a:cubicBezTo><a:lnTo><a:pt x="318" y="582"/></a:lnTo><a:lnTo><a:pt x="318" y="495"/></a:lnTo><a:close/></a:path></a:pathLst>`

let processedXml = slideXml
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
const obj = parser.parse(processedXml)

console.log(JSON.stringify(obj, null, 2))
