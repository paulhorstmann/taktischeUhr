import { LedMatrixInstance } from "rpi-led-matrix"
import Splash from "./views/Spash"
import TacticalClockFormat from "./views/TacticalClockFormat"
import Weather from "./views/Weather"
import Newsfeed from "./views/Newsfeed"
import ISOClockFormat from "./views/ISOClockFormat"
import Image from "./views/Image"
import SimpleText from "./views/SimpleText"
import ErrorView from "./views/ErrorView"
import Test from "./views/Test"
import { wait } from "./utils"

export class ViewHandler {
    matrix: LedMatrixInstance
    type: ViewTypes
    needToRefresh: boolean
    view: (matrix: LedMatrixInstance) => Promise<void>;

    constructor(matrix: LedMatrixInstance, type: ViewTypes, needToRefresh: boolean = false) {
        this.matrix = matrix
        this.type = type
        this.needToRefresh = needToRefresh

        switch (type) {
            case ViewTypes.TacticalClockFormat:
                this.view = TacticalClockFormat; break;
            case ViewTypes.Weather:
                this.view = Weather; break;
            case ViewTypes.Newsfeed:
                this.view = Newsfeed; break;
            case ViewTypes.SimpleText:
                this.view = SimpleText; break;
            case ViewTypes.Image:
                this.view = Image; break;
            case ViewTypes.ISOClockFormat:
                this.view = ISOClockFormat; break;
            case ViewTypes.Spalsh:
                this.view = Splash; break;
            case ViewTypes.Test:
                this.view = Test; break;
            default:
                this.view = ErrorView; break;
        }
    }

    async show() {
        console.log("Start show: " + ViewTypes[this.type])
        await this.view(this.matrix)
    }

    async showSync(waitInMS?: number) {
        await this.show()
        this.matrix.sync()
        if (waitInMS)
            await wait(waitInMS)
    }

    // TODO
    fadeIn() {

    }

    // TODO 
    fadeOut() {

    }
}

export enum ViewTypes {
    TacticalClockFormat,
    Weather,
    Newsfeed,
    SimpleText,
    Image,
    ISOClockFormat,
    Spalsh,
    Test
}