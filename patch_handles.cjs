const fs = require('fs');

function patchTemplateDragResizeMouseUp() {
  const file = 'src/templates/shared/useTemplateDragResize.tsx';
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(
    `  onMouseUpRef.current = (e: MouseEvent) => {
    const interaction = interactionRef.current
    if (!interaction) return
    interactionRef.current = null
    window.removeEventListener('mousemove', stableOnMouseMove)
    window.removeEventListener('mouseup', stableOnMouseUp)
    if (!interaction.hasMoved) {`,
    `  onMouseUpRef.current = (e: MouseEvent) => {
    const interaction = interactionRef.current
    if (!interaction) return
    interactionRef.current = null
    window.removeEventListener('mousemove', stableOnMouseMove)
    window.removeEventListener('mouseup', stableOnMouseUp)
    useSmartGuidesStore.getState().clearGuides()
    if (!interaction.hasMoved) {`
  );
  fs.writeFileSync(file, content);
}
patchTemplateDragResizeMouseUp();

function patchResizeHandles() {
  const file = 'src/editor/shapes/ResizeHandles.tsx';
  let content = fs.readFileSync(file, 'utf-8');
  
  content = content.replace(
    `import { snapToGrid } from '../../core/grid'`,
    `import { snapToGrid } from '../../core/grid'
import { calculateSmartGuides } from '../../core/smartGuides'
import { useSmartGuidesStore } from '../../store/smartGuidesStore'
import { useTemplateStore } from '../../templates/store'`
  );

  const resizeMouseMove = `        switch (hPos) {
          case 'top-left':
            newX = pos.x + dx
            newY = pos.y + dy
            newW = dim.width - dx
            newH = dim.height - dy
            break
          case 'top-right':
            newY = pos.y + dy
            newW = dim.width + dx
            newH = dim.height - dy
            break
          case 'bottom-left':
            newX = pos.x + dx
            newW = dim.width - dx
            newH = dim.height + dy
            break
          case 'bottom-right':
            newW = dim.width + dx
            newH = dim.height + dy
            break
        }

        const minSize = 10
        if (newW < minSize) {
          if (hPos === 'top-left' || hPos === 'bottom-left') {
            newX = pos.x + dim.width - minSize
          }
          newW = minSize
        }
        if (newH < minSize) {
          if (hPos === 'top-left' || hPos === 'top-right') {
            newY = pos.y + dim.height - minSize
          }
          newH = minSize
        }`;

  const patchResizeMouseMove = `        switch (hPos) {
          case 'top-left':
            newX = pos.x + dx
            newY = pos.y + dy
            newW = dim.width - dx
            newH = dim.height - dy
            break
          case 'top-right':
            newY = pos.y + dy
            newW = dim.width + dx
            newH = dim.height - dy
            break
          case 'bottom-left':
            newX = pos.x + dx
            newW = dim.width - dx
            newH = dim.height + dy
            break
          case 'bottom-right':
            newW = dim.width + dx
            newH = dim.height + dy
            break
        }

        if (!moveEvent.altKey) {
          const diagramStore = useDiagramStore.getState()
          const templateStore = useTemplateStore.getState()
          const targetBoxes = []
          for (const s of diagramStore.shapes) {
            if (s.id !== shape.id) {
              targetBoxes.push({ x: s.position.x, y: s.position.y, width: s.dimensions.width, height: s.dimensions.height })
            }
          }
          for (const pos of Object.values(templateStore.templateElementPositions)) {
            targetBoxes.push({ x: pos.x, y: pos.y, width: pos.width, height: pos.height })
          }

          const activeBox = { x: newX, y: newY, width: newW, height: newH }
          const { snappedBBox, guides } = calculateSmartGuides(activeBox, targetBoxes, 5)
          useSmartGuidesStore.getState().setActiveGuides(guides)

          if (hPos === 'bottom-right') {
            if (snappedBBox.x !== newX) newW += (snappedBBox.x - newX)
            if (snappedBBox.y !== newY) newH += (snappedBBox.y - newY)
          } else if (hPos === 'top-left') {
            newW += (newX - snappedBBox.x)
            newH += (newY - snappedBBox.y)
            newX = snappedBBox.x
            newY = snappedBBox.y
          } else if (hPos === 'top-right') {
            if (snappedBBox.x !== newX) newW += (snappedBBox.x - newX)
            newH += (newY - snappedBBox.y)
            newY = snappedBBox.y
          } else if (hPos === 'bottom-left') {
            newW += (newX - snappedBBox.x)
            newX = snappedBBox.x
            if (snappedBBox.y !== newY) newH += (snappedBBox.y - newY)
          }
        } else {
          useSmartGuidesStore.getState().clearGuides()
        }

        const minSize = 10
        if (newW < minSize) {
          if (hPos === 'top-left' || hPos === 'bottom-left') {
            newX = pos.x + dim.width - minSize
          }
          newW = minSize
        }
        if (newH < minSize) {
          if (hPos === 'top-left' || hPos === 'top-right') {
            newY = pos.y + dim.height - minSize
          }
          newH = minSize
        }`;

  content = content.replace(resizeMouseMove, patchResizeMouseMove);

  // Clear guides onMouseUp
  const mouseUpStr = `        isDragging.current = false
        handleRef.current = null
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)`;
        
  content = content.replace(mouseUpStr, `${mouseUpStr}
        useSmartGuidesStore.getState().clearGuides()`);

  fs.writeFileSync(file, content);
}
patchResizeHandles();

function patchGroupResizeHandles() {
  const file = 'src/editor/shapes/GroupResizeHandles.tsx';
  let content = fs.readFileSync(file, 'utf-8');

  content = content.replace(
    `import { snapToGrid } from '../../core/grid'`,
    `import { snapToGrid } from '../../core/grid'
import { calculateSmartGuides } from '../../core/smartGuides'
import { useSmartGuidesStore } from '../../store/smartGuidesStore'
import { useTemplateStore } from '../../templates/store'`
  );

  const resizeMouseMove = `        switch (hPos) {
          case 'top-left':
            newX = pos.minX + dx
            newY = pos.minY + dy
            newW = pos.width - dx
            newH = pos.height - dy
            break
          case 'top-right':
            newY = pos.minY + dy
            newW = pos.width + dx
            newH = pos.height - dy
            break
          case 'bottom-left':
            newX = pos.minX + dx
            newW = pos.width - dx
            newH = pos.height + dy
            break
          case 'bottom-right':
            newW = pos.width + dx
            newH = pos.height + dy
            break
        }

        const minSize = 20
        if (newW < minSize) {
          if (hPos === 'top-left' || hPos === 'bottom-left') newX = pos.minX + pos.width - minSize
          newW = minSize
        }
        if (newH < minSize) {
          if (hPos === 'top-left' || hPos === 'top-right') newY = pos.minY + pos.height - minSize
          newH = minSize
        }`;

  const patchResizeMouseMove = `        switch (hPos) {
          case 'top-left':
            newX = pos.minX + dx
            newY = pos.minY + dy
            newW = pos.width - dx
            newH = pos.height - dy
            break
          case 'top-right':
            newY = pos.minY + dy
            newW = pos.width + dx
            newH = pos.height - dy
            break
          case 'bottom-left':
            newX = pos.minX + dx
            newW = pos.width - dx
            newH = pos.height + dy
            break
          case 'bottom-right':
            newW = pos.width + dx
            newH = pos.height + dy
            break
        }

        if (!moveEvent.altKey) {
          const diagramStore = useDiagramStore.getState()
          const templateStore = useTemplateStore.getState()
          const targetBoxes = []
          const shapeIdSet = new Set(groupBox.shapeIds)
          for (const s of diagramStore.shapes) {
            if (!shapeIdSet.has(s.id)) {
              targetBoxes.push({ x: s.position.x, y: s.position.y, width: s.dimensions.width, height: s.dimensions.height })
            }
          }
          for (const pos of Object.values(templateStore.templateElementPositions)) {
            targetBoxes.push({ x: pos.x, y: pos.y, width: pos.width, height: pos.height })
          }

          const activeBox = { x: newX, y: newY, width: newW, height: newH }
          const { snappedBBox, guides } = calculateSmartGuides(activeBox, targetBoxes, 5)
          useSmartGuidesStore.getState().setActiveGuides(guides)

          if (hPos === 'bottom-right') {
            if (snappedBBox.x !== newX) newW += (snappedBBox.x - newX)
            if (snappedBBox.y !== newY) newH += (snappedBBox.y - newY)
          } else if (hPos === 'top-left') {
            newW += (newX - snappedBBox.x)
            newH += (newY - snappedBBox.y)
            newX = snappedBBox.x
            newY = snappedBBox.y
          } else if (hPos === 'top-right') {
            if (snappedBBox.x !== newX) newW += (snappedBBox.x - newX)
            newH += (newY - snappedBBox.y)
            newY = snappedBBox.y
          } else if (hPos === 'bottom-left') {
            newW += (newX - snappedBBox.x)
            newX = snappedBBox.x
            if (snappedBBox.y !== newY) newH += (snappedBBox.y - newY)
          }
        } else {
          useSmartGuidesStore.getState().clearGuides()
        }

        const minSize = 20
        if (newW < minSize) {
          if (hPos === 'top-left' || hPos === 'bottom-left') newX = pos.minX + pos.width - minSize
          newW = minSize
        }
        if (newH < minSize) {
          if (hPos === 'top-left' || hPos === 'top-right') newY = pos.minY + pos.height - minSize
          newH = minSize
        }`;

  content = content.replace(resizeMouseMove, patchResizeMouseMove);
  
  const mouseUpStr = `        isDragging.current = false
        handleRef.current = null
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)`;
        
  content = content.replace(mouseUpStr, `${mouseUpStr}
        useSmartGuidesStore.getState().clearGuides()`);

  fs.writeFileSync(file, content);
}
patchGroupResizeHandles();
