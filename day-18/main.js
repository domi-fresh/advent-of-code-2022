const { time } = require("console");
const fs = require("fs");

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/18


// Challenge 1
let coordinates = input.split("\n").filter((v, i, a) => { return a.indexOf(v) == i }).map(line => line.split(",")).map(c => { return { x: c[0], y: c[1], z: c[2] } })

function countSides(coordinates) {
    let surfaceSides = 0
    coordinates.forEach(cube => {
        let sides = 6;
        coordinates.forEach(coordinate => {
            if (Math.abs(coordinate.x - cube.x) + Math.abs(coordinate.y - cube.y) + Math.abs(coordinate.z - cube.z) == 1) {
                sides--
            }
        })
        surfaceSides += sides
    })
    return surfaceSides
}
let allSurfaceSides = countSides(coordinates)
console.log("Challenge 1: all surface sides with encapsulated bubbles: " + allSurfaceSides)

let maxX = coordinates.reduce((acc, e) => Math.max(acc, e.x), 0)
let maxY = coordinates.reduce((acc, e) => Math.max(acc, e.y), 0)
let maxZ = coordinates.reduce((acc, e) => Math.max(acc, e.z), 0)
let minX = coordinates.reduce((acc, e) => Math.min(acc, e.x), maxX)
let minY = coordinates.reduce((acc, e) => Math.min(acc, e.y), maxY)
let minZ = coordinates.reduce((acc, e) => Math.min(acc, e.z), maxZ)
// console.log({ maxX })
// console.log({ maxY })
// console.log({ maxZ })
// console.log({ minX })
// console.log({ minY })
// console.log({ minZ })

// steam is never expanding diagonally
// Challenge 2:

minX-=1
minY-=1
minZ-=1
maxX+=1
maxY+=1
maxZ+=1

function getNeighbours(point) {
    let neighbours = []
    neighbours.push({ x: point.x - 1, y: point.y, z: point.z })
    neighbours.push({ x: point.x + 1, y: point.y, z: point.z })
    neighbours.push({ x: point.x, y: point.y + 1, z: point.z })
    neighbours.push({ x: point.x, y: point.y - 1, z: point.z })
    neighbours.push({ x: point.x, y: point.y, z: point.z + 1 })
    neighbours.push({ x: point.x, y: point.y, z: point.z - 1 })

    neighbours = neighbours.filter(e => e.x >= minX && e.x <= maxX && e.y >= minY && e.y <= maxY && e.z >= minZ && e.z <= maxZ )
    return neighbours
}

let bfs = (start, coordinates) => {
    let form = [start]
    let queue = [start]

    while (queue.length > 0) {
        current = queue.pop()
        // console.log({current})
        let neighbours = getNeighbours(current)
        neighbours.forEach(e => {
            let isPartOfLava = false
            coordinates.forEach(c => {if(c.x == e.x && c.y == e.y && c.z == e.z){isPartOfLava |= true}})
            if (!isPartOfLava) {
                let isPartOfForm = false
                form.forEach(c => {if(c.x == e.x && c.y == e.y && c.z == e.z){isPartOfForm |= true}})
                if (!isPartOfForm) {
                    queue.push(e)
                    form.push(e)
                }
            }
        })
    }
    return form
}

function getTrueSurfaceArea(coordinates) {
    let startpoint = { x: minX, y: minY, z: minZ }
    let form = bfs(startpoint, coordinates)

    let insideAndOutsideOfForm = countSides(form)
    // console.log({insideAndOutsideOfForm})
    let onlyInsideOfForm = insideAndOutsideOfForm - 2 * ((maxX - minX+1) * (maxY - minY+1) + (maxX - minX+1) * (maxZ - minZ+1) + (maxY - minY+1) * (maxZ - minZ+1))
    return onlyInsideOfForm
}

console.log("Challenge 2: true surface area without encapsulated bubbles: " + getTrueSurfaceArea([...coordinates]))