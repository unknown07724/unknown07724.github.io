// system/core/fileSystem.js

const fileSystem = {
    '/': {
        'system/': {
            'boot.js': `console.log('Booting OS...');`,
            'kernel.js': `console.log('Loading Kernel...');`,
            'shell.js': `console.log('Starting Shell...');`
        },
        'files/': {
            'documents/': {
                'sample.txt': `This is a sample document.`
            },
            'images/': {
                'background.jpg': `data:image/jpeg;base64,...` // Base64 encoded image
            }
        },
        'system/core/': {
            'desktop.js': `// desktop.js content`,
            'windowManager.js': `// windowManager.js content`,
            'initialize.js': `// initialize.js content`,
            'fileSystem.js': `// fileSystem.js content`
        },
        'system/apps/': {
            'textEditor.js': `// textEditor.js content`,
            'fileManager.js': `// fileManager.js content`,
            'terminal.js': `// terminal.js content`
        },
        'system/files/': {
            'config.json': `{"theme": "dark", "language": "en"}`,
            'userSettings.json': `{"volume": 80, "brightness": 70}`
        }
    }
};

// Function to get file or directory content
function getFileContent(path) {
    const parts = path.split('/');
    let current = fileSystem['/'];

    for (let i = 1; i < parts.length; i++) {
        if (current[parts[i]]) {
            current = current[parts[i]];
        } else {
            return null; // File or directory not found
        }
    }
    return current;
}

// Function to save file content
function saveFileContent(path, content) {
    const parts = path.split('/');
    let current = fileSystem['/'];

    for (let i = 1; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
            current[parts[i]] = {}; // Create directory if it doesn't exist
        }
        current = current[parts[i]];
    }

    current[parts[parts.length - 1]] = content;
}

// Function to list directory contents
function listDirectory(path) {
    const directory = getFileContent(path);
    if (directory && typeof directory === 'object') {
        return Object.keys(directory);
    } else {
        return null; // Not a directory
    }
}
