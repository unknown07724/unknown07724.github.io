function loadCombinedExample() {
    document.getElementById('scriptEditor').value = `
class CircleObject extends GameObject {
    draw(context) {
        drawCircle(context, this.x, this.y, this.width / 2, 'blue');
    }
}

class HalfCircleObject extends GameObject {
    draw(context) {
        drawHalfCircle(context, this.x, this.y, this.width / 2, 'green', true);
    }
}

class HexagonObject extends GameObject {
    draw(context) {
        drawHexagon(context, this.x, this.y, this.width / 2, 'red');
    }
}

const scene = new Scene();

const circle = new CircleObject(100, 100, 50, 50, 'blue');
scene.addObject(circle);

const halfCircle = new HalfCircleObject(200, 200, 50, 50, 'green');
scene.addObject(halfCircle);

const hexagon = new HexagonObject(300, 300, 50, 50, 'red');
scene.addObject(hexagon);

const engine = new Engine();
engine.loadScene(scene);
`;
}

document.getElementById('examplesDropdown').addEventListener('change', (event) => {
    const selectedExample = event.target.value;
    if (isDirty && !confirm('You have unsaved changes. Do you want to discard them and load the example?')) {
        event.target.value = ''; // Reset dropdown if user cancels
        return;
    }
    if (selectedExample === 'combined') {
        loadCombinedExample();
    } else {
        loadExample(selectedExample);
    }
    isDirty = false; // Reset unsaved changes flag
});

function loadExample(example) {
    switch (example) {
        case 'circle':
            loadCircleExample();
            break;
        case 'halfCircle':
            loadHalfCircleExample();
            break;
        case 'hexagon':
            loadHexagonExample();
            break;
        case 'combined':
            loadCombinedExample();
            break;
        default:
            document.getElementById('scriptEditor').value = '';
    }
}

