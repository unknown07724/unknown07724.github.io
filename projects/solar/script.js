const canvas = document.getElementById('solarSystem');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 1600;
canvas.height = 1600;

// Sun (center of the system)
const sun = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 50,
    color: 'yellow'
};

// Planets and moons data
const planets = [
    {
        name: 'Mercury',
        distance: 150,
        radius: 5,
        color: 'gray',
        speed: 0.9,
        moons: [] // Mercury has no moons
    },
    {
        name: 'Venus',
        distance: 270,
        radius: 10,
        color: 'orange',
        speed: 0.6,
        moons: [] // Venus has no moons
    },
    {
        name: 'Earth',
        distance: 300,
        radius: 12,
        color: 'blue',
        speed: 0.4,
        moons: [
            { distance: 20, radius: 5, color: 'white', speed: 0.2 } // luna
        ]
    },
    {
        name: 'Mars',
        distance: 500,
        radius: 8,
        color: 'red',
        speed: 0.08,
        moons: [
            { distance: 25, radius: 4, color: 'gray', speed: 0.03 }, // Phobos
            { distance: 40, radius: 6, color: 'lightgray', speed: 0.015 } // Deimos
        ]
    },
    {
        name: 'Jupiter',
        distance: 900,
        radius: 25,
        color: 'brown',
        speed: 0.04,
        moons: [
            { distance: 50, radius: 8, color: 'white', speed: 0.01 }, // Io
            { distance: 70, radius: 10, color: 'lightgray', speed: 0.007 } // Europa
        ]
    },
    {
        name: 'Saturn',
        distance: 1200,
        radius: 22,
        color: 'goldenrod',
        speed: 0.002,
        moons: [] // Saturn has moons
    },
    {
        name: 'Uranus',
        distance: 1600,
        radius: 18,
        color: 'lightblue',
        speed: 0.001,
        moons: [] // Uranus has moons
    },
    {
        name: 'Neptune',
        distance: 2500,
        radius: 16,
        color: 'darkblue',
        speed: 0.0008,
        moons: [] // Neptune has moons
    }
];

// Draw the Sun
function drawSun() {
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    ctx.fillStyle = sun.color;
    ctx.fill();
}

// Draw a planet
function drawPlanet(planet, angle) {
    const x = sun.x + planet.distance * Math.cos(angle);
    const y = sun.y + planet.distance * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = planet.color;
    ctx.fill();

    // Draw moons orbiting the planet
    planet.moons.forEach(moon => {
        const moonAngle = moon.speed * Date.now() / 1000;
        const moonX = x + moon.distance * Math.cos(moonAngle);
        const moonY = y + moon.distance * Math.sin(moonAngle);

        ctx.beginPath();
        ctx.arc(moonX, moonY, moon.radius, 0, Math.PI * 2);
        ctx.fillStyle = moon.color;
        ctx.fill();
    });
}

// Animate the solar system
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSun();

    planets.forEach(planet => {
        const angle = planet.speed * Date.now() / 1000; // Orbit speed based on time
        drawPlanet(planet, angle);
    });

    requestAnimationFrame(animate);
}

animate();
