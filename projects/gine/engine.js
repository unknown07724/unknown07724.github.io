// Game Engine Code

class GameObject {
    constructor(imageSrc, x = 0, y = 0, width = 50, height = 50, rotation = 0, isPhysical = false, methods = {}) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.isPhysical = isPhysical;  // Whether the object has physical properties
        this.methods = methods;  // Custom methods that can be executed
        this.isSelected = false; // To track if the object is selected
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();

        if (this.isSelected) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    setPosition(x, y) {
        this.x = x;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    setRotation(rotation) {
        this.rotation = rotation;
    }

    toggleSelection() {
        this.isSelected = !this.isSelected;
    }

    isInside(x, y) {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }

    runMethod(methodName, ...args) {
        if (this.methods[methodName]) {
            return this.methods[methodName](...args);
        }
        console.error(`Method ${methodName} not found on object.`);
    }

    checkCollision(otherObject) {
        if (!this.isPhysical || !otherObject.isPhysical) return false;

        return !(
            this.x > otherObject.x + otherObject.width ||
            this.x + this.width < otherObject.x ||
            this.y > otherObject.y + otherObject.height ||
            this.y + this.height < otherObject.y
        );
    }

    delete() {
        const index = gameObjects.indexOf(this);
        if (index > -1) {
            gameObjects.splice(index, 1);
        }
    }
}

// Utility function to create a new game object
function createGameObject(imageSrc, x, y, width, height, rotation, isPhysical, methods) {
    const newObject = new GameObject(imageSrc, x, y, width, height, rotation, isPhysical, methods);
    gameObjects.push(newObject);
    return newObject;
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

     draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();

        // Draw selection outline if selected
        if (this.isSelected) {
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
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

