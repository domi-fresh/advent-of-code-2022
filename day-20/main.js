const fs = require("fs");
const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/20


// Challenge 1
let numbers = input.split("\n").map(n => {return {number: Number(n)}})


function sort(numbers, times){
    
    let array = [...numbers]
    let length = array.length
    for(let i = 0; i < times; i++){
        console.log(`round ${i}:`)
    numbers.forEach(element => {
        let oldIndex = array.indexOf(element)
        let newIndex = ((oldIndex+element.number+ Math.floor((oldIndex+element.number)/length))%length+length)%length
        // if(oldIndex+element.number <= 0){newIndex = ((newIndex + Math.floor((oldIndex+element.number)/length)) % length + length) % length}
        // if(oldIndex+element.number >= array.length){newIndex = ((newIndex + Math.floor((oldIndex+element.number)/length)) % length + length) % length}
         array.splice(oldIndex, 1)
         array.splice(newIndex, 0, element)

        // console.log("Number : " + element.number)
        // console.log({oldIndex})
        // console.log({newIndex})

        console.log({array})
    })
    }
    return array
}
console.log({numbers})
let sorted = sort(numbers, 1)
let sum = 0
for(let i = 1000; i <= 3000; i+=1000){
    console.log(sorted[((i+sorted.findIndex(e => e.number == 0))%sorted.length+sorted.length)%sorted.length])
    sum += sorted[((i+sorted.findIndex(e => e.number == 0))%sorted.length+sorted.length)%sorted.length].number
}
console.log({sum})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge 2

let decKey = Math.floor(811589153/numbers.length)
let newNumbers = [...numbers].map(num => {return {number: num.number*decKey}})

let sortedTwo = sort(newNumbers, 10)
let sumTwo = 0
for(let i = 1000; i <= 3000; i+=1000){
    console.log(sortedTwo[((i+sortedTwo.findIndex(e => e.number == 0))%sortedTwo.length+sortedTwo.length)%sortedTwo.length])
    sumTwo += sortedTwo[((i+sortedTwo.findIndex(e => e.number == 0))%sortedTwo.length+sortedTwo.length)%sortedTwo.length].number
}
console.log({sumTwo})

console.log("decKey % numbers.length")
console.log(decKey % numbers.length)
console.log("decKey / numbers.length")
console.log(decKey / numbers.length)

// Initial arrangement:
// 811589153, 1623178306, -2434767459, 2434767459, -1623178306, 0, 3246356612

// After 1 round of mixing:
// 0, -2434767459, 3246356612, -1623178306, 2434767459, 1623178306, 811589153

// After 2 rounds of mixing:
// 0, 2434767459, 1623178306, 3246356612, -2434767459, -1623178306, 811589153

// After 3 rounds of mixing:
// 0, 811589153, 2434767459, 3246356612, 1623178306, -1623178306, -2434767459

// After 4 rounds of mixing:
// 0, 1623178306, -2434767459, 811589153, 2434767459, 3246356612, -1623178306

// After 5 rounds of mixing:
// 0, 811589153, -1623178306, 1623178306, -2434767459, 3246356612, 2434767459

// After 6 rounds of mixing:
// 0, 811589153, -1623178306, 3246356612, -2434767459, 1623178306, 2434767459

// After 7 rounds of mixing:
// 0, -2434767459, 2434767459, 1623178306, -1623178306, 811589153, 3246356612

// After 8 rounds of mixing:
// 0, 1623178306, 3246356612, 811589153, -2434767459, 2434767459, -1623178306

// After 9 rounds of mixing:
// 0, 811589153, 1623178306, -2434767459, 3246356612, 2434767459, -1623178306

// After 10 rounds of mixing:
// 0, -2434767459, 1623178306, 3246356612, -1623178306, 2434767459, 811589153