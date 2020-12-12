const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const instructions = content.trim().split('\n');

function followPart1(instructions) {
    let heading = 90;
    let northing = 0;
    let easting = 0;

    for(let i=0; i<instructions.length; i++) {
        const op = instructions[i][0];
        const param = Number(instructions[i].slice(1));

        switch(op) {
            case "N":
                northing += param;
                break;
            case "S":
                northing -= param;
                break;
            case "E":
                easting += param;
                break;
            case "W":
                easting -= param;
                break;
            case "R":
                heading = (heading + param) % 360;
                break;
            case "L":
                heading = (360 + heading - param) % 360;
                break;
            case "F":
                if (heading === 0) northing += param;
                else if (heading === 90) easting += param;
                else if (heading === 180) northing -= param;
                else if (heading === 270) easting -= param;
                break;
            
            default:
                throw new Error(`Instruction ${op} not recognised`);
        }
    }

    return [easting, northing];
}

function followPart2(instructions) {
    let waypoint = [10, 1]; // [E, N]
    let northing = 0;
    let easting = 0;

    for(let i=0; i<instructions.length; i++) {
        const op = instructions[i][0];
        let param = Number(instructions[i].slice(1));

        switch(op) {
            case "N":
                waypoint[1] += param;
                break;
            case "S":
                waypoint[1] -= param;
                break;
            case "E":
                waypoint[0] += param;
                break;
            case "W":
                waypoint[0] -= param;
                break;
            case "R":
                while (param > 0) {
                    waypoint = [waypoint[1], waypoint[0] * -1];
                    param -= 90;
                }
                break;
            case "L":
                while (param > 0) {
                    waypoint = [waypoint[1] * -1, waypoint[0]];
                    param -= 90;
                }
                break;
            case "F":
                easting += waypoint[0] * param;
                northing += waypoint[1] * param;
                break;
            
            default:
                throw new Error(`Instruction ${op} not recognised`);
        }
    }

    return [easting, northing];
}

const manhattan = ([e, n]) => Math.abs(e) + Math.abs(n);

const part1 = followPart1(instructions);
console.log(manhattan(part1));

const part2 = followPart2(instructions);
console.log(manhattan(part2));