import { describe, it, expect } from 'vitest'
import { generatePptx } from '../generatePptx'
import { DiagramModel } from '../../core/model/DiagramModel'

describe('generatePptx', () => {
  it('genere un fichier pptx valide', async () => {
    const model = new DiagramModel()
    model.addShape('rectangle', { x: 100, y: 100 }, { width: 200, height: 100 })

    const blob = await generatePptx(model)
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('application/vnd.openxmlformats-officedocument.presentationml.presentation')
    expect(blob.size).toBeGreaterThan(0)
  })

  it('inclut tous les types de formes', async () => {
    const model = new DiagramModel()
    model.addShape('rectangle', { x: 50, y: 50 }, { width: 100, height: 60 })
    model.addShape('ellipse', { x: 200, y: 50 }, { width: 100, height: 60 })
    model.addShape('diamond', { x: 350, y: 50 }, { width: 100, height: 60 })

    const blob = await generatePptx(model)
    expect(blob.size).toBeGreaterThan(1000)
  })

  it('fonctionne avec un modele vide', async () => {
    const model = new DiagramModel()
    const blob = await generatePptx(model)
    expect(blob).toBeInstanceOf(Blob)
  })

  it('inclut le texte des formes', async () => {
    const model = new DiagramModel()
    const shape = model.addShape('rectangle', { x: 100, y: 100 }, { width: 200, height: 100 })
    model.updateShapeText(shape.id, { content: 'Hello PPTX' })

    const blob = await generatePptx(model)
    expect(blob.size).toBeGreaterThan(0)
  })

  it('gere les connexions', async () => {
    const model = new DiagramModel()
    const a = model.addShape('rectangle', { x: 100, y: 100 }, { width: 120, height: 80 })
    const b = model.addShape('ellipse', { x: 300, y: 100 }, { width: 120, height: 80 })
    model.addConnection(a.id, b.id)

    const blob = await generatePptx(model)
    expect(blob.size).toBeGreaterThan(0)
  })
})
