const wait = (t: number) => new Promise(ok => setTimeout(ok, t));

function convertABGRToRGB(argbBuffer: Buffer): Buffer {
    let res: Array<any> = []
    for (let i = 0; i < argbBuffer.length; i = i + 4) {
        res.push(argbBuffer[i + 3], argbBuffer[i + 2], argbBuffer[i + 1])
    }
    return Buffer.from(res);
}

function convertBGRAtoRGB(argbBuffer: Buffer): Buffer {
    let res: Array<any> = []
    for (let i = 0; i < argbBuffer.length; i = i + 4) {
        res.push(argbBuffer[i + 1], argbBuffer[i + 2], argbBuffer[i + 0])
    }
    return Buffer.from(res);
}

export { wait, convertABGRToRGB, convertBGRAtoRGB } 