import {
    GpioMapping,
    LedMatrix,
    MatrixOptions,
    RuntimeFlag,
    RuntimeOptions,
} from 'rpi-led-matrix';

export const matrixOptions: MatrixOptions = {
    ...LedMatrix.defaultMatrixOptions(),
    rows: 32,
    cols: 64,
    chainLength: 2,
    hardwareMapping: GpioMapping.Regular,
    showRefreshRate: false,
};

export const runtimeOptions: RuntimeOptions = {
    ...LedMatrix.defaultRuntimeOptions(),
    gpioSlowdown: 4,
    dropPrivileges: RuntimeFlag.Off,
};

// console.log('runtime options: ', JSON.stringify(runtimeOptions, null, 2));  