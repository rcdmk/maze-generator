# Maze Generator

Implementation of a maze generation alghorithm in JavaScript, using p5.js lib for drawing.

## Alghorithm

The choosen alghorithm is iterative depth-first search (DFS) and it is composed of the following steps:

1. Choose the initial cell, mark it as visited and push it to the stack
2. While the stack is not empty
   1. Pop a cell from the stack and make it a current cell
   2. If the current cell has any neighbours which have not been visited
      1. Push the current cell to the stack
      2. Choose one of the unvisited neighbours
      3. Remove the wall between the current cell and the chosen cell
      4. Mark the chosen cell as visited and push it to the stack

## Dependencies

This project only depends on p5.js 1.0+.

To install dependencies, navigate to the root of the repository and run:

```sh
npm install
# OR
yarn
```

## Executing

Open `index.html` file and the generation will start.
