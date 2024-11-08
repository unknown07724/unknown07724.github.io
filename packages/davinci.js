// by unknown07724
// canvas shape drawing tools module

function drawcircle(x,y,r) {
ctx.beginPath();
ctx.arc(x, y, r, 0, 2 * Math.PI);
ctx.stroke();
}

function draw_colored_circle(x,y,r,fill_color,line_width,stroke_style) {
  ctx.beginPath();
ctx.arc(x, y, r, 0, 2 * Math.PI);
ctx.fillStyle = "fill_color";
ctx.fill();
ctx.lineWidth = line_width;
ctx.strokeStyle = stroke_style;
ctx.stroke();
}

function draw_half_circle(x,y,r,color) {
  ctx.beginPath();
ctx.arc(x, y, r, 0, Math.PI);
ctx.fillStyle = "color";
ctx.fill();
ctx.stroke();
}
