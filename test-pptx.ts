import pptxgen from "pptxgenjs";
const pres = new pptxgen();
const slide = pres.addSlide();
slide.addImage({
  data: "data:image/svg+xml;base64," + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/></svg>`),
  x: 1, y: 1, w: 2, h: 2
});
pres.writeFile({ fileName: "test.pptx" }).then(() => console.log("done")).catch(e => console.error(e));
