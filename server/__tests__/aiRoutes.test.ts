import { describe, expect, it, vi, beforeEach } from 'vitest'
import request from 'supertest'
import { createApp } from '../app'

describe('AI Routes (/api/ai)', () => {
  const app = createApp()

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('rejects empty or missing prompt with 400', async () => {
    const res = await request(app)
      .post('/api/ai/generate-dsl')
      .send({})

    expect(res.status).toBe(400)
    expect(res.body.error).toContain('Missing or empty prompt')
  })

  it('generates DSL and returns templateType on success', async () => {
    const mockContent = '```dsl\n@budget "Budget Q4"\n  item "R&D" "£50,000" #1a2249\n```'

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: mockContent } }],
      }),
    } as unknown as Response)

    const res = await request(app)
      .post('/api/ai/generate-dsl')
      .send({
        prompt: 'Génère un budget avec R&D 50k',
        apiKey: 'test-key',
      })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.dsl).toContain('@budget "Budget Q4"')
    expect(res.body.templateType).toBe('budget')
  })
})
