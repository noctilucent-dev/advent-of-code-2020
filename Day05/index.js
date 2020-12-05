const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const passes = content.trim().split('\n');

// Convert each pass to a binary number
const seatNums = passes
    .map(p => p.replace(/B|R/g,'1'))
    .map(p => p.replace(/F|L/g,'0'))
    .map(p => parseInt(p, 2));

seatNums.sort((a, b) => a - b);

// Part 1
console.log(seatNums[seatNums.length-1]);

// Part 2
const previousSeat = seatNums.find((v, i) => v !== seatNums[i+1]-1); // finds the first non-sequential seat number
console.log(previousSeat+1);
