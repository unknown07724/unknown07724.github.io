const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game constants
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 10;
const PADDLE_MARGIN = 24;
const AI_SPEED = 4;

// Game objects
let player = {
    x: PADDLE_MARGIN,
    y: canvas.height/2 - PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: '#4CAF50'
};

let ai = {
    x: canvas.width - PADDLE_MARGIN - PADDLE_WIDTH,
    y: canvas.height/2 - PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: '#F44336'
};

let ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: BALL_RADIUS,
    speed: 6,
    velocityX: 6 * (Math.random() > 0.5 ? 1 : -1),
    velocityY: 4 * (Math.random() > 0.5 ? 1 : -1),
    color: '#FFF'
};

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    ctx.strokeStyle = '#FFF';
    ctx.setLineDash([10, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = ball.speed * (Math.random() > 0.5 ? 1 : -1);
    ball.velocityY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function render() {
    // Clear canvas
    drawRect(0, 0, canvas.width, canvas.height, '#222');
    drawNet();
    // Draw paddles
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
    // Draw ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function update() {
    // Move ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with top/bottom
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY *= -1;
    }

    // Ball collision with player paddle
    if (ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height) {
        ball.x = player.x + player.width + ball.radius; // Prevent sticking
        ball.velocityX *= -1;
        // Add some "spin" based on hit position
        let collidePoint = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
        ball.velocityY = ball.speed * collidePoint;
    }

    // Ball collision with AI paddle
    if (ball.x + ball.radius > ai.x &&
        ball.y > ai.y &&
        ball.y < ai.y + ai.height) {
        ball.x = ai.x - ball.radius; // Prevent sticking
        ball.velocityX *= -1;
        // Add some "spin" based on hit position
        let collidePoint = (ball.y - (ai.y + ai.height / 2)) / (ai.height / 2);
        ball.velocityY = ball.speed * collidePoint;
    }

    // Ball out of bounds (left or right)
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        resetBall();
    }

    // AI paddle movement (basic)
    if (ball.y > ai.y + ai.height / 2) {
        ai.y += AI_SPEED;
    } else if (ball.y < ai.y + ai.height / 2) {
        ai.y -= AI_SPEED;
    }
    // Clamp AI paddle
    ai.y = Math.max(0, Math.min(canvas.height - ai.height, ai.y));
}

function game() {
    update();
    render();
    requestAnimationFrame(game);
}

// Mouse controls for player's paddle
canvas.addEventListener('mousemove', function(evt) {
    let rect = canvas.getBoundingClientRect();
    let mouseY = evt.clientY - rect.top;
    player.y = mouseY - player.height / 2;
    // Clamp paddle
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
});

// Start the game loop
game();