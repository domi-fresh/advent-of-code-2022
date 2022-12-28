const { time } = require("console");
const fs = require("fs");
const path = require("path");

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/16

// Challenge 1
let valves = input.split("\n").map(line => {if(line.length<54){return line.split("; tunnel leads to valve ")}else{return line.split("; tunnels lead to valves ")}})
let valveObjects = []
valves.forEach(valve => valveObjects.push({"name": valve[0].substring(6, 8),"flowRate": Number(valve[0].substring(23)), "tunnels": valve[1].split(", ")}))
console.log(valveObjects)


let closedValvesInDescendingFlowRates = [...valveObjects]
closedValvesInDescendingFlowRates.sort((a,b) => b.flowRate-a.flowRate)
console.log("--------------------------")

let bfs = (startValve, valves) => {
    let startIndex = valves.indexOf(startValve)
    let distances = Array(valves.length).fill(-1)
    distances[startIndex] = 0

    let parents = Array(valves.length).fill(null)
    parents[startIndex] = startValve
    queue = [startIndex]

    while(queue.length != 0){
        u = queue.shift()
        valves[u].tunnels.forEach(tunnel => 
            {let tunnelIndex = valves.findIndex(e => e.name == tunnel)
                if(parents[tunnelIndex] == null){
                queue.push(tunnelIndex)
                distances[tunnelIndex] = distances[u] + 1
                parents[tunnelIndex] = valves[u]
        }})
    }
    let steps = Array(distances.length).fill(0).map(e => [])
    steps = steps.map((v, i) => {
        let temp = valves[i]
        let steps = []
        // console.log({startValve})
        // console.log({temp})
        while(temp != startValve){
            steps.unshift(temp)
            temp = parents[valves.indexOf(temp)]
        }
        // console.log({steps})
        // console.log("")
        // console.log("//////////////////////////////////////////////////////")
        // console.log("//////////////////////////////////////////////////////")
        // console.log("")

        return steps
    }) 
    // console.log({parents})
    // console.log({valves})
    distances = distances.map((d, i) => [valves[i].name, d])
    return [distances, steps]
}


function findGreatestPressureRelease(timeLeft, currentPosition, valves, valvesAlreadyOpened) {
    //console.log({currentPosition})
    if(timeLeft <= 0){
        return [0, []]
    }
    let distances = bfs(currentPosition, valves)
    //console.log({distances})
    let paths = Array(distances.length).fill(0)
    let valveRelease = 0
    if(!valvesAlreadyOpened.includes(currentPosition)){
        timeLeft--
        valveRelease = Math.max(0, timeLeft)*currentPosition.flowRate
        valvesAlreadyOpened.push(currentPosition)
    }
    paths = [...valves].map((v, index) => {if(!valvesAlreadyOpened.includes(v)){return findGreatestPressureRelease(timeLeft-distances[0][index][1], v, valves, [...valvesAlreadyOpened])}else{return [0, []]}}).sort((a,b)=> b[0] - a[0])
    bestPath = paths[0]

    bestPath[1].unshift(currentPosition)
    return [bestPath[0]+valveRelease, bestPath[1]]
}

let valvesWithoutFlow = valveObjects.filter(e => e.flowRate == 0)
console.log({valvesWithoutFlow})
let startingPos = valveObjects[valveObjects.findIndex(e => e.name == "AA")]
 let idealWay = findGreatestPressureRelease(30, startingPos, valveObjects, [...valvesWithoutFlow])

 idealWay[1].forEach(v => console.log(v.name))
 console.log("Maximum releaseable Pressure: " + idealWay[0])

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
