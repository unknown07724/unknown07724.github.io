// Add this to your app.js

// app.js

const imageUploader = document.getElementById('imageUploader');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const customMenu = document.getElementById('customMenu');
const shatterOption = document.getElementById('shatterOption');
const deleteOption = document.getElementById('deleteOption');

let images = [];
let selectedImage = null;

canvas.width = 800;
canvas.height = 600;

// Handle image upload
imageUploader.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            const imageObj = {
                img: img,
                x: 50,
                y: 50,
                width: img.width,
                height: img.height,
                rotation: 0
            };
            images.push(imageObj);
            drawImages();
        };
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Draw all images on the canvas
function drawImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    images.forEach(imageObj => {
        ctx.save();
        ctx.translate(imageObj.x + imageObj.width / 2, imageObj.y + imageObj.height / 2);
        ctx.rotate(imageObj.rotation * Math.PI / 180);
        ctx.drawImage(imageObj.img, -imageObj.width / 2, -imageObj.height / 2, imageObj.width, imageObj.height);
        ctx.restore();
    });
}

// Detect click on an image and select it
canvas.addEventListener('mousedown', function(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    selectedImage = null;

    for (let i = images.length - 1; i >= 0; i--) { // Iterate in reverse to select the topmost image
        const imageObj = images[i];
        const x = imageObj.x;
        const y = imageObj.y;
        const width = imageObj.width;
        const height = imageObj.height;

        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(imageObj.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.rect(-width / 2, -height / 2, width, height);
        ctx.restore();

        if (ctx.isPointInPath(mouseX, mouseY)) {
            selectedImage = imageObj;
            break;
        }
    }

    if (selectedImage) {
        canvas.addEventListener('mousemove', moveImage);
        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', moveImage);
        });
    }
});

// Move the selected image
function moveImage(event) {
    if (selectedImage) {
        selectedImage.x = event.offsetX - selectedImage.width / 2;
        selectedImage.y = event.offsetY - selectedImage.height / 2;
        drawImages();
    }
}

// Rotate the selected image using the arrow keys
document.addEventListener('keydown', function(event) {
    if (selectedImage) {
        if (event.key === 'ArrowLeft') {
            selectedImage.rotation -= 5;
        } else if (event.key === 'ArrowRight') {
            selectedImage.rotation += 5;
        }
        drawImages();
    }
});

// Show custom context menu on right-click
canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    if (selectedImage) {
        customMenu.style.top = `${event.clientY}px`;
        customMenu.style.left = `${event.clientX}px`;
        customMenu.style.display = 'block';
    }
});

// Hide the context menu if clicking outside
document.addEventListener('click', function() {
    customMenu.style.display = 'none';
});

// Handle the "Shatter" option
shatterOption.addEventListener('click', function() {
    if (selectedImage) {
        shatterImage(selectedImage);
        customMenu.style.display = 'none';
    }
});

// Handle the "Delete" option
deleteOption.addEventListener('click', function() {
    if (selectedImage) {
        images = images.filter(img => img !== selectedImage);
        selectedImage = null;
        drawImages();
        customMenu.style.display = 'none';
    }
});

// Shatter effect for the selected image
function shatterImage(imageObj) {
    const pieces = [];
    const pieceSize = 30;

    for (let x = 0; x < imageObj.width; x += pieceSize) {
        for (let y = 0; y < imageObj.height; y += pieceSize) {
            pieces.push({
                sx: x,
                sy: y,
                dx: imageObj.x + x,
                dy: imageObj.y + y,
                xSpeed: (Math.random() - 0.5) * 10,
                ySpeed: (Math.random() - 0.5) * 10,
                rotation: imageObj.rotation,
                img: imageObj.img
            });
        }
    }

    animateShatter(pieces);
    images = images.filter(img => img !== imageObj);
}

// Animate the shattering pieces
function animateShatter(pieces) {
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(piece => {
            ctx.save();
            ctx.translate(piece.dx + pieceSize / 2, piece.dy + pieceSize / 2);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.drawImage(piece.img, piece.sx, piece.sy, pieceSize, pieceSize, -pieceSize / 2, -pieceSize / 2, pieceSize, pieceSize);
            ctx.restore();
            piece.dx += piece.xSpeed;
            piece.dy += piece.ySpeed;
        });

        if (pieces.some(piece => piece.dx > 0 && piece.dx < canvas.width && piece.dy > 0 && piece.dy < canvas.height)) {
            requestAnimationFrame(draw);
        }
    }

    draw();
}

