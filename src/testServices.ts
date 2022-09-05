import WaetherApiHandler from "./services/WeatherApiHandler"
import { wait } from "./utils"

(async () => {
    new WaetherApiHandler("b851570cad2913b6254377f0b27b855a", "52.29", "8.89")
    await wait(1000)
})()