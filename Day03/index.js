const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const lines = content.trim().split('\n');

const COLS = lines[0].length;
const ROWS = lines.length;

function next([x,y], [dx, dy]) {
    return [
        (x+dx) % COLS,
        y+dy
    ];
}

function countTrees(v) {
    let x = 0;
    let y = 0;
    let trees = 0;

    while(y < ROWS) {
        if (lines[y][x] === '#') trees++;
        [x,y] = next([x,y], v);
    }

    return trees;
}

// Part 1
console.log(countTrees([3,1]));

// Part 2
const vectors = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]
];

const totalTrees = vectors.map(countTrees).reduce((a, b) => a * b, 1);

console.log(totalTrees);