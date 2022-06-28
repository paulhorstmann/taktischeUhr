import { LedMatrix } from "rpi-led-matrix";
import { matrixOptions, runtimeOptions } from './_config';

import { createCanvas } from "canvas"
import * as qr from 'qrcode'

import test from "./test"
import clockView from "./views/clock"
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
    const canvas = createCanvas(128, 32)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "#fff000"
    ctx.fillRect(0, 0, 128, 32)

    const qrcode = createCanvas(30, 30)

    qr.toCanvas(qrcode, "http://hospi", {
        scale: 1,
        margin: 1
    })

    ctx.drawImage(qrcode, 0, 0);
    matrix.drawBuffer(convertBGRAtoRGB(canvas.toBuffer("raw")));
    matrix.sync();

    await wait(100000)
})()

