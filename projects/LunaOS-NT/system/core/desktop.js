// system/core/desktop.js

// system/core/desktop.js

function openApp(appName) {
    let appPath = `/system/apps/${appName}.html`;
    let appContent = getFileContent(appPath);
    
    if (appContent) {
        createWindow(appName, `<iframe srcdoc="${escapeHTML(appContent)}" style="width: 100%; height: 100%; border: none;"></iframe>`);
    } else {
        createWindow(appName, `<div>App not found</div>`);
    }
}

function escapeHTML(html) {
    return html.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#039;');
}
