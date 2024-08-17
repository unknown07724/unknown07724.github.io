document.addEventListener('DOMContentLoaded', () => {
    const skyColorInput = document.getElementById('skyColorInput');
    const objectPropertiesDiv = document.getElementById('objectProperties');

    // Update sky color when the user changes the input
    skyColorInput.addEventListener('input', () => {
        const color = skyColorInput.value;
        utils.setSkyColor(color);
    });

    // Update UI when an object is selected
    canvas.addEventListener('mousedown', (e) => {
        const { offsetX: x, offsetY: y } = e;
        let selectedObject = null;

        for (let obj of gameObjects) {
            if (obj.isInside(x, y)) {
                selectedObject = obj;
                break;
            }
        }

        if (selectedObject) {
            populateObjectProperties(selectedObject);
        } else {
            objectPropertiesDiv.innerHTML = '<p>No object selected</p>';
        }
    });

    function populateObjectProperties(object) {
        objectPropertiesDiv.innerHTML = `
            <label for="objectXInput">X:</label>
            <input type="number" id="objectXInput" value="${object.x}">
            <br/><br/>
            <label for="objectYInput">Y:</label>
            <input type="number" id="objectYInput" value="${object.y}">
            <br/><br/>
            <label for="objectWidthInput">Width:</label>
            <input type="number" id="objectWidthInput" value="${object.width}">
            <br/><br/>
            <label for="objectHeightInput">Height:</label>
            <input type="number" id="objectHeightInput" value="${object.height}">
            <br/><br/>
            <label for="objectRotationInput">Rotation:</label>
            <input type="number" id="objectRotationInput" value="${object.rotation}">
            <br/><br/>
            <label for="objectIsPhysicalInput">Is Physical:</label>
            <input type="checkbox" id="objectIsPhysicalInput" ${object.isPhysical ? 'checked' : ''}>
            <br/><br/>
            <button id="deleteObjectButton">Delete Object</button>
        `;

        // Update object properties on input change
        document.getElementById('objectXInput').addEventListener('input', (e) => {
            object.setPosition(parseFloat(e.target.value), object.y);
        });

        document.getElementById('objectYInput').addEventListener('input', (e) => {
            object.setPosition(object.x, parseFloat(e.target.value));
        });

        document.getElementById('objectWidthInput').addEventListener('input', (e) => {
            object.setSize(parseFloat(e.target.value), object.height);
        });

        document.getElementById('objectHeightInput').addEventListener('input', (e) => {
            object.setSize(object.width, parseFloat(e.target.value));
        });

        document.getElementById('objectRotationInput').addEventListener('input', (e) => {
            object.setRotation(parseFloat(e.target.value));
        });

        document.getElementById('objectIsPhysicalInput').addEventListener('change', (e) => {
            object.isPhysical = e.target.checked;
        });

        document.getElementById('deleteObjectButton').addEventListener('click', () => {
            object.delete();
            objectPropertiesDiv.innerHTML = '<p>No object selected</p>';
        });
    }
});
