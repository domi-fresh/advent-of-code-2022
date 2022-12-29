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

let valvesWithoutFlow = [...valveObjects].filter(e => e.flowRate == 0)
console.log({valvesWithoutFlow})
let startingPos = valveObjects[valveObjects.findIndex(e => e.name == "AA")]
let idealWay = findGreatestPressureRelease(30, startingPos, [...valveObjects], [...valvesWithoutFlow])

 idealWay[1].forEach(v => console.log(v.name))
 console.log("Maximum releaseable Pressure: " + idealWay[0])

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let bfs2 = (startValve, valves) => {
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
    
    distances = distances.map((d, i) => [valves[i], d])
    return distances
}


// function bruteForceBoth(mytime, eletime, mytar, eletar, mytimetotar, eletimetotar, valves, valvesAlreadyOpened){
//     if(mytime <= 0 && eletime<= 0 || valvesAlreadyOpened.length == valves.length){
//         return 0
//     }
//     let addedFlow = 0
//     let bestRelease = 0
//     if(mytime > 1){
//         if(mytimetotar <= 0){
//             let mynewtime = mytime
//             if(valvesAlreadyOpened.indexOf(mytar)== -1){
//                 mynewtime--
//                 valvesAlreadyOpened.push(mytar)
//                 addedFlow += (mynewtime)*mytar.flowRate
//             }
//             // console.log({mytime})
//             let distances = bfs2(mytar, valves)
//             distances.forEach(valve => {if(valvesAlreadyOpened.indexOf(valve[0])==-1){
//                 // console.log(valve[0])
//                 let mynewtar = valve[0]
//                 let mynewtimetotar = valve[1]
//                 let timeskip = Math.min(mynewtimetotar, eletimetotar)
//                 if(eletime <= 1){timeskip = mynewtimetotar}

//                 // console.log({timeskip})
//                 let possibleRelease = bruteForceBoth(mynewtime-timeskip, eletime-timeskip, mynewtar, eletar, mynewtimetotar-timeskip, eletimetotar-timeskip, [...valves], [...valvesAlreadyOpened])
//                 if(bestRelease < possibleRelease){
//                     bestRelease = possibleRelease
//                 }
//             }})
//         }
//     }
//     if(eletime > 1){
//         if(eletimetotar <= 0){
//             let elenewtime = eletime
//             if(valvesAlreadyOpened.indexOf(eletar)== -1){
//                 elenewtime--
//                 valvesAlreadyOpened.push(eletar)
//                 addedFlow += (elenewtime)*eletar.flowRate
//             }
//             // console.log({eletime})
//             let distances = bfs2(eletar, valves)
//             distances.forEach(valve => {if(valvesAlreadyOpened.indexOf(valve[0])==-1){
//                 // console.log(valve[0])
//                 let elenewtar = valve[0]
//                 let elenewtimetotar = valve[1]
//                 let timeskip = Math.min(elenewtimetotar, mytimetotar)
//                 if(mytime <= 1){timeskip = elenewtimetotar}

//                 // console.log({timeskip})
//                 let possibleRelease = bruteForceBoth(mytime-timeskip, elenewtime-timeskip, mytar, elenewtar, mytimetotar-timeskip, elenewtimetotar-timeskip, [...valves], [...valvesAlreadyOpened])
//                 if(possibleRelease > bestRelease){
//                     bestRelease = possibleRelease
//                 }
//             }})
//         }
//     }

//     return addedFlow + bestRelease
        
// }

function bruteForceBoth(mytime, eletime, mytar, eletar, mytimetotar, eletimetotar, valves, valvesAlreadyOpened){
    if(mytime <= 0 && eletime<= 0 || valvesAlreadyOpened.length == valves.length){
        return 0
    }
    let addedFlow = 0
    let bestRelease = 0
    let msg = []
    let oldmsg = []

    if(mytime > 1 && mytimetotar <= 0 && eletime > 1 && eletimetotar <= 0){
        let mynewtime = mytime
        let elenewtime = eletime
        
        if(elenewtime < mynewtime){
            if(valvesAlreadyOpened.indexOf(mytar)== -1){
                msg.push("Minute " + (27-mynewtime) + "   You open valve " + mytar.name + "   openValves: " + [...valvesAlreadyOpened].map(e => e.name).join(","))
                mynewtime--
                valvesAlreadyOpened.push(mytar)
                addedFlow += (mynewtime)*mytar.flowRate
            }
            if(valvesAlreadyOpened.indexOf(eletar)== -1){
                msg.push("Minute " + (27-elenewtime) + "   The elephant opens valve " + eletar.name + "   openValves: " + [...valvesAlreadyOpened].map(e => e.name).join(","))
                elenewtime--
                valvesAlreadyOpened.push(eletar)
                addedFlow += (elenewtime)*eletar.flowRate
            }
        } else {
            if(valvesAlreadyOpened.indexOf(eletar)== -1){
                msg.push("Minute " + (27-elenewtime) + "   The elephant opens valve " + eletar.name + "   openValves: " + [...valvesAlreadyOpened].map(e => e.name).join(","))
                elenewtime--
                valvesAlreadyOpened.push(eletar)
                addedFlow += (elenewtime)*eletar.flowRate
            }
            if(valvesAlreadyOpened.indexOf(mytar)== -1){
                msg.push("Minute " + (27-mynewtime) + "   You open valve " + mytar.name + "   openValves: " + [...valvesAlreadyOpened].map(e => e.name).join(","))
                mynewtime--
                valvesAlreadyOpened.push(mytar)
                addedFlow += (mynewtime)*mytar.flowRate
            }
        }
        

        let mydistances = bfs2(mytar, valves)
            mydistances.forEach(valve => {if(valvesAlreadyOpened.indexOf(valve[0])==-1){
                // console.log(valve[0])
                let mynewtar = valve[0]
                let mynewtimetotar = valve[1]

                // console.log({timeskip})
                let eledistances = bfs2(eletar, valves)
                eledistances.forEach(valve => {if(valvesAlreadyOpened.indexOf(valve[0])==-1){
                // console.log(valve[0])
                let elenewtar = valve[0]
                let elenewtimetotar = valve[1]
                let timeskip = Math.min(elenewtimetotar, mynewtimetotar)
                // console.log({timeskip})
                let possibleRelease = bruteForceBoth(mynewtime-timeskip, elenewtime-timeskip, mynewtar, elenewtar, mynewtimetotar-timeskip, elenewtimetotar-timeskip, [...valves], [...valvesAlreadyOpened])
                if(possibleRelease[0] > bestRelease){
                    bestRelease = possibleRelease[0]
                    oldmsg = possibleRelease[1]
                }
                }})
            }})

    }else
    if(mytime > 1){
        if(mytimetotar <= 0){
            let mynewtime = mytime
            if(valvesAlreadyOpened.indexOf(mytar)== -1){
                msg.push("Minute " + (27-mynewtime) + "   You open valve " + mytar.name + "   openValves: " + [...valvesAlreadyOpened].map(e => e.name).join(","))
                mynewtime--
                valvesAlreadyOpened.push(mytar)
                addedFlow += (mynewtime)*mytar.flowRate
            }
            // console.log({mytime})
            let distances = bfs2(mytar, valves)
            distances.forEach(valve => {if(valvesAlreadyOpened.indexOf(valve[0])==-1){
                // console.log(valve[0])
                let mynewtar = valve[0]
                let mynewtimetotar = valve[1]
                let timeskip = Math.min(mynewtimetotar, eletimetotar)
                if(eletime <= 1){timeskip = mynewtimetotar}

                // console.log({timeskip})
                let possibleRelease = bruteForceBoth(mynewtime-timeskip, eletime-timeskip, mynewtar, eletar, mynewtimetotar-timeskip, eletimetotar-timeskip, [...valves], [...valvesAlreadyOpened])
                if(bestRelease < possibleRelease[0]){
                    bestRelease = possibleRelease[0]
                    oldmsg = possibleRelease[1]
                }
            }})
        }
    }else
    if(eletime > 1){
        if(eletimetotar <= 0){
            let elenewtime = eletime
            if(valvesAlreadyOpened.indexOf(eletar)== -1){
                msg.push("Minute " + (27-elenewtime) + "   The elephant opens valve " + eletar.name + "   openValves: " + [...valvesAlreadyOpened].map(e => e.name).join(","))
                elenewtime--
                valvesAlreadyOpened.push(eletar)
                addedFlow += (elenewtime)*eletar.flowRate
            }
            // console.log({eletime})
            let distances = bfs2(eletar, valves)
            distances.forEach(valve => {if(valvesAlreadyOpened.indexOf(valve[0])==-1){
                // console.log(valve[0])
                let elenewtar = valve[0]
                let elenewtimetotar = valve[1]
                let timeskip = Math.min(elenewtimetotar, mytimetotar)
                if(mytime <= 1){timeskip = elenewtimetotar}

                // console.log({timeskip})
                let possibleRelease = bruteForceBoth(mytime-timeskip, elenewtime-timeskip, mytar, elenewtar, mytimetotar-timeskip, elenewtimetotar-timeskip, [...valves], [...valvesAlreadyOpened])
                if(possibleRelease[0] > bestRelease){
                    bestRelease = possibleRelease[0]
                    oldmsg = possibleRelease[1]
                }
            }})
        }
    }
    return [addedFlow + bestRelease, [...msg, ...oldmsg]]
        
}

console.log({valvesWithoutFlow})
let firsttarget = valveObjects[valveObjects.findIndex(e => e.name == "AA")]

let optimalPressureRelease = bruteForceBoth(26, 26, firsttarget, firsttarget, 0, 0, [...valveObjects], [...valvesWithoutFlow])

console.log({optimalPressureRelease})
