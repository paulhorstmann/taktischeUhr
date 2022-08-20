import axios from "axios"
import path from "path"
import * as fs from 'fs/promises';
import { loadImageInBuffer, wait, weekdaysToString } from "../utils"
import WeatherIcons from "../views/WeatherIcons";

interface DailyWeatherItem {
    icon: string
    temp: string
    day: string
}

const iconNames = [
    "01d",
    "02d",
    "03d",
    "04d",
    "09d",
    "10d",
    "11d",
    "13d",
    "50d",
]

export default class WaetherApiHandler {
    url: string = "https://api.openweathermap.org/data/2.5/forecast?units=metric"
    private apikey: string
    private lat: string = ""
    private lon: string = ""

    static data: Array<DailyWeatherItem> = []
    static iconBuffer: Map<string, Buffer> = new Map()
    static loaded = false

    constructor(apikey: string, lat: string, lon: string) {
        this.apikey = apikey
        this.lat = lat
        this.lon = lon

        this.loadIconSet()
        this.updateData()
    }

    async loadIconSet() {
        for (let i = 0; i < iconNames.length; i++) {
            WaetherApiHandler.iconBuffer.set(iconNames[i], await this.loadIcon(iconNames[i]))
        }
        WaetherApiHandler.loaded = true
    }

    static async waitForLoading() {
        while (!WaetherApiHandler.loaded) {
            await wait(1000)
        }
    }

    async loadIcon(iconName: string): Promise<Buffer> {
        const buffer = fs.readFile(path.join(process.cwd(), `assets/img/weather/${iconName}.png`))
        if (buffer == undefined) {
            throw Error("File not found")
        } else {
            return buffer
        }
    }

    static getIconBuffer(iconName: string): Buffer {
        const buffer = WaetherApiHandler.iconBuffer.get(iconName)
        if (buffer == undefined) {
            throw Error("Filetype")
        }
        return buffer;
    }

    async updateData() {
        let resData: any
        const now = new Date()

        await axios({
            method: 'get',
            url: `${this.url}&appid=${this.apikey}&lat=${this.lat}&lon=${this.lon}`,
        }).then((response) => {
            resData = response.data
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        })

        if (resData) {
            WaetherApiHandler.data = []

            this.addItem(resData.list[0])

            let nextDayIndex: number = 0
            for (let i = 0; i < resData.list.length; i++) {
                if (resData.list[i].dt_txt === now.toISOString().split("T")[0] + " 12:00:00") {
                    nextDayIndex = i
                    break
                }
            }

            for (let i = nextDayIndex + 4; i < resData.list.length; i = i + 8) {
                if (WaetherApiHandler.data.length <= 4) {
                    this.addItem(resData.list[i])
                }
            }

            if (WaetherApiHandler.data.length == 6)
                WaetherApiHandler.data = WaetherApiHandler.data.slice(1, WaetherApiHandler.data.length)

        }
    }

    private addItem(apiItem: any) {
        WaetherApiHandler.data.push({
            icon: apiItem.weather[0].icon.replace("n", "d"),
            temp: apiItem.main.temp,
            day: weekdaysToString(new Date(apiItem.dt_txt).getDay())
        })
    }

    public setLat(lat: string) {
        this.lat = lat;
    }

    public setLon(lon: string) {
        this.lon = lon;
    }

    public setApikey(apikey: string) {
        this.apikey = apikey;
    }
}
