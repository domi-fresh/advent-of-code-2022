const fs = require("fs");
const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/23


// Challenge 1
let grove = input.split("\n").map(line => line.split(""))
let elves = []
let elveID = 0
grove.forEach((line, lineIndex) => line.forEach((col, colIndex)=> {if(col == '#'){elves.push({id: elveID, x: colIndex, y: lineIndex, validPos: true}); elveID++}}))

// console.log(elves)


let walk = (elves, rounds) => {
    let oldPositions = [...elves]

    let findNewPos = (elve, dir, previousPositions) => {

        let shouldMove = false
        previousPositions.forEach(e => {if(e.x == elve.x && e.y == elve.y-1 || e.x == elve.x-1 && e.y == elve.y-1 || e.x == elve.x+1 && e.y == elve.y-1
                                    || e.x == elve.x && e.y == elve.y+1 || e.x == elve.x-1 && e.y == elve.y+1 || e.x == elve.x+1 && e.y == elve.y+1
                                    || e.x == elve.x-1 && e.y == elve.y || e.x == elve.x+1 && e.y == elve.y){
                                        shouldMove = true}})
        if(!shouldMove){
            return [{id: elve.id, x: elve.x, y: elve.y, validPos: true}, shouldMove]
        }

        for(let i = 0; i<4; i++){
            switch(dir){
                case 0: {
                    let northIsFree = true
                    previousPositions.forEach(e => {if(e.x == elve.x && e.y == elve.y-1 || e.x == elve.x-1 && e.y == elve.y-1 || e.x == elve.x+1 && e.y == elve.y-1){northIsFree = false}})
                    if(northIsFree){
                        return [{id: elve.id, x: elve.x, y: elve.y-1, validPos: true}, shouldMove]
                    }
                }break
                case 1: {
                    let southIsFree = true
                    previousPositions.forEach(e => {if(e.x == elve.x && e.y == elve.y+1 || e.x == elve.x-1 && e.y == elve.y+1 || e.x == elve.x+1 && e.y == elve.y+1){southIsFree = false}})
                    if(southIsFree){
                        return [{id: elve.id, x: elve.x, y: elve.y+1, validPos: true}, shouldMove]
                    }
                }break
                case 2: {
                    let westIsFree = true
                    previousPositions.forEach(e => {if(e.x == elve.x-1 && e.y == elve.y || e.x == elve.x-1 && e.y == elve.y-1 || e.x == elve.x-1 && e.y == elve.y+1){westIsFree = false}})
                    if(westIsFree){
                        return [{id: elve.id, x: elve.x-1, y: elve.y, validPos: true}, shouldMove]
                    }
                }break
                case 3: {
                    let eastIsFree = true
                    previousPositions.forEach(e => {if(e.x == elve.x+1 && e.y == elve.y || e.x == elve.x+1 && e.y == elve.y-1 || e.x == elve.x+1 && e.y == elve.y+1){eastIsFree = false}})
                    if(eastIsFree){
                        return [{id: elve.id, x: elve.x+1, y: elve.y, validPos: true}, shouldMove]
                    }
                }break
                default: console.log("error")
            }
            dir = (dir+1)%4
        }
        return [{id: elve.id, x: elve.x, y: elve.y, validPos: true}, shouldMove]
    }

    // 0 = N,  1 = S,  2 = W,  3 = E
    for(let round = 0; round<rounds; round++){
        let startDirection = round%4
        let elvesMoved = false

        let newElves = []
        oldPositions.forEach(elve => {let newPos = findNewPos(elve, startDirection, oldPositions); newElves.push(newPos[0]); elvesMoved = elvesMoved || newPos[1]})

        newElves.forEach(e0 => {newElves.forEach(e1 => {if(e0.x == e1.x && e0.y == e1.y && e0.id != e1.id){e0.validPos = false}})})
        newElves.forEach((e, index) => {if(e.validPos){oldPositions[index] = e}})
        if(!elvesMoved){
            console.log("No elve moved in round " + (round+1) + "\n")
            return oldPositions
        }
    }

    return oldPositions
}

let rounds = 10000
let newElvePositions = walk(elves, rounds)
// console.log({newElvePositions})

let minX = [...newElvePositions].reduce((acc, e) => Math.min(acc, e.x), Number.MAX_SAFE_INTEGER)
let maxX = [...newElvePositions].reduce((acc, e) => Math.max(acc, e.x), Number.MIN_SAFE_INTEGER)
let minY = [...newElvePositions].reduce((acc, e) => Math.min(acc, e.y), Number.MAX_SAFE_INTEGER)
let maxY = [...newElvePositions].reduce((acc, e) => Math.max(acc, e.y), Number.MIN_SAFE_INTEGER)
// console.log({minX})
// console.log({maxX})
// console.log({minY})
// console.log({maxY})

newElvePositions = newElvePositions.map(e => {return {id: e.id, x: e.x-minX, y: e.y-minY, validPos: true}})

let elveMap = Array(maxY-minY+1).fill(0).map(line=> Array(maxX-minX+1).fill("."))
newElvePositions.forEach(elve => {elveMap[elve.y][elve.x] = '#'})
// console.log({newElvePositions})
console.log(`Elves after ${rounds} rounds\n`)
elveMap.forEach(line => console.log(line.join("")))
console.log("\nChallenge 1:")
console.log("The number of empty ground tiles is " + (elveMap.length*elveMap[0].length-newElvePositions.length))
