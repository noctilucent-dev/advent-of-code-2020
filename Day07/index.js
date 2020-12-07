const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

function parseLine(line) {
    const pc = line.split(" bags contain ");
    const parent = pc[0];
    let children = pc[1].split(",");

    if (children.length === 1 && children[0].startsWith("no other")) return [parent, []];

    children = children.map(c => {
        const parts = c.match(/^\s?(\d+)\s(\w+\s\w+)\sbag/);
        return [parts[2], parts[1]*1];
    });

    return [parent, children];
}

function createGraph(lines) {
    const graph = {};

    for(let i=0; i<lines.length; i++) {
        const [parent, children] = lines[i];
        graph[parent] = children;
    }

    return graph;
}

function countAncestors(graph, start) {
    const ancestors = new Set();
    const toVisit = [start];

    while(toVisit.length > 0) {
        const child = toVisit.pop();
        const parents = Object.keys(graph).filter(p => graph[p].findIndex(([c, _]) => c === child) > -1);

        parents.filter(p => !ancestors.has(p)).forEach(p => {
            ancestors.add(p);
            toVisit.push(p);
        });
    }

    return ancestors.size;
}

function countChildren(graph, root) {
    const children = graph[root];
    if (children.length === 0) return 1;

    return children
        .map(([c, q]) => countChildren(graph, c) * q)
        .reduce((a, b) => a+b, 1);
}

const lines = content.trim().split('\n').map(parseLine);
const graph = createGraph(lines);

const ancestorCount = countAncestors(graph, "shiny gold");
console.log(ancestorCount);


const childCount = countChildren(graph, "shiny gold");
console.log(childCount - 1);