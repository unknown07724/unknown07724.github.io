//this is the API for apps

// Global array to keep track of open windows
let openWindows = [];

// Function to open a new window
function openWindow(windowTitle, content) {
    const windowId = `window-${openWindows.length + 1}`;

    // Create a new window div
    const windowDiv = document.createElement('div');
    windowDiv.classList.add('window');
    windowDiv.setAttribute('id', windowId);
    windowDiv.innerHTML = `
        <div class="window-header">
            <span class="window-title">${windowTitle}</span>
            <button class="window-close" onclick="closeWindow('${windowId}')">X</button>
        </div>
        <div class="window-content">${content}</div>
    `;

    // Apply some basic styles
    windowDiv.style.position = 'absolute';
    windowDiv.style.top = `${100 + openWindows.length * 30}px`;
    windowDiv.style.left = `${100 + openWindows.length * 30}px`;
    windowDiv.style.width = '300px';
    windowDiv.style.height = '200px';
    windowDiv.style.backgroundColor = '#fff';
    windowDiv.style.border = '1px solid #ccc';
    windowDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    windowDiv.style.zIndex = 1000 + openWindows.length;

    // Add the window to the body
    document.body.appendChild(windowDiv);

    // Add window ID to the list of open windows
    openWindows.push(windowId);

    // Update the taskbar with the open windows
    updateTaskbar();
}

// Function to close a window
function closeWindow(windowId) {
    const windowDiv = document.getElementById(windowId);
    if (windowDiv) {
        document.body.removeChild(windowDiv);
        openWindows = openWindows.filter(id => id !== windowId);
        updateTaskbar();
    }
}

// Function to update taskbar
function updateTaskbar() {
    const taskbar = document.querySelector('.open-windows');
    taskbar.innerHTML = ''; // Clear existing buttons

    openWindows.forEach(windowId => {
        const windowDiv = document.getElementById(windowId);
        if (windowDiv) {
            const windowTitle = windowDiv.querySelector('.window-title').innerText;
            const button = document.createElement('button');
            button.innerText = windowTitle;
            button.onclick = () => bringWindowToFront(windowId);
            taskbar.appendChild(button);
        }
    });
}

// Function to bring window to front
function bringWindowToFront(windowId) {
    const windowDiv = document.getElementById(windowId);
    if (windowDiv) {
        // Increase z-index to bring it to front
        windowDiv.style.zIndex = Math.max(...openWindows.map(id => parseInt(document.getElementById(id).style.zIndex))) + 1;
    }
}