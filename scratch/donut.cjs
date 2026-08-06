const fs = require('fs');

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
}

function donutSector(cx, cy, r, R, startAngle, endAngle, gap) {
    // To make roughly parallel gaps, we shrink the angles slightly based on the radius
    // gap is the total gap between slices. So we shrink each side of this slice by gap/2.
    // angle shrink = asin((gap/2) / radius) in degrees
    
    // We must ensure we don't shrink more than the slice width
    const minShrink = 0;
    const rShrink = Math.asin((gap/2) / r) * 180 / Math.PI;
    const RShrink = Math.asin((gap/2) / R) * 180 / Math.PI;

    const startR = startAngle + RShrink;
    const endR = endAngle - RShrink;
    const start_r = startAngle + rShrink;
    const end_r = endAngle - rShrink;

    const p1 = polarToCartesian(cx, cy, R, startR); // Outer start
    const p2 = polarToCartesian(cx, cy, R, endR);   // Outer end
    const p3 = polarToCartesian(cx, cy, r, end_r);  // Inner end
    const p4 = polarToCartesian(cx, cy, r, start_r);// Inner start
    
    // The arcs need to go in the correct direction
    const largeArcFlagOuter = endR - startR <= 180 ? "0" : "1";
    const largeArcFlagInner = end_r - start_r <= 180 ? "0" : "1";

    return [
        `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
        `A ${R} ${R} 0 ${largeArcFlagOuter} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
        `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
        `A ${r} ${r} 0 ${largeArcFlagInner} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
        "Z"
    ].join(" ");
}

console.log(donutSector(108, 129, 54, 96, 130, 176.6, 4));
