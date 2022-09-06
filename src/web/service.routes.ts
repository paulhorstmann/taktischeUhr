import { Router } from "express";
import Controller from "../Controller";

const router = Router()

router.route('/luk').get((req, res) => {
    res.json({ lukmodeIsOn: Controller.isLUKModeOn })
})

router.route('/luk/toggle').get((req, res) => {
    Controller.noChanges = false;
    Controller.isLUKModeOn = !Controller.isLUKModeOn
    console.log("Send Luk Toogle")
    res.send(`Luk mode is ${Controller.isLUKModeOn ? "On" : "Off"}`)
})

router.route('/store').get((req, res) => {
    res.json(Controller.store)
})

router.route('/store').post(async (req, res) => {
    if (!req.body.weather) {
        res.sendStatus(500)
        return
    }

    await Controller.updateStore(req.body)
    res.json(Controller.store)
})


export default router