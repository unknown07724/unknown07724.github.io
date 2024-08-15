// Game Engine Code

class GameObject {
   constructor(imageSrc, x = 0, y = 0, width = 50, height = 50, rotation = 0) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.isSelected = false; // To track if the object is selected
    }

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
document.getElementById('addGameObject').addEventListener('click', () => {
    const fileInput = document.getElementById('textureUpload');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const objectURL = URL.createObjectURL(file);
        
        const newObject = createGameObject(objectURL, 50, 50, 100, 100);
        gameObjects.push(newObject);
    }
});

