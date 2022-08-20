import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import Controller from "../Controller";
import { ClockFont } from "./assets/Fonts";

export default async function SimpleText() {
    const font = ClockFont
    Controller.matrix.font(ClockFont);

    const lines = LayoutUtils.textToLines(
        font,
        Controller.matrix.width(),
        "Willkommen"
    );

    Controller.matrix.fgColor(0xff0000).clear();
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