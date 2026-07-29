const fs = require('fs')
const path = require('path')

const dir = 'src/templates/components'
const files = fs.readdirSync(dir).filter(f => f.startsWith('Business') && f.endsWith('Template.tsx'))

files.forEach(file => {
  if (file === 'Business2Template.tsx') return; // Already fixed

  const filePath = path.join(dir, file)
  let code = fs.readFileSync(filePath, 'utf8')

  // We need to apply the 4 criteria:
  // 1. Support actual number of nodes or fallback
  // 2. Multiline text
  // 3. tplColors, tplStrokeColors, tplStrokeWidths
  // 4. Custom positioning (templateElementPositions) and renderHandles with startDrag

  // Since each template has slightly different structure, a simple regex might break things.
  // We'll leave this script empty for now and do it step by step if needed, or implement generic AST transform.
  // Actually, we can check which templates use `textVal.split` or `slice`.
  code = code.replace(/tplStrokeColors\[(.+?)\] \?\? \(isSelected \? '#4a90d9' : 'none'\)/g, "tplStrokeColors[$1] || (isSelected ? '#4a90d9' : 'none')")
  code = code.replace(/tplStrokeWidths\[(.+?)\] \?\? \(isSelected \? ([\d]+) : 0\)/g, "tplStrokeWidths[$1] !== undefined ? tplStrokeWidths[$1] : (isSelected ? $2 : 0)")
  
  // Custom positioning: if it doesn't use templateElementPositions, we need to inject it.
  if (!code.includes('templateElementPositions')) {
      code = code.replace(/const tplStrokeWidths = useTemplateStore\(s => s\.templateStrokeWidths\)/, "const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)\n  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)")
  }

  fs.writeFileSync(filePath, code)
})
