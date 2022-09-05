import { LedMatrix, LedMatrixInstance } from "rpi-led-matrix";
import { matrixOptions, runtimeOptions } from './_config';

import * as fs from 'fs/promises';
import path from "path";

// Services
import RSSFeedHandler from './services/RSSFeedHandler';
import WaetherApiHandler from './services/WeatherApiHandler';

// Views
import { ViewHandler, ViewTypes } from "./ViewHandler";
import { ErrnoException, wait } from "./utils";

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

interface viewStore {
    [viewID: string]: ViewHandler;
}

interface serviceStore {
    weather?: WaetherApiHandler,
    rssFeed?: RSSFeedHandler
}

const cachePath = path.join(process.cwd(), `cache/store.json`)

export default class Controller {
    static noChanges = true
    static changes: number = 0

    static store = {
        isLUKModeOn: false,
        active: {
            newsfeed: true,
            isoClockFormat: true,
            image: true,
            weather: false,
            simpleText: true,
        },
        weather: {
            stadtName: "33719, Bielefeld",
            apiKey: "b851570cad2913b6254377f0b27b855a",
            lat: "52.29",
            lon: "53.24",
        },
        image: {
            imageSrc: "thwdark"
        },
        text: "Willkommen"
    }

    static views: viewStore

    static matrix: LedMatrixInstance

    static services: serviceStore = {
        weather: undefined,
        rssFeed: undefined
    }

    static switchInterval = 10000

    static isLUKModeOn: boolean = false

    static initMatrix() {
        return new Promise(res => {
            Controller.matrix = new LedMatrix(matrixOptions, runtimeOptions)

            this.services.weather = new WaetherApiHandler("b851570cad2913b6254377f0b27b855a", "52.29", "8.89")
            // this.services.rssFeed = new RSSFeedHandler('https://www.thw.de/SiteGlobals/Functions/RSS/DE/Feed/RSSNewsfeed_Meldungen_Gesamt.xml')

            // newsfeed: new ViewHandler(ViewTypes.Newsfeed),
            this.views = {
                tacticalClock: new ViewHandler(ViewTypes.TacticalClockFormat, true),
                isoClockFormat: new ViewHandler(ViewTypes.ISOClockFormat, true),
                newsfeed: new ViewHandler(ViewTypes.ISOClockFormat, true),
                image: new ViewHandler(ViewTypes.Image),
                weather: new ViewHandler(ViewTypes.Weather),
                simpleText: new ViewHandler(ViewTypes.SimpleText),
            }

            res("OK")
        })
    }

    static async readLastState() {
        try {
            const raw = (await fs.readFile(cachePath)).toString()
            Controller.store = JSON.parse(raw)
            console.log("Read Settings ✓")
        } catch (err) {
            console.table(err)
            if ((err as ErrnoException).errno == -2) {
                await fs.writeFile(cachePath, JSON.stringify(Controller.store))
                Controller.readLastState()
            }
        }
    }

    static async updateStore(newstore: any) {
        Controller.store = newstore

        for (const [key, value] of Object.entries(Controller.views)) {
            if (key in newstore.active) {
                Controller.views[key].disabled = !newstore.active[key]
            }
        }

        await Controller.saveState()
    }

    static async saveState() {
        await fs.writeFile(cachePath, JSON.stringify(Controller.store))
    }
}