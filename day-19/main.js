const { time } = require("console");
const fs = require("fs");

const input = fs.readFileSync('./input.txt').toString();

// https://adventofcode.com/2022/day/19
const ORE = 0
const CLAY = 1
const OBSIDIAN = 2
const GEODE = 3

// Challenge 1
let blueprints = input.split("\n").map(line => line.split("robot costs "))
blueprints.forEach(line => line.shift())
blueprints = blueprints.map(bp => bp.map(line => line.split("ore").map(chunk => chunk.trim())))
blueprints = blueprints.map((bp,index) => {return {name: `blueprint ${index +1}`,oreBot: {ore: Number(bp[0][0])}, clayBot: {ore: Number(bp[1][0])}, obsidianBot: {ore: Number(bp[2][0]), clay: Number(bp[2][1].substring(4, 6).trim())}, geodeBot: {ore: Number(bp[3][0]), obsidian: Number(bp[3][1].substring(4, 6).trim())}}})
//console.log(blueprints)

function findMostGeodes (bp, time, ore, clay, obsidian, geodes, oreBots, clayBots, obsidianBots, geodeBots, mode){
    if(time == 1 ){
        return [geodes + geodeBots, []]
    }
    if(time == 0){
        return [geodes, []]
    }
    let message = ""

    switch(mode){
        case ORE: {
            if(ore >= bp.oreBot.ore){
                ore = ore-bp.oreBot.ore
                oreBots++
                ore--
                message = `buildt OreBot in minute ${24-time}`
            } else {
                let oreDelta = bp.oreBot.ore-ore
                let timeToProduceOreBotOre = Math.max(Math.ceil(oreDelta/oreBots), 1)
                let timeShift = Math.min(timeToProduceOreBotOre, time)
                time -= timeShift
                return findMostGeodes(bp, time, ore+(oreBots*timeShift), clay+(clayBots*timeShift), obsidian+(obsidianBots*timeShift), geodes+(geodeBots*timeShift), oreBots, clayBots, obsidianBots, geodeBots, ORE)
            }
        } break
        case CLAY: {
            if(ore >= bp.clayBot.ore){
                ore = ore-bp.clayBot.ore
                clayBots++
                clay--
                message = `buildt ClayBot in minute ${24-time}`
            } else {
                let oreDelta = bp.clayBot.ore-ore
                let timeToProduce = Math.max(Math.ceil(oreDelta/oreBots), 1)
                let timeShift = Math.min(timeToProduce, time)
                time -= timeShift
                return findMostGeodes(bp, time, ore+(oreBots*timeShift), clay+(clayBots*timeShift), obsidian+(obsidianBots*timeShift), geodes+(geodeBots*timeShift), oreBots, clayBots, obsidianBots, geodeBots, CLAY)
            }
        } break
        case OBSIDIAN: {
            if(ore >= bp.obsidianBot.ore && clay >= bp.obsidianBot.clay){
                ore = ore-bp.obsidianBot.ore
                clay = clay-bp.obsidianBot.clay
                obsidianBots++
                obsidian--
                message = `buildt ObsidianBot in minute ${24-time}`
            } else {
                let oreDelta = bp.obsidianBot.ore-ore
                let clayDelta = bp.obsidianBot.clay-clay
                let timeToProduceOre = Math.max(Math.ceil(oreDelta/oreBots), 1)
                let timeToProduceClay = Math.max(Math.ceil(clayDelta/clayBots), 1)
                let timeShift = Math.min(Math.max(timeToProduceClay, timeToProduceOre), time)
                time -= timeShift
                return findMostGeodes(bp, time, ore+(oreBots*timeShift), clay+(clayBots*timeShift), obsidian+(obsidianBots*timeShift), geodes+(geodeBots*timeShift), oreBots, clayBots, obsidianBots, geodeBots, OBSIDIAN)
            }
        } break
        case GEODE: {
            if(ore >= bp.geodeBot.ore && obsidian >= bp.geodeBot.obsidian){
                ore = ore-bp.geodeBot.ore
                obsidian = obsidian-bp.geodeBot.obsidian
                geodeBots++
                geodes--
                message = `buildt GeodeBot in minute ${24-time}`
            } else {
                let oreDelta = bp.geodeBot.ore-ore
                let obsidianDelta = bp.geodeBot.obsidian-obsidian
                let timeToProduceOre = Math.max(Math.ceil(oreDelta/oreBots), 1)
                let timeToProduceObsidian = Math.max(Math.ceil(obsidianDelta/obsidianBots), 1)
                let timeShift = Math.min(Math.max(timeToProduceObsidian, timeToProduceOre), time)
                time -= timeShift
                return findMostGeodes(bp, time, ore+(oreBots*timeShift), clay+(clayBots*timeShift), obsidian+(obsidianBots*timeShift), geodes+(geodeBots*timeShift), oreBots, clayBots, obsidianBots, geodeBots, OBSIDIAN)
            }
        } break
        default: 
        {
            if(ore >= bp.oreBot.ore){
                ore = ore-bp.oreBot.ore
                oreBots++
                ore--
                message = `buildt OreBot in minute ${24-time}`
            } else {
                let oreDelta = bp.oreBot.ore-ore
                let timeToProduce = Math.max(Math.ceil(oreDelta/oreBots), 1)
                let timeShift = Math.min(timeToProduce, time)
                time -= timeShift
                return findMostGeodes(bp, time, ore+(oreBots*timeShift), clay+(clayBots*timeShift), obsidian+(obsidianBots*timeShift), geodes+(geodeBots*timeShift), oreBots, clayBots, obsidianBots, geodeBots, ORE)
            }
        }
    }

    let oreBotOreDelta = bp.oreBot.ore - ore
    let timeToProduceOreBotOre = Math.max(Math.ceil(oreBotOreDelta/oreBots), 1)
    let timeShiftOreBot = Math.min(timeToProduceOreBotOre, time)
    let buildOreBots = findMostGeodes(bp, time-timeShiftOreBot, ore+(oreBots*timeShiftOreBot), clay+(clayBots*timeShiftOreBot), obsidian+(obsidianBots*timeShiftOreBot), geodes+(geodeBots*timeShiftOreBot), oreBots, clayBots, obsidianBots, geodeBots, ORE)
    
    let clayBotOreDelta = bp.clayBot.ore - ore
    let timeToProduceClayBotOre = Math.max(Math.ceil(clayBotOreDelta/oreBots), 1)
    let timeShiftClayBot = Math.min(timeToProduceClayBotOre, time)
    let buildClayBots = findMostGeodes(bp, time-timeShiftClayBot, ore+(timeShiftClayBot*oreBots), clay+(timeShiftClayBot*clayBots), obsidian+(timeShiftClayBot*obsidianBots), geodes+(timeShiftClayBot*geodeBots), oreBots, clayBots, obsidianBots, geodeBots, CLAY)
    
    let obsidianBotOreDelta = bp.obsidianBot.ore - ore
    let timeToProduceObsidianBotOre = Math.max(Math.ceil(obsidianBotOreDelta/oreBots), 1)
    let obsidianBotClayDelta = bp.obsidianBot.clay - clay
    let timeToProduceObsidianBotClay = Math.max(Math.ceil(obsidianBotClayDelta/clayBots), 1)
    let timeShiftObsidianBot = Math.min(Math.max(timeToProduceObsidianBotOre, timeToProduceObsidianBotClay), time)
    let buildObsidianBots = findMostGeodes(bp, time-timeShiftObsidianBot, ore+(timeShiftObsidianBot*oreBots), clay+(timeShiftObsidianBot*clayBots), obsidian+(timeShiftObsidianBot*obsidianBots), geodes+(timeShiftObsidianBot*geodeBots), oreBots, clayBots, obsidianBots, geodeBots, OBSIDIAN)
    
    let geodeBotOreDelta = bp.geodeBot.ore - ore
    let timeToProduceGeodeBotOre = Math.max(Math.ceil(geodeBotOreDelta/oreBots), 1)
    let geodeBotObsidianDelta = bp.geodeBot.obsidian - obsidian
    let timeToProduceGeodeBotObsidian = Math.max(Math.ceil(geodeBotObsidianDelta/obsidianBots), 1)
    let timeShiftGeodeBot = Math.min(Math.max(timeToProduceGeodeBotOre, timeToProduceGeodeBotObsidian), time)
    let buildGeodeBots = findMostGeodes(bp, time-timeShiftGeodeBot, ore+(timeShiftGeodeBot*oreBots), clay+(timeShiftGeodeBot*clayBots), obsidian+(timeShiftGeodeBot*obsidianBots), geodes+(timeShiftGeodeBot*geodeBots), oreBots, clayBots, obsidianBots, geodeBots, GEODE)
    
    let allStrategies = [buildOreBots, buildClayBots, buildObsidianBots, buildGeodeBots]
    let maxGeodes = allStrategies.reduce((acc, e) => {if(e[0]>acc[0]){return e}else{return acc}}, [0,["fail"]])
    maxGeodes[1].unshift(message)
    return  [maxGeodes[0], maxGeodes[1]]
}

console.time("Start")
let bpQualities = [...blueprints].map(bp => findMostGeodes(bp, 24, 0, 0, 0, 0, 1, 0, 0, 0, CLAY))
console.log(bpQualities[0])
console.log(bpQualities[1])
console.timeEnd("Start")
