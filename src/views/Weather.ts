import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import { ClockFont } from "./assets/Fonts";

export default async function TacticalClockFormat(matrix: LedMatrixInstance) {
    const font = ClockFont
    matrix.font(font);
    const lines = LayoutUtils.textToLines(
        font,
        matrix.width(),
        "Weather"
    );

    matrix.fgColor(0x0000ff).clear();
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