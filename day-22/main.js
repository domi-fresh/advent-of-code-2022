const fs = require("fs");
const { get } = require("https");
const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/22


// Challenge 1
let board = input.split("\n\n")[0]
let instructions = input.split("\n\n")[1]

// console.log(board)

let instructionPointer = 0

function getNextCommand(){
    let command = instructions.substring(instructionPointer, instructionPointer + Math.min(instructions.substring(instructionPointer, ).indexOf("R"), instructions.substring(instructionPointer).indexOf("L")))
    if(command.length == 0){
        command = instructions.substring(instructionPointer, instructionPointer+1)
    }
    instructionPointer += command.length
    return command
}

function walk(){
    let map = board.split("\n").map(line => line.split(""))
    let currentPos = {x: board.indexOf("."), y: 0}
    let dir = 0

    map[currentPos.y][currentPos.x] = ">"
    
    map.forEach(line => console.log(line.join("")))

    let command = getNextCommand()
    while(command != ""){
        switch(command){
            case "R": {
                dir = (dir + 1)%4
            } break
            case "L": {
                dir = ((dir - 1)%4+4)%4
            } break
            default: {
                command = Number(command)
            }
        }
        console.log({command})
        console.log({dir})

        //TODO walk, command check


        command = getNextCommand()
    }
}

walk()