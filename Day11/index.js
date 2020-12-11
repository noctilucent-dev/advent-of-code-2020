const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const initial = content.trim().split('\n').map(l => l.split(''));

const WIDTH = initial[0].length;
const HEIGHT = initial.length;

// Vectors for the 8 directions
const VECTORS = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1],
];

// Determines whether the given co-ordinates are inside the grid
function inBounds (x, y) {
    return x >= 0 && y >=0 && x < WIDTH && y < HEIGHT;
}

// Counts the occupied seats in the immediately adjacent positions
function countAdjacent(grid, x, y) {
    return VECTORS
        .map(([dx, dy]) => [x+dx, y+dy])
        .filter(([x, y]) => inBounds(x, y))
        .filter(([x, y]) => grid[y][x] === '#')
        .length;
}

// Counts the visibile occupied seats from the given position
function countVisible(grid, x, y) {
    const search = ([dx, dy]) => {
        for (let cx=x+dx, cy=y+dy; inBounds(cx, cy); cx += dx, cy += dy) {
            if (grid[cy][cx] === '#') return 1;
            if (grid[cy][cx] === 'L') return 0;
        }
        return 0;
    }

    return VECTORS.map(search).reduce((a, b) => a+b);
}

// Counts the total number of occupied seats in the grid
function countOccupied(grid) {
    return grid.flat().filter(c => c === '#').length;
}

// Uses rules to determine the next grid state from the current grid state.
// grid            - the current state
// counter         - the function for counting occupied seats
// vacateThreshold - the threshold for vacating a seat
function nextState(grid, counter, vacateThreshold) {
    let newGrid = grid.map(l => [...l]);
    let changed = false;

    for(let y=0; y<HEIGHT; y++) {
        for(let x=0; x<WIDTH; x++) {
            if (grid[y][x] === '.') continue;

            const count = counter(grid, x, y);
            if (count === 0) newGrid[y][x] = '#';
            else if (count >= vacateThreshold) newGrid[y][x] = 'L';

            changed = changed || grid[y][x] !== newGrid[y][x];
        }
    }

    if (changed) return newGrid;
}

// Runs the simulation until a stable state is found
// Returns the stable state
// grid            - the initial state
// counter         - the function for counting occupied seats
// vacateThreshold - the threshold for vacating a seat
function findStableState(grid, counter, vacateThreshold) {
    let previous = initial, next;
    while (true) {
        next = nextState(previous, counter, vacateThreshold);
        if (!next) break;
        previous = next;
    }

    return previous;
}

// Part 1
let stable = findStableState(initial, countAdjacent, 4);
console.log(countOccupied(stable));

// Part 2
stable = findStableState(initial, countVisible, 5);
console.log(countOccupied(stable));