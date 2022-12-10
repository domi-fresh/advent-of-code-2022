const { dir, Console } = require("console");
const fs = require("fs")

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/10

// Challenge 1
let commands = input.split("\n").map(line => line.split(" "))

let executeCommands = (commands) => {
    let sigStrength = 0
    let registerX = 1
    let cycle = 1

    commands.forEach(command => {
        for(i = 0; i < command.length; i++){
            if((cycle-20)%40 == 0){
                sigStrength += (cycle*registerX)
            }
            cycle++
        }
        if(command.length == 2){
            registerX += Number(command[1])
        }
    })
    return sigStrength
}

console.log("Challenge 1: ")
console.log("Sum of signal strengths: " + executeCommands(commands))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n--------------------------------------------------------------------------")
console.log("--------------------------------------------------------------------------\n")
// Challenge 2

let computeImage = (commands) => {
    let registerX = 1
    let cycle = 0
    let output = Array(6).fill("")

    commands.forEach(command => {
        for(i = 0; i < command.length; i++){
            if(Math.abs(registerX - cycle%40) <= 1){
                output[Math.floor(cycle/40)] += "#"
            }else{
                output[Math.floor(cycle/40)] += "."
            }
            cycle++
        }
        if(command.length == 2){
            registerX += Number(command[1])
        }
    })
    return output
}

console.log("Challenge 2: ")
console.log("CRT drawing:\n")
console.log(computeImage(commands).join("\n"))