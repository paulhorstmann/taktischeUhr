import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import { wait } from "../utils";
import { BigFont, ClockFont, MediumFont } from "./assets/Fonts";
import countdown from "countdown"
import Controller from "../Controller";

export default async function Countdown() {
    const font = BigFont
    Controller.matrix
        .clear()
        .font(font)
        .fgColor(0x0039ac);

    const countdownTxt = countdown(new Date(2000, 0, 1)).toString();

    const lines = LayoutUtils.textToLines(
        font,
        Controller.matrix.width(),
        `Mittag in -${countdownTxt}`
    );

    await wait(200)

    LayoutUtils.linesToMappedGlyphs(
        lines,
        font.height(),
        Controller.matrix.width(),
        Controller.matrix.height(),
        HorizontalAlignment.Center,
        VerticalAlignment.Middle
    ).map(glyph => {
        Controller.matrix.drawText(glyph.char, glyph.x, glyph.y);
    });
}  