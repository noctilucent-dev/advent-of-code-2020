const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');
const passes = content.trim().split('\n');

function seatNum(pass) {
    return parseInt(
        pass.replace(/B|R/g,'1').replace(/F|L/g,'0'),
        2);
}

const seatNums = passes.map(seatNum);

// Part 1
const maxNum = seatNums.reduce((p, c) => Math.max(p, c));
console.log(maxNum);

// Part 2
seatNums.sort((a, b) => a - b);

let i;
for (i=0; seatNums[i] === seatNums[i+1] - 1; i++);

console.log(seatNums[i]+1); // 770 is too high, 480 too low
