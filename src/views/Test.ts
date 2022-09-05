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
    const qrcode = createCanvas(32, 32)

    const ipAdress = ip.address()

    qr.toCanvas(qrcode, `http://${ipAdress}`, {
        scale: 1,
        margin: 2

    })

    ctx.drawImage(qrcode, 128 - 30, 1);
    Controller.matrix.drawBuffer(convertBGRAtoRGB(canvas.toBuffer("raw")));

    const font = BigFont
    Controller.matrix.font(font);

    const lines = LayoutUtils.textToLines(
        font,
        128,
        "Taktische Uhr"
    );

    Controller.matrix.fgColor(0x0039ac)

    LayoutUtils.linesToMappedGlyphs(
        lines,
        font.height(),
        128,
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
        128,
        `http://${ipAdress}`
    );

    Controller.matrix.fgColor(0x1d3e91)

    LayoutUtils.linesToMappedGlyphs(
        linesTwo,
        fontTwo.height(),
        128,
        Controller.matrix.height(),
        HorizontalAlignment.Left,
        VerticalAlignment.Middle
    ).map(glyph => {
        Controller.matrix.drawText(glyph.char, glyph.x + 2, glyph.y + 4);
    });

    Controller.matrix.sync()
}

