const NewtonianGravityExtension = {
    name: 'NewtonianGravity',

    initialize() {
        console.log('Newtonian Gravity Extension Initialized');

        // Add a new property 'mass' to all GameObjects
        EngineExtensions.addObjectProperty('mass', 1);

        // Add a method to apply force to GameObjects
        EngineExtensions.addMethodToGameObject('applyForce', function(ax, ay) {
            this.vx += ax / this.mass;
            this.vy += ay / this.mass;
        });

        // Add a method to the game to simulate gravity
        EngineExtensions.addMethodToGame('applyGravity', function(gravitationalConstant = 1) {
            gameObjects.forEach((objectA, indexA) => {
                if (!objectA.isPhysical) return;

                gameObjects.forEach((objectB, indexB) => {
                    if (indexA !== indexB && objectB.isPhysical) {
                        const dx = objectB.x - objectA.x;
                        const dy = objectB.y - objectA.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance > 0) {
                            const force = (gravitationalConstant * objectA.mass * objectB.mass) / (distance * distance);

                            const ax = (force * dx) / distance;
                            const ay = (force * dy) / distance;

                            objectA.applyForce(ax, ay);
                        }
                    }
                });
            });
        });
    }
};

// Register the extension
EngineExtensions.registerExtension(NewtonianGravityExtension);
