const fs = require("fs");
const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/21


// Challenge 1
let monkeys = input.split("\n").map(line => line.split(": "))
monkeys = monkeys.map(mon => {let name = mon[0]; let calc = mon[1]; if(calc.split(" ").length == 1){return {"name": name, isEvaluated: true, value: Number(calc)}}else{return {"name": name, isEvaluated: false, value: {left: calc.split(" ")[0], right: calc.split(" ")[2], operator: calc.split(" ")[1]}}}})
// monkeys.forEach(m => console.log(m.value))

let evaluate = (calc, monkeys) => {
    if(calc.isEvaluated){
        return calc.value
    }
    if(typeof(calc.value.left) == "string"){
        let left = monkeys[monkeys.findIndex(e => e.name == calc.value.left)]
        calc.value.left = evaluate(left, monkeys)
    }
    if(typeof(calc.value.right) == "string"){
        let right = monkeys[monkeys.findIndex(e => e.name == calc.value.right)]
        calc.value.right = evaluate(right, monkeys)
    }

    calc.isEvaluated = true
    switch(calc.value.operator){
        case "+": {
            return calc.value.left + calc.value.right
        }
        case "-": {
            return calc.value.left - calc.value.right
        }
        case "*": {
            return calc.value.left * calc.value.right
        }
        case "/": {
            return calc.value.left / calc.value.right
        }
        default: {
            console.log("error")
        }
    }    
}
let rootMonkey = monkeys[monkeys.findIndex(e => e.name == "root")]
rootMonkey.value = evaluate(rootMonkey, [...monkeys])

console.log("Challenge 1: rootMonkey has number: " + rootMonkey.value)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
// Challenge 2


let evaluate2 = (calc, monkeys) => {
    if(calc.isEvaluated){
        return calc.value
    }
    if(typeof(calc.value.left) == "string"){
        let left = monkeys[monkeys.findIndex(e => e.name == calc.value.left)]
        calc.value.left = evaluate(left, monkeys)
    }
    if(typeof(calc.value.right) == "string"){
        let right = monkeys[monkeys.findIndex(e => e.name == calc.value.right)]
        calc.value.right = evaluate(right, monkeys)
    }

    calc.isEvaluated = true

    if(calc.name == "root"){
        console.log("rootLeft: " + calc.value.left)
        console.log("rootRight: " + calc.value.right)
        return calc.value.left == calc.value.right
    }

    switch(calc.value.operator){
        case "+": {
            return calc.value.left + calc.value.right
        }
        case "-": {
            return calc.value.left - calc.value.right
        }
        case "*": {
            return calc.value.left * calc.value.right
        }
        case "/": {
            return calc.value.left / calc.value.right
        }
        default: {
            console.log("error")
        }
    }    
}

let monkeys2 = input.split("\n").map(line => line.split(": "))
monkeys2 = monkeys2.map(mon => {let name = mon[0]; let calc = mon[1]; if(calc.split(" ").length == 1){return {"name": name, isEvaluated: true, value: Number(calc)}}else{return {"name": name, isEvaluated: false, value: {left: calc.split(" ")[0], right: calc.split(" ")[2], operator: calc.split(" ")[1]}}}})

//monkeys2[monkeys2.findIndex(e => e.name == "humn")].value = 20000
// console.log(monkeys2)
let rootMonkey2 = monkeys2[monkeys2.findIndex(e => e.name == "root")]
//rootMonkey2.value = evaluate2(rootMonkey2, monkeys2)
// console.log(monkeys2)

let dependsOnHumn = (monk, monkeys) => {
    if(monk.name == "humn"){
        return true
    }
    if(monk.isEvaluated){
        return false
    }
    let left = monkeys[monkeys.findIndex(e => e.name == monk.value.left)]
    let right = monkeys[monkeys.findIndex(e => e.name == monk.value.right)]
    return dependsOnHumn(left, monkeys) || dependsOnHumn(right, monkeys)
}

let findNumber = (calc, expected, monkeys) => {
    if(calc.name == "root"){
        let left = monkeys[monkeys.findIndex(e => e.name == calc.value.left)]
        let right = monkeys[monkeys.findIndex(e => e.name == calc.value.right)]
        if(dependsOnHumn(left, [...monkeys])){
            calc.value.right = evaluate(right, monkeys)
            return findNumber(left, calc.value.right, monkeys)
        }else{
            calc.value.left = evaluate(left, monkeys)
            return findNumber(right, calc.value.left, monkeys)
        }
    }
    if(calc.name == "humn"){
        console.log({expected})
        return expected
}else{
        let left = monkeys[monkeys.findIndex(e => e.name == calc.value.left)]
        let right = monkeys[monkeys.findIndex(e => e.name == calc.value.right)]
        if(dependsOnHumn(left, [...monkeys]) && !(dependsOnHumn(right, [...monkeys]))){
            calc.value.right = evaluate(right, monkeys)
            let newExpected = expected
            switch(calc.value.operator){
                case "+": {
                    newExpected -= calc.value.right
                }break
                case "-": {
                    newExpected += calc.value.right
                }break
                case "*": {
                    newExpected = newExpected/calc.value.right
                }break
                case "/": {
                    newExpected *= calc.value.right
                }break
                default: {
                    console.log("error")
                }
            }
            return findNumber(left, newExpected, monkeys)
        }else if(dependsOnHumn(right, [...monkeys]) && !(dependsOnHumn(left, [...monkeys]))){
            calc.value.left = evaluate(left, monkeys)
            let newExpected = expected
            switch(calc.value.operator){
                case "+": {
                    newExpected -= calc.value.left
                }break
                case "-": {
                    newExpected += calc.value.left
                }break
                case "*": {
                    newExpected = newExpected/calc.value.left
                }break
                case "/": {
                    newExpected *= calc.value.left
                }break
                default: {
                    console.log(calc.value.operator)
                }
            }
            return findNumber(right, newExpected, monkeys)
        }else{console.log("error in dependencies")}
    }
    return undefined
}

//console.log(dependsOnHumn(monkeys2[monkeys2.findIndex(e => e.name == rootMonkey2.value.right)], monkeys2))
let humnNumber = findNumber(monkeys2[monkeys2.findIndex(e => e.name == "root")], true, [...monkeys2])
console.log("Challenge 2: human needs to have the number " + humnNumber)
///6745394553620