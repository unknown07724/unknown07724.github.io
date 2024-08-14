class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.scripts = [];
    }

    addScript(script) {
        script.parent = this;
        this.scripts.push(script);
    }

    update() {
        for (const script of this.scripts) {
            script.update();
        }
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        console.log(`Drawing object at (${this.x}, ${this.y}) with size (${this.width}, ${this.height})`); // Debugging line
    }
}

class Scene {
    constructor() {
        this.gameObjects = [];
    }

    addObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    update() {
        for (const object of this.gameObjects) {
            object.update();
        }
    }

    draw(context) {
        for (const object of this.gameObjects) {
            object.draw(context);
        }
    }
}

class Engine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.scene = null;
        this.init();
    }

    init() {
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
        this.start();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        const loop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(loop);
        };
        loop();
    }

    update() {
        if (this.scene) {
            this.scene.update();
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.scene) {
            this.scene.draw(this.context);
        }
    }

    loadScene(scene) {
        this.scene = scene;
        console.log('Scene loaded with', scene.gameObjects.length, 'objects'); // Debugging line
    }
}

class Script {
    constructor() {
        this.parent = null;
    }

    update() {
        // Implement specific script behavior here
    }
}

// Start the engine
const engine = new Engine();
