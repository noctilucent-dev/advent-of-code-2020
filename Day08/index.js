const fs = require('fs');
const VM = require('../util/vm');

const content = fs.readFileSync('input.txt', 'utf-8');

const instructions = content.trim().split('\n');

// Part 1
(function() {
    const vm = new VM(instructions);
    vm.run();
    console.log(vm.acc);
})();

// Part 2
(function() {
    for(let i=0; i<instructions.length; i++) {
        const newInstr = [...instructions];

        if (newInstr[i].startsWith("nop")) {
            newInstr[i] = newInstr[i].replace("nop", "jmp");
        } else if (newInstr[i].startsWith("jmp")) {
            newInstr[i] = newInstr[i].replace("jmp","nop");
        } else {
            continue;
        }

        const vm = new VM(newInstr);

        if (vm.run()) {
            console.log(vm.acc);
            break;
        }
    }
})();