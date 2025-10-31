function renderCalculator() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h2>Planetary Orbital Radius Calculator</h2>
        <div class="calculator">
            <label for="yearLength"> Planet Year Length (days):<br>
                <input type="number" id="yearLength" value="365" min="1" style="width:100px;">
            </label>
            <label for="starClass"> Star Class:<br>
                <select id="starClass" style="width:100px;">
                    ${Object.keys(starData).map(cls => `<option value="${cls}">${cls}</option>`).join('')}
                </select>
            </label>
            <label for="eccentricity"> Orbital Eccentricity (optional, 0–1):<br>
                <input type="number" id="eccentricity" step="0.001" min="0" max="1" style="width:100px;">
            </label>
            <button id="calcBtn">Calculate</button>
        </div>
        <div id="result"></div>
        <div style="margin-top:32px;">
            <h3>Example Planets</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Year (days)</th>
                        <th>Star Class</th>
                        <th>Orbital Radius (AU)</th>
                        <th>Perihelion (AU)</th>
                        <th>Aphelion (AU)</th>
                    </tr>
                </thead>
                <tbody id="examples"></tbody>
            </table>
        </div>
    `;
    renderExampleTable();

    document.getElementById('calcBtn').addEventListener('click', () => {
        const yearLength = Number(document.getElementById('yearLength').value);
        const starClass = document.getElementById('starClass').value;
        const eccentricityInput = document.getElementById('eccentricity').value;
        const starMass = starData[starClass].mass;

        const a = orbitalRadiusAU(yearLength, starMass);
        const ecc = eccentricityInput === "" ? null : Number(eccentricityInput);

        let peri = null, aphe = null;
        if (ecc !== null && !isNaN(ecc)) {
            peri = perihelionAU(a, ecc);
            aphe = aphelionAU(a, ecc);
        }

        let out = `
            <div class="result">
                <strong>Orbital radius (a):</strong> ${a.toFixed(4)} AU<br>
        `;
        if (peri !== null && aphe !== null) {
            out += `
                <strong>Perihelion:</strong> ${peri.toFixed(4)} AU<br>
                <strong>Aphelion:</strong> ${aphe.toFixed(4)} AU
            `;
        }
        out += `</div>`;
        document.getElementById('result').innerHTML = out;
    });
}
