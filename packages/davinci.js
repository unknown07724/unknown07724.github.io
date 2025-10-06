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
ctx.fillStyle = fill_color;
ctx.fill();
ctx.lineWidth = line_width;
ctx.strokeStyle = stroke_style;
ctx.stroke();
}

function draw_triangle(x1, y1, x2, y2, x3, y3, fill_color, line_width, stroke_style) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fillStyle = fill_color;
  ctx.fill();
  ctx.lineWidth = line_width;
  ctx.strokeStyle = stroke_style;
  ctx.stroke();
}
function draw_polygon(x, y, radius, sides, fill_color, line_width, stroke_style) {
  if(sides < 3) return;
  ctx.beginPath();
  for(let i = 0; i <= sides; i++){
    let angle = (i * 2 * Math.PI) / sides;
    let px = x + radius * Math.cos(angle);
    let py = y + radius * Math.sin(angle);
    if(i===0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill_color;
  ctx.fill();
  ctx.lineWidth = line_width;
  ctx.strokeStyle = stroke_style;
  ctx.stroke();
}
function draw_half_circle(x,y,r,color) {
  ctx.beginPath();
ctx.arc(x, y, r, 0, Math.PI);
ctx.fillStyle = color;
ctx.fill();
ctx.stroke();
}
