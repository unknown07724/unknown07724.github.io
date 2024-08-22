// system/apps/fileManager.js

function getFileManagerContent() {
    return `
        <div>
            <input id="filePath" placeholder="Enter file path" style="width: 80%;">
            <button onclick="loadFile()">Load</button>
            <textarea id="fileContent" style="width: 100%; height: 80%;"></textarea>
            <button onclick="saveFile()">Save</button>
        </div>
    `;
}

function loadFile() {
    const path = document.getElementById('filePath').value;
    const content = getFileContent(path);
    
    if (content !== null) {
        document.getElementById('fileContent').value = content;
    } else {
        alert('File not found');
    }
}

function saveFile() {
    const path = document.getElementById('filePath').value;
    const content = document.getElementById('fileContent').value;
    saveFileContent(path, content);
    alert('File saved');
}
