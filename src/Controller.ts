import * as fs from 'fs/promises';
import path from "path";
import { ViewHandler, ViewTypes } from "./ViewHandler";

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

const cachePath = ""

export default class Controller {
    static isLUKModeOn: boolean = false
    static views: Array<ViewHandler>
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

    static addView(viewtype: ViewTypes) {

    }

    static removeView(viewtype: ViewTypes) {

    }

    saveState() {

    }

    readLastStateIn() {
        fs.readFile(path.join(process.cwd(), `cache/store.json`))
    }
}