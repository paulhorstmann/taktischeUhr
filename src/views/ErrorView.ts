import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";

export default async function Error(matrix: LedMatrixInstance) {
    const font = new Font('helvR12', `${process.cwd()}/assets/fonts/Clock.bdf`);
    matrix.font(font);

    const lines = LayoutUtils.textToLines(
        font,
        matrix.width(),
        "ERROR"
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
    return now.getHours() + " : " + now.getMinutes()
    return now.getSeconds() + ""
}
