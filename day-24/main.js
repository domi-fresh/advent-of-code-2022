const fs = require("fs");
const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/24


// Challenge 1
let  valley = input.split("\n").map(line => line.split(""))
let width = valley[0].length
let height = valley.length

let time = 1000000
valley = valley.map((row, rowIndex)=> row.map((col, colIndex) => {return {sign: col, x: colIndex, y: rowIndex, z: 0}})).flat().filter(e => e.sign != ".")
// valley.forEach(line => console.log(line))

let addFrames = (valleyThroughTime, minutes) => {
    for(let i = 0; i<minutes; i++){
        let frame = valleyThroughTime.pop()
        let newFrame = []

        frame.forEach(blizzard => {switch(blizzard.sign){
            case "<":{
                let newX = blizzard.x -1
                if(newX == 0){
                    newX = width-2
                }
                newFrame.push({sign: blizzard.sign, x: newX, y: blizzard.y, z: blizzard.z+1})
            } break
            case ">":{
                let newX = blizzard.x +1
                if(newX == width-1){
                    newX = 1
                }
                newFrame.push({sign: blizzard.sign, x: newX, y: blizzard.y, z: blizzard.z+1})
            } break
            case "^":{
                let newY = blizzard.y -1
                if(newY == 0){
                    newY = height - 2
                }
                newFrame.push({sign: blizzard.sign, x: blizzard.x, y: newY, z: blizzard.z+1})
            } break
            case "v":{
                let newY = blizzard.y +1
                if(newY == height - 1){
                    newY = 1
                }
                newFrame.push({sign: blizzard.sign, x: blizzard.x, y: newY, z: blizzard.z+1})
            } break
            case "#":{
                newFrame.push({sign: blizzard.sign, x: blizzard.x, y: blizzard.y, z: blizzard.z+1})
            } break
            default: console.log("error")
        }})
        valleyThroughTime.push(frame)
        valleyThroughTime.push(newFrame)
    }
    return valleyThroughTime
}

let valleyThroughTime = [valley]
valleyThroughTime = addFrames(valleyThroughTime, time)

// Ausgabe der Frames
valleyThroughTime.forEach((frame, index) => {let val = Array(height).fill(0).map(row => Array(width).fill("."));
                                                frame.forEach(blizzard=> {if(val[blizzard.y][blizzard.x] == "."){val[blizzard.y][blizzard.x] = blizzard.sign}else if(val[blizzard.y][blizzard.x] == ">" || val[blizzard.y][blizzard.x] == "<" || val[blizzard.y][blizzard.x] == "v" || val[blizzard.y][blizzard.x] == "^"){val[blizzard.y][blizzard.x] = 2}else{val[blizzard.y][blizzard.x]++}});
                                                console.log(`\nMinute ${index}:`)
                                                val.forEach(row => console.log(row.join("")))
                                            }
                        )

function bfs3D(start, valleyThroughTime){
    let finishX = width-2
    let finishY = height-1
    
}