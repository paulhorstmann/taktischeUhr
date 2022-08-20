import { createCanvas } from "canvas"
import * as qr from 'qrcode'
import { HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix"
import { convertBGRAtoRGB, wait } from "../utils"
import ip from "ip"
import { BigFont, MediumFont, SmallerFont } from "./assets/Fonts"
import Controller from "../Controller"

export default async function Test() {
    const canvas = createCanvas(128, 32)
    const ctx = canvas.getContext('2d')
    console.log("hello")

    // ctx.fillStyle = "#ffffff"
    // ctx.fillRect(0, 0, 128, 32)

    const qrcode = createCanvas(32, 32)

    const ipAdress = ip.address()

    qr.toCanvas(qrcode, `http://${ipAdress}`, {
        scale: 1,
        margin: 2

    })

    ctx.drawImage(qrcode, Controller.matrix.width() - 30, 1);
    Controller.matrix.drawBuffer(convertBGRAtoRGB(canvas.toBuffer("raw")));

    const font = BigFont
    Controller.matrix.font(font);

    const lines = LayoutUtils.textToLines(
        font,
        Controller.matrix.width(),
        "Taktische Uhr"
    );

    Controller.matrix.fgColor(0x0039ac)

    LayoutUtils.linesToMappedGlyphs(
        lines,
        font.height(),
        Controller.matrix.width(),
        Controller.matrix.height(),
        HorizontalAlignment.Left,
        VerticalAlignment.Top
    ).map(glyph => {
        Controller.matrix.drawText(glyph.char, glyph.x + 1, glyph.y + 1);
    });

    const fontTwo = MediumFont
    Controller.matrix.font(fontTwo);

    const linesTwo = LayoutUtils.textToLines(
        fontTwo,
        Controller.matrix.width(),
        `http://${ipAdress}`
    );

    Controller.matrix.fgColor(0x1d3e91)

    LayoutUtils.linesToMappedGlyphs(
        linesTwo,
        fontTwo.height(),
        Controller.matrix.width(),
        Controller.matrix.height(),
        HorizontalAlignment.Left,
        VerticalAlignment.Middle
    ).map(glyph => {
        Controller.matrix.drawText(glyph.char, glyph.x + 2, glyph.y + 4);
    });

    Controller.matrix.sync()
}

