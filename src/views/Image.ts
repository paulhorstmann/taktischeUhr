import { LedMatrix, Font, LayoutUtils, HorizontalAlignment, VerticalAlignment, LedMatrixInstance } from 'rpi-led-matrix';

import * as fs from 'fs';
import * as path from 'path';
import * as bmp from 'bmp-js';
import { convertABGRToRGB } from '../utils';

export default async function Image(matrix: LedMatrixInstance) {
    try {
        console.time("Getting Image")
        const bmpSrc = path.join(process.cwd(), `assets/img/weather.bmp`)
        console.timeEnd("Getting Image");

        console.time("Decode Image")
        const bmpImage = bmp.decode(fs.readFileSync(bmpSrc))
        console.log(bmpImage.data.length)
        console.timeEnd("Decode Image");

        console.time("Recode Image")
        const covertetBuffer = convertABGRToRGB(bmpImage.data)
        console.log(covertetBuffer.length)
        console.timeEnd("Recode Image");

        console.time("Draw Image")
        matrix.drawBuffer(covertetBuffer)
        console.timeEnd("Draw Image");
    } catch (error) {
        console.error(error);
    }
}