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
    if(instructionPointer == instructions.length){
        return ""
    }
    let nextR = instructions.substring(instructionPointer).indexOf("R")
    let nextL = instructions.substring(instructionPointer).indexOf("L")
    if(nextR == -1){
        nextR = instructions.substring(instructionPointer).length
    }
    if(nextL == -1){
        nextL = instructions.substring(instructionPointer).length
    }
    let command = instructions.substring(instructionPointer, instructionPointer + Math.min(nextR, nextL))
    if(command.length == 0){
        command = instructions.substring(instructionPointer, instructionPointer+1)
    }
    instructionPointer += command.length
    return command
}

function takeStep(currentPos, dir, map){
    let newX = 0
    let newY = 0

    switch(dir){
        case 0: {
            newX = currentPos.x + 1
            newY = currentPos.y
            if(map[currentPos.y].length <= newX){
                newX = map[currentPos.y].lastIndexOf(" ")+1
            }
            if(map[newY][newX] == "#"){
                return currentPos
            }else{
                map[currentPos.y][currentPos.x] = ">"
                return {x: newX, y: newY}
            }
        }
        case 1: {
            newX = currentPos.x
            newY = currentPos.y+1
            if(map.length <= newY || map[newY].length <= newX || map[newY][newX] == " "){
                while(newY > 0 && map[newY-1].length > newX && map[newY-1][newX] != " "){
                    newY--
                }
            }
            if(map[newY][newX] == "#"){
                return currentPos
            }else{
                map[currentPos.y][currentPos.x] = "v"
                return {x: newX, y: newY}
            }
        }
        case 2: {
            newX = currentPos.x - 1
            newY = currentPos.y
            if(newX < 0 || map[newY][newX] == " "){
                newX = map[currentPos.y].length-1
            }
            if(map[newY][newX] == "#"){
                return currentPos
            }else{
                map[currentPos.y][currentPos.x] = "<"
                return {x: newX, y: newY}
            }
        }
        case 3: {
            newX = currentPos.x
            newY = currentPos.y-1
            if(newY < 0 || map[newY].length <= newX || map[newY][newX] == " "){
                while(newY+1 < map.length && map[newY+1].length > newX && map[newY+1][newX] != " "){
                    newY++
                }
            }
            if(map[newY][newX] == "#"){
                return currentPos
            }else{
                map[currentPos.y][currentPos.x] = "^"
                return {x: newX, y: newY}
            }
        }
        default: {
            console.log("error")
        }
    }
}


function walk(){
    let map = board.split("\n").map(line => line.split(""))
    let currentPos = {x: board.indexOf("."), y: 0}
    let dir = 0

    map[currentPos.y][currentPos.x] = ">"
    
    map.forEach(line => console.log(line.join("")))
    console.log()

    let command = getNextCommand()
    while(command != ""){
        switch(command){
            case "R": {
                dir = (dir + 1)%4
                switch(dir){
                    case 0: {
                        map[currentPos.y][currentPos.x] = ">"
                    } break
                    case 1: {
                        map[currentPos.y][currentPos.x] = "v"
                    } break
                    case 2: {
                        map[currentPos.y][currentPos.x] = "<"
                    } break
                    case 3: {
                        map[currentPos.y][currentPos.x] = "^"
                    } break
                    default: {
                        console.log("error")
                    }
                }
            } break
            case "L": {
                dir = ((dir - 1)%4+4)%4
                switch(dir){
                    case 0: {
                        map[currentPos.y][currentPos.x] = ">"
                    } break
                    case 1: {
                        map[currentPos.y][currentPos.x] = "v"
                    } break
                    case 2: {
                        map[currentPos.y][currentPos.x] = "<"
                    } break
                    case 3: {
                        map[currentPos.y][currentPos.x] = "^"
                    } break
                    default: {
                        console.log("error")
                    }
                }
            } break
            default: {
                command = Number(command)
                while(command>0){
                    command--
                    newPos = takeStep(currentPos, dir, map)
                    if(newPos.x == currentPos.x && newPos.y == currentPos.y){
                        command = 0
                    }else{
                        currentPos = newPos
                    }
                }
            }
        }
        command = getNextCommand()
    }
    return [map, currentPos, dir]
}

let path = walk()
let map = path[0]
let finalPos = path[1]
let dir = path[2]
map.forEach(line => console.log(line.join("")))

console.log("Challenge 1: final Password = " + (1000*(finalPos.y+1) + 4*(finalPos.x+1) + dir))


//Challenge 2
// 113369 is too low

instructionPointer = 0

function takeStep2(currentPos, dir, map){
    let sideLength = map.reduce((acc, e) => Math.min(e.length, acc), Number.MAX_SAFE_INTEGER)
    let newX = 0
    let newY = 0

    switch(dir){
        case 0: {
            newX = currentPos.x + 1
            newY = currentPos.y
            if(map[currentPos.y].length <= newX){
                if(newY < 1*sideLength){
                    newX = 2*sideLength-1
                    newY = 3*sideLength-currentPos.y-1
                    dir = 2
                }else if(newY < 2*sideLength){
                    newX = currentPos.y+sideLength
                    newY = sideLength-1
                    dir = 3
                }else if(newY < 3*sideLength){
                    newX = 3*sideLength-1
                    newY = 3*sideLength-currentPos.y-1
                    dir = 2
                }else if(newY < 4*sideLength){
                    newX = currentPos.y-2*sideLength
                    newY = 3*sideLength-1
                    dir = 3
                }
            }
            if(map[newY][newX] == "#"){
                return [currentPos, dir]
            }else{
                map[currentPos.y][currentPos.x] = ">"
                return [{x: newX, y: newY}, dir]
            }
        }
        case 1: {
            newX = currentPos.x
            newY = currentPos.y+1
            if(map.length <= newY || map[newY].length <= newX || map[newY][newX] == " "){
                if(newX < 1*sideLength){
                    newX += 2*sideLength
                    newY = 0
                    dir = 1
                }else if(newX < 2*sideLength){
                    newX = sideLength-1
                    newY = currentPos.x + 2*sideLength
                    dir = 2
                }else if(newX < 3*sideLength){
                    newX = 2*sideLength-1
                    newY = currentPos.x-sideLength
                    dir = 2
                }
            }
            if(map[newY][newX] == "#"){
                return [currentPos, dir]
            }else{
                map[currentPos.y][currentPos.x] = "v"
                return [{x: newX, y: newY}, dir]
            }
        }
        case 2: {
            newX = currentPos.x - 1
            newY = currentPos.y
            if(newX < 0 || map[newY][newX] == " "){
                if(newY < 1*sideLength){
                    newX = 0
                    newY = 3*sideLength-currentPos.y-1
                    dir = 0
                }else if(newY < 2*sideLength){
                    newX = newY-sideLength
                    newY = 2*sideLength
                    dir = 1
                }else if(newY < 3*sideLength){
                    newX = sideLength
                    newY = 3*sideLength-currentPos.y-1
                    dir = 0
                }else if(newY < 4*sideLength){
                    newX = newY-2*sideLength
                    newY = 0
                    dir = 1
                }
            }
            if(map[newY][newX] == "#"){
                return [currentPos, dir]
            }else{
                map[currentPos.y][currentPos.x] = "<"
                return [{x: newX, y: newY}, dir]
            }
        }
        case 3: {
            newX = currentPos.x
            newY = currentPos.y-1
            if(newY < 0 || map[newY].length <= newX || map[newY][newX] == " "){
                if(newX < 1*sideLength){
                    newX = sideLength
                    newY = currentPos.x+sideLength
                    dir = 0
                }else if(newX < 2*sideLength){
                    newX = 0
                    newY = currentPos.x + 2*sideLength
                    dir = 0
                }else if(newX < 3*sideLength){
                    newX -= 2*sideLength
                    newY = 4*sideLength-1
                    dir = 3
                }
            }
            if(map[newY][newX] == "#"){
                return [currentPos, dir]
            }else{
                map[currentPos.y][currentPos.x] = "^"
                return [{x: newX, y: newY}, dir]
            }
        }
        default: {
            console.log("error")
        }
    }
}

function walk2(){
    let map = board.split("\n").map(line => line.split(""))
    let currentPos = {x: board.indexOf("."), y: 0}
    let dir = 0

    map[currentPos.y][currentPos.x] = ">"
    
    map.forEach(line => console.log(line.join("")))
    console.log()

    let command = getNextCommand()
    while(command != ""){
        switch(command){
            case "R": {
                dir = (dir + 1)%4
                switch(dir){
                    case 0: {
                        map[currentPos.y][currentPos.x] = ">"
                    } break
                    case 1: {
                        map[currentPos.y][currentPos.x] = "v"
                    } break
                    case 2: {
                        map[currentPos.y][currentPos.x] = "<"
                    } break
                    case 3: {
                        map[currentPos.y][currentPos.x] = "^"
                    } break
                    default: {
                        console.log("error")
                    }
                }
            } break
            case "L": {
                dir = ((dir - 1)%4+4)%4
                switch(dir){
                    case 0: {
                        map[currentPos.y][currentPos.x] = ">"
                    } break
                    case 1: {
                        map[currentPos.y][currentPos.x] = "v"
                    } break
                    case 2: {
                        map[currentPos.y][currentPos.x] = "<"
                    } break
                    case 3: {
                        map[currentPos.y][currentPos.x] = "^"
                    } break
                    default: {
                        console.log("error")
                    }
                }
            } break
            default: {
                command = Number(command)
                while(command>0){
                    command--
                    let step = takeStep2(currentPos, dir, map)
                    let newPos = step[0]
                    if(newPos.x == currentPos.x && newPos.y == currentPos.y){
                        command = 0
                    }else{
                        dir = step[1]
                        currentPos = newPos
                    }
                }
            }
        }
        command = getNextCommand()
    }
    return [map, currentPos, dir]
}

let path2 = walk2()
let map2 = path2[0]
let finalPos2 = path2[1]
let dir2 = path2[2]
map2.forEach(line => console.log(line.join("")))

console.log("Challenge 2: final Password = " + (1000*(finalPos2.y+1) + 4*(finalPos2.x+1) + dir2))
