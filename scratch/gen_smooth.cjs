const fs = require('fs');

const cx = 111;
const cy = 136;
const r = 57;

const points = [];
// Generate points for the inner contour.
// Since it's a contour, we just sample it by angle from RING_CENTER (108.07, 114.62)
// Wait, we need the points to be at specific angles from RING_CENTER so that sampleContour works correctly!
// For each angle from 130 to 410 from RING_CENTER, we find the intersection with the offset circle.

const rx = 108.07;
const ry = 114.62;

for (let a = 130; a <= 410; a += 1) {
  const rad = a * Math.PI / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  
  // Ray from (rx, ry) in direction (dx, dy). Intersect with circle (cx, cy, r).
  // Line: x = rx + t*dx, y = ry + t*dy
  // Circle: (x - cx)^2 + (y - cy)^2 = r^2
  // (rx - cx + t*dx)^2 + (ry - cy + t*dy)^2 = r^2
  
  const ox = rx - cx;
  const oy = ry - cy;
  
  const A = dx*dx + dy*dy; // 1
  const B = 2 * (ox*dx + oy*dy);
  const C = ox*ox + oy*oy - r*r;
  
  const det = B*B - 4*A*C;
  if (det >= 0) {
    const t = (-B + Math.sqrt(det)) / (2*A); // take the positive intersection
    const px = rx + t*dx;
    const py = ry + t*dy;
    points.push(`[${px.toFixed(2)}, ${py.toFixed(2)}]`);
  } else {
    // If no intersection, fallback to something
    points.push(`[0, 0]`);
  }
}

fs.writeFileSync('/tmp/brain2_smooth_inner.txt', `export const BRAIN2_INNER_CONTOUR: readonly (readonly [number, number])[] = [${points.join(', ')}];\n`);
