let scripts = {};
let currentScript = null;
let isDirty = false;

function addScript(name) {
    if (scripts[name]) {
        alert('A script with this name already exists.');
        return;
    }
    scripts[name] = '';
    currentScript = name;
    updateScriptList();
    document.getElementById('scriptEditor').value = '';
}

function selectScript(name) {
    if (isDirty && !confirm('You have unsaved changes. Do you want to discard them?')) {
        return;
    }
    currentScript = name;
    document.getElementById('scriptEditor').value = scripts[name];
    isDirty = false;
}

function updateScriptList() {
    const scriptList = document.getElementById('scriptList');
    scriptList.innerHTML = '';
    for (const scriptName in scripts) {
        const button = document.createElement('button');
        button.textContent = scriptName;
        button.addEventListener('click', () => selectScript(scriptName));
        scriptList.appendChild(button);
    }
}

function saveCurrentScript() {
    if (currentScript) {
        scripts[currentScript] = document.getElementById('scriptEditor').value;
    }
}

document.getElementById('addScriptButton').addEventListener('click', () => {
    const name = prompt('Enter script name:');
    if (name) addScript(name);
});

document.getElementById('scriptEditor').addEventListener('input', () => {
    isDirty = true;
});

document.getElementById('runScript').addEventListener('click', () => {
    saveCurrentScript();
    if (currentScript) {
        eval(scripts[currentScript]);
    }
});

document.getElementById('examplesDropdown').addEventListener('change', (event) => {
    const selectedExample = event.target.value;
    if (isDirty && !confirm('You have unsaved changes. Do you want to discard them and load the example?')) {
        event.target.value = ''; // Reset dropdown if user cancels
        return;
    }
    if (selectedExample === 'combined') {
        loadCombinedExample();
    } else {
        loadExample(selectedExample);
    }
    isDirty = false; // Reset unsaved changes flag
});

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
        case 'combined':
            loadCombinedExample();
            break;
        default:
            document.getElementById('scriptEditor').value = '';
    }
}

function loadCombinedExample() {
    document.getElementById('scriptEditor').value = `
class CircleObject extends GameObject {
    draw(context) {
        drawCircle(context, this.x, this.y, this.width / 2, 'blue');
    }
}

class HalfCircleObject extends GameObject {
    draw(context) {
        drawHalfCircle(context, this.x, this.y, this.width / 2, 'green', true);
    }
}

class HexagonObject extends GameObject {
    draw(context) {
        drawHexagon(context, this.x, this.y, this.width / 2, 'red');
    }
}

const scene = new Scene();

const circle = new CircleObject(100, 100, 50, 50, 'blue');
scene.addObject(circle);

const halfCircle = new HalfCircleObject(200, 200, 50, 50, 'green');
scene.addObject(halfCircle);

const hexagon = new HexagonObject(300, 300, 50, 50, 'red');
scene.addObject(hexagon);

const engine = new Engine();
engine.loadScene(scene);
`;
}

let scriptInterval = null;  // Variable to store the script interval

// Run the script
document.getElementById('runScript').addEventListener('click', () => {
    const scriptContent = document.getElementById('scriptEditor').value;

    // Clear any existing interval
    if (scriptInterval) {
        clearInterval(scriptInterval);
    }

    // Create a new script function
    try {
        const scriptFunction = new Function('canvas', 'ctx', scriptContent);
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Set an interval to run the script
        scriptInterval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before each run
            scriptFunction(canvas, ctx);
        }, 1000 / 60); // Run at 60 FPS
    } catch (e) {
        console.error('Script error:', e);
    }
});

// Stop the script
document.getElementById('stopScript').addEventListener('click', () => {
    if (scriptInterval) {
        clearInterval(scriptInterval);
        scriptInterval = null;
    }
});

// Function to handle example selection
document.getElementById('examplesDropdown').addEventListener('change', function() {
    const example = this.value;
    let exampleScript = '';

    switch (example) {
        case 'movingCircle':
            exampleScript = `
                // Initialize variables
                let x = 50;
                let y = 50;
                let dx = 2;
                let dy = 2;
                const radius = 20;
                
                // Draw function
                function draw() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
                    drawCircle(ctx, x, y, radius, 'blue'); // Draw the circle
                    x += dx; // Update x position
                    y += dy; // Update y position
                    
                    // Bounce off the walls
                    if (x + radius > canvas.width || x - radius < 0) dx = -dx;
                    if (y + radius > canvas.height || y - radius < 0) dy = -dy;
                }

                // Continuously call the draw function
                draw();
            `;
            break;
        // Add other cases for different examples
        default:
            exampleScript = '';
            break;
    }

    document.getElementById('scriptEditor').value = exampleScript;
});

