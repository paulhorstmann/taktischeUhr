import express from "express";
import Controller from "../Controller";
import RSSFeedHandler from "../services/RSSFeedHandler";
import InterfaceRoutes from "./interface.routes"
import ServiceRoutes from "./service.routes"

export default class Webserver {
    private app = express()
    private port: number

    constructor(port: number) {
        this.port = port
        this.app.set('view engine', 'pug');
        this.app.use(express.static('./public'));
        this.app.use(express.json());

        this.useAuthentication()

        this.app.use("/", InterfaceRoutes)
        this.app.use("/service", ServiceRoutes)

        this.app.get("/f/:f", async (req, res) => {
            try {
                const feedId = Number.parseInt(req.params.f)
                if (feedId) {
                    res.redirect(RSSFeedHandler.items[feedId].link)
                }
            } catch {
                res.send("Ein Fehler ist aufgetreten")
            }
        })

        this.app.listen(port, () => {
            console.log(`[Web Server] started at http://localhost:${port}`);
        });
    }

    useAuthentication() {
        this.app.use((req, res, next) => {
            const auth = { login: 'bufdi', password: 'mittag' }

            const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
            const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

            if (login && password && login === auth.login && password === auth.password) {
                return next()
            }

            res.set('WWW-Authenticate', 'Basic realm="401"')
            res.status(401).send('Authentication required.')
        })
    }
}