import { describe, it, expect } from 'vitest'
import { generateSvg } from '../generateSvg'
import { DiagramModel } from '../../core/model/DiagramModel'

describe('generateSvg', () => {
  it('genere un SVG valide avec namespace correct', () => {
    const model = new DiagramModel()
    const svg = generateSvg(model)
    expect(svg).toContain('<svg')
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(svg).toContain('</svg>')
  })

  it('contient le viewBox base sur les formes', () => {
    const model = new DiagramModel()
    model.addShape('rectangle', { x: 50, y: 100 }, { width: 200, height: 80 })
    const svg = generateSvg(model)
    expect(svg).toContain('viewBox')
  })

  it('rend chaque type de forme', () => {
    const model = new DiagramModel()
    model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 50 })
    model.addShape('ellipse', { x: 100, y: 0 }, { width: 60, height: 60 })
    model.addShape('diamond', { x: 200, y: 0 }, { width: 80, height: 80 })

    const svg = generateSvg(model)
    expect(svg).toContain('<rect')
    expect(svg).toContain('<ellipse')
    expect(svg).toContain('<polygon')
  })

  it('respecte le style des formes', () => {
    const model = new DiagramModel()
    const shape = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 100 })
    model.updateShapeStyle(shape.id, { fill: '#ff0000', stroke: '#0000ff', strokeWidth: 5 })

    const svg = generateSvg(model)
    expect(svg).toContain('fill="#ff0000"')
    expect(svg).toContain('stroke="#0000ff"')
    expect(svg).toContain('stroke-width="5"')
  })

  it('inclut le texte des formes', () => {
    const model = new DiagramModel()
    const shape = model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 100 })
    model.updateShapeText(shape.id, { content: 'Hello' })

    const svg = generateSvg(model)
    expect(svg).toContain('Hello')
    expect(svg).toContain('<text')
  })

  it('retourne un SVG vide valide sans forme', () => {
    const model = new DiagramModel()
    const svg = generateSvg(model)
    expect(svg).toContain('<svg')
    expect(svg).toContain('</svg>')
    expect(svg).toContain('viewBox')
  })

  it('le SVG est un document XML autonome', () => {
    const model = new DiagramModel()
    model.addShape('rectangle', { x: 0, y: 0 }, { width: 100, height: 100 })
    const svg = generateSvg(model)
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg.endsWith('</svg>')).toBe(true)
  })
})
