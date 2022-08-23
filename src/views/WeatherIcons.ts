import { createCanvas, loadImage } from "canvas";

import * as fs from 'fs/promises';
import { LedMatrixInstance } from "rpi-led-matrix";
import Controller from "../Controller";
import WaetherApiHandler from "../services/WeatherApiHandler";
import { convertBGRAtoRGB } from "../utils";
import { MediumFont } from "./assets/Fonts";

export default async function WeatherIcons() {
    await new Promise(
        async resolve => {
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

            Controller.matrix.drawBuffer(convertBGRAtoRGB(canvas.toBuffer("raw")));

            const font = MediumFont
            Controller.matrix.font(font);

            Controller.matrix.fgColor(0xb3b3b3);
            const xOffsetsWeekdays = [
                9,
                34,
                59,
                83,
                109,
                128,
            ]
            weatherData.forEach((weatherItem, i) => {
                Controller.matrix.drawText(weatherItem.day, xOffsetsWeekdays[i], 23);
            })

            resolve("Display")
        }
    )

}