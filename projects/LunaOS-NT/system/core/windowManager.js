// system/core/windowManager.js

let zIndexCounter = 1;

function createWindow(appName, content) {
    const windows = document.getElementById('windows');
    
    const windowElement = document.createElement('div');
    windowElement.classList.add('window');
    windowElement.style.zIndex = zIndexCounter++;
    windowElement.innerHTML = `
        <div class="title-bar">
            <span>${appName}</span>
            <span class="close-btn" onclick="closeWindow(this)">X</span>
        </div>
        <div class="content">
            ${content}
        </div>
    `;

    makeDraggable(windowElement);
    windows.appendChild(windowElement);
}

function closeWindow(closeBtn) {
    const windowElement = closeBtn.closest('.window');
    windowElement.remove();
}

function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    const titleBar = element.querySelector('.title-bar');

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        element.style.zIndex = zIndexCounter++;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}