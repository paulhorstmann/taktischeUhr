import Parser from 'rss-parser';
import { convertBGRAtoRGB, replacingUmlauts, wait } from '../utils';
import ip from "ip"
import { HorizontalAlignment, LayoutUtils, LedMatrixInstance, MappedGlyph, VerticalAlignment } from 'rpi-led-matrix';
import { Canvas, createCanvas } from 'canvas';
import { SmallerFont } from '../views/assets/Fonts';
import * as qr from 'qrcode'

const parser: Parser = new Parser();

const ipAdress = ip.address()

interface RSSFeedItem {
    title: Array<MappedGlyph>,
    qrcode: Buffer
    link: string
}

export default class RSSFeedHandler {
    URL: string
    static items: Array<RSSFeedItem> = []
    static ready = false

    constructor(URL: string) {
        this.URL = URL
        RSSFeedHandler.update()
    }

    static async addRSSFeedItem(itemTitle: string = "RSSFeed wird geladen", link: string = `http://${ipAdress}`) {

        const lines = LayoutUtils.textToLines(
            SmallerFont,
            96,
            replacingUmlauts(itemTitle)
        );

        const title = LayoutUtils.linesToMappedGlyphs(
            lines,
            SmallerFont.height(),
            128,
            32,
            HorizontalAlignment.Left,
            VerticalAlignment.Middle
        )

        const canvas = createCanvas(128, 32)
        const ctx = canvas.getContext('2d')

        const qrcode = createCanvas(32, 32)

        await qr.toCanvas(qrcode, `http://${ipAdress}/f/${RSSFeedHandler.items.length}`, {
            scale: 1,
            margin: 2
        })


        await new Promise((resolve) => {
            ctx.drawImage(qrcode, 98, 1);
            resolve("Check")
        })


        await new Promise((resolve) => {
            RSSFeedHandler.items.push({
                title: title,
                qrcode: convertBGRAtoRGB(canvas.toBuffer("raw")),
                link: link
            })
            resolve("Check")
        })
    }

    static async waitForResolve() {
        while (RSSFeedHandler.items.length == 0) {
            await wait(1000)
            console.log("Wait for RSSFeed")
        }
    }

    static async update() {
        const feed = await parser.parseURL('https://www.thw.de/SiteGlobals/Functions/RSS/DE/Feed/RSSNewsfeed_Meldungen_Gesamt.xml');

        console.log(feed);

        for (let i = 0; i < feed.items.length; i++) {
            const item = feed.items[i]
            await RSSFeedHandler.addRSSFeedItem(item.title, item.link)
        }
    }
}

