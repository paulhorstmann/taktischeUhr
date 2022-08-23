import Controller from "./Controller"
import { wait } from "./utils"
import { ViewHandler, ViewTypes } from "./ViewHandler"

export default class Loop {
    activeViewIndicator: number = 0

    constructor() {
        (async () => {
            console.log(`\n\nStart at: ${new Date().toISOString()}`)
            await new ViewHandler(ViewTypes.Spalsh).showSync(5000)
            await wait(100)

            // Mainloop
            while (true) {
                if (Controller.isLUKModeOn) {
                    await this.lukMode()
                } else {
                    await this.startLoop()
                }
                Controller.noChanges = true
            }
        })()
    }

    async startLoop() {
        while (Controller.noChanges) {
            console.log("\n\nChange Counter: " + ++Controller.changes + " - " + ViewTypes[Controller.views[this.activeViewIndicator].type] + "\n")

            const activeView: ViewHandler = Controller.views[this.activeViewIndicator]

            if (activeView.disabled) {
                this.switchActiveViewIndicator()
                continue
            }

            if (activeView.needToRefresh) {
                const refreshInterval = setInterval(() => {
                    activeView.showSync()
                }, 100)
                await wait(Controller.switchInterval)
                clearInterval(refreshInterval)
            } else {
                await activeView.showSync(Controller.switchInterval)
            }

            this.switchActiveViewIndicator()

        }
    }

    async lukMode() {
        while (Controller.noChanges) {
            new ViewHandler(ViewTypes.TacticalClockFormat, true)
        }
    }

    switchActiveViewIndicator() {
        if (this.activeViewIndicator == Controller.views.length - 1) {
            this.activeViewIndicator = 0
        } else {
            this.activeViewIndicator++
        }
    }
}