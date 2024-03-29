import {
    GpioMapping,
    LedMatrix,
    MatrixOptions,
    RuntimeFlag,
    RuntimeOptions,
} from 'rpi-led-matrix';

export const matrixOptions: MatrixOptions = {
    ...LedMatrix.defaultMatrixOptions(),
    brightness: 80,
    rows: 32,
    cols: 64,
    chainLength: 2,
    limitRefreshRateHz: 150,
    hardwareMapping: GpioMapping.Regular
};

export const runtimeOptions: RuntimeOptions = {
    ...LedMatrix.defaultRuntimeOptions(),
    gpioSlowdown: 4,
    dropPrivileges: RuntimeFlag.Off,
};
