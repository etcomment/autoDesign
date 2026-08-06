import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templatesDir = path.resolve(__dirname, '../src/templates/components')

const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx'))

let updatedCount = 0

for (const file of files) {
  const filePath = path.join(templatesDir, file)
  let content = fs.readFileSync(filePath, 'utf-8')
  let original = content

  // 1. Destructure getTransform from useTemplateDragResize if missing
  content = content.replace(
    /const\s+\{\s*startDrag\s*,\s*renderHandles\s*\}\s*=\s*useTemplateDragResize\((.*?)\)/g,
    'const { startDrag, getTransform, renderHandles } = useTemplateDragResize($1)'
  )

  // 2. Add transform={getTransform(ID, RECT)} to <g onMouseDown={e => startDrag(e, ID, RECT)}>
  // Match <g ... onMouseDown={e => startDrag(e, ID, RECT)} ...> that doesn't already have transform={getTransform(...)
  content = content.replace(
    /<g\s+([^>]*?onMouseDown=\{(?:\(e\)\s*=>|function\s*\(e\))\s*startDrag\(e,\s*(['"`][^'"`]+['"`]|[a-zA-Z0-9_\$]+),\s*([a-zA-Z0-9_\$]+)\)\}[^>]*?)>/g,
    (match, inner, quoteOrId, idExpr, rectExpr) => {
      const actualId = idExpr || quoteOrId
      if (match.includes('getTransform')) {
        return match
      }
      return `<g ${inner} transform={getTransform(${actualId}, ${rectExpr})}>`
    }
  )

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8')
    updatedCount++
  }
}

console.log(`Updated ${updatedCount} / ${files.length} template files with rotation transform!`)
