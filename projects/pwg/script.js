// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Example cities on the map
    const cities = [
        { name: 'Rome', x: 100, y: 200 },
        { name: 'Carthage', x: 500, y: 400 },
    ];

    // Function to render cities on the map
    function renderCities() {
        const map = document.getElementById('map');
        cities.forEach(city => {
            const cityElement = document.createElement('div');
            cityElement.classList.add('city');
            cityElement.style.left = `${city.x}px`;
            cityElement.style.top = `${city.y}px`;
            cityElement.title = city.name;

            cityElement.addEventListener('click', function() {
                showCityInfo(city.name);
            });

            map.appendChild(cityElement);
        });
    }

    // Function to display city info
    function showCityInfo(name) {
        const infoPanel = document.getElementById('info-panel');
        infoPanel.innerHTML = `<h3>${name}</h3><p>Details about ${name}</p>`;
    }

    // Initialize game
    renderCities();
});
