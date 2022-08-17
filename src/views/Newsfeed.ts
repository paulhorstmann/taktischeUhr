import { createCanvas } from "canvas";
import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import RSSFeedHandler from "../services/RSSFeedHandler";
import { convertBGRAtoRGB, replacingUmlauts, wait } from "../utils";
import { MediumFont, SmallerFont } from "./assets/Fonts";
import ip from "ip"
import * as qr from 'qrcode'

let activeView = 0

export default async function Newsfeed(matrix: LedMatrixInstance) {
    matrix.clear()

    await new Promise((resolve) => {
        resolve(matrix.drawBuffer(RSSFeedHandler.items[activeView].qrcode))
    })

    await wait(500)

    const font = SmallerFont
    matrix.font(font);
    matrix.fgColor(0xffffff);

    RSSFeedHandler.items[activeView].title.map(glyph => {
        matrix.drawText(glyph.char, glyph.x + 1, glyph.y);
    });

    if (activeView == RSSFeedHandler.items.length - 1) {
        activeView = 0
    } else {
        activeView++
    }
}
