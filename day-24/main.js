const { doesNotMatch } = require("assert");
const fs = require("fs");
const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/24


// Challenge 1
let  valley = input.split("\n").map(line => line.split(""))
let width = valley[0].length
let height = valley.length

let time = 1000
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
// valleyThroughTime.forEach((frame, index) => {let val = Array(height).fill(0).map(row => Array(width).fill("."));
//                                                 frame.forEach(blizzard=> {if(val[blizzard.y][blizzard.x] == "."){val[blizzard.y][blizzard.x] = blizzard.sign}else if(val[blizzard.y][blizzard.x] == ">" || val[blizzard.y][blizzard.x] == "<" || val[blizzard.y][blizzard.x] == "v" || val[blizzard.y][blizzard.x] == "^"){val[blizzard.y][blizzard.x] = 2}else{val[blizzard.y][blizzard.x]++}});
//                                                 console.log(`\nMinute ${index}:`)
//                                                 val.forEach(row => console.log(row.join("")))
//                                             })

function walkThroughValley(start, valleyThroughTime){
    let finishX = width-2
    let finishY = height-1
    let distances = Array(valleyThroughTime.length).fill(0)
    distances = distances.map(frame => Array(height).fill(0).map(col => Array(width).fill(-1)))
    let parents = Array(valleyThroughTime.length).fill(0)
    parents = parents.map(frame => Array(height).fill(0).map(col => Array(width).fill(null)))

    distances[start.z][start.y][start.x] = 0
    parents[start.z][start.y][start.x] = 1
    let queue = [start]

    let counter = 0

    while(queue.length > 0){
        let current = queue.shift()

        let stay =  {x: current.x, y: current.y, z: current.z+1, possible: true}
        let left = {x: current.x-1, y: current.y, z: current.z+1, possible: true}
        let right = {x: current.x+1, y: current.y, z: current.z+1, possible: true}
        let up = {x: current.x, y: current.y-1, z: current.z+1, possible: true}
        let down = {x: current.x, y: current.y+1, z: current.z+1, possible: true}

        if(down.x == finishX && down.y == finishY && (counter == 0 || counter == 2)){
            console.log("Made it to the end of the valley after " + down.z + " minutes")
            if(counter == 2){
                return distances
            }
            if(counter == 0){
                finishX = 1
                finishY = 0
                counter++
            }
            start = {x: current.x, y: current.y, z: current.z+1}
            queue = [start]
            distances = Array(valleyThroughTime.length).fill(0)
            distances = distances.map(frame => Array(height).fill(0).map(col => Array(width).fill(-1)))
            parents = Array(valleyThroughTime.length).fill(0)
            parents = parents.map(frame => Array(height).fill(0).map(col => Array(width).fill(null)))

            distances[start.z][start.y][start.x] = 0
            parents[start.z][start.y][start.x] = 1
            continue
        }else if(up.x == finishX && up.y == finishY && counter == 1){
            console.log("Made it back to the entrance of the valley after " + up.z + " minutes")
            finishX = width-2
            finishY = height-1
            counter++

            start = {x: current.x, y: current.y, z: current.z+1}
            queue = [start]
            distances = Array(valleyThroughTime.length).fill(0)
            distances = distances.map(frame => Array(height).fill(0).map(col => Array(width).fill(-1)))
            parents = Array(valleyThroughTime.length).fill(0)
            parents = parents.map(frame => Array(height).fill(0).map(col => Array(width).fill(null)))

            distances[start.z][start.y][start.x] = 0
            parents[start.z][start.y][start.x] = 1
            continue
        }
        
        let movements = [stay, left, right, up, down]

        movements.forEach(movement => movement.possible = (movement.x < width-1 && movement.x > 0) && (movement.y > 0 || (movement.x == 1 && movement.y == 0)) && (movement.y < height-1 || movement.x == width-2 && movement.y == height-1) && (movement.z < valleyThroughTime.length))
        
        if(current.z + 1 < valleyThroughTime.length){

            valleyThroughTime[current.z + 1].forEach(obstacle => {movements.forEach(movement => {movement.possible = movement.possible && (movement.x != obstacle.x || movement.y != obstacle.y || movement.z != obstacle.z)})})
        }else{
            movements.forEach(movement=> movement.possible = false)
        }
        
        movements.forEach(movement => {if(movement.possible){
                                            if(parents[movement.z][movement.y][movement.x] == null){
                                                distances[movement.z][movement.y][movement.x] = distances[current.z][current.y][current.x] + 1
                                                queue.push(movement)
                                                parents[movement.z][movement.y][movement.x] = 1
                                            }}})
    }
    return
}

let start = {x: 1, y: 0, z: 0}

walkThroughValley(start, valleyThroughTime)