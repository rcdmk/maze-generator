const width = 400;
const height = 400;
const cellSize = 40;
const cols = Math.floor(width / cellSize);
const rows = Math.floor(height / cellSize);

let cells = new Array(cols * rows);

function setup() {
    createCanvas(width, height);

    for (let i = 0; i < cols * rows; i++) {
        cells[i] = new Cell(i % cols, Math.floor(i / rows), cellSize);
    }
}

function draw() {
    background(35);

    cells.forEach((cell) => cell.show());
}
