const { dir, Console } = require("console");
const fs = require("fs")

const input = fs.readFileSync('./input.txt').toString();

// Challenge 1
// find packet-start
let commands = input.split("$ cd ")
commands.shift()

commands = commands.map(command => command.split("\n"))

let root_dir = {
    name : "root",
    size : 0,
    dirs : [],
    files : [],
    parent : null
}

let change_directory = (current, command) => {
    if(command == "/"){
        return root_dir
    }
    if(command == ".."){
        return current.parent
    }
    return current.dirs.find(dir => dir.name == command)
}

let add_file = (current, file_size, file_name) => {
    current.files.push({name: file_name, size: Number(file_size)})
    current.size += Number(file_size)
}

let add_dir = (current, dir_name) => {
    current.dirs.push({name: dir_name, size: 0, dirs: [], files: [], parent: current})
}
let current_dir = 0
commands.forEach(command => {current_dir = change_directory(current_dir, command.shift()); command.shift(); 
                            command.forEach(line => {let word_one = line.split(" ")[0]
                                                    let word_two = line.split(" ")[1]
                                                if(word_one == "dir"){
                                                    add_dir(current_dir, word_two)
                                                }else{
                                                    add_file(current_dir, word_one, word_two)
                                                }})}
)



let update_sizes = (tree_root) => {
    tree_root.dirs.forEach( dir => tree_root.size += update_sizes(dir))
    return tree_root.size
}
root_dir.size = update_sizes(root_dir)

let get_dirs = (tree_root, acc) => {
    tree_root.dirs.forEach(dir => acc =get_dirs(dir, acc))
    acc.push(tree_root)
    return acc
}

let all_dirs_ascending = get_dirs(root_dir, []).map(dir => dir.size).sort( (a,b) => a-b)
console.log(all_dirs_ascending)
let all_dirs_smaller_100001 = all_dirs_ascending.slice(0, all_dirs_ascending.findIndex(e => e>100000))
console.log(all_dirs_smaller_100001.reduce((acc, e) => acc + e, 0))

required_space = 30000000 - (70000000 - root_dir.size) 
console.log("Smallest dir to delete: ")

let all_dirs_bigger_required = all_dirs_ascending.slice(all_dirs_ascending.findIndex(e => e>required_space,))
console.log(all_dirs_bigger_required[0])