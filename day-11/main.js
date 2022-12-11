const { dir, Console } = require("console");
const fs = require("fs")

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/11

// Challenge 1
let commands = input.split("\n\n").map(line => line.split("\n"))

let challenge1 = (numberOfMonkeys, rounds, calmDown) =>{
let monkeys = Array(numberOfMonkeys).fill(0)

monkeys = monkeys.map((monkey, index) => 
    {
        let startingItems = commands[index][1].substring(18).split(", ").map(item => Number(item));
        let operation = commands[index][2].substring(19).split(" ");
        let test = Number(commands[index][3].substring(21));
        let destinations = [Number(commands[index][5].substring(30)), Number(commands[index][4].substring(29))]
        return {items : startingItems,
                "operation" : operation,
                "test" : test,
                "destinations" : destinations}
    })

let inspections = Array(monkeys.length).fill(0)

let evaluate = (value, operation) => {
    let x = 0
    let y = 0
    let result = 0
    if(operation[0] == "old"){
        x = value
    }else{
        x = Number(operation[0])
    }
    if(operation[2] == "old"){
        y = value
    }else{
        y = Number(operation[2])
    }
    switch(operation[1]){
        case '+': result = x + y; break
        case '-': result = x - y; break
        case '*': result = x * y; break
        case '/': result = x / y; break
        default: result = -1
    }
    return result
}


for(round = 0; round < rounds; round++){
    for(i = 0; i < monkeys.length; i++){
        let itemsCount = monkeys[i].items.length
        for(j = 0; j < itemsCount; j++){
            inspections[i]++
            oldWorryLevel = monkeys[i].items.shift();
            newWorryLevel = evaluate(oldWorryLevel, monkeys[i].operation)
            newWorryLevel = Math.floor(newWorryLevel/calmDown)
            newMonkeyIndex = monkeys[i].destinations[Number(newWorryLevel%monkeys[i].test == 0)]
            monkeys[newMonkeyIndex].items.push(newWorryLevel)
        }
    }
}

console.log("Challenge 1: ")
inspections_sorted = inspections.sort((a, b) => b-a)
console.log(inspections_sorted[0] * inspections_sorted[1])

}



// Challenge 2

let challenge2 = (numberOfMonkeys, rounds) =>{
    let monkeys = Array(numberOfMonkeys).fill(0)
    
    monkeys = monkeys.map((monkey, index) => 
        {
            let startingItems = commands[index][1].substring(18).split(", ").map(item => Number(item));
            let operation = commands[index][2].substring(19).split(" ");
            let test = Number(commands[index][3].substring(21));
            let destinations = [Number(commands[index][5].substring(30)), Number(commands[index][4].substring(29))]
            return {items : startingItems,
                    "operation" : operation,
                    "test" : test,
                    "destinations" : destinations}
        })
    
    let inspections = Array(monkeys.length).fill(0)
    let calmDown = monkeys.reduce((acc,monkey) => monkey.test*acc, 1)

    let evaluate = (value, operation) => {
        let x = 0
        let y = 0
        let result = 0
        if(operation[0] == "old"){
            x = value
        }else{
            x = Number(operation[0])
        }
        if(operation[2] == "old"){
            y = value
        }else{
            y = Number(operation[2])
        }
        switch(operation[1]){
            case '+': result = x + y; break
            case '-': result = x - y; break
            case '*': result = x * y; break
            case '/': result = x / y; break
            default: result = -1
        }
        return result
    }
    
    
    for(round = 0; round < rounds; round++){
        for(i = 0; i < monkeys.length; i++){
            let itemsCount = monkeys[i].items.length
            for(j = 0; j < itemsCount; j++){
                inspections[i]++
                oldWorryLevel = monkeys[i].items.shift();
                newWorryLevel = evaluate(oldWorryLevel, monkeys[i].operation)
                newWorryLevel = Math.floor(newWorryLevel%calmDown)
                newMonkeyIndex = monkeys[i].destinations[Number(newWorryLevel%monkeys[i].test == 0)]
                monkeys[newMonkeyIndex].items.push(newWorryLevel)
            }
        }
    }
    
    console.log("Challenge 2: ")
    inspections_sorted = inspections.sort((a, b) => b-a)
    console.log(inspections_sorted[0] * inspections_sorted[1])
    }

challenge1(commands.length, 20, 3)
console.log("\n--------------------------------------------------------------------\n--------------------------------------------------------------------\n")
challenge2(commands.length, 10000)

