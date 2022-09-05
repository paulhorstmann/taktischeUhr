import Controller from "./Controller"
import { wait } from "./utils"
import { ViewHandler, ViewTypes } from "./ViewHandler"

export default class Loop {
    activeViewIndicator: number = 0

    async mainLoop() {
        console.log(`\n\nStart at: ${new Date().toISOString()}`)
        await new ViewHandler(ViewTypes.Spalsh).showSync(5000)

        // Mainloop
        while (true) {
            Controller.noChanges = true
            if (Controller.isLUKModeOn) {
                await this.lukMode()
            } else {
                await this.startLoop()
            }
        }
    }

    async startLoop() {
        while (Controller.noChanges) {

            const activeView: any = Object.values(Controller.views)[this.activeViewIndicator]

            console.log("\n\nChange Counter: " + ++Controller.changes + " - " + ViewTypes[activeView.type] + "\n")
            if (activeView.disabled) {
                this.switchActiveViewIndicator()
                console.log("is disabled");
                continue
            }

            if (activeView.needToRefresh) {
                const refreshInterval = setInterval(() => {
                    activeView.showSync()
                    if (Controller.isLUKModeOn) {
                        clearInterval(refreshInterval)
                    }
                }, 100)
                for (let i = 0; i < Controller.switchInterval; i++) {
                    if (Controller.isLUKModeOn) {
                        break
                    }
                    await wait(1)
                }
                clearInterval(refreshInterval)
            } else {
                await activeView.showSync(Controller.switchInterval)
            }

            this.switchActiveViewIndicator()
        }
    }

    async lukMode() {

        const tCLock = new ViewHandler(ViewTypes.TacticalClockFormat, true)
        console.log("Luk Mode on")

        while (Controller.noChanges) {
            await tCLock.showSync(100)
        }
        console.log("LUK off")
    }

    switchActiveViewIndicator() {
        if (this.activeViewIndicator == Object.values(Controller.views).length - 1) {
            this.activeViewIndicator = 0
        } else {
            this.activeViewIndicator++
        }
    }
}