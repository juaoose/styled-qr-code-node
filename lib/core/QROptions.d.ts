import { DotType, Options, TypeNumber, ErrorCorrectionLevel, Mode, Gradient } from '../types';
export interface RequiredOptions extends Options {
    width: number;
    height: number;
    margin: number;
    data: string;
    qrOptions: {
        typeNumber: TypeNumber;
        mode?: Mode;
        errorCorrectionLevel: ErrorCorrectionLevel;
    };
    imageOptions: {
        hideBackgroundDots: boolean;
        imageSize: number;
        margin: number;
    };
    dotsOptions: {
        type: DotType;
        color: string;
        gradient?: Gradient;
    };
    backgroundOptions: {
        color: string;
        gradient?: Gradient;
    };
}
declare const defaultOptions: RequiredOptions;
export default defaultOptions;
