import { LedMatrix } from "rpi-led-matrix";
import { matrixOptions, runtimeOptions } from './_config';

import { wait } from "./utils";
import { ViewHandler, ViewTypes } from "./ViewHandler";

const matrix = new LedMatrix(matrixOptions, runtimeOptions);

let activeViewIndicator = 0;
let noChanges = true

let switchInterval = 50000

let views = [
    new ViewHandler(matrix, ViewTypes.TacticalClockFormat, true),
    new ViewHandler(matrix, ViewTypes.Weather),
    new ViewHandler(matrix, ViewTypes.Newsfeed),
    new ViewHandler(matrix, ViewTypes.Image),
    new ViewHandler(matrix, ViewTypes.ISOClockFormat, true),
]

import express from "express";

const app = express();
const port = 80;

app.listen(port, () => {
    console.log(`[Web Server] started at http://localhost:${port}`);
});

app.use(express.static('./public'));


(async () => {
    await new ViewHandler(matrix, ViewTypes.Spalsh).showSync(5000)
    while (true) {
        await startLoop()

    }
})()

async function startLoop() {

    while (noChanges) {
        console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
        const activeView: ViewHandler = views[activeViewIndicator]

        if (activeView.needToRefresh) {
            const refreshInterval = setInterval(() => {
                activeView.showSync()
            }, 100)
            await wait(switchInterval)
            clearInterval(refreshInterval)
        } else {
            activeView.show()
            matrix.sync()
            await wait(switchInterval)
        }

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

// (async () => {
//     const test = new ViewHandler(matrix, ViewTypes.Test)
//     await test.fadeIn()
//     matrix.sync()
//     await wait(10000)
// })()

// startLoop()