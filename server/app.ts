import express, { type Application, type Request, type Response, type NextFunction } from 'express'
import { createHealthRouter } from './routes/healthRoutes'
import { createTemplatesRouter } from './routes/templatesRoutes'
import { createRenderRouter } from './routes/renderRoutes'
import { createAiRouter } from './routes/aiRoutes'

export function createApp(): Application {
  const app = express()

  app.use(express.json({ limit: '10mb' }))
  app.use(express.text({ type: ['text/plain', 'text/*', 'application/x-dsl'], limit: '10mb' }))

  app.use('/health', createHealthRouter())
  app.use('/api/templates', createTemplatesRouter())
  app.use('/api/render', createRenderRouter())
  app.use('/api/ai', createAiRouter())

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const errorMessage = err instanceof Error ? err.message : 'Unknown internal error'
    res.status(400).json({ error: errorMessage })
  })

  return app
}
