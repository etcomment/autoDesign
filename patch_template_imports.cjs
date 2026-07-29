const fs = require('fs');

const file = 'src/templates/shared/useTemplateDragResize.tsx';
let content = fs.readFileSync(file, 'utf-8');

if (!content.includes('useSmartGuidesStore')) {
  // It shouldn't get here because we added it using replace, but let's check.
}
// Oh wait, my replace block had a failure in chunk 1, so the import wasn't added.

content = content.replace(
  `import { useTemplateStore } from '../store'`,
  `import { useTemplateStore } from '../store'
import { useSmartGuidesStore } from '../../store/smartGuidesStore'
import { calculateSmartGuides } from '../../core/smartGuides'`
);

fs.writeFileSync(file, content);
