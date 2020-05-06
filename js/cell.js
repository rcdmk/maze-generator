class Cell {
    x = 0;
    y = 0;
    size = 0;
    active = false;
    selected = false;
    visited = false;
    cost = Infinity;

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
        strokeWeight(1);

        const left   = this.x * this.size;
        const top    = this.y * this.size;
        const right  = left   + this.size;
        const bottom = top    + this.size;

        if (this.walls.top)    line(left,  top,    right, top);
        if (this.walls.right)  line(right, top,    right, bottom);
        if (this.walls.bottom) line(right, bottom, left,  bottom);
        if (this.walls.left)   line(left,  bottom, left,  top);

        if (this.active || this.visited) {
            if (this.active) {
                fill(255, 45, 45, 100);
            } else {
                fill(255, 255, 255, 100);
            }

            noStroke();
            rect(left, top, this.size, this.size);
        }

        if (this.selected) {
            noStroke();
            fill(0, 255, 0, 200);
            rect(left, top, this.size, this.size);
        }

        if (this.cost != Infinity) {
            textAlign(CENTER, CENTER);
            textSize(this.size / 2);
            fill(53);
            text(this.cost, left + this.size / 2, top + this.size / 2);
        }
    }

    toString() {
        return "[x:" + this.x + ",y:" + this.y + "=" + this.cost + "]";
    }
}
