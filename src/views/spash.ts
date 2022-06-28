
import { createCanvas } from "canvas"
import * as qr from 'qrcode'
import { LedMatrix } from "rpi-led-matrix/dist/types"

async function start(matrix: LedMatrix) {
    const canvas = createCanvas(128, 32)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "#ffffff"
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
}

