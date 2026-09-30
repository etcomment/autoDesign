import { Router, type Request, type Response } from 'express'
import { generateDslWithAi } from '../services/aiService'

export function createAiRouter(): Router {
  const router = Router()

  router.post('/generate-dsl', async (req: Request, res: Response): Promise<void> => {
    try {
      const { prompt, model, apiKey, temperature } = req.body as {
        prompt?: string
        model?: string
        apiKey?: string
        temperature?: number
      }

      if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
        res.status(400).json({ error: 'Missing or empty prompt parameter' })
        return
      }

      const result = await generateDslWithAi({
        prompt: prompt.trim(),
        model,
        apiKey,
        temperature,
      })

      res.json({
        success: true,
        dsl: result.dsl,
        model: result.model,
        templateType: result.templateType,
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown AI generation error'
      res.status(500).json({ error: message })
    }
  })

  return router
}
