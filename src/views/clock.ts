import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import { scheduleJob } from "node-schedule"

import { wait } from "../utils";

const monthNames: Array<string> = [
    "JAN",
    "FEB",
    "MAR",
    "ARP",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
]

async function start(matrix: LedMatrixInstance) {
    const font = new Font('helvR12', `${process.cwd()}/assets/fonts/Clock.bdf`);
    matrix.font(font);
    const lines = LayoutUtils.textToLines(
        font,
        matrix.width(),
        getTacticalTimeFormat()
    );

    matrix.fgColor(0xff0000).clear();
    LayoutUtils.linesToMappedGlyphs(
        lines,
        font.height(),
        matrix.width(),
        matrix.height(),
        HorizontalAlignment.Center,
        VerticalAlignment.Middle
    ).map(glyph => {
        matrix.drawText(glyph.char, glyph.x, glyph.y);
    });

}

function getTacticalTimeFormat(): string {
    const now = new Date
    return "" + now.getDate() + now.getHours() + now.getMinutes() + monthNames[now.getMonth()] + (now.getFullYear() + "").slice(2, 4)
}

export default { start } 