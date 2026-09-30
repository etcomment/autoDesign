import { AUTO_DESIGN_SYSTEM_PROMPT } from '../../src/templates/dsl/systemPrompt'
import { parseTemplateDsl } from '../../src/templates/dsl/parseTemplate'

export interface GenerateDslOptions {
  prompt: string
  model?: string
  apiKey?: string
  temperature?: number
}

export interface GenerateDslResult {
  dsl: string
  model: string
  templateType?: string
}

function cleanMarkdownFences(raw: string): string {
  const trimmed = raw.trim()
  const codeBlockMatch = /^```(?:dsl|template|text)?\s*([\s\S]*?)\s*```$/i.exec(trimmed)
  if (codeBlockMatch && codeBlockMatch[1]) {
    return codeBlockMatch[1].trim()
  }
  return trimmed
}

export async function generateDslWithAi(options: GenerateDslOptions): Promise<GenerateDslResult> {
  const apiKey = options.apiKey || process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('Missing OpenRouter API key. Configure OPENROUTER_API_KEY in .env or pass apiKey in request.')
  }

  const model = options.model || process.env.OPENROUTER_DEFAULT_MODEL || 'stealth/space-bunny-alpha'
  const temperature = options.temperature ?? 0.2

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://github.com/etcomment/autoDesign',
      'X-Title': 'autoDesign AI Assistant',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: AUTO_DESIGN_SYSTEM_PROMPT },
        { role: 'user', content: options.prompt },
      ],
      temperature,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenRouter API error (${response.status}): ${errorText}`)
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const content = data.choices?.[0]?.message?.content
  if (!content) {
    throw new Error('Empty response received from AI model')
  }

  const dsl = cleanMarkdownFences(content)
  const parsed = parseTemplateDsl(dsl)

  return {
    dsl,
    model,
    templateType: parsed?.type,
  }
}
