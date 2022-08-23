import Controller from "./Controller";
import Loop from "./Loop";
import { wait } from "./utils";
import Webserver from "./web/Webserver";


(async () => {
    const controller = new Controller();
    await Controller.initMatrix()
    new Webserver(80);
    const loop = new Loop()
})();


/// Handel Exit ///
process.stdin.resume();

function exitHandler(options: any, exitCode: number) {
    if (Controller.matrix) {
        Controller.matrix.clear()
        console.log("Clear Matrix")
    }
    if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null, { exit: true, cleanup: true }));

process.on('SIGINT', exitHandler.bind(null, { exit: true }));

process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

process.on('uncaughtException', exitHandler.bind(null, { exit: true }));


