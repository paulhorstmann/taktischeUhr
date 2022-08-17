import { createCanvas } from "canvas"
import * as qr from 'qrcode'
import { HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix"
import { convertBGRAtoRGB, wait } from "../utils"
import ip from "ip"
import { BigFont, SmallerFont } from "./assets/Fonts"

export default async function Splash(matrix: LedMatrixInstance) {
    console.log("Start Spalsh")
    const canvas = createCanvas(128, 32)
    const ctx = canvas.getContext('2d')
    const qrcode = createCanvas(32, 32)

    const ipAdress = ip.address()

    await qr.toCanvas(qrcode, `http://${ipAdress}`, {
        scale: 1,
        margin: 2
    })

    ctx.drawImage(qrcode, matrix.width() - 30, 1);

    await new Promise((resolve) => {
        resolve(matrix.drawBuffer(convertBGRAtoRGB(canvas.toBuffer("raw"))))
    })

    const font = BigFont
    matrix.font(font);

    const lines = LayoutUtils.textToLines(
        font,
        matrix.width(),
        "Taktische Uhr"
    );

    matrix.fgColor(0x0039ac)

    LayoutUtils.linesToMappedGlyphs(
        lines,
        font.height(),
        matrix.width(),
        matrix.height(),
        HorizontalAlignment.Left,
        VerticalAlignment.Top
    ).map(glyph => {
        matrix.drawText(glyph.char, glyph.x + 1, glyph.y + 1);
    });

    const fontTwo = SmallerFont
    matrix.font(fontTwo)

    const linesTwo = LayoutUtils.textToLines(
        fontTwo,
        matrix.width(),
        `http://${ipAdress}`
    );

    matrix.fgColor(0x1d3e91)

    LayoutUtils.linesToMappedGlyphs(
        linesTwo,
        fontTwo.height(),
        matrix.width(),
        matrix.height(),
        HorizontalAlignment.Left,
        VerticalAlignment.Middle
    ).map(glyph => {
        matrix.drawText(glyph.char, glyph.x + 2, glyph.y + 4);
    });
    console.log("End Spalsh")
}