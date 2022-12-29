const fs = require("fs");
const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/21


// Challenge 1
let snafu = input.split("\n").map(line => line.split(""))

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

function convertToDecimal(snafuNumber){
    let highestPower = snafuNumber.length-1
    return snafuNumber.map((digit, index) => {switch(digit){
                                                case "=": return Math.pow(5, highestPower-index)*-2
                                                case "-": return Math.pow(5, highestPower-index)*-1
                                                case "0": return 0
                                                case "1": return Math.pow(5, highestPower-index)*1
                                                case "2": return Math.pow(5, highestPower-index)*2
                                            }}).reduce((acc, e) => acc+e, 0)
}

function convertToSnafu(decNum){
    let length = Math.ceil(getBaseLog(5, decNum*2,5))
    let snafu = Array(length)
    for(let i = 0; i< length; i++){
        let negative = decNum < 0
        let result = Math.round(decNum/Math.pow(5, length-1-i))
        if(!negative){
            snafu[i] = String(result)
            decNum -= Math.pow(5, length-1-i)*snafu[i]
        }else{
            switch(result){
                case 0: snafu[i] = "0";
                        break
                case -1: snafu[i] = "-"; 
                        decNum -= Math.pow(5, length-1-i)*-1; break
                case -2: snafu[i] = "="; 
                        decNum -= Math.pow(5, length-1-i)*-2; break
                default: console.log("error")
            }

        }
    }
    return snafu//.join("")

}

// console.log({snafu})
let decimals = snafu.map(e => convertToDecimal(e))
// console.log({decimals})

let fuelDecimal = decimals.reduce((acc, e) => acc+e, 0)
console.log("Required fuel as decimal: " + fuelDecimal)

let fuelSnafu = convertToSnafu(fuelDecimal)

console.log("Challenge :")
console.log("Fuel in SNAFU format: " + fuelSnafu.join(""))

