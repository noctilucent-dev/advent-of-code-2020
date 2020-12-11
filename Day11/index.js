const fs = require('fs');

let content = fs.readFileSync('input.txt', 'utf-8');

let initial = content.trim().split('\n').map(l => l.split(''));

const WIDTH = initial[0].length;
const HEIGHT = initial.length;

function print(grid) {
    for(let i=0; i<grid.length; i++) {
        console.log(grid[i].join(''));
    }
}

function countAdjacentPart1(grid, x, y) {
    let count = 0;

    if (y > 0) {
        if (x > 0 && grid[y-1][x-1] === '#') count++;
        if (grid[y-1][x] === '#') count++;
        if (x < (WIDTH-1) && grid[y-1][x+1] === '#') count++;
    }

    if (x > 0 && grid[y][x-1] === '#') count++;
    if (x < (WIDTH-1) && grid[y][x+1] === '#') count++;

    if (y<HEIGHT-1) {
        if (x > 0 && grid[y+1][x-1] === '#') count++;
        if (grid[y+1][x] === '#') count++;
        if (x < (WIDTH-1) && grid[y+1][x+1] === '#') count++;
    }

    return count;
}

function nextStatePart1(grid) {
    let newGrid = grid.map(l => [...l]);
    let changes = 0;

    for(let y=0; y<HEIGHT; y++) {
        for(let x=0; x<WIDTH; x++) {
            if (grid[y][x] === '.') continue;

            const count = countAdjacentPart1(grid, x, y);

            if (count === 0 && grid[y][x] === 'L') {
                newGrid[y][x] = '#';
                changes++;
            } else if (count >= 4 && grid[y][x] === '#') {
                newGrid[y][x] = 'L';
                changes++;
            }
        }
    }

    return [newGrid, changes];
}

function countVisiblePart2(grid, x, y) {
    let count = 0;

    // Left
    for(let dx=x-1; dx>=0; dx--) {
        if (grid[y][dx] === '#') count++;
        if (grid[y][dx] !== '.') break;
    }

    // Right
    for(let dx=x+1; dx<WIDTH; dx++) {
        if (grid[y][dx] === '#') count++;
        if (grid[y][dx] !== '.') break;
    }

    // Up
    for(let dy=y-1; dy>=0; dy--) {
        if (grid[dy][x] === '#') count++;
        if (grid[dy][x] !== '.') break;
    }

    // Down
    for(let dy=y+1; dy<HEIGHT; dy++) {
        if (grid[dy][x] === '#') count++;
        if (grid[dy][x] !== '.') break;
    }

    // Up-left
    for(let dy=y-1, dx=x-1; dy>=0 && dx>=0; dy--, dx--) {
        if (grid[dy][dx] === '#') count++;
        if (grid[dy][dx] !== '.') break;
    }

    // Up-Right
    for(let dy=y-1, dx=x+1; dy>=0 && dx<WIDTH; dy--, dx++) {
        if (grid[dy][dx] === '#') count++;
        if (grid[dy][dx] !== '.') break;
    }

    // Down-right
    for(let dy=y+1, dx=x+1; dy<HEIGHT && dx<WIDTH; dy++, dx++) {
        if (grid[dy][dx] === '#') count++;
        if (grid[dy][dx] !== '.') break;
    }

    // Down-left
    for(let dy=y+1, dx=x-1; dy<HEIGHT && dx>=0; dy++, dx--) {
        if (grid[dy][dx] === '#') count++;
        if (grid[dy][dx] !== '.') break;
    }

    return count;
}

function nextStatePart2(grid) {
    let newGrid = grid.map(l => [...l]);
    let changes = 0;

    for(let y=0; y<HEIGHT; y++) {
        for(let x=0; x<WIDTH; x++) {
            if (grid[y][x] === '.') continue;

            const count = countVisiblePart2(grid, x, y);

            if (count === 0 && grid[y][x] === 'L') {
                newGrid[y][x] = '#';
                changes++;
            } else if (count >= 5 && grid[y][x] === '#') {
                newGrid[y][x] = 'L';
                changes++;
            }
        }
    }

    return [newGrid, changes];
}

function countOccupied(grid) {
    let count = 0;
    for(let y=0; y<HEIGHT; y++) {
        for(let x=0; x<WIDTH; x++) {
            if (grid[y][x] === '#') count++;
        }
    }
    return count;
}

// Part 1
let grid = initial;
let changes;
while (true) {
    [grid, changes] = nextStatePart1(grid);
    if (changes === 0) break;
}
console.log(countOccupied(grid));

// Part 2
grid = initial;
while (true) {
    [grid, changes] = nextStatePart2(grid);
    if (changes === 0) break;
}
console.log(countOccupied(grid));