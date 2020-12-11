function parseLine(line) {
    let [instr, ...operands] = line.split(' ');
    operands = operands.map(Number);
    return [instr, ...operands];
}

class VM {
    constructor(program) {
        this.code = program.map(parseLine);
        this.ptr = 0;
        this.acc = 0;
    }

    tick () {
        const [op, ...params] = this.code[this.ptr];
        
        switch(op) {
            case "nop":
                this.ptr++;
                break;

            case "acc":
                this.acc += params[0];
                this.ptr++;
                break;

            case "jmp":
                this.ptr += params[0];
                break;

            default:
                throw new Error(`Invalid instruction '${op}'`);
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

module.exports = VM;