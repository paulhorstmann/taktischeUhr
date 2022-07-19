import { LedMatrix, Font, LayoutUtils, HorizontalAlignment, VerticalAlignment, LedMatrixInstance } from 'rpi-led-matrix';

import * as fs from 'fs';
import * as path from 'path';
import * as bmp from 'bmp-js';
import { convertABGRToRGB } from './utils';

async function show(matrix: LedMatrixInstance, filename: string) {
    try {
        console.time("Getting Image")
        const bmpSrc = path.join(process.cwd(), `assets/img/${filename}.bmp`)
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

        matrix.sync();

    } catch (error) {
        console.error(error);
    }
}
export default {
    show
}