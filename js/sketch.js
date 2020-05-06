const cellSize = 32;
const cols = 24;
const rows = 16;
const width = cols * cellSize;
const height = rows * cellSize;

const cells = new Array(rows);
let current, selected;
let stack = [];
let mazeComplete = false;
let pathQueue = [];
let foundPath = false;

function setup() {
    createCanvas(width, height);
    frameRate(30);

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

function findPath() {
    // search path
    if (!foundPath && pathQueue.length > 0) {
        const currentSearch = pathQueue.shift();

        const sides = [
            [currentSearch.y - 1, currentSearch.x    ], // 0 = top
            [currentSearch.y    , currentSearch.x + 1], // 1 = right
            [currentSearch.y + 1, currentSearch.x    ], // 2 = bottom
            [currentSearch.y    , currentSearch.x - 1]  // 3 = left
        ];

        for (let i = 0; i < sides.length; i++) {
            const currY = sides[i][0];
            const currX = sides[i][1];

            if (currY < 0 || currY >= rows || currX < 0 || currX >= cols) continue;

            // don't allow to move over walls
            if ((i == 0 && currentSearch.walls.top   ) ||
                (i == 1 && currentSearch.walls.right ) ||
                (i == 2 && currentSearch.walls.bottom) ||
                (i == 3 && currentSearch.walls.left  )) {
                continue;
            }

            const cell = cells[currY][currX];

            // cell already in a shorter path
            if (cell.cost <= currentSearch.cost) continue;

            const cellIndex = pathQueue.indexOf(cell);

            // cell in queue has higher cost, remove it
            if (cellIndex > -1) pathQueue.splice(cellIndex, 1);

            cell.cost = currentSearch.cost + 1;
            pathQueue.push(cell);

            if (cell == current) {
                foundPath = true;
                return;
            }
        }
    }

    // walk path
    if (foundPath) {
        const sides = [
            [current.y - 1, current.x    ], // 0 = top
            [current.y    , current.x + 1], // 1 = right
            [current.y + 1, current.x    ], // 2 = bottom
            [current.y    , current.x - 1]  // 3 = left
        ];

        for (let i = 0; i < sides.length; i++) {
            const currY = sides[i][0];
            const currX = sides[i][1];

            if (currY < 0 || currY >= rows || currX < 0 || currX >= cols) continue;

            const cell = cells[currY][currX];

            // don't allow to move over walls
            if ((i == 0 && current.walls.top   ) ||
                (i == 1 && current.walls.right ) ||
                (i == 2 && current.walls.bottom) ||
                (i == 3 && current.walls.left  )) {
                continue;
            }

            if (cell.cost < current.cost) {
                current.active = false;
                current = cell;
                break;
            }
        }

        current.active = true;

        if (current == selected) resetPath();
    }
}

function resetPath() {
    if (selected) selected.selected = false;

    foundPath = false;
    cells.forEach(row => row.forEach(cell => cell.cost = Infinity));
    pathQueue.length = 0;
}

function update() {
    if (mazeComplete && selected) findPath();

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
            if ((x != 0 && y != 0) || x + y == 0 || current.x + x < 0 || current.x + x >= cols) continue;

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

    resetPath();

    selected = cells[y][x];
    selected.selected = true;
    selected.cost = 0;
    pathQueue = [selected];
}
