import { LedMatrix, Font, LayoutUtils, HorizontalAlignment, VerticalAlignment, LedMatrixInstance } from 'rpi-led-matrix';

import * as fs from 'fs/promises';
import * as path from 'path';
import * as bmp from 'bmp-js';
import { convertABGRToRGB, convertBGRAtoRGB } from '../utils';
import { createCanvas, loadImage } from 'canvas';
import { MediumFont } from './assets/Fonts';
import Controller from '../Controller';

export default async function Image() {

    await new Promise(
        async resolve => {

            const canvas = createCanvas(128, 32)
            const ctx = canvas.getContext('2d')

            try {
                ctx.drawImage(
                    await loadImage(await fs.readFile(path.join(process.cwd(), `assets/img/${Controller.store.image.imageSrc}.png`))),
                    0, 0
                )
                Controller.matrix.drawBuffer(convertBGRAtoRGB(canvas.toBuffer("raw")));

            } catch (error) {
                console.log(error)
                const font = MediumFont
                Controller.matrix.font(font);
                Controller.matrix.fgColor(0xb3b3b3);
                Controller.matrix.drawText("Ein Fehler ist", 2, 2);
                Controller.matrix.drawText("aufgetreten", 2, 10);
            }

            resolve("Display")
        }
    )
}  