import { createApp } from './app'

const DEFAULT_PORT = 3001
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT

const app = createApp()

app.listen(port, () => {
  console.log(`\n🚀 autoDesign API server running at http://localhost:${port}`)
  console.log(`   - Health check:     GET  http://localhost:${port}/health`)
  console.log(`   - Template catalog: GET  http://localhost:${port}/api/templates`)
  console.log(`   - Render endpoint:  POST http://localhost:${port}/api/render`)
  console.log(`                       POST http://localhost:${port}/api/render/:format`)
  console.log(`                       (formats: svg, png, pptx, html)\n`)
})
