const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const lines = content.trim().split('\n');
const timestamp = Number(lines[0]);
const buses = lines[1].split(',');

function part1(start, buses) {
    let min = start+1;
    let bestBus = -1;

    for (let i=0; i<buses.length; i++) {
        let bus = buses[i];
        if (bus === 'x') continue;

        // Use modulus to determine minutes until departure
        const nextDeparture = (bus - (timestamp % bus)) % bus;

        if (nextDeparture < min) {
            min = nextDeparture;
            bestBus = buses[i];
        }
    }

    return min * bestBus;
}

console.log(part1(timestamp, buses));

function part2( buses) {
    // The 'current' timestamp
    let start = 0;

    // The step size for incrementing the timestamp
    let inc = 1;
    
    // Iterate over each numbered bus
    for(let i=0; i<buses.length; i++) {
        if (buses[i] === 'x') continue;

        const bus = Number(buses[i]);

        // Keep incremeting the start time until the current bus has the correct delay
        while((start + i) % bus !== 0) {
            start += inc;
        }

        // Multiply the step size by the bus number
        // This way, all subsequent times will have the correct offset for this bus
        // (and previous buses)
        // Note - this relies on the bus numbers being co-prime
        inc *= bus;
    }
    
    return start;
}

console.log(part2(buses));