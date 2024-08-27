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
            'fileSystem.js': `// fileSystem.js content`
        },
        'system/apps/': {
            'textEditor.html': `
                <html>
                    <body>
                        <h1>Text Editor</h1>
                        <textarea style="width: 100%; height: 90%;"></textarea>
                    </body>
                </html>
            `,
            'fileManager.html': `
                <html>
                    <body>
                        <h1>File Manager</h1>
                        <div id="directoryContents"></div>
                        <script>
                            // File manager logic can be added here
                        </script>
                    </body>
                </html>
            `,
            'terminal.html': `
                <html>
                    <body>
                        <h1>Terminal</h1>
                        <div id="terminalOutput" style="background-color: black; color: white; height: 90%; overflow-y: auto;"></div>
                        <input id="terminalInput" style="width: 100%;" onkeydown="handleTerminalInput(event)">
                        <script>
                            // Terminal logic can be added here
                        </script>
                    </body>
                </html>
            `
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
