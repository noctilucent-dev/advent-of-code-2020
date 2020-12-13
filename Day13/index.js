const { time } = require('console');
const fs = require('fs');

let content = fs.readFileSync('input.txt', 'utf-8');

// content = `939
// 7,13,x,x,59,x,31,19`;

const lines = content.trim().split('\n');
const timestamp = Number(lines[0]);


const buses = lines[1].split(',');

function part1(start, buses) {
    let min = start+1;
    let bestBus = -1;

    for (let i=0; i<buses.length; i++) {
        let bus = buses[i];
        if (bus === 'x') continue;

        const nextDeparture = (bus - (timestamp % bus)) % bus;
        if (nextDeparture < min) {
            min = nextDeparture;
            bestBus = buses[i];
        }
    }

    return min * bestBus;
}

console.log(part1(timestamp, buses));

function part2() {
    let start = timestamp;
    let inc = 1;
    
    for(let i=0; i<buses.length; i++) {
        if (buses[i] === 'x') continue;

        const bus = Number(buses[i]);

        while((start + i) % bus !== 0) {
            start += inc;
        }

        console.log(`Found time ${start} for ${bus} (col ${i}), inc ${inc}`);

        inc *= bus;
    }
    
    console.log(start);
}

part2();