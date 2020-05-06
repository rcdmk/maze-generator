# Maze Generator

Implementation of a maze generation algorithm and maze walking with pathfinding in JavaScript, using p5.js lib for drawing.

## Algorithms

The choosen algorithm for maze generation is iterative depth-first search (DFS) and it is composed of the following steps:

1. Choose the initial cell, mark it as visited and push it to the stack
2. While the stack is not empty
   1. Pop a cell from the stack and make it a current cell
   2. If the current cell has any neighbours which have not been visited
      1. Push the current cell to the stack
      2. Choose one of the unvisited neighbours
      3. Remove the wall between the current cell and the chosen cell
      4. Mark the chosen cell as visited and push it to the stack

Pathfinding is done using simplified A* algorithm, with breadth-first search (BFS) and simple heuristics based on path length:

1. Set the cost for all cells as '+Infinity'
2. Create a queue for cells to process
3. Set target cell cost to 0 (zero)
4. Add target cell to queue
5. While the queue is not empty
   1. Pop the first cell from the queue and make it the current cell
   2. For each neighbouring cell (top, right, left and bottom)
      1. If there is a wall between the current cell and the current neighbour, skip to next neighbour
      2. If the neighbour is already in the queue
         1. If it has a cost less then or equal to the current cell, skip to next neighbour
         2. Remove current neighbour from queue
      3. Set current neighbour cost to current cell cost + 1
      4. If current neigbour is the target cell, end the while loop
6. If queue is empty, no path was found, return
7. Empty the queue
8. Make the starting cell the current cell
9. While the current cell is not the target cell
   1. Add the current cell to the queue
   2. For each neighbouring cell (top, right, left and bottom)
      1. If there is a wall between the current cell and the current neighbour, skip to next neighbour
      2. If the current neighbour cost is less than the current cell cost
         1. Make the current neighbour the current cell
         2. End the neighbours loop

After running this algorithm, the queue will contain the cells for the shortest path.

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
