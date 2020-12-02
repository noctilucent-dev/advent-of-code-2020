const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const lines = content.trim().split('\n').map(l => l.split(/[:-\s]\s?/));

function isValid1(line) {
    const r = new RegExp(line[2],'g');
    const c = (line[3].match(r) || []).length;
    return (c >= line[0]*1) && (c <= line[1]*1);
}

function isValid2(line) {
    return (line[3][line[0]-1] === line[2]) ^ (line[3][line[1]-1] === line[2]);
}

console.log(lines.filter(isValid1).length);
console.log(lines.filter(isValid2).length);