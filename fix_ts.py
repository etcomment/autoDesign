import re

def fix_b5():
    with open("src/templates/components/Business5Template.tsx", "r") as f:
        code = f.read()

    # 1. any typing
    code = code.replace("const nodeData = typeof item === 'object' && item !== null ? item : {}", "const nodeData = typeof item === 'object' && item !== null ? (item as any) : {}")
    
    # 2. cfg non null
    code = code.replace("const cfg = itemsConfig[idx % itemsConfig.length]", "const cfg = itemsConfig[idx % itemsConfig.length]!")
    
    # 3. typings in map
    code = code.replace("titleLines.map((line, lIdx) =>", "titleLines.map((line: string, lIdx: number) =>")
    code = code.replace("valLines.map((line, lIdx) =>", "valLines.map((line: string, lIdx: number) =>")
    
    with open("src/templates/components/Business5Template.tsx", "w") as f:
        f.write(code)

def fix_b6():
    with open("src/templates/components/Business6Template.tsx", "r") as f:
        code = f.read()

    code = code.replace("flatMap(line =>", "flatMap((line: string) =>")
    code = code.replace("words.forEach(w =>", "words.forEach((w: string) =>")
    code = code.replace("res.map(l =>", "res.map((l: string) =>")
    code = code.replace(".map((l, lIdx) =>", ".map((l: string, lIdx: number) =>")
    
    with open("src/templates/components/Business6Template.tsx", "w") as f:
        f.write(code)

def fix_b7():
    with open("src/templates/components/Business7Template.tsx", "r") as f:
        code = f.read()

    code = code.replace("flatMap(line =>", "flatMap((line: string) =>")
    code = code.replace("words.forEach(w =>", "words.forEach((w: string) =>")
    code = code.replace("res.map(l =>", "res.map((l: string) =>")
    code = code.replace(".map((l, lIdx) =>", ".map((l: string, lIdx: number) =>")
    
    with open("src/templates/components/Business7Template.tsx", "w") as f:
        f.write(code)

if __name__ == '__main__':
    fix_b5()
    fix_b6()
    fix_b7()
