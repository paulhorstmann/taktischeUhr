import Splash from "./views/Spash"
import TacticalClockFormat from "./views/TacticalClockFormat"
import Newsfeed from "./views/Newsfeed"
import ISOClockFormat from "./views/ISOClockFormat"
import Image from "./views/Image"
import SimpleText from "./views/SimpleText"
import ErrorView from "./views/ErrorView"
import Test from "./views/Test"
import Countdown from "./views/Countdown"

import { wait } from "./utils"

import WeatherIcons from "./views/WeatherIcons"
import Controller from "./Controller"

export class ViewHandler {
    type: ViewTypes
    needToRefresh: boolean
    views: Array<(activeView?: number) => Promise<void>>;
    activeView: number
    isSelected: boolean

    constructor(type: ViewTypes, needToRefresh: boolean = false, isSelected = true) {
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
        Controller.matrix.clear()
        await this.views[this.activeView]()

        this.switchActiveView()
    }

    async showSync(waitInMS?: number) {
        console.timeStamp()
        await this.show()
        Controller.matrix.sync()

        if (waitInMS)
            await wait(waitInMS)

        Controller.matrix.clear()
    }

    private switchActiveView() {
        if (this.activeView == this.views.length - 1) {
            this.activeView = 0
        } else {
            this.activeView++
        }
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