import Controller from "./Controller";
import Loop from "./Loop";
import { wait } from "./utils";
import Webserver from "./web/Webserver";

new Controller();
// const webserver = new Webserver(80);

(async () => {
    await wait(1000)
    await Controller.initMatrix()
    await Controller.waitForMatrix()
    const loop = new Loop()
})()

/// Handel Exit ///
process.stdin.resume();

function exitHandler(options: any, exitCode: number) {
    if (Controller.matrix) {
        Controller.matrix.clear()
        console.log("Clear Matrix")
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null, { exit: true, cleanup: true }));

process.on('SIGINT', exitHandler.bind(null, { exit: true }));

process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

process.on('uncaughtException', exitHandler.bind(null, { exit: true }));


