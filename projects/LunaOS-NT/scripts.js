// scripts.js

let zIndexCounter = 1;

function openApp(appName) {
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
            ${getAppContent(appName)}
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

function getAppContent(appName) {
    switch(appName) {
        case 'text-editor':
            return `<textarea style="width: 100%; height: 100%;"></textarea>`;
        case 'file-manager':
            return `<div>File Manager Content</div>`;
        default:
            return `<div>Unknown App</div>`;
    }
}
const OS_API = {
    windows: [],

    // Method to create a new window
    createWindow: function(title, url, width = 400, height = 300) {
        const windowId = `window-${this.windows.length + 1}`;
        const newWindow = document.createElement('div');
        newWindow.className = 'os-window';
        newWindow.id = windowId;
        newWindow.style.width = `${width}px`;
        newWindow.style.height = `${height}px`;

        newWindow.innerHTML = `
            <div class="os-window-title">
                ${title}
                <div class="os-window-close" onclick="OS_API.closeWindow('${windowId}')">✖</div>
            </div>
            <iframe src="${url}" class="os-window-iframe" frameborder="0"></iframe>
        `;
        document.getElementById('desktop').appendChild(newWindow);
        this.windows.push(newWindow);

        // Make the window draggable
        this.makeWindowDraggable(newWindow);
        
           saveFile: function(filePath, content) {
        localStorage.setItem(filePath, content);
        this.log(`File saved: ${filePath}`);
    },

    readFile: function(filePath) {
        const content = localStorage.getItem(filePath);
        if (content === null) {
            throw new Error(`File not found: ${filePath}`);
        }
        return content;
    },

    deleteFile: function(filePath) {
        localStorage.removeItem(filePath);
        this.log(`File deleted: ${filePath}`);
    },

    listFiles: function() {
        const files = [];
        for (let i = 0; i < localStorage.length; i++) {
            files.push(localStorage.key(i));
        }
        return files;
    },
    },

    // Method to close a window
    closeWindow: function(windowId) {
        const windowElement = document.getElementById(windowId);
        if (windowElement) {
            windowElement.remove();
            this.windows = this.windows.filter(win => win.id !== windowId);
        }
    },

    // Method to make a window draggable
    makeWindowDraggable: function(windowElement) {
        let isDragging = false;
        let offsetX, offsetY;

        const titleBar = windowElement.querySelector('.os-window-title');
        titleBar.onmousedown = (e) => {
            isDragging = true;
            offsetX = e.clientX - windowElement.offsetLeft;
            offsetY = e.clientY - windowElement.offsetTop;
            document.onmousemove = (e) => {
                if (isDragging) {
                    windowElement.style.left = `${e.clientX - offsetX}px`;
                    windowElement.style.top = `${e.clientY - offsetY}px`;
                }
            };
            document.onmouseup = () => {
                isDragging = false;
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    },

    // Other methods like log, readFile, writeFile, alert, etc...
};

// Make the API available globally
window.OS_API = OS_API;
