import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import { ClockFont } from "./assets/Fonts";

export default async function show(matrix: LedMatrixInstance) {
    const font = ClockFont
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


function getTacticalTimeFormat(): string {
    const now = new Date
    return "" + now.getDate() + (now.getHours() < 10 ? '0' : '') + now.getHours() + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes() + monthNames[now.getMonth()] + (now.getFullYear() + "").slice(2, 4)
}
