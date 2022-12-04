const fs = require("fs")

const input = fs.readFileSync('./input.txt').toString();

// Challenge 1
const containedPairs = input.split("\n").map(line => line.split(",")
    .map(range => range.split("-")
        .map(section => Number(section))))
    .filter(pair => (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) 
        ||  (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]));

console.log("Number of fully contained pairs: " + containedPairs.length);



// Challenge 2
const overlappingPairs = input.split("\n").map(line => line.split(",")
    .map(range => range.split("-")
        .map(section => Number(section))))
    .filter(pair => (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) 
        ||  (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1])
        ||  (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) 
        ||  (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]));

console.log("Number of overlapping pairs: " + overlappingPairs.length);