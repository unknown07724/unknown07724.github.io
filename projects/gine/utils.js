// utils.js

/**
 * Draw a circle on the canvas.
 * @param {CanvasRenderingContext2D} context - The canvas rendering context.
 * @param {number} x - The x-coordinate of the circle's center.
 * @param {number} y - The y-coordinate of the circle's center.
 * @param {number} radius - The radius of the circle.
 * @param {string} color - The fill color of the circle.
 */
function drawCircle(context, x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = '#000'; // Optional: Outline color
    context.stroke();
}

/**
 * Draw a half-circle on the canvas.
 * @param {CanvasRenderingContext2D} context - The canvas rendering context.
 * @param {number} x - The x-coordinate of the half-circle's center.
 * @param {number} y - The y-coordinate of the half-circle's center.
 * @param {number} radius - The radius of the half-circle.
 * @param {string} color - The fill color of the half-circle.
 * @param {boolean} isTop - Whether the half-circle is the top or bottom half.
 */
function drawHalfCircle(context, x, y, radius, color, isTop = true) {
    context.beginPath();
    context.arc(x, y, radius, isTop ? Math.PI : 0, isTop ? 0 : Math.PI);
    context.lineTo(x, y);
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = '#000'; // Optional: Outline color
    context.stroke();
}

// Export functions if using modules
// export { drawCircle, drawHalfCircle };
