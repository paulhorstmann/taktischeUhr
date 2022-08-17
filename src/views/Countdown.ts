import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import { wait } from "../utils";
import { BigFont, ClockFont, MediumFont } from "./assets/Fonts";
import countdown from "countdown"

export default async function Countdown(matrix: LedMatrixInstance) {
    const font = BigFont
    matrix
        .clear()
        .font(font)
        .fgColor(0x0039ac);

    const countdownTxt = countdown(new Date(2000, 0, 1)).toString();

    const lines = LayoutUtils.textToLines(
        font,
        matrix.width(),
        `Mittag in -${countdownTxt}`
    );

    await wait(200)

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