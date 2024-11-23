// History management
let historyList = []; // Store history

// Function to sanitize content and remove dangerous <style> and <script> tags
function sanitizeStyleAndScript(content, tagType) {
    const dangerousTags = [
        `<${tagType}.*?>`,    
        `</${tagType}>`
    ];

    dangerousTags.forEach(tagPattern => {
        const regex = new RegExp(tagPattern, 'gi');
        content = content.replace(regex, '');  
    });

    content = content.replace(/on\w+=".*?"/gi, ''); // Remove inline event handlers
    return content;
}

// Function to apply CSS safely from content
function applyStylePipeline(htmlContent) {
    const sanitizedHtml = sanitizeStyleAndScript(htmlContent, 'style');
    return `<style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .lizard-container { padding: 20px; border: 1px solid #ccc; }
    </style>` + sanitizedHtml;
}

// Function to handle new tab opening
function openNewTab() {
    const tabId = 'tab' + Date.now();
    const newTabButton = document.createElement('button');
    newTabButton.textContent = 'Tab ' + tabId;
    newTabButton.onclick = () => loadPage(tabId, 'mixture://newtab');
    document.getElementById('tabs').appendChild(newTabButton);

    loadPage(tabId, 'mixture://newtab');
}

// Function to load a page based on URL or custom content
function loadPage(tabId, url) {
    // Update history
    addHistory(url);

    const tabContent = document.getElementById('tabContent');
    tabContent.innerHTML = applyStylePipeline(`<h1>${url}</h1><p>Content for tab ${tabId} is loading...</p>`);
    
    // Simulate content loading (can be replaced with actual fetch or iframe logic)
    setTimeout(() => {
        tabContent.innerHTML = applyStylePipeline(`<h1>${url}</h1><p>This is your content for ${tabId}.</p>`);
    }, 2000);
}

// Function to add to history
function addHistory(url) {
    if (!historyList.includes(url)) {
        historyList.push(url);
        updateHistory();
    }
}

// Function to update history section
function updateHistory() {
    const historyListContainer = document.getElementById('historyList');
    historyListContainer.innerHTML = ''; // Clear current list
    historyList.forEach(url => {
        const listItem = document.createElement('li');
        listItem.textContent = url;
        historyListContainer.appendChild(listItem);
    });
}

// Function to simulate a download and add it to the download list
function addDownload(filename) {
    const downloadsListContainer = document.getElementById('downloadsList');
    const listItem = document.createElement('li');
    listItem.textContent = `${filename} (Download complete)`;
    downloadsListContainer.appendChild(listItem);
}

// Initialize New Tab Button
document.getElementById('newTabButton').addEventListener('click', openNewTab);

// Optional: Open a default tab on page load
window.onload = () => {
    openNewTab();
};

// Open History section
document.getElementById('historyLink').addEventListener('click', () => {
    document.getElementById('historySection').style.display = 'block';
    document.getElementById('downloadsSection').style.display = 'none';
});

// Open Downloads section
document.getElementById('downloadsLink').addEventListener('click', () => {
    document.getElementById('downloadsSection').style.display = 'block';
    document.getElementById('historySection').style.display = 'none';
});
