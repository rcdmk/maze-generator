class Cell {
    x = 0;
    y = 0;
    size = 0;
    active = false;
    visited = false;

    walls = {
        top: true,
        right: true,
        bottom: true,
        left: true
    };

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    show() {
        noFill();
        stroke(255);

        const left = this.x * this.size;
        const top = this.y * this.size;
        const right = left + this.size;
        const bottom = top + this.size;

        if (this.walls.top) line(left, top, right, top);
        if (this.walls.right) line(right, top, right, bottom);
        if (this.walls.bottom) line(right, bottom, left, bottom);
        if (this.walls.left) line(left, bottom, left, top);

        if (this.active || this.visited) {
            if (this.active) {
                fill(255, 45, 45, 100);
            } else {
                fill(255, 255, 255, 100);
            }

            noStroke();
            rect(left, top, this.size, this.size);
        }
    }
}
