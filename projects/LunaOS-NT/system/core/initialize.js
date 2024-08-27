// system/core/initialize.js
const SystemFiles = {
    '/': {
        'system/': {
            'boot.js': { content: `console.log('Booting OS...');`, protected: true },
            'kernel.js': { content: `console.log('Loading Kernel...');`, protected: true },
            'shell.js': { content: `console.log('Starting Shell...');`, protected: true }
        },
        'files/': {
            'documents/': {
                'sample.txt': { content: `This is a sample document.` }
            },
            'images/': {
                'background.jpg': { content: `data:image/jpeg;base64,...` } // Base64 encoded image
            }
        },
        'system/core/': {
            'desktop.js': { content: `// desktop.js content`, protected: true },
            'windowManager.js': { content: `// windowManager.js content`, protected: true },
            'fileSystem.js': { content: `
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
                    return current.content;
                }`, protected: true }
        },
        'system/apps/': {
            'textEditor.html': {
                content: `
                    <html>
                        <body>
                            <h1>Text Editor</h1>
                            <textarea style="width: 100%; height: 90%;"></textarea>
                        </body>
                    </html>
                `
            },
            'fileManager.html': {
                content: `
                    <html>
                        <body>
                            <h1>File Manager</h1>
                            <div id="directoryContents"></div>
                            <script>
                                // File manager logic can be added here
                            </script>
                        </body>
                    </html>
                `
            },
            'terminal.html': {
                content: `
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
    }
};

        }
    }
};
const filesInUse = new Set();

function markFileInUse(path) {
    filesInUse.add(path);
}

function unmarkFileInUse(path) {
    filesInUse.delete(path);
}

function isFileInUse(path) {
    return filesInUse.has(path);
}

// Modify deleteFile function
function deleteFile(path) {
    if (isFileInUse(path)) {
        console.error(`Error: Cannot delete file in use: ${path}`);
        alert(`Error: Cannot delete file in use: ${path}`);
        return;
    }

    // Proceed with deletion logic as before
    // ...
}
function initializeDesktop() {
    for (const path in fileSystem['/']) {
        autoRepairFile(path);
    }

    // Proceed with normal initialization
    console.log("System initialized.");
    // Additional initialization code...
}

function autoRepairFile(path) {
    // Same logic as shown above...
}

window.onload = initializeDesktop;

function initializeDesktop() {
    if (!checkSystemFiles()) {
        cloneSystemFilesToLocalStorage();
        location.reload(); // Reload the page to reinitialize with the cloned files
    } else {
        // Proceed with normal initialization
        console.log("All system files are present.");
        // Continue with the rest of the OS initialization
        // ...
    }
}

function checkSystemFiles() {
    for (const filePath in systemFiles) {
        if (!localStorage.getItem(filePath)) {
            return false; // A system file is missing
        }
    }
    return true; // All system files are present
}

function cloneSystemFilesToLocalStorage() {
    for (const filePath in systemFiles) {
        localStorage.setItem(filePath, systemFiles[filePath]);
    }
    console.log("System files cloned to localStorage.");
}


initializeOS();
