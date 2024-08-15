// utils.js


function isKeyDown(key) {
        return this.keys[key] === true;
    }

    // Check if a key was just released
    function isKeyUp(key) {
        return this.keys[key] === false;
    }

    // Handle an action when a specific key is pressed
    function onKeyPress(key, action) {
        window.addEventListener('keydown', (event) => {
            if (event.key === key) {
                action();
            }
        });
    }

    // Handle an action when a specific key is released
    function onKeyRelease(key, action) {
        window.addEventListener('keyup', (event) => {
            if (event.key === key) {
                action();
            }
        });
    }



/**
 * Draws a circle on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} x - The x coordinate of the center of the circle.
 * @param {number} y - The y coordinate of the center of the circle.
 * @param {number} radius - The radius of the circle.
 * @param {string} color - The color of the circle.
 */
function drawCircle(ctx, x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

/**
 * Draws a half circle on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} x - The x coordinate of the center of the half circle.
 * @param {number} y - The y coordinate of the center of the half circle.
 * @param {number} radius - The radius of the half circle.
 * @param {string} color - The color of the half circle.
 * @param {boolean} top - If true, draw the top half; otherwise, draw the bottom half.
 */
function drawHalfCircle(ctx, x, y, radius, color, top) {
    ctx.beginPath();
    ctx.arc(x, y, radius, top ? Math.PI : 0, top ? 0 : Math.PI);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

/**
 * Draws a hexagon on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} x - The x coordinate of the center of the hexagon.
 * @param {number} y - The y coordinate of the center of the hexagon.
 * @param {number} radius - The radius of the hexagon.
 * @param {string} color - The color of the hexagon.
 */
function drawHexagon(ctx, x, y, radius, color) {
    const angle = Math.PI / 3; // 60 degrees
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + radius * Math.cos(angle * i), y + radius * Math.sin(angle * i));
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

/**
 * Draws a rectangle on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} x - The x coordinate of the top-left corner of the rectangle.
 * @param {number} y - The y coordinate of the top-left corner of the rectangle.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @param {string} color - The fill color of the rectangle.
 * @param {string} borderColor - The color of the border (optional).
 */
function drawRect(ctx, x, y, width, height, color, borderColor) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    if (borderColor) {
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(x, y, width, height);
    }
}

/**
 * Draws a line on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} x1 - The x coordinate of the start point.
 * @param {number} y1 - The y coordinate of the start point.
 * @param {number} x2 - The x coordinate of the end point.
 * @param {number} y2 - The y coordinate of the end point.
 * @param {string} color - The color of the line.
 */
function drawLine(ctx, x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
}

/**
 * Draws text on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {string} text - The text to draw.
 * @param {number} x - The x coordinate of the text.
 * @param {number} y - The y coordinate of the text.
 * @param {string} color - The color of the text.
 * @param {string} font - The font style (optional).
 */
function drawText(ctx, text, x, y, color, font) {
    ctx.fillStyle = color;
    if (font) ctx.font = font;
    ctx.fillText(text, x, y);
}

/**
 * Clears the entire canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/**
 * Draws a polygon on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} x - The x coordinate of the center of the polygon.
 * @param {number} y - The y coordinate of the center of the polygon.
 * @param {number} radius - The radius of the polygon.
 * @param {number} sides - The number of sides of the polygon.
 * @param {string} color - The color of the polygon.
 */
function drawPolygon(ctx, x, y, radius, sides, color) {
    const angle = (2 * Math.PI) / sides;
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        ctx.lineTo(x + radius * Math.cos(angle * i), y + radius * Math.sin(angle * i));
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

/**
 * Draws an arc on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} x - The x coordinate of the center of the arc.
 * @param {number} y - The y coordinate of the center of the arc.
 * @param {number} radius - The radius of the arc.
 * @param {number} startAngle - The start angle of the arc in radians.
 * @param {number} endAngle - The end angle of the arc in radians.
 * @param {boolean} counterClockwise - If true, draw the arc counter-clockwise.
 * @param {string} color - The color of the arc.
 */
function drawArc(ctx, x, y, radius, startAngle, endAngle, counterClockwise, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    ctx.strokeStyle = color;
    ctx.stroke();
}

/**
 * Converts degrees to radians.
 * @param {number} degrees - The angle in degrees.
 * @return {number} The angle in radians.
 */
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees.
 * @param {number} radians - The angle in radians.
 * @return {number} The angle in degrees.
 */
function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

/**
 * Clamps a value between a minimum and maximum value.
 * @param {number} value - The value to clamp.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @return {number} The clamped value.
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Computes the distance between two points.
 * @param {number} x1 - The x coordinate of the first point.
 * @param {number} y1 - The y coordinate of the first point.
 * @param {number} x2 - The x coordinate of the second point.
 * @param {number} y2 - The y coordinate of the second point.
 * @return {number} The distance between the two points.
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
