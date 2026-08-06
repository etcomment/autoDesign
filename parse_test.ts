import * as fs from 'fs'
import { XMLParser } from 'fast-xml-parser'

const xmlStr = fs.readFileSync('test_slide.xml', 'utf-8')
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
const parsed = parser.parse(xmlStr)
fs.writeFileSync('parsed.json', JSON.stringify(parsed, null, 2))
