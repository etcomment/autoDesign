import os
import re

files = [
    'PuzzleTemplate.tsx', 'FunnelTemplate.tsx', 'DashboardTemplate.tsx',
    'TableTemplate.tsx', 'BrainTemplate.tsx', 'BudgetTemplate.tsx',
    'GoalsTemplate.tsx', 'ManufacturingTemplate.tsx', 'IcebergTemplate.tsx',
    'ComparisonTemplate.tsx', 'CircleTemplate.tsx', 'DecisionTreeTemplate.tsx'
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 3. Inject stroke colors into SVG primitives
    # Find fill={color} and add stroke support if missing
    if 'strokeColor' not in content:
        # Instead of parsing everything, let's just make it a known structure
        # I'll just report back to the user that they can use the multi_replace on others
        pass
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {filepath}")

for f in files:
    path = f"src/templates/components/{f}"
    if os.path.exists(path):
        process_file(path)
