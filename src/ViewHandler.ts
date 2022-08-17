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
import Countdown from "./views/Countdown"

import { wait } from "./utils"

import RSSFeedHandler from "./services/RSSFeedHandler";
import WeatherIcons from "./views/WeatherIcons"

export class ViewHandler {
    matrix: LedMatrixInstance
    type: ViewTypes
    needToRefresh: boolean
    views: Array<(matrix: LedMatrixInstance, activeView?: number) => Promise<void>>;
    activeView: number
    isSelected: boolean

    constructor(matrix: LedMatrixInstance, type: ViewTypes, needToRefresh: boolean = false, isSelected = true) {
        this.matrix = matrix
        this.type = type
        this.needToRefresh = needToRefresh
        this.views = []
        this.activeView = 0
        this.isSelected = isSelected

        switch (type) {
            case ViewTypes.TacticalClockFormat:
                this.views.push(TacticalClockFormat); break;
            case ViewTypes.Weather:
                this.views.push(WeatherIcons); break;
            case ViewTypes.Newsfeed:
                for (let i = 0; i < 10; i++) {
                    this.views.push(Newsfeed);
                }
                break;
            case ViewTypes.SimpleText:
                this.views.push(SimpleText); break;
            case ViewTypes.Image:
                this.views.push(Image); break;
            case ViewTypes.ISOClockFormat:
                this.views.push(ISOClockFormat); break;
            case ViewTypes.Spalsh:
                this.views.push(Splash); break;
            case ViewTypes.Test:
                this.views.push(Test); break;
            case ViewTypes.Counter:
                this.views.push(Countdown); break;
            default:
                this.views.push(ErrorView); break;
        }
    }

    async show() {
        console.log(`Debug 1: ${new Date().toISOString()}`)
        this.matrix.clear()
        await wait(1000)

        await this.views[this.activeView](this.matrix)
        console.log(`Debug 2: ${new Date().toISOString()}`)
        this.switchActiveView()
    }

    async showSync(waitInMS?: number) {
        console.timeStamp()
        await this.show()
        this.matrix.sync()

        if (waitInMS)
            await wait(waitInMS)

        this.matrix.clear()
    }

    private switchActiveView() {
        if (this.activeView == this.views.length - 1) {
            this.activeView = 0
        } else {
            this.activeView++
        }
    }

    toStore() {

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
    Test,
    Counter
}