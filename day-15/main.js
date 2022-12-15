const fs = require("fs");

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/15

// Challenge 1
let sensorsAndBeacons = input.split("Sensor at x=").map(line => line.split(": closest beacon is at x=").map(SorB => SorB.trim().split(", y=").map(coordinate => Number(coordinate))))
sensorsAndBeacons.shift()
let computeManhattanDist = (pair) => {
    let sensor = pair[0]
    let beacon = pair[1]
    return Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1])
}

sensorsBeaconsDistancesNotOffsetted = sensorsAndBeacons.map(pair => { return [[pair[0][0], pair[0][1], computeManhattanDist(pair)], [pair[1][0], pair[1][1], 0]] })

let minX = sensorsBeaconsDistancesNotOffsetted.flat(1).map(coordinates => coordinates[0] - coordinates[2] - 1).sort((a, b) => a - b)[0]
let maxX = sensorsBeaconsDistancesNotOffsetted.flat(1).map(coordinates => coordinates[0] + coordinates[2] - 1).sort((a, b) => b - a)[0]
let minY = sensorsBeaconsDistancesNotOffsetted.flat(1).map(coordinates => coordinates[1] - coordinates[2] - 1).sort((a, b) => a - b)[0]
sensorsBeaconsDistances = sensorsBeaconsDistancesNotOffsetted.map(pair => pair.map(coordinates => [coordinates[0] - minX, coordinates[1] - minY, coordinates[2]]))

let coordinateIsClear = (x, y, sensorsBeaconsDistances) => {
    for (let i = 0; i < sensorsBeaconsDistances.length; i++) {
        let pair = sensorsBeaconsDistances[i]
        let range = pair[0][2]
        let sensorX = pair[0][0]
        let sensorY = pair[0][1]
        let beaconX = pair[1][0]
        let beaconY = pair[1][1]
        let deltaX = Math.abs(sensorX - x)
        let deltaY = Math.abs(sensorY - y)
        if (deltaX + deltaY <= range && !(x == sensorX && y == sensorY) && !(x == beaconX && y == beaconY)) {
            return true
        }
    }
    return false
}

let counter = 0
for (let i = 0; i < maxX - minX; i++) {
    if (coordinateIsClear(i, 10 - minY, sensorsBeaconsDistances)) {
        counter++
    }
}
console.log("Challenge 1: ")
console.log(counter)
console.log("/////////////////////////////////////////")

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge 2: 

let findWidestRestRange = (x, y, sensorsBeaconsDistances) => {
    let sensorIndex = -1
    let maxRestRange = 1
    for (let i = 0; i < sensorsBeaconsDistances.length; i++) {
        let pair = sensorsBeaconsDistances[i]
        let range = pair[0][2]
        let sensorX = pair[0][0]
        let sensorY = pair[0][1]
        let deltaX = Math.abs(sensorX - x)
        let deltaY = Math.abs(sensorY - y)
        if (range - (deltaX + deltaY) > maxRestRange) {
            maxRestRange = range - (deltaY + deltaX)
            sensorIndex = i
        }
    }
    return maxRestRange
}

let coordinateIsDot = (x, y, sensorsBeaconsDistances) => {
    for (let i = 0; i < sensorsBeaconsDistances.length; i++) {
        let pair = sensorsBeaconsDistances[i]
        let range = pair[0][2]
        let sensorX = pair[0][0]
        let sensorY = pair[0][1]
        let deltaX = Math.abs(sensorX - x)
        let deltaY = Math.abs(sensorY - y)
        if (deltaX + deltaY <= range) {
            return false
        }
    }
    return true
}

let findHiddenBeacon = (mapLength, sensorsBeaconsDistances) => {
    let x = 0
    let y = 0
    while (true) {
        if (coordinateIsDot(x, y, sensorsBeaconsDistances)) {
            return [x, y]
        }
        let step = findWidestRestRange(x, y, sensorsBeaconsDistances)
        y += Math.floor((x + step) / mapLength)
        x = (x + step) % mapLength
    }
}
console.log("Challenge 2: ")
console.time("Beacon Finder")
let coordinatesOfHiddenBeacon = findHiddenBeacon(4000000, sensorsBeaconsDistancesNotOffsetted)
console.timeEnd("Beacon Finder")
console.log("Tuning Frequency: " + (coordinatesOfHiddenBeacon[0]*4000000+coordinatesOfHiddenBeacon[1]))



