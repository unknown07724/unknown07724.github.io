// by unknown07724
// canvas shape drawing tools module

function drawcircle(x,y,r) {
ctx.beginPath();
ctx.arc(x, y, r, 0, 2 * Math.PI);
ctx.stroke();
}
