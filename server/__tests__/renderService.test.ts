import { describe, expect, it } from 'vitest'
import { renderTemplateFromDsl } from '../services/renderService'

describe('renderService', () => {
  const sampleDsl = `@roadmap "API Roadmap"
  milestone "MVP" "v1"
`

  it('renders SVG format by default with sanitized title filename', async () => {
    const result = await renderTemplateFromDsl(sampleDsl)
    expect(result.contentType).toBe('image/svg+xml; charset=utf-8')
    expect(result.filename).toBe('api-roadmap.svg')
    expect(result.content.toString('utf-8')).toContain('<svg')
  })

  it('renders HTML format', async () => {
    const result = await renderTemplateFromDsl(sampleDsl, { format: 'html' })
    expect(result.contentType).toBe('text/html; charset=utf-8')
    expect(result.filename).toBe('api-roadmap.html')
    expect(result.content.toString('utf-8')).toContain('<!DOCTYPE html>')
  })

  it('renders PNG format', async () => {
    const result = await renderTemplateFromDsl(sampleDsl, { format: 'png' })
    expect(result.contentType).toBe('image/png')
    expect(result.filename).toBe('api-roadmap.png')
    expect(result.content[0]).toBe(0x89)
  })

  it('renders PPTX format', async () => {
    const result = await renderTemplateFromDsl(sampleDsl, { format: 'pptx' })
    expect(result.contentType).toBe('application/vnd.openxmlformats-officedocument.presentationml.presentation')
    expect(result.filename).toBe('api-roadmap.pptx')
    expect(result.content[0]).toBe(0x50)
  })

  it('falls back to diagram as default filename when title is empty', async () => {
    const result = await renderTemplateFromDsl('@roadmap')
    expect(result.filename).toBe('diagram.svg')
  })

  it('throws for unknown format', async () => {
    // @ts-expect-error invalid format test
    await expect(renderTemplateFromDsl(sampleDsl, { format: 'invalid' })).rejects.toThrow()
  })
})
