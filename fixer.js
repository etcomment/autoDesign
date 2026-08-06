import fs from 'fs/promises';

const filesToFix = [
  "src/templates/components/Agenda2Template.tsx",
  "src/templates/components/AgendaTemplate.tsx",
  "src/templates/components/Brain3Template.tsx",
  "src/templates/components/Brain4Template.tsx",
  "src/templates/components/Budget2Template.tsx",
  "src/templates/components/Budget3Template.tsx",
  "src/templates/components/Budget4Template.tsx",
  "src/templates/components/Budget5Template.tsx",
  "src/templates/components/BudgetTemplate.tsx",
  "src/templates/components/Comparison2Template.tsx",
  "src/templates/components/ComparisonTemplate.tsx",
  "src/templates/components/Dashboard4Template.tsx",
  "src/templates/components/DashboardTemplate.tsx",
  "src/templates/components/Decision2Template.tsx",
  "src/templates/components/DecisionTreeTemplate.tsx",
  "src/templates/components/Funnel2Template.tsx",
  "src/templates/components/Funnel3Template.tsx",
  "src/templates/components/Funnel4Template.tsx",
  "src/templates/components/Funnel5Template.tsx",
  "src/templates/components/FunnelTemplate.tsx",
  "src/templates/components/Goals1Template.tsx",
  "src/templates/components/Goals2Template.tsx",
  "src/templates/components/Goals3Template.tsx",
  "src/templates/components/Goals5Template.tsx",
  "src/templates/components/GoalsTemplate.tsx",
  "src/templates/components/Iceberg2Template.tsx",
  "src/templates/components/IcebergTemplate.tsx",
  "src/templates/components/Manufacturing4Template.tsx",
  "src/templates/components/Manufacturing5Template.tsx",
  "src/templates/components/Manufacturing6Template.tsx",
  "src/templates/components/Manufacturing7Template.tsx",
  "src/templates/components/ManufacturingTemplate.tsx",
  "src/templates/components/Puzzle2Template.tsx",
  "src/templates/components/Puzzle3Template.tsx",
  "src/templates/components/Puzzle4Template.tsx",
  "src/templates/components/Puzzle5Template.tsx",
  "src/templates/components/Puzzle6Template.tsx",
  "src/templates/components/Puzzle7Template.tsx",
  "src/templates/components/PuzzleTemplate.tsx",
  "src/templates/components/Strategy3Template.tsx",
  "src/templates/components/Strategy5Template.tsx",
  "src/templates/components/Strategy6Template.tsx",
  "src/templates/components/Table2Template.tsx",
  "src/templates/components/Table4Template.tsx",
  "src/templates/components/Table5Template.tsx",
  "src/templates/components/Table6Template.tsx",
  "src/templates/components/TableTemplate.tsx",
  "src/templates/components/ValueChain2Template.tsx",
  "src/templates/components/ValueChainTemplate.tsx",
  "src/templates/components/Circle2Template.tsx"
];

const API_KEY = process.env.GEMINI_API_KEY;

const systemPrompt = `You are an expert React developer. Fix the static SVG connectors (<line>, <path>, <polygon>, <polyline>) in the provided React file so they follow dragged elements.
Requirements:
1. Draggable elements use data-element-id and update templateElementPositions in the Zustand store.
2. Ensure you import useTemplateStore: import { useTemplateStore } from '../store'
3. In the component, retrieve positions: const pos = useTemplateStore(s => s.templateElementPositions)
4. Add a helper if useful:
   const getRect = (id: string, fallback: {x: number, y: number, width: number, height: number}) => pos[id] || fallback;
5. For connectors linking elements (e.g., node-0 to node-1), use getRect to dynamically get current positions and recalculate the connecting line endpoints (x1, y1, x2, y2).
6. Output ONLY the complete updated file content. Do not include markdown blocks, explanations, or any other text.`;

async function callGemini(content) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [{
        parts: [{ text: content }]
      }],
      generationConfig: {
        temperature: 0.1
      }
    })
  });
  
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  let out = data.candidates[0].content.parts[0].text;
  out = out.replace(/^```tsx?\n/, '').replace(/```\n?$/, '');
  return out;
}

async function main() {
  for (const file of filesToFix) {
    try {
      const code = await fs.readFile(file, 'utf-8');
      if (!code.includes('<line') && !code.includes('<path') && !code.includes('<polygon') && !code.includes('<polyline')) {
        continue;
      }
      console.log(`Fixing ${file}...`);
      const fixedCode = await callGemini(code);
      if (fixedCode && fixedCode.trim().startsWith('import')) {
        await fs.writeFile(file, fixedCode);
        console.log(`Saved ${file}`);
      } else {
        console.log(`Skipped ${file} - invalid output`);
      }
    } catch (e) {
      console.error(`Failed ${file}:`, e.message);
    }
  }
}

main();
