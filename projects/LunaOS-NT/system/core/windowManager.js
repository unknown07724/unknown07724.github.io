// system/core/windowManager.js

function createWindow(appName, content) {
    const windowElement = document.createElement('div');
    windowElement.className = 'window';
    windowElement.innerHTML = `
        <div class="window-header">
            <span>${appName}</span>
            <button onclick="closeWindow(this)">X</button>
        </div>
        <div class="window-content">
            ${content}
        </div>
    `;
    document.body.appendChild(windowElement);

    // Additional window management code
}

function closeWindow(button) {
    const windowElement = button.closest('.window');
    document.body.removeChild(windowElement);
}

