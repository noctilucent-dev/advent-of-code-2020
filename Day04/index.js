const fs = require('fs');

const content = fs.readFileSync('input.txt', 'utf-8');

const parts = content.trim().split(/\s/);

function getPassports(parts) {
    const passports = [];
    
    for (let i=0; i<parts.length; i++) {
        let passport = {};

        while (i < parts.length && parts[i].length > 0) {
            const [key, value] = parts[i].split(':');
            passport[key] = value;
            i++;
        }

        passports.push(passport);
    }
    
    return passports;
}

function validateYear(year, min, max) {
    if (!/\d{4}/.test(year)) return false;
    year = year * 1;

    return year >= min && year <= max;
}

function validateHeight(height) {
    if (/^\d+cm$/.test(height)) {
        height = height.split('c')[0] * 1;
        return height >= 150 && height <= 193
    } else if(/^\d+in$/.test(height)) {
        height = height.split('i')[0] * 1;
        return height >= 59 && height <= 76
    }
    return false;
}

function validateHairColor(color) {
    return /^#[\da-f]{6}$/.test(color);
}

function validateEyeColor(color) {
    return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(color);
}

function validatePid(pid) {
    return /^\d{9}$/.test(pid);
}

function validate1(passport) {
    return passport.byr
        && passport.iyr
        && passport.eyr
        && passport.hgt
        && passport.hcl
        && passport.ecl
        && passport.pid;
}

function validate2(passport) {
    return validateYear(passport.byr, 1920, 2002) &&
        validateYear(passport.iyr, 2010, 2020) &&
        validateYear(passport.eyr, 2020, 2030) &&
        validateHeight(passport.hgt) &&
        validateHairColor(passport.hcl) &&
        validateEyeColor(passport.ecl) &&
        validatePid(passport.pid);
}

const passports = getPassports(parts);


// part 1
let countValid = passports.filter(validate1).length;
console.log(countValid);

// part 2
countValid = passports.filter(validate1).filter(validate2).length;
console.log(countValid);