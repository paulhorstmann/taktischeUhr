import { LedMatrixInstance } from "rpi-led-matrix";


import * as fs from 'fs';
import * as path from 'path';
import * as bmp from 'bmp-js';

const wait = (t: number) => new Promise(ok => setTimeout(ok, t));

function convertABGRToRGB(argbBuffer: Buffer): Buffer {
    let res: Array<any> = []
    for (let i = 0; i < argbBuffer.length; i = i + 4) {
        res.push(argbBuffer[i + 3], argbBuffer[i + 2], argbBuffer[i + 1])
    }
    return Buffer.from(res);
}

function convertBGRAtoRGB(bgraBuffer: Buffer): Buffer {
    let res: Array<any> = []
    for (let i = 0; i < bgraBuffer.length; i = i + 4) {
        res.push(bgraBuffer[i + 2], bgraBuffer[i + 1], bgraBuffer[i + 0])
    }
    return Buffer.from(res);
}

// Anspielung auf https://stackoverflow.com/questions/11652681/replacing-umlauts-in-js
function replacingUmlauts(word: string): string {
    word = word.replace("ü", "ue")
    word = word.replace("ö", "oe")
    word = word.replace("ä", "ae")
    word = word.replace("Ü", "Ue")
    word = word.replace("Ö", "Oe")
    word = word.replace("Ä", "Ae")
    word = word.replace("ß", "ss")
    return word
}

interface ErrnoException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
}


async function loadImageInBuffer(filename: string): Promise<Buffer> {
    try {
        const bmpSrc = path.join(process.cwd(), `assets/img/${filename}.bmp`)

        const bmpImage = bmp.decode(fs.readFileSync(bmpSrc))

        return convertABGRToRGB(bmpImage.data)
    } catch (error) {
        console.error(error);
    }

    return new Buffer("ERROR")
}

function weekdaysToString(dayIndex: number): string {
    return [
        "SO",
        "MO",
        "DI",
        "MI",
        "DO",
        "FR",
        "SA"
    ][dayIndex]
}

export { wait, convertABGRToRGB, convertBGRAtoRGB, replacingUmlauts, weekdaysToString, loadImageInBuffer, ErrnoException } 