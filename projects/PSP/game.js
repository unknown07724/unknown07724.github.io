// Game Variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const launchButton = document.getElementById("launchRocket");
const exploreButton = document.getElementById("exploreBunker");
const rocketSelect = document.getElementById("rocketSelect");

const techLevelDisplay = document.getElementById("techLevel");
const researchPointsDisplay = document.getElementById("researchPoints");

canvas.width = 800;
canvas.height = 600;

let rocketLaunched = false;
let exploringBunker = false;
let bunkerFound = false;
let humanAlive = false;
let rocketData = {};
let researchPoints = 0;
let techLevel = 1; // Starting tech level
let unlockDrills = false; // Drills are unlocked when tech level reaches 5
let availableRockets = {}; // Store available rockets

// Rockets and Tech Tree
const techTree = {
    1: [
        { name: "Simple Rocket Science", unlocked: true }, // already unlocked
    ],
    2: [
        { name: "Rocket 2 (Orbit)", unlocked: false, pointsRequired: 100 },
        { name: "Rocket 3 (Planetary)", unlocked: false, pointsRequired: 200 }
    ],
    3: [
        { name: "Rocket 4 (Long Range)", unlocked: false, pointsRequired: 300 },
    ],
    4: [
        { name: "Rocket 5 (Super Long Range)", unlocked: false, pointsRequired: 400 },
    ],
    5: [
        { name: "Drills", unlocked: false, pointsRequired: 500 },  // Tech level 5: Drills for exploring bunkers
    ]
};

// Rockets
const rockets = {
    level1: {
        name: "Rocket 1 (Basic)",
        speed: 1,
        fuel: 50,
        design: "blue",
        canReachOrbit: false,
        canTravelPlanets: false
    },
    level2: {
        name: "Rocket 2 (Orbit)",
        speed: 2,
        fuel: 100,
        design: "green",
        canReachOrbit: true,
        canTravelPlanets: false
    },
    level3: {
        name: "Rocket 3 (Planetary)",
        speed: 3,
        fuel: 200,
        design: "red",
        canReachOrbit: true,
        canTravelPlanets: true
    },
    level4: {
        name: "Rocket 4 (Long Range)",
        speed: 4,
        fuel: 300,
        design: "yellow",
        canReachOrbit: true,
        canTravelPlanets: true
    },
    level5: {
        name: "Rocket 5 (Super Long Range)",
        speed: 5,
        fuel: 500,
        design: "purple",
        canReachOrbit: true,
        canTravelPlanets: true
    }
};

// Planets and Locations
const planets = [
    { name: "Earth", x: 600, y: 300, radius: 50, description: "The birthplace of humanity, now home to the remains." },
    { name: "Mars", x: 500, y: 250, radius: 40, description: "Mars, where the rovers are still exploring." },
    { name: "Titan", x: 700, y: 150, radius: 30, description: "Titan, a moon of Saturn, full of methane lakes." }
];

// Bunker exploration logic
const bunker = {
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height - 100) + 100,
    width: 100,
    height: 50,
    color: "gray",
    found: false
};

// Game Functions

// Rocket launch
function launchRocket() {
    if (!rocketLaunched) {
        rocketLaunched = true;
        rocketData.fuel -= 1; // Consume fuel for each frame
        researchPoints += 10; // Earn research points by launching
        checkTechLevel();
    }
    if (rocketData.fuel <= 0) {
        rocketLaunched = false;
        alert("Out of fuel! Rocket returned to base.");
        rocketData.y = 500;  // Reset rocket position
        rocketData.fuel = rocketData.initialFuel; // Refill fuel
    }
    rocketData.y -= rocketData.speed;  // Launch the rocket upwards
    if (rocketData.y <= 0) {
        rocketLaunched = false;
        alert("Rocket launched successfully to space!");
        rocketData.y = 500;  // Reset rocket position
    }
}

// Bunker Exploration
function exploreBunker() {
    if (unlockDrills && !bunker.found) {
        bunker.found = true;
        bunkerFound = true;
        // Random outcome: 50% chance of finding a human alive or nothing
        humanAlive = Math.random() > 0.5;
        alert(humanAlive ? "You found a human alive in the bunker!" : "You found nothing of use.");
    } else if (!unlockDrills) {
        alert("You need drills (Tech Level 5) to explore bunkers!");
    }
}

// Check Tech Level and Unlock Features
function checkTechLevel() {
    for (let level in techTree) {
        if (techLevel >= level) {
            techTree[level].forEach((tech, index) => {
                if (researchPoints >= tech.pointsRequired && !tech.unlocked) {
                    tech.unlocked = true;
                    alert(`Unlocked: ${tech.name}`);
                    if (level == 2 && tech.name === "Rocket 2 (Orbit)") {
                        availableRockets.level2 = rockets.level2;
                    } else if (level == 2 && tech.name === "Rocket 3 (Planetary)") {
                        availableRockets.level3 = rockets.level3;
                    } else if (level == 3 && tech.name === "Rocket 4 (Long Range)") {
                        availableRockets.level4 = rockets.level4;
                    } else if (level == 4 && tech.name === "Rocket 5 (Super Long Range)") {
                        availableRockets.level5 = rockets.level5;
                    } else if (level == 5 && tech.name === "Drills") {
                        unlockDrills = true;
                    }
                    updateRocketSelect();
                }
            });
        }
    }

    techLevelDisplay.textContent = `Tech Level: ${techLevel}`;
    researchPointsDisplay.textContent = `Research Points: ${researchPoints}`;
}

// Update Rocket Select
function updateRocketSelect() {
    rocketSelect.innerHTML = "";
    for (let level in availableRockets) {
        let option = document.createElement("option");
        option.value = level;
        option.textContent = availableRockets[level].name;
        rocketSelect.appendChild(option);
    }
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Bunker
    ctx.fillStyle = bunker.color;
    ctx.fillRect(bunker.x, bunker.y, bunker.width, bunker.height);

    // Draw Planets
    planets.forEach(planet => {
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#00ff00"; // Green planet
        ctx.fill();
        ctx.closePath();
    });

    // Draw Rocket if launched
    if (rocketLaunched) {
        ctx.fillStyle = rocketData.design;
        ctx.fillRect(rocketData.x, rocketData.y, 20, 40);  // Draw rocket as a rectangle
    }

    requestAnimationFrame(gameLoop);
}

// Initialize Game
function init() {
    rocketData = {
        x: 400,
        y: 500,
        speed: 5,
        fuel: 50,
        initialFuel: 50,
        design: "blue"
    };

    // Set initial available rocket
    availableRockets.level1 = rockets.level1;

    // Update Rocket Select
    updateRocketSelect();

    launchButton.addEventListener("click", launchRocket);
    exploreButton.addEventListener("click", exploreBunker);

    gameLoop();
}

init();
