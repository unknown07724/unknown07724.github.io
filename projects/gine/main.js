class PlayerScript extends Script {
    update() {
        if (this.parent) {
            if (keys.ArrowRight) {
                this.parent.x += 5;
            }
            if (keys.ArrowLeft) {
                this.parent.x -= 5;
            }
            if (keys.ArrowUp) {
                this.parent.y -= 5;
            }
            if (keys.ArrowDown) {
                this.parent.y += 5;
            }
        }
    }
}

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Create a scene
const scene = new Scene();

// Create a player object
const player = new GameObject(50, 50, 50, 50, 'red');
player.addScript(new PlayerScript());
scene.addObject(player);

// Load the scene into the engine
engine.loadScene(scene);

console.log('Game started'); // Debugging line
