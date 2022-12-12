const { dir, Console } = require("console");
const fs = require("fs")

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/12

// Challenge 1
let map = input.split("\n").map(line => line.split("").map(letter =>  letter.charCodeAt(0)))


let width = map[0].length
let height = map.length

let edges = Array(height).fill(0)
edges = edges.map(row => [])

let getEdges = (map, rowIndex, colIndex, val) => {
    value = val
    if(val == 'S'.charCodeAt(0)){
        value = 'a'.charCodeAt(0)
    }
    if(val == 'E'.charCodeAt(0)){
        value == 'z'.charCodeAt(0)
    }
    let result = {"value": value,
                    "edges": []}
    if(rowIndex-1 >= 0 && map[rowIndex-1][colIndex] <= value+1 && (map[rowIndex-1][colIndex] != 'E'.charCodeAt(0) || value == 'z'.charCodeAt(0))){
        result.edges.push([rowIndex-1, colIndex])
    }
    if(rowIndex+1 < map.length && map[rowIndex+1][colIndex] <= value+1 && (map[rowIndex+1][colIndex] != 'E'.charCodeAt(0) || value == 'z'.charCodeAt(0))){
        result.edges.push([rowIndex+1, colIndex])
    }
    if(colIndex-1 >= 0 && map[rowIndex][colIndex-1] <= value+1 && (map[rowIndex][colIndex-1] != 'E'.charCodeAt(0) || value == 'z'.charCodeAt(0))){
        result.edges.push([rowIndex, colIndex-1])
    }
    if(colIndex+1 < map[0].length && map[rowIndex][colIndex+1] <= value+1 && (map[rowIndex][colIndex+1] != 'E'.charCodeAt(0) || value == 'z'.charCodeAt(0))){
        result.edges.push([rowIndex, colIndex+1])
    }

    return result
}

map.forEach((row, rowIndex) => row.forEach((col, colIndex) => edges[rowIndex].push(getEdges(map, rowIndex, colIndex, col))))

let endPosition = [Math.floor(map.flat().indexOf('E'.charCodeAt(0))/width), map.flat().indexOf('E'.charCodeAt(0))%width]
let startPositions = map.flat().map((e, index) => [e, index]).filter((element) => element[0] == 'S'.charCodeAt(0)).map(element => [Math.floor(element[1]/width), element[1]%width])

let bfs = (start, edgeMap) => {
    let distances = Array(height).fill(0)
    distances = distances.map(row => [])
    distances.forEach(row => {for(i = 0; i<width; i++){row.push(-1)}})
    distances[start[0]][start[1]] = 0

    let parents = Array(height).fill(0)
    parents = parents.map(row => [])
    parents.forEach(row => {for(i = 0; i<width; i++){row.push(null)}})
    parents[start[0]][start[1]] = start

    queue = [start]

    while(queue.length != 0){
        u = queue.shift()
        edgeMap[u[0]][u[1]].edges.forEach(edge => 
            {if(parents[edge[0]][edge[1]] == null){
                queue.push([edge[0], edge[1]])
                distances[edge[0]][edge[1]] = distances[u[0]][u[1]] + 1
                parents[edge[0]][edge[1]] = u
        }})
    }
    return distances
}

pathLengths = startPositions.map(pos => bfs(pos, edges)[endPosition[0]][endPosition[1]]).filter(path => path != -1).sort((a,b) => a-b)
console.log("Challenge 1: ")
console.log("shortest path length: " +  pathLengths[0])

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge 2

startPositions = map.flat().map((e, index) => [e, index]).filter((element) => element[0] == 'S'.charCodeAt(0) || element[0] == 'a'.charCodeAt(0)).map(element => [Math.floor(element[1]/width), element[1]%width])

pathLengths = startPositions.map(pos => bfs(pos, edges)[endPosition[0]][endPosition[1]]).filter(path => path != -1).sort((a,b) => a-b)
console.log("Challenge 2: ")
console.log("shortest path length by starting at a's and S: " + pathLengths[0])