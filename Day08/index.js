const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

class VM {
    constructor(code) {
        this.code = code;
        this.ptr = 0;
        this.acc = 0;
    }

    tick () {
        const instr = this.code[this.ptr];
        
        if (instr.startsWith("nop")) {
            this.ptr++;
        } else if (instr.startsWith("acc")) {
            const val = instr.split(" ")[1] * 1;
            this.acc += val;
            this.ptr++;
        } else if (instr.startsWith("jmp")) {
            const val = instr.split(" ")[1] * 1;
            this.ptr += val;
        } else {
            throw new Error(`Invalid instruction ${this.code[this.ptr]}`);
        }
    }

    run() {
        const executed = new Set();

        while (!executed.has(this.ptr) && this.ptr < this.code.length) {
            executed.add(this.ptr);
            this.tick();
        }

        return this.ptr >= this.code.length;
    }

    print() {
        console.log(`ptr: ${this.ptr}, acc: ${this.acc}`);
    }
}

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