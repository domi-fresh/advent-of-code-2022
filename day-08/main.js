const { dir, Console } = require("console");
const fs = require("fs")

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/8

// Challenge 1

let grid = input.split("\n").map(line => line.split("").map(tree => Number(tree)))

let grid_right_to_left = []
grid.forEach(row => grid_right_to_left.push([]))
grid.forEach((row, row_index) => row.forEach(col => grid_right_to_left[row_index].unshift(col)))

let grid_top_down = []
grid[0].forEach(col => grid_top_down.push([]))
grid.forEach((row) => row.forEach((col, col_index) => grid_top_down[col_index].push(col)))

let grid_bottom_up = []
grid_top_down.forEach(row => grid_bottom_up.push([]))
grid_top_down.forEach((row, row_index) => row.forEach(col => grid_bottom_up[row_index].unshift(col)))

let is_visible_grid = []
grid.forEach(row => is_visible_grid.push([]))
grid.forEach((row, row_index) => row.forEach((col) => is_visible_grid[row_index].push(false)))

grid.forEach((row, row_index) => {
    previous = -1
    for(i = 0; i<row.length; i++){
        if(row[i]>previous){
            previous = row[i]
            is_visible_grid[row_index][i] = is_visible_grid[row_index][i] || true
        }
    }
})

grid_right_to_left.forEach((row, row_index) => {
    previous = -1
    for(i = 0; i<row.length; i++){
        if(row[i]>previous){
            previous = row[i]
            is_visible_grid[row_index][row.length - i - 1] = is_visible_grid[row_index][row.length - i - 1] || true
        }
    }
})

grid_top_down.forEach((row, row_index) => {
    previous = -1
    for(i = 0; i<row.length; i++){
        if(row[i]>previous){
            previous = row[i]
            is_visible_grid[i][row_index] = is_visible_grid[i][row_index] || true
        }
    }
})

grid_bottom_up.forEach((row, row_index) => {
    previous = -1
    for(i = 0; i<row.length; i++){
        if(row[i]>previous){
            previous = row[i]
            is_visible_grid[row.length - i - 1][row_index] = is_visible_grid[row.length - i - 1][row_index] || true
        }
    }
})


console.log(grid)
console.log(is_visible_grid)


visible_trees = is_visible_grid.reduce( (acc, row) => acc + (row.reduce((inner_acc, col)=> {if(col){return inner_acc + 1}else{return inner_acc}}, 0)), 0)

console.log("\nTrees visible: " + visible_trees + "\n")


// Challenge 2:

let get_sight = (array, x, y, height) => {

    let top_sight = 0

    let bottom_sight = 0

    let left_sight = 0

    let right_sight = 0

    for(i = y; i > 0; i--){

         top_sight++

         if(array[i-1][x] >= height){

              break

         }

    }

    for(i = y; i < array.length-1; i++){

         bottom_sight++

         if(array[i+1][x] >= height){

              break

         }

    }

    for(i = x; i > 0; i--){

         left_sight++

         if(array[y][i-1] >= height){

              break

         }

    }

    for(i = x; i < array[y].length-1; i++){

         right_sight++

         if(array[y][i+1] >= height){

              break

         }

    }

    return (top_sight*bottom_sight*left_sight*right_sight)

}

let sights = grid.map((row, row_index, ) => row.map((col, col_index) => get_sight(grid, col_index, row_index, col)))







furthest_sight_per_row = sights.map( row => row.reduce((acc, col) => Math.max(acc, col), -1))

max_sight = furthest_sight_per_row.reduce((acc, sight) => Math.max(acc, sight), -1)

console.log("Max sight: " + max_sight)
