# QR Code Styling

JavaScript library for generating QR codes with a logo and styling.

**This is the NodeJS fork of the QR code styling repo [qr-code-styling](https://github.com/kozakdenys/qr-code-styling), supporting NodeJs as well as svg exports. If you are looking for browser support head to the original project**

Try it here https://qr-code-styling.com

If you have issues / suggestions / notes / questions, please open an issue or contact me. Let's create a cool library together.

### Examples

<p float="left">
<img style="display:inline-block" src="https://raw.githubusercontent.com/kozakdenys/qr-code-styling/master/src/assets/facebook_example_new.png" width="240" />
<img style="display:inline-block" src="https://raw.githubusercontent.com/kozakdenys/qr-code-styling/master/src/assets/qr_code_example.png" width="240" />
<img style="display:inline-block" src="https://raw.githubusercontent.com/kozakdenys/qr-code-styling/master/src/assets/telegram_example_new.png" width="240" />
</p>

### Installation

```
npm install git+https://github.com/KilianB/qr-code-styling-node#master
```

### Usage

```typescript
import QRCode from 'qr-code-styling-node';

const qrCode = new QRCode({
  data: 'My text or trl',
  image: 'pathToImage'
});

//"png" | "jpg" | "jpeg" | "pdf" | "svg"
await qrCode.toFile('output.png', 'png');
```

### API Documentation

#### QRCodeStyling instance

`new QRCode(options) => QRCode`

| Param   | Type   | Description |
| ------- | ------ | ----------- |
| options | object | Init object |

`options` structure

| Property                | Type                  | Default Value | Description                                                              |
| ----------------------- | --------------------- | ------------- | ------------------------------------------------------------------------ |
| width                   | number                | `300`         | Size of canvas                                                           |
| height                  | number                | `300`         | Size of canvas                                                           |
| data                    | string                |               | The date will be encoded to the QR code                                  |
| image                   | string, image, Buffer |               | File path of the image which will be copied to the center of the QR code |
| margin                  | number                | `0`           | Margin around canvas                                                     |
| qrOptions               | object                |               | Options will be passed to `qrcode-generator` lib                         |
| imageOptions            | object                |               | Specific image options, details see below                                |
| dotsOptions             | object                |               | Dots styling options                                                     |
| cornersSquareOptions    | object                |               | Square in the corners styling options                                    |
| cornersDotOptionsHelper | object                |               | Dots in the corners styling options                                      |
| backgroundOptions       | object                |               | QR background styling options                                            |

`options.qrOptions` structure

| Property             | Type                                               | Default Value |
| -------------------- | -------------------------------------------------- | ------------- |
| typeNumber           | number (`0 - 40`)                                  | `0`           |
| mode                 | string (`'Numeric' 'Alphanumeric' 'Byte' 'Kanji'`) |
| errorCorrectionLevel | string (`'L' 'M' 'Q' 'H'`)                         | `'Q'`         |

`options.imageOptions` structure

| Property           | Type    | Default Value | Description                                                                    |
| ------------------ | ------- | ------------- | ------------------------------------------------------------------------------ |
| hideBackgroundDots | boolean | `true`        | Hide all dots covered by the image                                             |
| imageSize          | number  | `0.4`         | Coefficient of the image size. Not recommended to use ove 0.5. Lower is better |
| margin             | number  | `0`           | Margin of the image in px                                                      |

`options.dotsOptions` structure

| Property | Type                                                                           | Default Value | Description         |
| -------- | ------------------------------------------------------------------------------ | ------------- | ------------------- |
| color    | string                                                                         | `'#000'`      | Color of QR dots    |
| gradient | object                                                                         |               | Gradient of QR dots |
| type     | string (`'rounded' 'dots' 'classy' 'classy-rounded' 'square' 'extra-rounded'`) | `'square'`    | Style of QR dots    |

`options.backgroundOptions` structure

| Property | Type   | Default Value |
| -------- | ------ | ------------- |
| color    | string | `'#fff'`      |
| gradient | object |

`options.cornersSquareOptions` structure

| Property | Type                                      | Default Value | Description                |
| -------- | ----------------------------------------- | ------------- | -------------------------- |
| color    | string                                    |               | Color of Corners Square    |
| gradient | object                                    |               | Gradient of Corners Square |
| type     | string (`'dot' 'square' 'extra-rounded'`) |               | Style of Corners Square    |

`options.cornersDotOptions` structure

| Property | Type                      | Default Value | Description             |
| -------- | ------------------------- | ------------- | ----------------------- |
| color    | string                    |               | Color of Corners Dot    |
| gradient | object                    |               | Gradient of Corners Dot |
| type     | string (`'dot' 'square'`) |               | Style of Corners Dot    |

Gradient structure

`options.dotsOptions.gradient`

`options.backgroundOptions.gradient`

`options.cornersSquareOptions.gradient`

`options.cornersDotOptions.gradient`

| Property   | Type                         | Default Value | Description                                                                            |
| ---------- | ---------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| type       | string (`'linear' 'radial'`) | "linear"      | Type of gradient spread                                                                |
| rotation   | number                       | 0             | Rotation of gradient in radians (Math.PI === 180 degrees)                              |
| colorStops | array of objects             |               | Gradient colors. Example `[{ offset: 0, color: 'blue' }, { offset: 1, color: 'red' }]` |

Gradient colorStops structure

`options.dotsOptions.gradient.colorStops[]`

`options.backgroundOptions.gradient.colorStops[]`

`options.cornersSquareOptions.gradient.colorStops[]`

`options.cornersDotOptions.gradient.colorStops[]`

| Property | Type             | Default Value | Description                         |
| -------- | ---------------- | ------------- | ----------------------------------- |
| offset   | number (`0 - 1`) |               | Position of color in gradient range |
| color    | string           |               | Color of stop in gradient range     |

#### Export methods

`qrCode.toFile(options) => Promise<void>`

| Param    | Type                      | Default Value | Description                                                                                            |
| -------- | ------------------------- | ------------- | ------------------------------------------------------------------------------------------------------ | ----- | ------- | ------- | ------------- |
| filePath | string                    |               | the path where the image will be saved                                                                 |
| format   | string (`"png"            | "jpg"         | "jpeg"                                                                                                 | "pdf" | "svg"`) | `'png'` | NodeJs Buffer |
| options  | skia-canvas RenderOptions | undefined     | [see doc](https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline) |

`qrCode.totoDataUrl(options) => Promise<string>`

| Param   | Type                      | Default Value | Description                                                                                            |
| ------- | ------------------------- | ------------- | ------------------------------------------------------------------------------------------------------ | ----- | ------- | ------- | ------------- |
| format  | string (`"png"            | "jpg"         | "jpeg"                                                                                                 | "pdf" | "svg"`) | `'png'` | NodeJs Buffer |
| options | skia-canvas RenderOptions | undefined     | [see doc](https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline) |

`qrCode.toBuffer(options) => Promise<Buffer>`

| Param   | Type                      | Default Value | Description                                                                                            |
| ------- | ------------------------- | ------------- | ------------------------------------------------------------------------------------------------------ | ----- | ------- | ------- | ------------- |
| format  | string (`"png"            | "jpg"         | "jpeg"                                                                                                 | "pdf" | "svg"`) | `'png'` | NodeJs Buffer |
| options | skia-canvas RenderOptions | undefined     | [see doc](https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline) |

### License

[MIT License](https://raw.githubusercontent.com/kozakdenys/qr-code-styling/master/LICENSE). Copyright (c) 2021 Denys Kozak
