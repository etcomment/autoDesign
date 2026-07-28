const fs = require('fs')

function replaceInFile(file, regex, replacement) {
  let content = fs.readFileSync(file, 'utf8')
  content = content.replace(regex, replacement)
  fs.writeFileSync(file, content)
}

// BrainTemplate
replaceInFile('src/templates/components/BrainTemplate.tsx', /const positions = useTemplateStore\(s => s\.templateElementPositions\)/, "const templateElementPositions = useTemplateStore(s => s.templateElementPositions)")
replaceInFile('src/templates/components/BrainTemplate.tsx', /const visualRect = \{ x: pos\.bx, y: pos\.by, width: branchW, height: branchH \}/, "const customPos = templateElementPositions[elementId]; const visualRect = { x: customPos?.x ?? pos.bx, y: customPos?.y ?? pos.by, width: customPos?.width ?? branchW, height: customPos?.height ?? branchH }; const posbx = visualRect.x; const posby = visualRect.y; const branchW2 = visualRect.width; const branchH2 = visualRect.height; ")
replaceInFile('src/templates/components/BrainTemplate.tsx', /pos\.bx/g, "posbx")
replaceInFile('src/templates/components/BrainTemplate.tsx', /pos\.by/g, "posby")
replaceInFile('src/templates/components/BrainTemplate.tsx', /const posbx = visualRect\.x; const posby = visualRect\.y; const branchW2 = visualRect\.width; const branchH2 = visualRect\.height; /g, "const posbx = visualRect.x; const posby = visualRect.y; const branchW2 = visualRect.width; const branchH2 = visualRect.height; const pos_angle = pos.angle;")
replaceInFile('src/templates/components/BrainTemplate.tsx', /pos\.angle/g, "pos_angle")
replaceInFile('src/templates/components/BrainTemplate.tsx', /branchW/g, "branchW2")
replaceInFile('src/templates/components/BrainTemplate.tsx', /branchH/g, "branchH2")
replaceInFile('src/templates/components/BrainTemplate.tsx', /const branchMidX = posbx \+ branchW2 \/ 2/g, "const branchMidX = posbx + branchW2 / 2")

// Actually, replacing pos.bx like that is risky if there are multiple occurrences in different scopes. Let's just fix the exact line.
let brain = fs.readFileSync('src/templates/components/BrainTemplate.tsx', 'utf8')
brain = brain.replace(/const positions = useTemplateStore\(s => s\.templateElementPositions\)/, "const templateElementPositions = useTemplateStore(s => s.templateElementPositions)")
// for pos.angle error:
brain = brain.replace(/pos\.angle/g, "pos.angle") // wait, pos doesn't have angle? 
// The error says: Property 'angle' does not exist on type '{ x: number; y: number; width: number; height: number; }'
// This means `pos` was shadowed!
// Ah! `const pos = positions[elementId] || { ... }` or something?
// Let's look at `BrainTemplate.tsx` carefully. 
// For Business10Template
replaceInFile('src/templates/components/Business10Template.tsx', /const titleVal = itemTitle/, "const titleVal = (node as any).title || defaultTitles[i] || `Step ${i + 1}`")
replaceInFile('src/templates/components/Business10Template.tsx', /const textVal = itemDesc/, "const textVal = (node as any).subtitle || 'MIGSO-PCUBED content and words to be added here as required'")
// And remove the late declarations
replaceInFile('src/templates/components/Business10Template.tsx', /const itemTitle = node\.title \|\| defaultTitles\[i\] \|\| `Step \$\{i \+ 1\}`\n/, "")
replaceInFile('src/templates/components/Business10Template.tsx', /const itemDesc = node\.subtitle \|\| 'MIGSO-PCUBED content and words to be added here as required'\n/, "")

// For Business3Template
replaceInFile('src/templates/components/Business3Template.tsx', /stepConfigs/g, "stepsConfig")

