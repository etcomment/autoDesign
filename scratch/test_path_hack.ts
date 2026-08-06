import { XMLParser } from 'fast-xml-parser'

const xml = `
<a:path w="1000" h="1000">
  <a:moveTo><a:pt x="0" y="0"/></a:moveTo>
  <a:lnTo><a:pt x="1000" y="0"/></a:lnTo>
  <a:cubicBezTo>
    <a:pt x="100" y="100"/>
    <a:pt x="200" y="200"/>
    <a:pt x="300" y="300"/>
  </a:cubicBezTo>
  <a:lnTo><a:pt x="1000" y="1000"/></a:lnTo>
  <a:close/>
</a:path>
`

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
const obj = parser.parse(processedXml)

console.log(JSON.stringify(obj, null, 2))
