import { createCanvas } from "canvas";
import { Font, HorizontalAlignment, LayoutUtils, LedMatrixInstance, VerticalAlignment } from "rpi-led-matrix";
import RSSFeedHandler from "../services/RSSFeedHandler";
import { convertBGRAtoRGB, replacingUmlauts, wait } from "../utils";
import { MediumFont, SmallerFont } from "./assets/Fonts";
import Controller from "../Controller";

let activeView = 0

export default async function Newsfeed() {
    await new Promise(
        async resolve => {
            await RSSFeedHandler.waitForResolve()
            await new Promise((resolve) => {
                Controller.matrix.drawBuffer(RSSFeedHandler.items[activeView].qrcode)
                resolve("Check")
            })

            await wait(500)

            const font = SmallerFont
            Controller.matrix.font(font);
            Controller.matrix.fgColor(0xffffff);

            RSSFeedHandler.items[activeView].title.map(glyph => {
                Controller.matrix.drawText(glyph.char, glyph.x + 1, glyph.y);
            });

            if (activeView == RSSFeedHandler.items.length - 1) {
                activeView = 0
            } else {
                activeView++
            }
            resolve("Display")
        }
    )
}
