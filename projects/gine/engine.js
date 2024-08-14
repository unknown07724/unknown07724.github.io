class Engine {
    constructor() {
        this.scenes = {};
        this.currentScene = null;
        this.lastTime = 0;
    }

    start() {
        this.lastTime = performance.now();
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        if (this.currentScene) {
            this.currentScene.update(deltaTime);
            this.currentScene.render();
        }

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    createScene(name) {
        const scene = new Scene(name);
        this.scenes[name] = scene;
        return scene;
    }

    switchScene(name) {
        this.currentScene = this.scenes[name];
    }
}

class Scene {
    constructor(name) {
        this.name = name;
        this.gameObjects = [];
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    update(deltaTime) {
        this.gameObjects.forEach(go => go.update(deltaTime));
    }

    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.gameObjects.forEach(go => go.render(ctx));
    }
}

class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.components = [];
    }

    addComponent(component) {
        this.components.push(component);
        component.gameObject = this;
    }

    update(deltaTime) {
        this.components.forEach(c => c.update(deltaTime));
    }

    render(ctx) {
        this.components.forEach(c => c.render(ctx));
    }
}

class Component {
    constructor() {
        this.gameObject = null;
    }

    update(deltaTime) {}
    render(ctx) {}
}
class ScriptComponent extends Component {
    constructor(script) {
        super();
        this.script = script;
    }

    update(deltaTime) {
        if (this.script.update) {
            this.script.update(this.gameObject, deltaTime);
        }
    }

    render(ctx) {
        if (this.script.render) {
            this.script.render(this.gameObject, ctx);
        }
    }
}

// Example of how a game developer might use the scripting component
const myScript = {
    update(gameObject, deltaTime) {
        gameObject.x += 100 * deltaTime / 1000; // Move right
    },
    render(gameObject, ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);
    }
};

const scriptComponent = new ScriptComponent(myScript);
class AssetManager {
    constructor() {
        this.assets = {};
    }

    loadImage(name, src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                this.assets[name] = img;
                resolve(img);
            };
            img.onerror = reject;
        });
    }

    getAsset(name) {
        return this.assets[name];
    }
}
function exportGame() {
    const zip = new JSZip();
    const gameFolder = zip.folder("game");

    // Export engine core
    gameFolder.file("engine.js", generateEngineCode());

    // Export game scripts and assets
    gameFolder.file("game.js", generateGameCode());
    gameFolder.file("index.html", generateHTML());

    zip.generateAsync({type: "blob"}).then((content) => {
        saveAs(content, "game.zip");
    });
}

function generateEngineCode() {
    // Return the string of your engine's code
    return `/* Engine code here */`;
}

function generateGameCode() {
    // Return the string of your game's code
    return `/* Game code here */`;
}

function generateHTML() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Game</title>
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <script src="engine.js"></script>
    <script src="game.js"></script>
</body>
</html>
    `;
}
