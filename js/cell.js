class Cell {
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
        rect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
}
