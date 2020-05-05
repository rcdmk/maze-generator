const cellSize = 40;
const cols = 10;
const rows = 10;
const width = cols * cellSize;
const height = rows * cellSize;

const cells = new Array(rows);

function setup() {
    createCanvas(width, height);

    for (let y = 0; y < rows; y++) {
        cells[y] = new Array(cols);
        for (let x = 0; x < cols; x++) {
            cells[y][x] = new Cell(x, y, cellSize);
        }
    }
}

function draw() {
    background(35);

    cells.forEach(row => row.forEach(cell => cell.show()));
}
