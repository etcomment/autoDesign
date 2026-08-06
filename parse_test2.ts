import * as fs from 'fs'
import { XMLParser } from 'fast-xml-parser'

const THEME_COLORS: Record<string, string> = {
  accent1: '#3365cc',
  accent2: '#ff4d38',
  accent3: '#52c49c',
  accent4: '#ffb900',
  accent5: '#ee6d90',
  accent6: '#4a90d9',
  dk1: '#000000',
  lt1: '#ffffff',
  dk2: '#282a5d',
  lt2: '#f0f0f0',
  bg1: '#ffffff',
  bg2: '#f0f0f0',
}

function hexFromColorVal(clrObj: any): string | undefined {
  if (!clrObj) return undefined
  if (clrObj['a:srgbClr']?.['@_val']) return `#${clrObj['a:srgbClr']['@_val']}`
  if (clrObj['a:sysClr']?.['@_lastClr']) return `#${clrObj['a:sysClr']['@_lastClr']}`
  if (clrObj['a:schemeClr']?.['@_val']) return THEME_COLORS[clrObj['a:schemeClr']['@_val']]
  return undefined
}

function extractTextFromSp(sp: any): { text: string; textColor?: string; textSize?: number } {
  const txBody = sp['p:txBody']
  if (!txBody) return { text: '' }
  const paragraphs = Array.isArray(txBody['a:p']) ? txBody['a:p'] : [txBody['a:p']].filter(Boolean)
  const textParts: string[] = []
  let textColor: string | undefined = undefined
  let textSize: number | undefined = undefined

  let lstTextSize: number | undefined = undefined
  let lstTextColor: string | undefined = undefined
  if (txBody['a:lstStyle']) {
    const lst = txBody['a:lstStyle']
    const defRPr = lst['a:defPPr']?.['a:defRPr'] || lst['a:lvl1pPr']?.['a:defRPr'] || lst['a:lvl2pPr']?.['a:defRPr']
    if (defRPr) {
      if (defRPr['@_sz']) lstTextSize = Number.parseInt(defRPr['@_sz'], 10) / 100
      if (defRPr['a:solidFill']) lstTextColor = hexFromColorVal(defRPr['a:solidFill'])
    }
  }

  for (const p of paragraphs) {
    let defTextSize: number | undefined = undefined
    let defTextColor: string | undefined = undefined

    if (p['a:pPr'] && p['a:pPr']['a:defRPr']) {
      const defRPr = p['a:pPr']['a:defRPr']
      if (defRPr['@_sz']) defTextSize = Number.parseInt(defRPr['@_sz'], 10) / 100
      if (defRPr['a:solidFill']) defTextColor = hexFromColorVal(defRPr['a:solidFill'])
    }

    const runs = Array.isArray(p['a:r']) ? p['a:r'] : [p['a:r']].filter(Boolean)
    for (const r of runs) {
      if (r['a:t']) {
        const textVal = typeof r['a:t'] === 'object' ? r['a:t']['#text'] : r['a:t']
        if (textVal) {
          textParts.push(String(textVal))
          if (r['a:rPr']) {
            if (!textSize && r['a:rPr']['@_sz']) textSize = Number.parseInt(r['a:rPr']['@_sz'], 10) / 100
            if (!textColor && r['a:rPr']['a:solidFill']) textColor = hexFromColorVal(r['a:rPr']['a:solidFill'])
          }
          if (!textSize && defTextSize) textSize = defTextSize
          if (!textColor && defTextColor) textColor = defTextColor
          if (!textSize && lstTextSize) textSize = lstTextSize
          if (!textColor && lstTextColor) textColor = lstTextColor
        }
      }
    }
  }
  return {
    text: textParts.join(' ').trim(),
    textColor,
    textSize,
  }
}

const xmlStr = fs.readFileSync('slide35.xml', 'utf-8')
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
const parsed = parser.parse(xmlStr)

function findText(obj: any) {
  if (!obj) return
  if (Array.isArray(obj)) {
    obj.forEach(findText)
  } else if (typeof obj === 'object') {
    if (obj['p:spPr'] && obj['p:txBody']) {
       const res = extractTextFromSp(obj)
       if (res.text) console.log(res)
    }
    Object.values(obj).forEach(findText)
  }
}
findText(parsed)
