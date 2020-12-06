const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const groups = content.trim().split('\n\n');

// Part 1
const answers = groups.map(g => new Set(g.split('').filter(a => a !== '\n')));
const p1 = answers.map(s => s.size).reduce((a, b) => a + b);
console.log(p1);

// Part 2
const people = groups.map(g => g.split('\n'));
const common = people.map(g => g.reduce((p, c) => p.filter(v => c.includes(v)), "abcdefghijklmnopqrstuvwxyz".split('')));
const p2 = common.map(c => c.length).reduce((a, b) => a + b);
console.log(p2);
