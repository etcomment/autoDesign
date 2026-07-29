const fs = require('fs')

function replaceInFile(file, regex, replacement) {
  let content = fs.readFileSync(file, 'utf8')
  content = content.replace(regex, replacement)
  fs.writeFileSync(file, content)
}

// Business2Template
replaceInFile('src/templates/components/Business2Template.tsx', /const defaultConfig = DEFAULT_BLOCKS\[i % DEFAULT_BLOCKS\.length\]/g, "const defaultConfig = DEFAULT_BLOCKS[i % DEFAULT_BLOCKS.length]!")
replaceInFile('src/templates/components/Business2Template.tsx', /flatMap\(line =>/g, "flatMap((line: string) =>")
replaceInFile('src/templates/components/Business2Template.tsx', /forEach\(w =>/g, "forEach((w: string) =>")
replaceInFile('src/templates/components/Business2Template.tsx', /res\.map\(l =>/g, "res.map((l: string) =>")
replaceInFile('src/templates/components/Business2Template.tsx', /\.map\(\(line, lIdx\) =>/g, ".map((line: string, lIdx: number) =>")
replaceInFile('src/templates/components/Business2Template.tsx', /nodeData\?\.title/g, "(nodeData as any)?.title")
replaceInFile('src/templates/components/Business2Template.tsx', /nodeData\?\.subtitle/g, "(nodeData as any)?.subtitle")
replaceInFile('src/templates/components/Business2Template.tsx', /nodeData\?\.color/g, "(nodeData as any)?.color")
replaceInFile('src/templates/components/Business2Template.tsx', /displayNodes\.map\(\(nodeData, i\) => \{/g, "displayNodes.map((nodeData: any, i: number) => {")

// Business3Template
replaceInFile('src/templates/components/Business3Template.tsx', /nodeData\?\.color/g, "(nodeData as any)?.color")
replaceInFile('src/templates/components/Business3Template.tsx', /nodeData\?\.title/g, "(nodeData as any)?.title")
replaceInFile('src/templates/components/Business3Template.tsx', /nodeData\?\.subtitle/g, "(nodeData as any)?.subtitle")
replaceInFile('src/templates/components/Business3Template.tsx', /flatMap\(line =>/g, "flatMap((line: string) =>")
replaceInFile('src/templates/components/Business3Template.tsx', /\.map\(\(line, idx\)/g, ".map((line: string, idx: number)")
replaceInFile('src/templates/components/Business3Template.tsx', /const cfg = STEP_CONFIGS\[i % STEP_CONFIGS\.length\]/g, "const cfg = STEP_CONFIGS[i % STEP_CONFIGS.length]!")

// Business4Template
replaceInFile('src/templates/components/Business4Template.tsx', /node\?\.title/g, "(node as any)?.title")
replaceInFile('src/templates/components/Business4Template.tsx', /node\?\.subtitle/g, "(node as any)?.subtitle")
replaceInFile('src/templates/components/Business4Template.tsx', /node\?\.color/g, "(node as any)?.color")
replaceInFile('src/templates/components/Business4Template.tsx', /node\.title/g, "(node as any).title")

// Business8Template
replaceInFile('src/templates/components/Business8Template.tsx', /textAnchor=\{textPos\.align\}/g, 'textAnchor={textPos.align as "start" | "middle" | "end" | "inherit"}')

// Business9Template
replaceInFile('src/templates/components/Business9Template.tsx', /node\.subtitle/g, "(node as any)?.subtitle")
replaceInFile('src/templates/components/Business9Template.tsx', /node\?\.subtitle/g, "(node as any)?.subtitle")

