import { Router } from "express";
import Controller from "../Controller";

const router = Router()

router.route('/').get((req, res) => {
    res.render("../public/index",)
})

router.route('/anzeige').get((req, res) => {
    res.render("../public/anzeige", {
        store: Controller.store,
        viewState: Controller.store.active
    })
})

router.route('/luk').get((req, res) => {
    res.render("../public/luk")
})

export default router