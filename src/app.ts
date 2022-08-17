import { LedMatrix } from "rpi-led-matrix";
import { matrixOptions, runtimeOptions } from './_config';

import { wait } from "./utils";
import { ViewHandler, ViewTypes } from "./ViewHandler";

const matrix = new LedMatrix(matrixOptions, runtimeOptions);
let activeViewIndicator = 0;
let noChanges = true

let switchInterval = 10000

process.stdin.resume();//so the program will not close instantly

function exitHandler(options: any, exitCode: number) {
    matrix.clear()
    console.log("Clear Matrix")

    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null, { cleanup: true }));

process.on('SIGINT', exitHandler.bind(null, { exit: true }));

process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

let views = [
    new ViewHandler(matrix, ViewTypes.TacticalClockFormat, true),
    new ViewHandler(matrix, ViewTypes.Newsfeed),
    new ViewHandler(matrix, ViewTypes.Image),
    new ViewHandler(matrix, ViewTypes.Weather),
    new ViewHandler(matrix, ViewTypes.ISOClockFormat, true),
    new ViewHandler(matrix, ViewTypes.SimpleText),
]

import express from "express";
import RSSFeedHandler from "./services/RSSFeedHandler";
import WaetherApiHandler from "./services/WeatherApiHandler";
import Controller from "./Controller";
import Webserver from "./web/Webserver";

const RSSfeed = new RSSFeedHandler('https://www.thw.de/SiteGlobals/Functions/RSS/DE/Feed/RSSNewsfeed_Meldungen_Gesamt.xml')
const Weather: WaetherApiHandler = new WaetherApiHandler("b851570cad2913b6254377f0b27b855a", "52.29", "8.89")

const webserver = new Webserver(80)

/*****************************/
/*  Switcher                 */
/*****************************/
let changeCounter = 0;

(async () => {
    console.log(`Start at: ${new Date().toISOString()}`)
    Weather.updateData()
    await new ViewHandler(matrix, ViewTypes.Spalsh).showSync(5000)

    // Mainloop
    while (true) {
        if (Controller.isLUKModeOn) {
            await lukMode()
        } else {
            await startLoop()
        }
        noChanges = true
    }
})()

async function startLoop() {
    while (noChanges) {
        console.log("⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯")
        console.log("Change Counter: " + ++changeCounter + " - " + ViewTypes[views[activeViewIndicator].type])

        const activeView: ViewHandler = views[activeViewIndicator]

        if (activeView.needToRefresh) {
            const refreshInterval = setInterval(() => {
                activeView.showSync()
            }, 100)
            await wait(switchInterval)
            clearInterval(refreshInterval)
        } else {
            await activeView.showSync(switchInterval)
        }
        matrix.clear()
        switchActiveViewIndicator()
    }
}

function switchActiveViewIndicator() {
    if (activeViewIndicator == views.length - 1) {
        activeViewIndicator = 0
    } else {
        activeViewIndicator++
    }
}

async function lukMode() {
    while (noChanges) {
        new ViewHandler(matrix, ViewTypes.TacticalClockFormat, true)
    }
}

