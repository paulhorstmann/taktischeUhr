import Controller from "./Controller";
import Loop from "./Loop";
import RSSFeedHandler from "./services/RSSFeedHandler";
import { wait } from "./utils";
import Webserver from "./web/Webserver";


(async () => {
    const controller = new Controller();
    await Controller.readLastState()
    await Controller.initMatrix()
    new Webserver(80);
    const loop = new Loop()
    loop.mainLoop()
})();

// /// Handel Exit ///
// process.stdin.resume();

// async function exitHandler(options: any, exitCode: number) {
//     await RSSFeedHandler.waitForResolve()
//     process.exit();
// }

// process.on('exit', exitHandler.bind(null, { exit: true, cleanup: true }));

// process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
// process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

// process.on('uncaughtException', exitHandler.bind(null, { exit: true })); 