import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import Controller from "../Controller";

export default async function Error() {
    const font = new Font('helvR12', `${process.cwd()}/assets/fonts/Clock.bdf`);
    Controller.matrix.font(font);

    const lines = LayoutUtils.textToLines(
        font,
        128,
        "ERROR"
    );

    Controller.matrix.fgColor(0xff0000).clear();

    LayoutUtils.linesToMappedGlyphs(
        lines,
        font.height(),
        128,
        Controller.matrix.height(),
        HorizontalAlignment.Center,
        VerticalAlignment.Middle
    ).map(glyph => {
        Controller.matrix.drawText(glyph.char, glyph.x, glyph.y);
    });
}