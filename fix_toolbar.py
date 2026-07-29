import re

with open("src/panels/Toolbar.tsx", "r") as f:
    content = f.read()

# Add useTemplateStore import
content = content.replace("import { useDiagramStore } from '../store/diagramStore'", "import { useDiagramStore } from '../store/diagramStore'\nimport { useTemplateStore } from '../templates/store'")

# Find canGroup and canUngroup declarations to modify them
def_can_group = """  const selectedShapesArray = shapes.filter(s => selectedShapeIds.has(s.id))
  const canGroup = selectedShapeIds.size >= 2
  const canUngroup = selectedShapesArray.some(s => s.groupId !== undefined)"""

new_def_can_group = """  const selectedTemplateIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementGroupIds = useTemplateStore(s => s.templateElementGroupIds)
  
  const selectedShapesArray = shapes.filter(s => selectedShapeIds.has(s.id))
  
  const canGroup = selectedShapeIds.size >= 2 || selectedTemplateIds.size >= 2
  const canUngroup = selectedShapesArray.some(s => s.groupId !== undefined) || 
    Array.from(selectedTemplateIds).some(id => templateElementGroupIds[id] !== undefined)
"""

content = content.replace(def_can_group, new_def_can_group)

# Fix onClick for grouping
click_group = "onClick={groupSelectedShapes}"
new_click_group = """onClick={() => {
            if (selectedTemplateIds.size > 0) {
              useTemplateStore.getState().groupTemplateElements()
            } else {
              groupSelectedShapes()
            }
          }}"""

content = content.replace(click_group, new_click_group)

click_ungroup = "onClick={ungroupSelectedShapes}"
new_click_ungroup = """onClick={() => {
            if (selectedTemplateIds.size > 0) {
              useTemplateStore.getState().ungroupTemplateElements()
            } else {
              ungroupSelectedShapes()
            }
          }}"""

content = content.replace(click_ungroup, new_click_ungroup)


with open("src/panels/Toolbar.tsx", "w") as f:
    f.write(content)
