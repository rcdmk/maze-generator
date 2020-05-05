const cellSize = 32;
const cols = 24;
const rows = 16;
const width = cols * cellSize;
const height = rows * cellSize;

const cells = new Array(rows);
let current, selected;
let stack = [];
let mazeComplete = false;

function setup() {
    createCanvas(width, height);
    //frameRate(10);

    for (let y = 0; y < rows; y++) {
        cells[y] = new Array(cols);
        for (let x = 0; x < cols; x++) {
            cells[y][x] = new Cell(x, y, cellSize);
        }
    }

    current = cells[0][0];
    current.visited = true;
    stack.push(current);
}

function update() {
    if (stack.length == 0) {
        mazeComplete = true;
        return;
    }

    current.active = false;
    current = stack.pop();
    current.active = true;

    const neighbours = [];

    for (let y = -1; y <= 1; y++) {
        if (current.y + y < 0 || current.y + y >= rows) continue;

        for (let x = -1; x <= 1; x++) {
            if ((x != 0 && y != 0) || current.x + x < 0 || current.x + x >= cols) continue;

            const cell = cells[current.y + y][current.x + x];

            if (!cell.visited) {
                neighbours.push(cell);
            }
        }
    }

    if (neighbours.length > 0) {
        current.active = false;
        stack.push(current);

        const index = Math.floor(random(0, neighbours.length));
        const choosen = neighbours[index];

        const top = choosen.y < current.y;
        const right = choosen.x > current.x;
        const bottom = choosen.y > current.y;
        const left = choosen.x < current.x;

        if (top) {
            current.walls.top = false;
            choosen.walls.bottom = false;
        }

        if (right) {
            current.walls.right = false;
            choosen.walls.left = false;
        }

        if (bottom) {
            current.walls.bottom = false;
            choosen.walls.top = false;
        }

        if (left) {
            current.walls.left = false;
            choosen.walls.right = false;
        }

        choosen.visited = true;
        choosen.active = true;
        stack.push(choosen);
    }
}

function draw() {
    update();

    background(35);

    cells.forEach(row => row.forEach(cell => cell.show()));

    if (mazeComplete) {
        textAlign(CENTER, CENTER);
        textSize(cellSize);
        fill(255, 255, 255, 100);
        text("CLICK TO MOVE", width / 2, height/2);
    }
}

function mousePressed() {
    if (!mazeComplete) return;

    const x = Math.floor(mouseX / cellSize);
    const y = Math.floor(mouseY / cellSize);

    if (x >= cols || y >= rows) return;

    if (selected) selected.selected = false;

    selected = cells[y][x];
    selected.selected = true;
}
