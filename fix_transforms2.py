import os
import re

dir_path = "src/templates/components"

def extract_args_from_startDrag(func_body):
    # func_body is e => startDrag(e, arg1, arg2)
    # We can just match `startDrag(e, ` and find the arguments.
    m = re.search(r"startDrag\(\s*e\s*,\s*(.+?),\s*(.+)\)", func_body)
    if not m:
        return None
    arg1 = m.group(1).strip()
    arg2 = m.group(2).strip()
    # arg2 might have trailing ) or space. We can find the last ')' to trim it.
    if arg2.endswith(')'):
        arg2 = arg2[:-1].strip()
    return arg1, arg2

for filename in os.listdir(dir_path):
    if not filename.endswith(".tsx"): continue
    
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = ""
    i = 0
    changed = False
    
    while i < len(content):
        # Look for onMouseDown={
        idx = content.find("onMouseDown={", i)
        if idx == -1:
            new_content += content[i:]
            break
            
        new_content += content[i:idx]
        
        # Now balance braces
        brace_count = 0
        j = idx + 12 # at the {
        
        while j < len(content):
            if content[j] == '{':
                brace_count += 1
            elif content[j] == '}':
                brace_count -= 1
                if brace_count == 0:
                    break
            j += 1
            
        attr_content = content[idx:j+1]
        
        # Check if it has startDrag
        if 'startDrag(e,' in attr_content:
            args = extract_args_from_startDrag(attr_content)
            if args:
                id_arg, rect_arg = args
                
                # Verify that it doesn't already have transform={getTransform...} nearby
                # Just check the rest of the line or next few characters.
                # Actually, check if it's already in the <g ...> tag.
                # We can just inject it right after the onMouseDown={...} attribute.
                
                # Let's peek ahead to see if transform= is already there
                next_text = content[j+1:min(j+50, len(content))]
                if 'transform=' not in next_text:
                    insertion = f" transform={{getTransform({id_arg}, {rect_arg})}}"
                    new_content += attr_content + insertion
                    changed = True
                    i = j + 1
                    continue
                    
        new_content += attr_content
        i = j + 1
        
    if changed:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filename}")

