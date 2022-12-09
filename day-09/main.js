const { dir, Console } = require("console");
const fs = require("fs")

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/9

// Challenge 1
let commands = input.split("\n").map(line => line.split(" "))
let positionList = [[0, 0]]

let comparePositions = (arr, knot) => {
    if(arr.find(pos => pos[0] == knot[0] && pos[1] == knot[1]) == undefined){
        arr.push([knot[0], knot[1]])
    }
}

let catchUp = (posList, head, tail) => {
    let deltaX = head[0]-tail[0]
    let deltaY = head[1]-tail[1]
    if(Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1){
        tail[0] += deltaX/Math.max(Math.abs(deltaX), 1)
        tail[1] += deltaY/Math.max(Math.abs(deltaY), 1)
    }
    return tail
}

let execCommand = (command, posList, rope) => {

    switch(command[0]){
        case "R": {
            for(i = 0; i<Number(command[1]); i++){
                rope[0][0]++
                for(j = 0; j < rope.length-1; j++){
                    rope[j+1] = catchUp(posList, rope[j], rope[j+1])
                }
                comparePositions(posList, rope[rope.length-1])
            }
            break
        }
        case "L": {
            for(i = 0; i<Number(command[1]); i++){
                rope[0][0]--
                for(j = 0; j < rope.length-1; j++){
                    rope[j+1] = catchUp(posList, rope[j], rope[j+1])
                }
                comparePositions(posList, rope[rope.length-1])
            }
            break
        }
        case "U": {
            for(i = 0; i<Number(command[1]); i++){
                rope[0][1]++
                for(j = 0; j < rope.length-1; j++){
                    rope[j+1] = catchUp(posList, rope[j], rope[j+1])
                }
                comparePositions(posList, rope[rope.length-1])
            }
            break
        }
        case "D": {
            for(i = 0; i<Number(command[1]); i++){
                rope[0][1]--
                for(j = 0; j < rope.length-1; j++){
                    rope[j+1] = catchUp(posList, rope[j], rope[j+1])
                }
                comparePositions(posList, rope[rope.length-1])
            }
            break
        }
        default: {
            console.log("Command is unknown\n")
        }
    }
}

// Array.fill() nicht geeignet!!! verwendet gleiche Referenzen beim befüllen mit Objekten!
let knots = [[0, 0], [0, 0]]
commands.forEach(command => execCommand(command, positionList, knots))

console.log("Challenge 1: ")
//console.log("Positions: " + positionList)
console.log("Number of positions visited by tail: " + positionList.length)



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge 2:
console.log("-------------------------------------------------" + "\n"
             + "-------------------------------------------------")

knots = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]

positionList = [[0, 0]]

commands.forEach(command => execCommand(command, positionList, knots))

console.log("Challenge 2: ")
//console.log("Positions: " + positionList)
console.log("Number of positions visited by tail: " + positionList.length)
