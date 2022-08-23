import { HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import Controller from "../Controller";
import { ClockFont } from "./assets/Fonts";

export default async function ISOClockFormat() {
    await new Promise(
        async resolve => {
            const font = ClockFont
            Controller.matrix.font(font);

            const lines = LayoutUtils.textToLines(
                font,
                Controller.matrix.width(),
                getTacticalTimeFormat()
            );

            Controller.matrix.fgColor(0xff0000);
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

            resolve("Display")
        }
    )
}

function getTacticalTimeFormat(): string {
    const now = new Date
    return (now.getHours() < 10 ? '0' : '') + now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
}
