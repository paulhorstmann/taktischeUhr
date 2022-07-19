import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";

export default async function TacticalClockFormat(matrix: LedMatrixInstance) {
    const font = new Font('helvR12', `${process.cwd()}/assets/fonts/Clock.bdf`);
    matrix.font(font);
    const lines = LayoutUtils.textToLines(
        font,
        matrix.width(),
        "Newsfeed"
    );

    matrix.fgColor(0x00ff00).clear();
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