// Add this to your app.js

const customMenu = document.getElementById('customMenu');
const shatterOption = document.getElementById('shatterOption');
const deleteOption = document.getElementById('deleteOption');

// Show custom context menu on right-click
canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();

    // Position the custom menu
    customMenu.style.top = `${event.clientY}px`;
    customMenu.style.left = `${event.clientX}px`;
    customMenu.style.display = 'block';
});

// Hide the context menu if clicking outside
document.addEventListener('click', function() {
    customMenu.style.display = 'none';
});

// Handle the "Shatter" option
shatterOption.addEventListener('click', function() {
    shatterImage();
    customMenu.style.display = 'none';
});

// Handle the "Delete" option
deleteOption.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    customMenu.style.display = 'none';
});
