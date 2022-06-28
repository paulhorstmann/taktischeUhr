import { LedMatrix } from "rpi-led-matrix";
import { matrixOptions, runtimeOptions } from './_config';

import { createCanvas } from "canvas"
import * as qr from 'qrcode'

import test from "./test"
import clockView from "./views/tacticalClock"
import { convertBGRAtoRGB, wait } from "./utils";

const matrix = new LedMatrix(matrixOptions, runtimeOptions);

let activeIndecator = 0;

let views = ["tclock", "weather", "tclock"]
let activeView = "tclock"



async function startLoop() {
    await wait(200)

    setInterval(async () => {
        updateDisplay(views[activeIndecator])
        await wait(30000)
    }, 30000)
}

function updateDisplay(display: string) {
    switch (display) {
        case "tclock": console.log("tclock"); break;
        case "weather": console.log("weather"); break;
        case "newsfeed": console.log("newsfeed"); break;
        case "text": console.log("text"); break;
        case "normalclock": console.log("normalclock"); break;
    }
}

async function startView(display: string) {
    for (let i = 0; i < 100; i++) {

    }
}

(async () => {

})()

