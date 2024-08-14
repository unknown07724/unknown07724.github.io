let isDirty = false; // Track unsaved changes

document.getElementById('runScript').addEventListener('click', () => {
    const scriptContent = document.getElementById('scriptEditor').value;
    runUserScript(scriptContent);
    isDirty = false; // Reset unsaved changes flag
});

document.getElementById('exportProject').addEventListener('click', () => {
    const scriptContent = document.getElementById('scriptEditor').value;
    exportProjectAsZip(scriptContent);
    isDirty = false; // Reset unsaved changes flag
});

document.getElementById('scriptEditor').addEventListener('input', () => {
    isDirty = true; // Mark as having unsaved changes
});

document.getElementById('examplesDropdown').addEventListener('change', (event) => {
    const selectedExample = event.target.value;
    if (isDirty && !confirm('You have unsaved changes. Do you want to discard them and load the example?')) {
        event.target.value = ''; // Reset dropdown if user cancels
        return;
    }
    loadExample(selectedExample);
    isDirty = false; // Reset unsaved changes flag
});

function runUserScript(scriptContent) {
    // Remove any previous user scripts
    const oldScript = document.querySelector('script[data-type="userScript"]');
    if (oldScript) {
        oldScript.remove();
    }

    // Create a new script element for the user's script
    const userScript = document.createElement('script');
    userScript.textContent = scriptContent;
    userScript.setAttribute('data-type', 'userScript');
    document.body.appendChild(userScript);
}

function exportProjectAsZip(scriptContent) {
    const zip = new JSZip();

    // HTML template with external JavaScript files
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gine - Exported Project</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            background-color: #000;
            color: #fff;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        #gameCanvas {
            background-color: #333;
            border: 2px solid #fff;
            flex-grow: 1;
            width: 100%;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>

    <script src="engine.js"></script>
    <script src="utils.js"></script>
    <script src="main.js"></script>
</body>
</html>
`;

    // Add HTML and user script to the ZIP
    zip.file("index.html", htmlContent);
    zip.file("main.js", scriptContent);

    // Simulate the inclusion of engine.js and utils.js (in a real scenario, these files should be added to the ZIP)
    zip.file("engine.js", "/* Simulated engine.js content */");
    zip.file("utils.js", "/* Simulated utils.js content */");

    // Generate the ZIP file
    zip.generateAsync({ type: "blob" }).then(function(content) {
        // Create a download link
        const a = document.createElement('a');
        const url = URL.createObjectURL(content);
        a.href = url;
        a.download = 'Gine_Project.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

function loadExample(example) {
    switch (example) {
        case 'circle':
            loadCircleExample();
            break;
        case 'halfCircle':
            loadHalfCircleExample();
            break;
        case 'hexagon':
            loadHexagonExample();
            break;
        default:
            document.getElementById('scriptEditor').value = '';
    }
}

// Example scripts loaded from functions
function loadCircleExample() {
    document.getElementById('scriptEditor').value = `
class CircleObject extends GameObject {
    draw(context) {
        drawCircle(context, this.x, this.y, this.width / 2, 'blue');
    }
}

const scene = new Scene();
const circle = new CircleObject(100, 100, 50, 50, 'blue');
scene.addObject(circle);

const engine = new Engine();
engine.loadScene(scene);
    `;
}

function loadHalfCircleExample() {
    document.getElementById('scriptEditor').value = `
class HalfCircleObject extends GameObject {
    draw(context) {
        drawHalfCircle(context, this.x, this.y, this.width / 2, 'green', true);
    }
}

const scene = new Scene();
const halfCircle = new HalfCircleObject(200, 200, 50, 50, 'green');
scene.addObject(halfCircle);

const engine = new Engine();
engine.loadScene(scene);
    `;
}

function loadHexagonExample() {
    document.getElementById('scriptEditor').value = `
class HexagonObject extends GameObject {
    draw(context) {
        drawHexagon(context, this.x, this.y, this.width / 2, 'red');
    }
}

const scene = new Scene();
const hexagon = new HexagonObject(300, 300, 50, 50, 'red');
scene.addObject(hexagon);

const engine = new Engine();
engine.loadScene(scene);
    `;
}
