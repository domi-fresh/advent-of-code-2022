const { time } = require("console");
const fs = require("fs");

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/18


// Challenge 1
let coordinates = input.split("\n").filter((v, i, a) => {return a.indexOf(v) == i}).map(line => line.split(",")).map(c => {return {x: c[0], y:c[1], z: c[2]}})
console.log({coordinates})

function countSides (coordinates){
    let surfaceSides = 0
    coordinates.forEach(cube => {let sides = 6; 
                                coordinates.forEach(coordinate => {if(Math.abs(coordinate.x-cube.x) + Math.abs(coordinate.y-cube.y) + Math.abs(coordinate.z-cube.z) == 1){
                                    sides--}})
                                surfaceSides += sides           
                          })
    return surfaceSides
}
let allSurfaceSides = countSides(coordinates)
console.log({allSurfaceSides})

let maxX = coordinates.reduce((acc, e) => Math.max(acc, e.x), 0)
let maxY = coordinates.reduce((acc, e) => Math.max(acc, e.y), 0)
let maxZ = coordinates.reduce((acc, e) => Math.max(acc, e.z), 0)
let minX = coordinates.reduce((acc, e) => Math.min(acc, e.x), maxX)
let minY = coordinates.reduce((acc, e) => Math.min(acc, e.y), maxY)
let minZ = coordinates.reduce((acc, e) => Math.min(acc, e.z), maxZ)
console.log({maxX})
console.log({maxY})
console.log({maxZ})
console.log({minX})
console.log({minY})
console.log({minZ})

// steam is never expanding diagonally, meaning cavitations can be determined by iterating diagonally through the material
