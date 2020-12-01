const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const expenses = content.split('\n').map(Number);

function part1(expenses) {
    for(var i=0; i<expenses.length-1; i++) {
        for (var j=i+1; j<expenses.length; j++) {
            if (expenses[i]+expenses[j] === 2020) {
                return expenses[i]*expenses[j];
            }
        }
    }
    throw new Error('Could not find expenses summing to 2020');
}

function part2(expenses) {
    for(var i=0; i<expenses.length-1; i++) {
        for (var j=i+1; j<expenses.length-2; j++) {
            // simple optimisation to skip pairs already too large
            if (expenses[i]+expenses[j] >= 2020) continue;

            for (var k=j+1; k<expenses.length; k++) {
                if (expenses[i]+expenses[j]+expenses[k] === 2020) {
                    return expenses[i]*expenses[j]*expenses[k];
                }
            }
        }
    }
    throw new Error('Could not find expenses summing to 2020');
}

console.log(part1(expenses));
console.log(part2(expenses));
