const fs = require('fs');
const JSZip = require('jszip');

async function main() {
  const fileData = fs.readFileSync('ex/2025 - MIGSO-PCUBED - Creative and Example Templates.potx');
  const zip = await JSZip.loadAsync(fileData);
  let tblCount = 0;
  for (const [filename, file] of Object.entries(zip.files)) {
    if (filename.startsWith('ppt/slides/slide') && filename.endsWith('.xml')) {
      const xml = await file.async('text');
      if (xml.includes('<a:tbl>')) {
        tblCount++;
        console.log(filename, 'has table');
      }
    }
  }
  console.log('Total slides with tables:', tblCount);
}
main();
