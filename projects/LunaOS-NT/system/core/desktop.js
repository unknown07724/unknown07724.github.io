// system/core/desktop.js

function initializeDesktop() {
    const desktop = document.createElement('div');
    desktop.id = 'desktop';
    document.body.appendChild(desktop);

    // Add icons to the desktop
    addAppIcon('Text Editor', 'text-editor', '/icons/text-editor.png');
    addAppIcon('File Manager', 'file-manager', '/icons/file-manager.png');
    addAppIcon('Terminal', 'terminal', '/icons/terminal.png');
}

function addAppIcon(name, appName, iconSrc) {
    const desktop = document.getElementById('desktop');
    const icon = document.createElement('div');
    icon.className = 'app-icon';
    icon.innerHTML = `
        <img src="${iconSrc}" alt="${name}">
        <span>${name}</span>
    `;
    icon.addEventListener('dblclick', () => openApp(appName));
    desktop.appendChild(icon);
}

// Initialize desktop on page load
initializeDesktop();  // Call the function immediately
window.onload = initializeDesktop;  // Still attach it to the event

