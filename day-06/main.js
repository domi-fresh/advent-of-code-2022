const fs = require("fs")

const input = fs.readFileSync('./input.txt').toString();

// Challenge 1
// find packet-start
let count = 4;

let signal_array = input.split("");

for(let i = 0; i<signal_array.length; i++){
    let packet_marker = []
    for(let j = 0; j<4; j++){
        packet_marker.push(signal_array[i+j])
    }
    if(packet_marker.filter((v, i, a) => a.indexOf(v) == i).length == 4){
        break;
    }
    count++;
}
console.log("start-of-packet: " + count);

// Challenge 2
// find message-start
count = 14;

signal_array = input.split("");

for(let i = 0; i<signal_array.length; i++){
    let message_marker = []
    for(let j = 0; j<14; j++){
        message_marker.push(signal_array[i+j])
    }
    if(message_marker.filter((v, i, a) => a.indexOf(v) == i).length == 14){
        break;
    }
    count++;
}
console.log("start-of-message: " + count);