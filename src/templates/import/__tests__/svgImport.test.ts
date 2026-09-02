import { describe, expect, it } from 'vitest'
import { IMPORTED_TEMPLATE_WIDTH, parseImportedSvg } from '../svgImport'

const SLIDE_W = 1280
const SLIDE_H = 720

function badgeWithText(y: number, percent: string, label: string): string {
  return `<g data-pp="badge"><rect x="280" y="${y - 24}" width="120" height="48" fill="#2c2b64"/><text x="300" y="${y + 6}" font-size="18">${percent}</text></g>
  <g data-pp="text"><rect x="260" y="${y}" width="600" height="48" fill="#ffffff"/><text x="280" y="${y + 30}" font-size="16">${label}</text></g>`
}

const SLIDE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${SLIDE_W}" height="${SLIDE_H}" viewBox="0 0 ${SLIDE_W} ${SLIDE_H}">
  <defs><linearGradient id="grad1"><stop offset="0" stop-color="#2c2b64"/></linearGradient></defs>
  <rect x="0" y="0" width="${SLIDE_W}" height="${SLIDE_H}" fill="#ffffff"/>
  <g data-pp="bgimage"><image x="0" y="0" width="${SLIDE_W}" height="${SLIDE_H}" href="data:image/png;base64,AAAA"/></g>
  <text x="60" y="60" font-size="28">Business 1</text>
  ${badgeWithText(180, '25%', 'MIGSO-PCUBED content and words to be added here as required one')}
  ${badgeWithText(280, '48%', 'MIGSO-PCUBED content and words to be added here as required two')}
  ${badgeWithText(380, '58%', 'MIGSO-PCUBED content and words to be added here as required three')}
  <g data-pp="visual"><path d="M 900 200 L 1100 300 L 900 400 Z" fill="#3366cc"/><circle cx="950" cy="300" r="20" fill="#ff5338"/></g>
  <text x="60" y="690" font-size="14">Pied de page exemple</text>
</svg>`

describe('parseImportedSvg', () => {
  it('met à l\'échelle la slide vers la largeur standard des templates', () => {
    const slide = parseImportedSvg(SLIDE_SVG)
    expect(slide.width).toBe(IMPORTED_TEMPLATE_WIDTH)
    expect(slide.height).toBeCloseTo(SLIDE_H * (IMPORTED_TEMPLATE_WIDTH / SLIDE_W), 1)
  })

  it('retire le fond : rect plein écran et image full-bleed', () => {
    const slide = parseImportedSvg(SLIDE_SVG)
    const backgrounds = slide.removedChrome.filter(c => c.kind === 'background')
    expect(backgrounds).toHaveLength(2)
    expect(slide.items.every(item => !item.markup.includes('<image'))).toBe(true)
  })

  it('retire le titre en bande haute et le footer en bande basse', () => {
    const slide = parseImportedSvg(SLIDE_SVG)
    const kinds = slide.removedChrome.map(c => c.kind)
    expect(kinds).toContain('title')
    expect(kinds).toContain('footer')
    expect(slide.removedChrome.find(c => c.kind === 'title')?.text).toBe('Business 1')
    expect(slide.removedChrome.find(c => c.kind === 'footer')?.text).toBe('Pied de page exemple')
    expect(slide.items.every(item => !item.markup.includes('Business 1'))).toBe(true)
  })

  it('clusterise chaque paire badge+texte en un item composite', () => {
    const slide = parseImportedSvg(SLIDE_SVG)
    const blockItems = slide.items.filter(item => item.text.includes('%'))
    expect(blockItems).toHaveLength(3)
    for (const item of blockItems) {
      expect(item.markup).toContain('data-pp="badge"')
      expect(item.markup).toContain('data-pp="text"')
    }
    expect(blockItems[0]!.text).toBe('25%\nMIGSO-PCUBED content and words to be added here as required one')
  })

  it('conserve le visuel complexe comme item autonome', () => {
    const slide = parseImportedSvg(SLIDE_SVG)
    const visual = slide.items.find(item => item.markup.includes('data-pp="visual"'))
    expect(visual).toBeDefined()
    expect(visual!.markup).toContain('<path')
    expect(visual!.markup).toContain('<circle')
  })

  it('génère des ooxmlId stables pour les fragments sans data-ooxml-id', () => {
    const slide = parseImportedSvg(SLIDE_SVG)
    for (const item of slide.items) {
      expect(item.ooxmlId).toMatch(/^(shape-\d+|.+)$/)
      expect(item.ooxmlId.length).toBeGreaterThan(0)
    }
  })

  it('sérialise les defs hors items et rend le statique vide (chrome retiré)', () => {
    const slide = parseImportedSvg(SLIDE_SVG)
    expect(slide.defsMarkup).toContain('linearGradient')
    expect(slide.staticMarkup).toBe('')
  })

  it('utilise data-ooxml-id comme identité quand présent', () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500">
      <g data-ooxml-id="custom-42"><rect x="10" y="300" width="200" height="100" fill="#3366cc"/><text x="20" y="360" font-size="16">Bloc</text></g>
    </svg>`
    const slide = parseImportedSvg(svg)
    expect(slide.items).toHaveLength(1)
    expect(slide.items[0]!.ooxmlId).toBe('custom-42')
  })

  it('retire les chaînes chrome connues quelle que soit leur position', () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500">
      <text x="400" y="250" font-size="16">EXAMPLE TEMPLATES</text>
      <g><rect x="10" y="300" width="200" height="100" fill="#3366cc"/></g>
    </svg>`
    const slide = parseImportedSvg(svg)
    expect(slide.removedChrome.filter(c => c.kind === 'known')).toHaveLength(1)
    expect(slide.items.every(item => !item.text.includes('EXAMPLE TEMPLATES'))).toBe(true)
  })

  it('rejette un SVG invalide', () => {
    expect(() => parseImportedSvg('pas un svg')).toThrow()
  })
})
