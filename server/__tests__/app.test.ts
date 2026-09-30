import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../app'

describe('API Server Endpoints', () => {
  const app = createApp()
  const sampleDsl = `@roadmap "Release Timeline"
  milestone "Kickoff" "Day 1"
`

  describe('GET /health', () => {
    it('returns 200 and ok status', async () => {
      const response = await request(app).get('/health')
      expect(response.status).toBe(200)
      expect(response.body.status).toBe('ok')
    })
  })

  describe('GET /api/templates', () => {
    it('returns a list of available templates', async () => {
      const response = await request(app).get('/api/templates')
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.templates)).toBe(true)
      expect(response.body.count).toBeGreaterThan(50)
      expect(response.body.templates[0]).toHaveProperty('type')
      expect(response.body.templates[0]).toHaveProperty('category')
    })

    it('returns template details by type', async () => {
      const response = await request(app).get('/api/templates/roadmap')
      expect(response.status).toBe(200)
      expect(response.body.type).toBe('roadmap')
      expect(response.body.exampleDsl).toContain('@roadmap')
    })

    it('returns 404 for unknown template type', async () => {
      const response = await request(app).get('/api/templates/nonExistentTemplate')
      expect(response.status).toBe(404)
    })
  })

  describe('POST /api/render (JSON)', () => {
    it('renders SVG by default', async () => {
      const response = await request(app)
        .post('/api/render')
        .send({ dsl: sampleDsl })
        .set('Content-Type', 'application/json')

      expect(response.status).toBe(200)
      expect(response.header['content-type']).toContain('image/svg+xml')
      const svgText = response.text || response.body.toString('utf-8')
      expect(svgText).toContain('<svg')
    })

    it('renders HTML when format is html', async () => {
      const response = await request(app)
        .post('/api/render')
        .send({ dsl: sampleDsl, format: 'html' })
        .set('Content-Type', 'application/json')

      expect(response.status).toBe(200)
      expect(response.header['content-type']).toContain('text/html')
      expect(response.text).toContain('<!DOCTYPE html>')
    })

    it('renders PNG when format is png', async () => {
      const response = await request(app)
        .post('/api/render')
        .send({ dsl: sampleDsl, format: 'png' })
        .set('Content-Type', 'application/json')
        .responseType('blob')

      expect(response.status).toBe(200)
      expect(response.header['content-type']).toContain('image/png')
      expect(Buffer.isBuffer(response.body)).toBe(true)
      expect(response.body[0]).toBe(0x89)
    })

    it('renders PPTX when format is pptx', async () => {
      const response = await request(app)
        .post('/api/render')
        .send({ dsl: sampleDsl, format: 'pptx' })
        .set('Content-Type', 'application/json')
        .responseType('blob')

      expect(response.status).toBe(200)
      expect(response.header['content-type']).toContain('application/vnd.openxmlformats-officedocument.presentationml.presentation')
      expect(Buffer.isBuffer(response.body)).toBe(true)
      expect(response.body[0]).toBe(0x50)
    })
  })

  describe('POST /api/render/:format route shortcut', () => {
    it('renders PNG via /api/render/png', async () => {
      const response = await request(app)
        .post('/api/render/png')
        .send({ dsl: sampleDsl })
        .set('Content-Type', 'application/json')
        .responseType('blob')

      expect(response.status).toBe(200)
      expect(response.header['content-type']).toContain('image/png')
    })
  })

  describe('POST /api/render (Raw plain text body for curl)', () => {
    it('accepts raw plain text and query params', async () => {
      const response = await request(app)
        .post('/api/render?format=svg')
        .set('Content-Type', 'text/plain')
        .send(sampleDsl)

      expect(response.status).toBe(200)
      expect(response.header['content-type']).toContain('image/svg+xml')
      const svgText = response.text || response.body.toString('utf-8')
      expect(svgText).toContain('<svg')
    })
  })

  describe('Error handling', () => {
    it('returns 400 when DSL is missing', async () => {
      const response = await request(app)
        .post('/api/render')
        .send({})
        .set('Content-Type', 'application/json')

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })

    it('returns 400 when format is invalid', async () => {
      const response = await request(app)
        .post('/api/render')
        .send({ dsl: sampleDsl, format: 'unsupported' })
        .set('Content-Type', 'application/json')

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })
})
