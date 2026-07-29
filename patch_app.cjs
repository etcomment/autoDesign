const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf-8');

if (!content.includes("import { useTemplateStore }")) {
  content = content.replace(
    `import { useDiagramStore } from './store/diagramStore'`,
    `import { useDiagramStore } from './store/diagramStore'
import { useTemplateStore } from './templates/store'`
  );
  fs.writeFileSync(file, content);
}
