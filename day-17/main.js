const { time } = require("console");
const fs = require("fs");

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/17

/* Stone shapes:

####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##

*/


// Challenge 1
let commands = input.split("")
// console.log({commands})

let height = 0
let width = 7
let cave = []
let commandNumber = 0
let numberOfRocks =  1000000000000
let base = 0
let heightOne = 0
let heightTwo = 0
let n1 = 0
let n2 = 0
let heightDiff = -1
let comNums = []

let f = 0
let pairFound = false

for(let n = 0; n < numberOfRocks; n++){
    let rock = {compartments: []}
    switch(n%5){
        case 0: {
            if(numberOfRocks > 10){
                let topLevel = Array(width).fill(".")
                cave.forEach(rock => rock.compartments.forEach(comp => {if(comp.y == height-1){topLevel[comp.x] = "#"}}))
                
                if((topLevel[3] == "#" 
                || topLevel[0] == "#" && topLevel[4] == "#"
                || topLevel[1] == "#" && (topLevel[4]=="#" || topLevel[5]=="#")
                || topLevel[2]=="#" && (topLevel[4]=="#" || topLevel[5]=="#" || topLevel[6]=="#")
                ) 
                && !pairFound){
                    cave = []
                    base = height
                    comNums.forEach(e => {if(e[0] == commandNumber && !pairFound){pairFound = true}})
                    if(pairFound){
                        heightOne = comNums[comNums.findIndex(e => e[0]==commandNumber)][1]
                        n1 = comNums[comNums.findIndex(e => e[0]==commandNumber)][2]
                        heightTwo = height
                        n2 = n
                        console.log(comNums[comNums.findIndex(e => e[0]==commandNumber)])
                        console.log({heightOne})
                        console.log({n1})
                        console.log({heightTwo})
                        console.log({n2})
                        console.log({commandNumber})
                        heightDiff = heightTwo - heightOne
                        let nDiff = n2-n1
                        let cycles = Math.floor((numberOfRocks-n1)/nDiff)
                        n = n1 + nDiff*cycles
                        height = heightOne + heightDiff*cycles
                        base = height
                        console.log({heightDiff})
                        console.log({nDiff})
                        console.log({commandNumber})
                        console.log({height})
                    }else{
                        comNums.push([commandNumber, height, n])
                    }   
                }
            }
            
            for(let i = 0; i<4; i++){
            rock.compartments.push({x: 2+i, y: height+3})}
            } break
        case 1: {
            rock.compartments.push({x: 3, y: height+5})
            rock.compartments.push({x: 3, y: height+4})
            rock.compartments.push({x: 3, y: height+3})
            rock.compartments.push({x: 2, y: height+4})
            rock.compartments.push({x: 4, y: height+4})
            } break
        case 2: {
            rock.compartments.push({x: 2, y: height+3})
            rock.compartments.push({x: 3, y: height+3})
            rock.compartments.push({x: 4, y: height+3})
            rock.compartments.push({x: 4, y: height+4})
            rock.compartments.push({x: 4, y: height+5})
            } break
        case 3: {for(let i = 0; i<4; i++){
            rock.compartments.push({x: 2, y: height+3+i})}
            } break
        case 4: {
            rock.compartments.push({x: 2, y: height+3})
            rock.compartments.push({x: 3, y: height+3})
            rock.compartments.push({x: 2, y: height+4})
            rock.compartments.push({x: 3, y: height+4})
        } break
        default: {
            console.log("Error in modulus")
        }
    }
    
    
    let falling = true
    while(falling){
        let command = commands[commandNumber]
        commandNumber = (commandNumber+1)%commands.length
        // console.log({commandNumber})
       
        let deltaX = 1
        if(command == "<"){
            deltaX = -1
        }
        let isValidHorizontalMovement = true

        rock.compartments.forEach(compartment => {isValidHorizontalMovement &= (compartment.x+deltaX >= 0 && compartment.x+deltaX < width)})

        if(isValidHorizontalMovement){
            cave.forEach(r => r.compartments.forEach(crComp => {rock.compartments.forEach(compartment => isValidHorizontalMovement &= (compartment.x+deltaX != crComp.x || compartment.y != crComp.y))}))
        }
        if(isValidHorizontalMovement){
            rock.compartments = rock.compartments.map(comp => {return {x: comp.x+deltaX, y: comp.y}})
        }

        rock.compartments.forEach(compartment => {
            falling &= compartment.y > base})
        if(falling){
            cave.forEach(r => r.compartments.forEach(crComp => {rock.compartments.forEach(compartment => falling &= (compartment.x != crComp.x || compartment.y-1 != crComp.y))}))
        }
        if(falling){
            rock.compartments = rock.compartments.map(comp => {return {x: comp.x, y: comp.y-1}})
        }
    }
    cave.push(rock)


    height = Math.max(height, rock.compartments.reduce((acc, comp) => {return Math.max(acc, comp.y)}, 0)+1)
}

// let caveArray = Array(height).fill(0).map(line => Array(7).fill("."))

// cave.forEach(rock => rock.compartments.forEach(comp => caveArray[comp.y][comp.x] = "#"))

// caveArray.reverse().forEach(line => console.log(line.join("")))

console.log({height})
console.log({commandNumber})
console.log("done")


// too low:
// 1558285642

// too high:
// 


//1558285714232 my input wrong


//1560932944615  Matthias
//1534844192687  Ich