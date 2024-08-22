// system/core/fileSystem.js

const fileSystem = {
    '/system/core/': {
        'desktop.js': `// desktop.js content`,
        'windowManager.js': `// windowManager.js content`
    },
    '/system/apps/': {
        'textEditor.js': `// textEditor.js content`,
        'fileManager.js': `// fileManager.js content`
    },
    '/files/': {
        'desktop.json': `{"layout": "default"}`,
        'windowManager.json': `{"settings": "default"}`
    }
};

// Function to get file content
function getFileContent(path) {
    const parts = path.split('/');
    let current = fileSystem;

    for (let i = 1; i < parts.length; i++) {
        if (current[parts[i]]) {
            current = current[parts[i]];
        } else {
            return null; // File not found
        }
    }
    return current;
}

// Function to save file content
function saveFileContent(path, content) {
    const parts = path.split('/');
    let current = fileSystem;

    for (let i = 1; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
            current[parts[i]] = {}; // Create directory if it doesn't exist
        }
        current = current[parts[i]];
    }

    current[parts[parts.length - 1]] = content;
}
