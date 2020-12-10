const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const adaptors = content.trim().split('\n').map(Number);
adaptors.sort((a, b) => a-b);

const target = adaptors[adaptors.length-1] + 3;

adaptors.unshift(0);
adaptors.push(target);

// Part 1
function part1(adaptors) {
    let singles = 0;
    let triples = 0;

    for(let i=1; i<adaptors.length; i++) {
        const diff = adaptors[i] - adaptors[i-1];
        if (diff === 1) singles++;
        if (diff === 3) triples++;
        previous = adaptors[i];
    }

    return singles * triples;
}

console.log(`Part 1: ${part1(adaptors)}`);

// Part 2
function constructGraph(adaptors) {
    const graph = {};

    for (let i=0; i<adaptors.length; i++) {
        const vals = [];
    
        for (let j=i+1; adaptors[j] - adaptors[i] <= 3; j++) {
            vals.push(adaptors[j]);
        }
    
        graph[adaptors[i]] = vals;
    }

    return graph;
}

function findPath(start, graph, pathLengths) {
    if (pathLengths[start] !== undefined) return pathLengths[start];

    const length = start === target ?
        1 :
        graph[start]
            .map(r => findPath(r, graph, pathLengths))
            .reduce((a, b) => a+b, 0);

    pathLengths[start] = length;
    return length;
}

const graph = constructGraph(adaptors);
const pathLengths = {};

findPath(0, graph, pathLengths);

console.log(`Part 2: ${pathLengths[0]}`);