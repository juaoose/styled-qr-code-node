import qrTypes from '../constants/qrTypes.js';
import errorCorrectionLevels from '../constants/errorCorrectionLevels.js';
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

const defaultOptions: RequiredOptions = {
  width: 300,
  height: 300,
  data: '',
  margin: 0,
  qrOptions: {
    typeNumber: qrTypes[0],
    mode: undefined,
    errorCorrectionLevel: errorCorrectionLevels.Q
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0
  },
  dotsOptions: {
    type: 'square',
    color: '#000'
  },
  backgroundOptions: {
    color: '#fff'
  }
};

export default defaultOptions;
