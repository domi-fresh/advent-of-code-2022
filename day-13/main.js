const fs = require("fs");

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/13

// Challenge 1
let packets = input.split("\n\n").map(package => package.split("\n").map(line => JSON.parse(line)))

let compare = (a, b) => {
    let left = [...a]
    let right = [...b]
    result = 0
    while(left.length != 0 && right.length != 0){
        
        temp_l = left.shift()
        temp_r = right.shift()
        if(Array.isArray(temp_l)){
            result = (Array.isArray(temp_r)? compare(temp_l, temp_r) : compare(temp_l, [temp_r]))
        }else {
            if(Array.isArray(temp_r)){
                result = compare([temp_l], temp_r)
            } else {
                if(temp_l > temp_r){
                    result = -1
                }else if(temp_l < temp_r){
                    result = 1
                }
            }
        }
        if(result != 0){
            return result
        }
    }
    result = (right.length > 0?1 : (left.length > 0? -1 : 0)) 
    return result
}

let evalPackets = (packets.map(packet => compare(packet[0], packet[1])))
let inOrderPackets = evalPackets.map((packet, index) => {return (packet == 1? index+1 : packet)}).filter(e => e>-1)
console.log("Challenge 1: ")
console.log("Sum of indices of in-order-packages: ")
console.log(inOrderPackets.reduce((acc, e) => acc+e, 0))
console.log("--------------------------------------")
console.log("--------------------------------------")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge 2
let firstKey = [[2]]
let secondKey = [[6]]
let allPackets = [firstKey, secondKey]
input.split("\n\n").map(package => package.split("\n").map(line => JSON.parse(line))).forEach(packet => packet.forEach(side => allPackets.push(side)))

console.log("Challenge 2: ")
let sortedPackets = allPackets.sort((a, b) => {return -1 *compare(a, b)})
console.log("Decoder key: ")
console.log((sortedPackets.indexOf(firstKey)+1)*(sortedPackets.indexOf(secondKey)+1))