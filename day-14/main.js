const fs = require("fs");

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/14

// Challenge 1
let rockStructures = input.split("\n").map(rock => rock.split(" -> ").map(line => line.split(",")))

const INFINITE = 1
const FINITE = 0

let createMap = (rockStructures, mode) => {
    let minX = Number(rockStructures.flat(1).map(coordinates => coordinates[0]).sort()[0])
    let maxX = Number(rockStructures.flat(1).map(coordinates => coordinates[0]).sort((a, b) => b - a)[0])
    let maxY = Number(rockStructures.flat(1).map(coordinates => coordinates[1]).sort((a, b) => b - a)[0])
    let marginRight = 1
    let marginLeft = 1
    if(mode == 0){
        maxY = maxY + 2
        marginRight = (500-minX)+maxY-(maxX-minX)
        marginLeft = Math.abs((500-minX+1)-maxY)
    }
    rockStructures = rockStructures.map(rock => rock.map(coordinates => [Number(coordinates[0]) - minX, Number(coordinates[1])]))

    let map = Array(maxY + 1).fill(0).map(e => Array(maxX - minX + 1 + marginLeft + marginRight).fill("."))

    let drawLine = (start, end, array) => {
        for (i = Math.min(start[0], end[0]); i <= Math.max(start[0], end[0]); i++) {
            for (j = Math.min(start[1], end[1]); j <= Math.max(start[1], end[1]); j++) {
                array[j][i + marginLeft] = "#"
            }
        }
        return array
    }

    rockStructures.forEach(rock => rock.forEach((coordinates, index) => { if (index < rock.length - 1) { map = drawLine(rock[index], rock[index + 1], map) } }))
    map[0][500 - minX + marginLeft] = "+"
    if(mode == 0){
        map[maxY].fill("#")
    }
    return map
}

let fillUp = (map, mode) => {
    let destSign = "~"
    if (mode == 0) {
        destSign = "o"
    }
    let startX = map[0].indexOf("+")
    let isFull = false
    while (!isFull) {
        let x = startX
        let y = (mode == 1? 1 : 0)
        for (i = 0; i < map.length; i++) {
            if (y + 1 >= map.length) {
                map[y][x] = "~"
                break
            }
            if (map[y + 1][x] == ".") {
                y++
            } else if (map[y + 1][x] == "~") {
                map[y][x] = "~"
                break
            } else if (x - 1 >= 0 && map[y + 1][x - 1] == ".") {
                y++
                x = x - 1
            } else if (x - 1 >= 0 && map[y + 1][x - 1] == "~") {
                map[y][x] = "~"
                break
            } else if (x + 1 < map[0].length && map[y + 1][x + 1] == ".") {
                y++
                x++
            } else if (x + 1 < map[0].length && map[y + 1][x + 1] == "~") {
                map[y][x] = "~"
                break
            } else {
                map[y][x] = "o"
                break
            }
        }
        if (map[(mode == 1? 1 : 0)][startX] == destSign) {
            isFull = true
        }
    }
}
let map = createMap(rockStructures, INFINITE)
fillUp(map, INFINITE)
//map.forEach(e => console.log(e.join("")))
console.log("Challenge 1: ")
console.log("Amount of resting sand: " + map.flat().reduce((acc, e) => { if (e == "o") { return acc + 1 } else { return acc } }, 0))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge 2:
 map = createMap(rockStructures, FINITE)
fillUp(map, FINITE)
//map.forEach(e => console.log(e.join("")))
console.log("Challenge 2: ")
console.log("Amount of resting sand: " + map.flat().reduce((acc, e) => { if (e == "o") { return acc + 1 } else { return acc } }, 0))