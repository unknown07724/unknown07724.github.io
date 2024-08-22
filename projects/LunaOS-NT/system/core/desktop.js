// system/core/desktop.js

function openApp(appName) {
    let content;
    switch(appName) {
        case 'text-editor':
            content = getTextEditorContent();
            break;
        case 'file-manager':
            content = getFileManagerContent();
            break;
        default:
            content = `<div>Unknown App</div>`;
    }
    createWindow(appName, content);
}
