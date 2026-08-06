import { PptxRenderer } from 'pptx-svg';
import { readFileSync, writeFileSync } from 'node:fs';

async function test() {
  const renderer = new PptxRenderer();
  const wasmBytes = readFileSync('node_modules/pptx-svg/dist/main.wasm');
  await renderer.init(wasmBytes);
  
  // Need a blank PPTX
  const pptxBytes = readFileSync('test.pptx');
  const pptxBuffer = pptxBytes.buffer.slice(
    pptxBytes.byteOffset, pptxBytes.byteOffset + pptxBytes.byteLength
  );
  await renderer.loadPptx(pptxBuffer);
  
  const svg = renderer.renderSlideSvg(0);
  console.log("Original SVG length:", svg.length);
  
  // Inject a custom path
  const newSvg = svg.replace('</svg>', '<path d="M 0 0 L 100 100 Z" fill="blue" /></svg>');
  
  const res = renderer.updateSlideFromSvg(0, newSvg);
  console.log("Update result:", res);
  
  const out = await renderer.exportPptx();
  writeFileSync('out.pptx', Buffer.from(out));
  console.log("Done");
}
test().catch(console.error);
