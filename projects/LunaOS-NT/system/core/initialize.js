// system/core/initialize.js

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
