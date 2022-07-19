import { HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import { ClockFont } from "./assets/Fonts";

export default async function ISOClockFormat(matrix: LedMatrixInstance) {
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

    matrix.sync()
}

function getTacticalTimeFormat(): string {
    const now = new Date
    return (now.getMinutes() < 10 ? '0' : '') + now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()

}
