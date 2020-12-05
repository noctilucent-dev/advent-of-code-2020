const fs = require('fs');
const wu = require("wu");

const content = fs.readFileSync('input.txt', 'utf-8');

const expenses = content.split('\n').map(Number);

function* pairs(expenses) {
    for(var i=0; i<expenses.length-1; i++) {
        for (var j=i+1; j<expenses.length; j++) {
            yield [expenses[i], expenses[j], i];
        }
    }
}

function part1(expenses) {
    const [a, b] = wu(pairs(expenses))
        .filter(([x, y]) => x + y === 2020)
        .next().value;
    
    return a * b;
}

function part2(expenses) {
    const p = wu(pairs(expenses))
        .filter(([a, b]) => a + b < 2020);

    for(const [a, b, i] of p) {
        for (var j=i+2; j<expenses.length; j++) {
            if (a+b+expenses[j] === 2020) return a*b*expenses[j];
        }
    }
}

console.log(part1(expenses));
console.log(part2(expenses));
