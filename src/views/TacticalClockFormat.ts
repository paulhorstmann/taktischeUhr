import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import Controller from "../Controller";
import { ClockFont } from "./assets/Fonts";

export default async function show() {


    await new Promise(
        async resolve => {

            const font = ClockFont
            Controller.matrix.font(font);
            const lines = LayoutUtils.textToLines(
                font,
                128,
                getTacticalTimeFormat()
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
            resolve("Display")
        }
    )

}

const monthNames: Array<string> = [
    "JAN",
    "FEB",
    "MAR",
    "ARP",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
]


function getTacticalTimeFormat(): string {
    const now = new Date
    return "" + (now.getDate() < 10 ? '0' : '') + now.getDate() + (now.getHours() < 10 ? '0' : '') + now.getHours() + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes() + monthNames[now.getMonth()] + (now.getFullYear() + "").slice(2, 4)
}
