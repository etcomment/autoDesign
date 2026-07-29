const fs = require('fs');
const content = fs.readFileSync('src/editor/Canvas.tsx', 'utf-8');

const importSmartGuides = `import { calculateSmartGuides } from '../core/smartGuides'
import { useSmartGuidesStore } from '../store/smartGuidesStore'
import { SmartGuidesOverlay } from './SmartGuidesOverlay'`;

let patched = content.replace(`import type { ShapeType } from '../core/model/Shape'`, `import type { ShapeType } from '../core/model/Shape'\n${importSmartGuides}`);

// Modify onMouseMove for dragging shapes
patched = patched.replace(
  `        isDragging.current = true
        for (const [sId, startPos] of dragStartPositions.current.entries()) {
          moveShape(sId, {
            x: startPos.x + dx,
            y: startPos.y + dy,
          })
        }`,
  `        isDragging.current = true

        const targetShapeId = dragTarget.current
        const targetShape = shapes.find(s => s.id === targetShapeId)
        const targetStartPos = dragStartPositions.current.get(targetShapeId)

        let finalDx = dx
        let finalDy = dy

        if (targetShape && targetStartPos && !e.altKey) {
          const activeBox = {
            x: targetStartPos.x + dx,
            y: targetStartPos.y + dy,
            width: targetShape.dimensions.width,
            height: targetShape.dimensions.height,
          }

          const targetBoxes = shapes
            .filter(s => s.id !== targetShapeId && !dragStartPositions.current.has(s.id))
            .map(s => ({
              x: s.position.x,
              y: s.position.y,
              width: s.dimensions.width,
              height: s.dimensions.height,
            }))

          // Also get template boxes
          const templateStore = useTemplateStore.getState()
          for (const pos of Object.values(templateStore.templateElementPositions)) {
            targetBoxes.push({
              x: pos.x,
              y: pos.y,
              width: pos.width,
              height: pos.height,
            })
          }

          const { snappedBBox, guides } = calculateSmartGuides(activeBox, targetBoxes, 5 / viewBox.scale)
          
          useSmartGuidesStore.getState().setActiveGuides(guides)
          
          finalDx = snappedBBox.x - targetStartPos.x
          finalDy = snappedBBox.y - targetStartPos.y
        } else {
          useSmartGuidesStore.getState().clearGuides()
        }

        for (const [sId, startPos] of dragStartPositions.current.entries()) {
          moveShape(sId, {
            x: startPos.x + finalDx,
            y: startPos.y + finalDy,
          })
        }`
);

// Clear guides onMouseUp
patched = patched.replace(
  `    dragStartPositions.current.clear()`,
  `    dragStartPositions.current.clear()
    useSmartGuidesStore.getState().clearGuides()`
);

// Add <SmartGuidesOverlay /> before marquee
patched = patched.replace(
  `        <GroupSelectionRenderer />`,
  `        <GroupSelectionRenderer />\n        <SmartGuidesOverlay />`
);

fs.writeFileSync('src/editor/Canvas.tsx', patched);
