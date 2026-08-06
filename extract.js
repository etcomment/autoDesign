import fs from 'fs';
import { PptxRenderer } from 'pptx-svg';

async function main() {
  const buf = fs.readFileSync('ex/vship_251006-v-ppt-template-vf-w-instructions (1).pptx');
  const wasmBuf = fs.readFileSync('node_modules/pptx-svg/dist/main.wasm');
  const renderer = new PptxRenderer();
  
  await renderer.init(wasmBuf.buffer); 
  
  await renderer.loadPptx(buf.buffer);
  
  for (let i = 46; i <= 52; i++) {
    const svg = renderer.renderSlideSvg(i);
    fs.writeFileSync(`slide_${i+1}.svg`, svg);
    console.log(`Saved slide_${i+1}.svg`);
  }
}

main().catch(console.error);
