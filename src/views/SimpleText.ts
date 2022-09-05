import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import Controller from "../Controller";
import { ClockFont } from "./assets/Fonts";

export default async function SimpleText() {
    await new Promise(
        async resolve => {
            const font = ClockFont
            Controller.matrix.font(ClockFont);

            const lines = LayoutUtils.textToLines(
                font,
                128,
                Controller.store.text
            );

            Controller.matrix.fgColor(0xff0000);
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

            resolve("Display")
        }
    )

} 