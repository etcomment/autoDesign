const A = {x: 37.1, y: 193.4};
const B = {x: 108.0, y: 33.0};
const C = {x: 178.4, y: 193.8};

function getCircleCenter(p1, p2, p3) {
  const d = 2 * (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y));
  const ux = ((p1.x*p1.x + p1.y*p1.y) * (p2.y - p3.y) + (p2.x*p2.x + p2.y*p2.y) * (p3.y - p1.y) + (p3.x*p3.x + p3.y*p3.y) * (p1.y - p2.y)) / d;
  const uy = ((p1.x*p1.x + p1.y*p1.y) * (p3.x - p2.x) + (p2.x*p2.x + p2.y*p2.y) * (p1.x - p3.x) + (p3.x*p3.x + p3.y*p3.y) * (p2.x - p1.x)) / d;
  return {x: ux, y: uy, r: Math.sqrt((ux-p1.x)**2 + (uy-p1.y)**2)};
}

console.log(getCircleCenter(A, B, C));
