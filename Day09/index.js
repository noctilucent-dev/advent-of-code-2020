const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const PREAMBLE = 25;

function part1(nums) {
    // Iterate over each number after the preamble
    for(let i=PREAMBLE; i<nums.length; i++) {
        const target = nums[i];
        let found = false;

        // Check each unique pair from the preceeding numbers
        // Stopping if we find a matching sum
        for(let a=i-1; !found && a>i-PREAMBLE; a--) {
            for(let b=a-1; !found && b>=i-PREAMBLE; b--) {
                found = nums[a] + nums[b] === target;
            }
        }

        if (!found) return target;
    }

    throw new Error(`Could not find invalid number`);
}

function part2(nums, target) {
    // Iterate over sub-sequences
    for(let start=0; start<nums.length-1; start++) {
        let sum, end;

        // Add numbers until we match or exceed target
        for(sum = nums[start], end=start+1;
            sum<target && end<nums.length;
            sum += nums[end++]);

        // Check if there was an exact match
        if (sum === target) {
            const range = nums.slice(start, end+1);
            return Math.max(...range) + Math.min(...range);
        }
    }
}

const nums = content.trim().split('\n').map(Number);

const target = part1(nums);
console.log(`Part1: ${target}`);

console.log(`Part2: ${part2(nums, target)}`);
