const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const adaptors = content.trim().split('\n').map(Number);

adaptors.sort((a, b) => a-b);

// Part 1
function part1(adaptors) {
    let singles = 0;
    let triples = 0;
    let previous = 0;

    adaptors.push(adaptors[adaptors.length-1]+3);

    for(let i=0; i<adaptors.length; i++) {
        const diff = adaptors[i] - previous;
        if (diff === 1) singles++;
        if (diff === 3) triples++;
        previous = adaptors[i];
    }

    console.log(`${singles} x 1 Jolt, ${triples} x 3 Jolts`);

    adaptors.pop();

    return singles * triples;
}

console.log(part1(adaptors));

// Part 2
const target = Math.max(...adaptors) + 3;
const next = {};

adaptors.unshift(0);
adaptors.push(target);

for (let i=0; i<adaptors.length; i++) {
    const vals = [];

    for (let j=i+1; adaptors[j] - adaptors[i] <= 3; j++) {
        vals.push(adaptors[j]);
    }

    next[adaptors[i]] = vals;
}

const paths = {};

function findPath(start) {
    // console.log(`Finding path for ${start}`);

    if (start === target) {
        console.log('Reached end');
        paths[start] = 1;
    }
    else if (next[start].length === 0) {
        console.log('Dead end');
        paths[start] = -1;
    }

    else if (next[start].length === 1) {
        const r = next[start][0];
        if (paths[r] === undefined) findPath(next[start][0]);
        paths[start] = paths[r];
    }

    else {
        paths[start] = next[start].map(r => {
            if (paths[r] === undefined) return findPath(r);
            return paths[r];
        }).reduce((a, b) => a+b, 0);
    }

    // console.log(`Path for ${start} is ${paths[start]}`);

    return paths[start];
}

findPath(0, next, paths);

// console.log(next);
// console.log(paths);
console.log(paths[0]);