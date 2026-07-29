const fs = require('fs');

function patchUseDiagramDragResize() {
  const file = 'src/hooks/useDiagramDragResize.tsx';
  let content = fs.readFileSync(file, 'utf-8');

  const importLine = `import { calculateSmartGuides } from '../core/smartGuides';\nimport { useSmartGuidesStore } from '../store/smartGuidesStore';\nimport { useTemplateStore } from '../templates/store';\n`;
  content = content.replace(`import { useDiagramStore } from '../store/diagramStore'`, `import { useDiagramStore } from '../store/diagramStore'\n${importLine}`);

  // In onMouseMoveRef.current
  const targetDragStr = `
      if (interaction.allStartRects) {
        for (const [sid, startR] of Object.entries(interaction.allStartRects)) {
          moveDiagramElement(sid, {
            x: startR.x + useX,
            y: startR.y + useY,
          })
        }
      }
      moveDiagramElement(interaction.id, {
        x: interaction.startRect.x + useX,
        y: interaction.startRect.y + useY,
      })
      return
`;
  const dragPatch = `
      let finalUseX = useX;
      let finalUseY = useY;

      if (!e.altKey) {
        const activeBox = {
          x: interaction.startRect.x + useX,
          y: interaction.startRect.y + useY,
          width: interaction.startRect.width,
          height: interaction.startRect.height,
        };

        const diagramStore = useDiagramStore.getState();
        const templateStore = useTemplateStore.getState();

        const targetBoxes = [];
        // Add shapes
        for (const shape of diagramStore.shapes) {
          targetBoxes.push({
            x: shape.position.x,
            y: shape.position.y,
            width: shape.dimensions.width,
            height: shape.dimensions.height,
          });
        }
        
        // Add templates
        for (const [tid, pos] of Object.entries(templateStore.templateElementPositions)) {
          if (tid !== interaction.id && !interaction.allStartRects?.[tid]) {
            targetBoxes.push({
              x: pos.x,
              y: pos.y,
              width: pos.width,
              height: pos.height,
            });
          }
        }

        // Add other diagram elements
        for (const [did, pos] of Object.entries(diagramStore.diagramElementPositions)) {
          if (did !== interaction.id && !interaction.allStartRects?.[did]) {
            targetBoxes.push({
              x: pos.x,
              y: pos.y,
              width: pos.width,
              height: pos.height,
            });
          }
        }

        const { snappedBBox, guides } = calculateSmartGuides(activeBox, targetBoxes, 5);
        useSmartGuidesStore.getState().setActiveGuides(guides);

        finalUseX = snappedBBox.x - interaction.startRect.x;
        finalUseY = snappedBBox.y - interaction.startRect.y;
      } else {
        useSmartGuidesStore.getState().clearGuides();
      }

      if (interaction.allStartRects) {
        for (const [sid, startR] of Object.entries(interaction.allStartRects)) {
          moveDiagramElement(sid, {
            x: startR.x + finalUseX,
            y: startR.y + finalUseY,
          });
        }
      }
      moveDiagramElement(interaction.id, {
        x: interaction.startRect.x + finalUseX,
        y: interaction.startRect.y + finalUseY,
      });
      return;
`;

  content = content.replace(targetDragStr, dragPatch);

  // Resize snapping
  const resizeStr = `      resizeDiagramElement(interaction.id, { width: nextW, height: nextH })
      moveDiagramElement(interaction.id, { x: nextX, y: nextY })`;
  
  const resizePatch = `
      if (!e.altKey) {
        const diagramStore = useDiagramStore.getState();
        const templateStore = useTemplateStore.getState();
        const targetBoxes = [];
        for (const shape of diagramStore.shapes) {
          targetBoxes.push({
            x: shape.position.x,
            y: shape.position.y,
            width: shape.dimensions.width,
            height: shape.dimensions.height,
          });
        }
        for (const [tid, pos] of Object.entries(templateStore.templateElementPositions)) {
          if (tid !== interaction.id) {
            targetBoxes.push({ x: pos.x, y: pos.y, width: pos.width, height: pos.height });
          }
        }
        for (const [did, pos] of Object.entries(diagramStore.diagramElementPositions)) {
          if (did !== interaction.id) {
            targetBoxes.push({ x: pos.x, y: pos.y, width: pos.width, height: pos.height });
          }
        }

        const activeBox = { x: nextX, y: nextY, width: nextW, height: nextH };
        const { snappedBBox, guides } = calculateSmartGuides(activeBox, targetBoxes, 5);
        useSmartGuidesStore.getState().setActiveGuides(guides);

        if (interaction.corner === 'se') {
          nextW = snappedBBox.width; // For SE, we only change width/height, x/y are fixed
          // Wait, calculateSmartGuides modifies x and y, not width/height based on snapping.
          // To snap width/height, we need to map x/y snapping back to width/height.
          // If the snappedBBox has a different X/Y, it means the right/bottom edge snapped.
          if (snappedBBox.x !== nextX) nextW += (snappedBBox.x - nextX);
          if (snappedBBox.y !== nextY) nextH += (snappedBBox.y - nextY);
        } else if (interaction.corner === 'nw') {
          nextW += (nextX - snappedBBox.x);
          nextH += (nextY - snappedBBox.y);
          nextX = snappedBBox.x;
          nextY = snappedBBox.y;
        } else if (interaction.corner === 'ne') {
          if (snappedBBox.x !== nextX) nextW += (snappedBBox.x - nextX);
          nextH += (nextY - snappedBBox.y);
          nextY = snappedBBox.y;
        } else if (interaction.corner === 'sw') {
          nextW += (nextX - snappedBBox.x);
          nextX = snappedBBox.x;
          if (snappedBBox.y !== nextY) nextH += (snappedBBox.y - nextY);
        }
      } else {
        useSmartGuidesStore.getState().clearGuides();
      }

      nextW = Math.max(MIN_SIZE, nextW);
      nextH = Math.max(MIN_SIZE, nextH);

      resizeDiagramElement(interaction.id, { width: nextW, height: nextH })
      moveDiagramElement(interaction.id, { x: nextX, y: nextY })`;
  content = content.replace(resizeStr, resizePatch);

  // Clear guides on mouse up
  const mouseUpStr = `    if (!interaction.hasMoved) {`;
  content = content.replace(mouseUpStr, `    useSmartGuidesStore.getState().clearGuides();\n    if (!interaction.hasMoved) {`);

  fs.writeFileSync(file, content);
}

patchUseDiagramDragResize();
