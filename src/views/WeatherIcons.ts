import { createCanvas, loadImage } from "canvas";

import * as fs from 'fs/promises';
import { LedMatrixInstance } from "rpi-led-matrix";
import WaetherApiHandler from "../services/WeatherApiHandler";
import { convertBGRAtoRGB } from "../utils";
import { MediumFont } from "./assets/Fonts";

export default async function WeatherIcons(matrix: LedMatrixInstance) {
    const canvas = createCanvas(128, 32)
    const ctx = canvas.getContext('2d')

    const weatherData = WaetherApiHandler.data


    if (WaetherApiHandler.loaded)
        await WaetherApiHandler.waitForLoading()

    for (let i = 0; i < weatherData.length; i++) {
        try {
            ctx.drawImage(
                await loadImage(WaetherApiHandler.getIconBuffer(weatherData[i].icon)),
                25 * i + 3, 1
            )
        } catch (error) {
            console.log(error);
        }
    }

    const buffer = canvas.toBuffer('image/png')
    fs.writeFile('./image.png', buffer)

    matrix.drawBuffer(convertBGRAtoRGB(canvas.toBuffer("raw")));

    const font = MediumFont
    matrix.font(font);

    matrix.fgColor(0xb3b3b3);
    const xOffsetsWeekdays = [
        9,
        34,
        59,
        83,
        109,
        128,
    ]
    weatherData.forEach((weatherItem, i) => {
        matrix.drawText(weatherItem.day, xOffsetsWeekdays[i], 23);
    })


    // LayoutUtils.linesToMappedGlyphs(
    //     lines,
    //     font.height(),
    //     matrix.width(),
    //     matrix.height(),
    //     HorizontalAlignment.Left,
    //     VerticalAlignment.Bottom
    // ).map((glyph, i) => {
    //     let xOffset = 10
    //     // if () {
    //     //     xOffset = 6
    //     // }
    // });

}