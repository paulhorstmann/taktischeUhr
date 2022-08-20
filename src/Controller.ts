import { LedMatrix, LedMatrixInstance } from "rpi-led-matrix";
import { matrixOptions, runtimeOptions } from './_config';

import * as fs from 'fs/promises';
import path from "path";

// Services
import RSSFeedHandler from './services/RSSFeedHandler';
import WaetherApiHandler from './services/WeatherApiHandler';

// Views
import { ViewHandler, ViewTypes } from "./ViewHandler";
import { wait } from "./utils";

interface ControllerStore {
    weather: {
        apiKey: string,
        lat: string,
        lon: string
    },
    image: {
        imageSrc: number
    }

}

const cachePath = path.join(process.cwd(), `cache/store.json`)

export default class Controller {
    static noChanges = true
    static changes: number = 0

    static store: ControllerStore = {
        weather: {
            apiKey: "",
            lat: "",
            lon: ""
        },
        image: {
            imageSrc: 0
        }
    }

    static matrix: LedMatrixInstance

    static services = {
        weather: new WaetherApiHandler("b851570cad2913b6254377f0b27b855a", "52.29", "8.89"),
        rssFeed: new RSSFeedHandler('https://www.thw.de/SiteGlobals/Functions/RSS/DE/Feed/RSSNewsfeed_Meldungen_Gesamt.xml')
    }

    static switchInterval = 10000

    static isLUKModeOn: boolean = false
    static views: Array<ViewHandler> = [
        new ViewHandler(ViewTypes.TacticalClockFormat, true),
        new ViewHandler(ViewTypes.Newsfeed),
        new ViewHandler(ViewTypes.ISOClockFormat),
        new ViewHandler(ViewTypes.Image),
        new ViewHandler(ViewTypes.Weather),
        new ViewHandler(ViewTypes.SimpleText),
    ]

    static async waitForMatrix() {
        return new Promise(
            async resolve => {
                console.log(typeof Controller.matrix)
                console.log(!Controller.matrix)
                while (!Controller.matrix) {
                    console.log("Wait for Initial");
                    await wait(1000)
                }
                resolve("Ok")
            }
        )
    }

    static initMatrix() {
        return new Promise(res => {
            Controller.matrix = new LedMatrix(matrixOptions, runtimeOptions)
            res("OK")
        })
    }

    saveState() {

    }

    readLastStateIn() {
        fs.readFile(cachePath)
    }
}