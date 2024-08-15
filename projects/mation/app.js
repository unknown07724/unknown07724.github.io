// app.js

const imageUploader = document.getElementById('imageUploader');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let image = new Image();

imageUploader.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        image.src = e.target.result;
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Add this to app.js

canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    shatterImage();
});

function shatterImage() {
    const pieces = [];
    const pieceSize = 30;

    for (let x = 0; x < canvas.width; x += pieceSize) {
        for (let y = 0; y < canvas.height; y += pieceSize) {
            pieces.push({
                sx: x,
                sy: y,
                dx: x,
                dy: y,
                xSpeed: (Math.random() - 0.5) * 10,
                ySpeed: (Math.random() - 0.5) * 10
            });
        }
    }

    animatePieces(pieces);
}

function animatePieces(pieces) {
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(piece => {
            ctx.drawImage(image, piece.sx, piece.sy, 30, 30, piece.dx, piece.dy, 30, 30);
            piece.dx += piece.xSpeed;
            piece.dy += piece.ySpeed;
        });

        requestAnimationFrame(draw);
    }

    draw();
}
