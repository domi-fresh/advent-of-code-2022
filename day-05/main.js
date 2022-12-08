const fs = require("fs")

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/5

// Challenge 1
let cargo = [[], [], [], [], [], [], [], [], []]
input.split("\n")
        .slice(0, 8)
            .forEach(line => {for(i = 0; i<9; i++){
                if(line.charAt(4*i + 1) != " "){
                    cargo[i].unshift(line.charAt(4*i + 1))
                }
            }})
console.log(cargo)
console.log("\n\n-------------------------------------\n\n")


let instructions_9000 = input.split("\n")
.slice(10,)
.map(line => line.split(" "))
.forEach(words =>   {for(i = Number(words[1]); i>0; i--){
    if(cargo[Number(words[3])-1].length > 0){
        let crate = cargo[Number(words[3])-1].pop()
        cargo[Number(words[5])-1].push(crate)
    }
}
}
)
console.log(cargo)
console.log("\n\n-------------------------------------\n\n")
console.log("\n\n-------------------------------------\n\n")

let topCrates = cargo.map(stack => stack.pop()).reduce((acc, element) => acc + element, "")
console.log("Challenge 1: " + topCrates)


//////////////////////////////////////////////////////////////////////////////////////////////////
//execute instructions challenge 2:
cargo = [[], [], [], [], [], [], [], [], []]
input.split("\n")
        .slice(0, 8)
            .forEach(line => {for(i = 0; i<9; i++){
                if(line.charAt(4*i + 1) != " "){
                    cargo[i].unshift(line.charAt(4*i + 1))
                }
            }})
            
input.split("\n")
.slice(10,)
.map(line => line.split(" "))
.forEach(words =>   {
        let temp = []
        let amount = Number(words[1])
        let origin = Number(words[3])-1
        let destination = Number(words[5])-1
        
        for(i = 0; i<amount; i++){
            let crate = cargo[origin].pop()
            temp.push(crate)
        }
        for(i = 0; i<amount; i++){
            let crate = temp.pop()
            cargo[destination].push(crate)
        }
    }
)

console.log(cargo)
console.log("\n\n-------------------------------------\n\n")
console.log("\n\n-------------------------------------\n\n")

let topCrates_Challenge2 = cargo.map(stack => stack.pop()).reduce((acc, element) => acc + element, "")
console.log("Challenge 2: " + topCrates_Challenge2)



  