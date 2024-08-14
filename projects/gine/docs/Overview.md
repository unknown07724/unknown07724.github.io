Gine Documentation
# Overview
Welcome to the documentation for Gine — a straightforward, browser-based game engine for creating 2D games using JavaScript. Gine is designed to be easy to use and accessible directly from your browser without any need for installation.

Getting Started
Accessing Gine
Open Gine:

Navigate to Gine to start creating your game. You will be directly thrown into the project editor where you can begin working on your game.
Creating a New Project:


Script Editor: Write and manage your JavaScript code.

Key Features
* 2D Rendering
* Shapes: Use Shapes to represent characters, objects, and backgrounds in your game.
* Scripting with JavaScript
* Basic Syntax
* Variables: Use var, let, or const to declare variables.
* Functions: Define functions with the function keyword.
* Objects: Create and manipulate objects to manage game entities.

````
function update(deltaTime) {
    // Update game logic
}

function render() {
    // Render game visuals
}

function gameLoop() {
    const deltaTime = calculateDeltaTime();
    update(deltaTime);
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();

````
