import { LedMatrix, Font, LayoutUtils, HorizontalAlignment, VerticalAlignment, LedMatrixInstance } from 'rpi-led-matrix';

import * as fs from 'fs/promises';
import * as path from 'path';
import * as bmp from 'bmp-js';
import { convertABGRToRGB, convertBGRAtoRGB } from '../utils';
import { createCanvas, loadImage } from 'canvas';
import { MediumFont } from './assets/Fonts';

export default async function Image(matrix: LedMatrixInstance) {
    const canvas = createCanvas(128, 32)
    const ctx = canvas.getContext('2d')

    try {
        ctx.drawImage(
            await loadImage(await fs.readFile(path.join(process.cwd(), `assets/img/thw-white.png`))),
            0, 0
        )
        matrix.drawBuffer(convertBGRAtoRGB(canvas.toBuffer("raw")));

    } catch (error) {

        console.log(error)

        const font = MediumFont
        matrix.font(font);

        matrix.fgColor(0xb3b3b3);
        matrix.drawText("Ein Fehler ist", 2, 2);
        matrix.drawText("aufgetreten", 2, 10);
    }
}  