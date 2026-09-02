// Conversion d'un SVG produit par pptx-svg en structure de template importé.
// Pipeline : fragments top-level → bbox géométrique → suppression du chrome
// (fond, titre, footer, textes connus) → clusterisation en rangées → items.

export interface ImportedItem {
  ooxmlId: string
  markup: string
  text: string
  fill?: string
}

export type RemovedChromeKind = 'background' | 'title' | 'footer' | 'known'

export interface RemovedChromeEntry {
  kind: RemovedChromeKind
  ooxmlId: string
  text: string
}

export interface ImportedSlideSvg {
  width: number
  height: number
  defsMarkup: string
  staticMarkup: string
  items: ImportedItem[]
  removedChrome: RemovedChromeEntry[]
}

export const IMPORTED_TEMPLATE_WIDTH = 1000

const CHROME_BACKGROUND_AREA_RATIO = 0.85
const CHROME_TITLE_MAX_Y_RATIO = 0.2
const CHROME_TITLE_MIN_WIDTH_RATIO = 0.6
const CHROME_FOOTER_MIN_Y_RATIO = 0.88
const CARD_VERTICAL_OVERLAP_RATIO = 0.5
const CARD_HORIZONTAL_OVERLAP_RATIO = 0.3
const CARD_VERTICAL_GAP_RATIO = 0.02
const STANDALONE_AREA_RATIO = 0.12
const STANDALONE_SHAPE_COUNT = 8
const KNOWN_CHROME_TEXTS = ['EXAMPLE TEMPLATES', 'MIGSO-PCUBED']

const SHAPE_TAGS = new Set(['rect', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'path', 'image'])
const SHAPE_TAG_SELECTOR = Array.from(SHAPE_TAGS).join(',')

interface Box {
  x: number
  y: number
  width: number
  height: number
}

interface Matrix {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
}

const IDENTITY: Matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }

function compose(parent: Matrix, local: Matrix): Matrix {
  return {
    a: parent.a * local.a + parent.c * local.b,
    b: parent.b * local.a + parent.d * local.b,
    c: parent.a * local.c + parent.c * local.d,
    d: parent.b * local.c + parent.d * local.d,
    e: parent.a * local.e + parent.c * local.f + parent.e,
    f: parent.b * local.e + parent.d * local.f + parent.f,
  }
}

function parseTransformAttribute(value: string | null): Matrix {
  if (!value) return IDENTITY
  let result = IDENTITY
  const re = /(translate|scale|rotate|matrix|skewX|skewY)\s*\(([^)]*)\)/g
  let match: RegExpExecArray | null
  while ((match = re.exec(value)) !== null) {
    const args = match[2]!.split(/[\s,]+/).map(Number).filter(n => Number.isFinite(n))
    let local: Matrix = IDENTITY
    switch (match[1]) {
      case 'translate':
        local = { ...IDENTITY, e: args[0] ?? 0, f: args[1] ?? 0 }
        break
      case 'scale':
        local = { ...IDENTITY, a: args[0] ?? 1, d: args[1] ?? args[0] ?? 1 }
        break
      case 'matrix':
        if (args.length >= 6) local = { a: args[0]!, b: args[1]!, c: args[2]!, d: args[3]!, e: args[4]!, f: args[5]! }
        break
      case 'rotate': {
        const rad = ((args[0] ?? 0) * Math.PI) / 180
        const cos = Math.cos(rad)
        const sin = Math.sin(rad)
        const rotation: Matrix = { a: cos, b: sin, c: -sin, d: cos, e: 0, f: 0 }
        if (args.length >= 3) {
          const toCenter: Matrix = { ...IDENTITY, e: args[1]!, f: args[2]! }
          const fromCenter: Matrix = { ...IDENTITY, e: -args[1]!, f: -args[2]! }
          local = compose(compose(toCenter, rotation), fromCenter)
        } else {
          local = rotation
        }
        break
      }
      case 'skewX':
        local = { ...IDENTITY, c: Math.tan(((args[0] ?? 0) * Math.PI) / 180) }
        break
      case 'skewY':
        local = { ...IDENTITY, b: Math.tan(((args[0] ?? 0) * Math.PI) / 180) }
        break
    }
    result = compose(result, local)
  }
  return result
}

function applyMatrixToBox(matrix: Matrix, box: Box): Box {
  const corners: Array<[number, number]> = [
    [box.x, box.y],
    [box.x + box.width, box.y],
    [box.x, box.y + box.height],
    [box.x + box.width, box.y + box.height],
  ]
  const xs = corners.map(([x, y]) => matrix.a * x + matrix.c * y + matrix.e)
  const ys = corners.map(([x, y]) => matrix.b * x + matrix.d * y + matrix.f)
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  return { x: minX, y: minY, width: Math.max(...xs) - minX, height: Math.max(...ys) - minY }
}

function unionBox(a: Box | null, b: Box | null): Box | null {
  if (!a) return b
  if (!b) return a
  const x = Math.min(a.x, b.x)
  const y = Math.min(a.y, b.y)
  return {
    x,
    y,
    width: Math.max(a.x + a.width, b.x + b.width) - x,
    height: Math.max(a.y + a.height, b.y + b.height) - y,
  }
}

function boxFromPoints(points: Array<{ x: number; y: number }>): Box | null {
  if (points.length === 0) return null
  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  return { x: minX, y: minY, width: Math.max(...xs) - minX, height: Math.max(...ys) - minY }
}

function pathPoints(d: string): Array<{ x: number; y: number }> {
  const tokens = d.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g) ?? []
  const points: Array<{ x: number; y: number }> = []
  let cx = 0
  let cy = 0
  let i = 0
  while (i < tokens.length) {
    const token = tokens[i]!
    if (!/^[a-zA-Z]$/.test(token)) {
      i++
      continue
    }
    const upper = token.toUpperCase()
    const relative = token !== upper
    i++
    if (upper === 'Z') continue
    const paramCount = upper === 'A' ? 7 : upper === 'H' || upper === 'V' ? 1 : 2
    for (;;) {
      if (i >= tokens.length || /^[a-zA-Z]$/.test(tokens[i]!)) break
      const numbers: number[] = []
      while (numbers.length < paramCount && i < tokens.length && !/^[a-zA-Z]$/.test(tokens[i]!)) {
        numbers.push(Number(tokens[i]!))
        i++
      }
      if (numbers.length < paramCount) break
      if (upper === 'H') {
        cx = relative ? cx + numbers[0]! : numbers[0]!
        points.push({ x: cx, y: cy })
      } else if (upper === 'V') {
        cy = relative ? cy + numbers[0]! : numbers[0]!
        points.push({ x: cx, y: cy })
      } else if (upper === 'A') {
        cx = relative ? cx + numbers[5]! : numbers[5]!
        cy = relative ? cy + numbers[6]! : numbers[6]!
        points.push({ x: cx, y: cy })
      } else {
        cx = relative ? cx + numbers[0]! : numbers[0]!
        cy = relative ? cy + numbers[1]! : numbers[1]!
        points.push({ x: cx, y: cy })
      }
    }
  }
  return points
}

function localBBox(el: Element): Box | null {
  const num = (attr: string, fallback = 0): number => {
    const value = Number.parseFloat(el.getAttribute(attr) ?? '')
    return Number.isFinite(value) ? value : fallback
  }
  switch (el.tagName) {
    case 'rect': {
      const width = num('width')
      const height = num('height')
      if (width <= 0 || height <= 0) return null
      return { x: num('x'), y: num('y'), width, height }
    }
    case 'circle': {
      const r = num('r')
      if (r <= 0) return null
      return { x: num('cx') - r, y: num('cy') - r, width: 2 * r, height: 2 * r }
    }
    case 'ellipse': {
      const rx = num('rx')
      const ry = num('ry')
      if (rx <= 0 || ry <= 0) return null
      return { x: num('cx') - rx, y: num('cy') - ry, width: 2 * rx, height: 2 * ry }
    }
    case 'line':
      return boxFromPoints([
        { x: num('x1'), y: num('y1') },
        { x: num('x2'), y: num('y2') },
      ])
    case 'polygon':
    case 'polyline': {
      const values = (el.getAttribute('points') ?? '').split(/[\s,]+/).map(Number).filter(n => Number.isFinite(n))
      const points: Array<{ x: number; y: number }> = []
      for (let i = 0; i + 1 < values.length; i += 2) {
        points.push({ x: values[i]!, y: values[i + 1]! })
      }
      return boxFromPoints(points)
    }
    case 'path':
      return boxFromPoints(pathPoints(el.getAttribute('d') ?? ''))
    case 'image': {
      const width = num('width')
      const height = num('height')
      if (width <= 0 || height <= 0) return null
      return { x: num('x'), y: num('y'), width, height }
    }
    case 'text':
      return null
    default:
      return null
  }
}

// Boîte approximative d'un fragment purement textuel (sans forme) : ancre sur
// x/y (du <text> ou du premier <tspan>) + estimation largeur/hauteur.
function textAnchorBox(el: Element): Box | null {
  const num = (node: Element, attr: string): number => {
    const value = Number.parseFloat(node.getAttribute(attr) ?? '')
    return Number.isFinite(value) ? value : Number.NaN
  }
  let x = num(el, 'x')
  let y = num(el, 'y')
  let fontSize = num(el, 'font-size')
  if (!Number.isFinite(y) || !Number.isFinite(x)) {
    const tspan = el.querySelector('tspan')
    if (tspan) {
      if (!Number.isFinite(x)) x = num(tspan, 'x')
      if (!Number.isFinite(y)) y = num(tspan, 'y')
      if (!Number.isFinite(fontSize)) fontSize = num(tspan, 'font-size')
    }
  }
  if (!Number.isFinite(fontSize) || fontSize <= 0) fontSize = 14
  const content = (el.textContent ?? '').trim()
  if (!Number.isFinite(x) || !Number.isFinite(y) || !content) return null
  return { x, y: y - fontSize * 0.8, width: content.length * fontSize * 0.55, height: fontSize * 1.2 }
}

function collectBox(el: Element, parentMatrix: Matrix): Box | null {
  const matrix = compose(parentMatrix, parseTransformAttribute(el.getAttribute('transform')))
  let box: Box | null = null
  if (SHAPE_TAGS.has(el.tagName)) {
    const local = localBBox(el)
    if (local) box = applyMatrixToBox(matrix, local)
  }
  for (const child of Array.from(el.children)) {
    box = unionBox(box, collectBox(child, matrix))
  }
  return box
}

function serialize(el: Element): string {
  return new XMLSerializer().serializeToString(el)
}

function readSize(root: Element): { width: number; height: number } {
  let width = Number.parseFloat(root.getAttribute('width') ?? '')
  let height = Number.parseFloat(root.getAttribute('height') ?? '')
  const viewBox = root.getAttribute('viewBox')
  if (viewBox) {
    const parts = viewBox.split(/[\s,]+/).map(Number)
    if (parts.length === 4 && parts.every(n => Number.isFinite(n))) {
      if (!Number.isFinite(width) || width <= 0) width = parts[2]!
      if (!Number.isFinite(height) || height <= 0) height = parts[3]!
    }
  }
  if (!Number.isFinite(width) || width <= 0) width = 1280
  if (!Number.isFinite(height) || height <= 0) height = 720
  return { width, height }
}

function extractDominantFill(scope: Element): string | undefined {
  const counts = new Map<string, number>()
  for (const el of Array.from(scope.querySelectorAll('[fill]'))) {
    const fill = el.getAttribute('fill')
    if (!fill || fill === 'none' || fill.startsWith('url(')) continue
    counts.set(fill, (counts.get(fill) ?? 0) + 1)
  }
  let best: string | undefined
  let bestCount = 0
  for (const [fill, count] of counts) {
    if (count > bestCount) {
      best = fill
      bestCount = count
    }
  }
  return best
}

function extractTextLines(scope: Element): string[] {
  const textElements = scope.tagName === 'text' ? [scope] : Array.from(scope.querySelectorAll('text'))
  const lines = textElements.map(el => (el.textContent ?? '').trim()).filter(t => t.length > 0)
  const seen = new Set<string>()
  const unique: string[] = []
  for (const line of lines) {
    if (!seen.has(line)) {
      seen.add(line)
      unique.push(line)
    }
  }
  return unique
}

function combineTransforms(...transforms: Array<string | null>): string {
  return transforms.filter(t => t && t.trim().length > 0).join(' ').trim()
}

// pptx-svg émet parfois des attributs dupliqués (font-size en double sur les
// runs en exposant) => XML invalide rejeté par DOMParser. On déduplique en
// gardant la dernière occurrence.
function deduplicateTagAttributes(tag: string): string {
  const open = tag.indexOf(' ')
  if (open === -1) return tag
  const gt = tag.lastIndexOf('>')
  const attrs = tag.slice(open, gt)
  const attrRe = /([a-zA-Z-]+)\s*=\s*("[^"]*"|'[^']*')/g
  const matches: Array<{ name: string; start: number; end: number }> = []
  let match: RegExpExecArray | null
  while ((match = attrRe.exec(attrs)) !== null) {
    matches.push({ name: match[1]!.toLowerCase(), start: match.index, end: match.index + match[0].length })
  }
  const lastIndex = new Map<string, number>()
  for (const entry of matches) lastIndex.set(entry.name, entry.start)
  const remove = new Set<number>()
  for (const entry of matches) {
    if (lastIndex.get(entry.name) !== entry.start) remove.add(entry.start)
  }
  if (remove.size === 0) return tag
  let cleaned = ''
  let cursor = 0
  for (const entry of matches) {
    if (!remove.has(entry.start)) continue
    cleaned += attrs.slice(cursor, entry.start)
    cursor = entry.end
  }
  cleaned += attrs.slice(cursor)
  return tag.slice(0, open) + cleaned + tag.slice(gt)
}

function sanitizeInvalidSvg(svg: string): string {
  let out = ''
  let i = 0
  while (i < svg.length) {
    if (svg[i] !== '<') {
      out += svg[i]!
      i++
      continue
    }
    let j = i + 1
    let quote: string | null = null
    while (j < svg.length) {
      const c = svg[j]!
      if (quote) {
        if (c === quote) quote = null
      } else if (c === '"' || c === "'") {
        quote = c
      } else if (c === '>') {
        break
      }
      j++
    }
    out += deduplicateTagAttributes(svg.slice(i, j + 1))
    i = j + 1
  }
  return out
}

function tryParseSvg(svgString: string): Document | null {
  const doc = new DOMParser().parseFromString(svgString, 'image/svg+xml')
  const root = doc.documentElement
  if (!root) return null
  if (root.getElementsByTagName('parsererror').length > 0) return null
  if (root.localName?.toLowerCase() !== 'svg') return null
  return doc
}

interface Fragment {
  ooxmlId?: string
  markup: string
  lines: string[]
  text: string
  fill?: string
  box: Box
  shapeCount: number
}

function horizontalOverlapRatio(a: Box, b: Box): number {
  const overlap = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)
  if (overlap <= 0) return 0
  const smaller = Math.min(a.width, b.width)
  return smaller > 0 ? overlap / smaller : 0
}

function verticalOverlapRatio(a: Box, b: Box): number {
  const overlap = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y)
  if (overlap <= 0) return 0
  const smaller = Math.min(a.height, b.height)
  return smaller > 0 ? overlap / smaller : 0
}

function verticalGap(a: Box, b: Box): number {
  return Math.max(a.y, b.y) - Math.min(a.y + a.height, b.y + b.height)
}

// Deux fragments appartiennent à la même carte s'ils se chevauchent
// horizontalement en étant empilés verticalement (badge posé sur le coin
// d'une carte), ou s'ils se chevauchent verticalement en étant alignés
// horizontalement (bloc + élément latéral qui se recouvrent).
function belongsToSameCard(a: Box, b: Box, slideHeight: number): boolean {
  const stacked = horizontalOverlapRatio(a, b) >= CARD_HORIZONTAL_OVERLAP_RATIO &&
    verticalGap(a, b) <= CARD_VERTICAL_GAP_RATIO * slideHeight
  const sameVerticalBand = verticalOverlapRatio(a, b) >= CARD_VERTICAL_OVERLAP_RATIO &&
    horizontalOverlapRatio(a, b) >= CARD_HORIZONTAL_OVERLAP_RATIO
  return stacked || sameVerticalBand
}

function clusterIntoItems(fragments: Fragment[], slideHeight: number): ImportedItem[] {
  const slideArea = slideHeight * IMPORTED_TEMPLATE_WIDTH
  const standalone = new Set<number>()
  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i]!
    const areaRatio = slideArea > 0 ? (fragment.box.width * fragment.box.height) / slideArea : 0
    const shapeCount = fragment.shapeCount ?? 0
    if (areaRatio >= STANDALONE_AREA_RATIO || shapeCount >= STANDALONE_SHAPE_COUNT) {
      standalone.add(i)
    }
  }

  const parent = new Map<number, number>()
  for (let i = 0; i < fragments.length; i++) parent.set(i, i)
  const find = (x: number): number => {
    let root = x
    while (parent.get(root) !== root) root = parent.get(root)!
    while (parent.get(x) !== root) {
      const next = parent.get(x)!
      parent.set(x, root)
      x = next
    }
    return root
  }
  const union = (a: number, b: number): void => {
    const rootA = find(a)
    const rootB = find(b)
    if (rootA !== rootB) parent.set(rootB, rootA)
  }
  const mergeable = (i: number) => !standalone.has(i)
  for (let i = 0; i < fragments.length; i++) {
    if (!mergeable(i)) continue
    for (let j = i + 1; j < fragments.length; j++) {
      if (!mergeable(j)) continue
      if (belongsToSameCard(fragments[i]!.box, fragments[j]!.box, slideHeight)) {
        union(i, j)
      }
    }
  }

  const clusters = new Map<number, Fragment[]>()
  for (let i = 0; i < fragments.length; i++) {
    const root = find(i)
    const cluster = clusters.get(root) ?? []
    cluster.push(fragments[i]!)
    clusters.set(root, cluster)
  }

  const ordered = [...clusters.values()].sort((a, b) => {
    const topA = Math.min(...a.map(f => f.box.y))
    const topB = Math.min(...b.map(f => f.box.y))
    if (Math.abs(topA - topB) > 1) return topA - topB
    return Math.min(...a.map(f => f.box.x)) - Math.min(...b.map(f => f.box.x))
  })

  return ordered.map((group, index) => {
    const first = group[0]!
    return {
      ooxmlId: first.ooxmlId ?? `shape-${index + 1}`,
      markup: group.map(fragment => fragment.markup).join(''),
      text: group.map(fragment => fragment.text).filter(t => t.length > 0).join('\n'),
      fill: group.map(fragment => fragment.fill).find(f => f !== undefined),
    }
  })
}

export function parseImportedSvg(svgString: string): ImportedSlideSvg {
  let doc = tryParseSvg(svgString)
  if (!doc) {
    doc = tryParseSvg(sanitizeInvalidSvg(svgString))
  }
  if (!doc) {
    throw new Error('SVG invalide')
  }
  const root = doc.documentElement

  const { width, height } = readSize(root)
  const scale = IMPORTED_TEMPLATE_WIDTH / width
  const scaledHeight = Math.round(height * scale * 100) / 100
  const slideArea = IMPORTED_TEMPLATE_WIDTH * scaledHeight

  const defs = root.querySelector('defs')
  const defsMarkup = defs ? serialize(defs) : ''

  const fragments: Fragment[] = []
  for (const child of Array.from(root.children)) {
    if (child.tagName === 'defs') continue
    const own = child.getAttribute('transform')
    child.setAttribute('transform', combineTransforms(`scale(${scale})`, own))
    const shapeCount = child.querySelectorAll(SHAPE_TAG_SELECTOR).length
    let box = collectBox(child, IDENTITY)
    if (!box && shapeCount === 0) {
      const anchor = textAnchorBox(child.querySelector('text') ?? (child.tagName === 'text' ? child : null) ?? child)
      box = anchor ? applyMatrixToBox(parseTransformAttribute(child.getAttribute('transform')), anchor) : { x: 0, y: 0, width: 0, height: 0 }
    }
    if (!box) box = { x: 0, y: 0, width: 0, height: 0 }
    const lines = extractTextLines(child)
    fragments.push({
      ooxmlId: child.getAttribute('data-ooxml-id') ?? undefined,
      markup: serialize(child),
      lines,
      text: lines.join('\n'),
      fill: extractDominantFill(child),
      box,
      shapeCount,
    })
  }

  const removedChrome: RemovedChromeEntry[] = []
  const contentFragments: Fragment[] = []

  for (const fragment of fragments) {
    const hasText = fragment.lines.length > 0
    const isBareText = fragment.shapeCount === 0
    const areaRatio = slideArea > 0 ? (fragment.box.width * fragment.box.height) / slideArea : 0
    const widthRatio = width > 0 ? fragment.box.width / width : 0
    let kind: RemovedChromeKind | null = null
    if (fragment.lines.some(line => KNOWN_CHROME_TEXTS.includes(line.toUpperCase()))) {
      kind = 'known'
    } else if (areaRatio >= CHROME_BACKGROUND_AREA_RATIO) {
      kind = 'background'
    } else if (
      hasText &&
      fragment.box.y / scaledHeight <= CHROME_TITLE_MAX_Y_RATIO &&
      (isBareText || widthRatio >= CHROME_TITLE_MIN_WIDTH_RATIO)
    ) {
      kind = 'title'
    } else if (fragment.box.y / scaledHeight >= CHROME_FOOTER_MIN_Y_RATIO) {
      kind = 'footer'
    }
    if (kind) {
      removedChrome.push({ kind, ooxmlId: fragment.ooxmlId ?? '', text: fragment.text })
      continue
    }
    contentFragments.push(fragment)
  }

  return {
    width: IMPORTED_TEMPLATE_WIDTH,
    height: scaledHeight,
    defsMarkup,
    staticMarkup: '',
    items: clusterIntoItems(contentFragments, scaledHeight),
    removedChrome,
  }
}
