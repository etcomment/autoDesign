import os
import re

dir_path = "src/templates/components"

for filename in os.listdir(dir_path):
    if not (filename.startswith("Puzzle") and filename.endswith(".tsx")):
        continue
    
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r') as f:
        content = f.read()

    # Make sure templateElementPositions is imported/destructured from useTemplateStore
    if "templateElementPositions" not in content:
        content = re.sub(
            r"(const tplStrokeColors = useTemplateStore\(s => s\.templateStrokeColors\))",
            r"\1\n  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)",
            content
        )
    
    with open(filepath, 'w') as f:
        f.write(content)

print("Checked templateElementPositions import in all Puzzle files.")
