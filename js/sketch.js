const cellSize = 40;
const cols = 10;
const rows = 10;
const width = cols * cellSize;
const height = rows * cellSize;
const totalCells = cols * rows;

const cells = new Array(totalCells);

function setup() {
    createCanvas(width, height);

    for (let i = 0; i < totalCells; i++) {
        cells[i] = new Cell(i % cols, Math.floor(i / rows), cellSize);
    }
}

function draw() {
    background(35);

    cells.forEach((cell) => cell.show());
}
