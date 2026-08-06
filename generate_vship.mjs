import fs from 'fs';
import path from 'path';

const SRC = './src/templates';
const COMPONENTS = path.join(SRC, 'components');
const REGISTRY = path.join(SRC, 'registry.ts');
const RENDERER = path.join(SRC, 'TemplateRenderer.tsx');

const slides = [47, 48, 49, 50, 51, 52, 53];

function createComponent(num) {
  return `import React from 'react'
import { MIGSO_PALETTE } from '../../lib/theme'
import { useTemplateDragResize } from '../../hooks/useTemplateDragResize'

export function Vship${num}Template({ data, scale = 1, isExport = false }: any) {
  return (
    <div style={{ width: 960 * scale, height: 540 * scale, background: '#052E2B', position: 'relative', color: 'white' }}>
      <h2 style={{ padding: 20 * scale, fontSize: 24 * scale }}>Vship Slide ${num}</h2>
    </div>
  )
}
`;
}

for (const num of slides) {
  fs.writeFileSync(path.join(COMPONENTS, `Vship${num}Template.tsx`), createComponent(num));
}

// Update TemplateRenderer
let rendererContent = fs.readFileSync(RENDERER, 'utf8');
const imports = slides.map(n => `import { Vship${n}Template } from './Vship${n}Template'`).join('\n');
const cases = slides.map(n => `    case 'vship${n}':\n      return <Vship${n}Template data={data} scale={scale} isExport={isExport} />`).join('\n');

rendererContent = rendererContent.replace(/(import .*Template .*)/, `$1\n${imports}`);
rendererContent = rendererContent.replace(/(switch \(type\) \{)/, `$1\n${cases}`);
fs.writeFileSync(RENDERER, rendererContent);

// Update registry
let registryContent = fs.readFileSync(REGISTRY, 'utf8');
const registryEntries = slides.map(n => `  {
    type: 'vship${n}' as any,
    label: 'Vship Template Slide ${n}',
    description: 'Vship specific template',
    category: 'Vship',
    defaultData: {
      type: 'vship${n}',
      branches: [],
    },
  },`).join('\n');

registryContent = registryContent.replace(/(export const TEMPLATES: TemplateDefinition\[\] = \[)/, `$1\n${registryEntries}`);
fs.writeFileSync(REGISTRY, registryContent);

console.log('Templates created and registered!');
