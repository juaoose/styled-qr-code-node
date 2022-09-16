# QR Code Styling

JavaScript library for generating QR codes with a logo and styling.

**This is a NodeJS fork of the QR code styling repo [qr-code-styling](https://github.com/kozakdenys/qr-code-styling),
supporting NodeJs as well as svg exports. If you are looking for browser support head to the original project**

Try it here https://qr-code-styling.com

If you have issues / suggestions / notes / questions, please open an issue or contact me. Let's create a cool library
together.

### Examples

<p float="left">
<img style="display:inline-block" src="https://raw.githubusercontent.com/kozakdenys/qr-code-styling/master/src/assets/facebook_example_new.png" width="240" />
<img style="display:inline-block" src="https://raw.githubusercontent.com/kozakdenys/qr-code-styling/master/src/assets/qr_code_example.png" width="240" />
<img style="display:inline-block" src="https://raw.githubusercontent.com/kozakdenys/qr-code-styling/master/src/assets/telegram_example_new.png" width="240" />
</p>

### Installation

```
npm install @loskir/styled-qr-code-node
```

### Usage

```typescript
import {QRCodeCanvas} from '@loskir/styled-qr-code-node';
const {QRCodeCanvas} = require('@loskir/styled-qr-code-node'); // or CommonJS

const qrCode = new QRCodeCanvas({
  data: 'My text or trl',
  image: 'pathToImage'
});

//"png" | "jpg" | "jpeg" | "pdf" | "svg"
await qrCode.toFile('output.png', 'png');
```

### API Documentation

#### Styling options

[Please refer to the original](https://github.com/KilianB/styled-qr-code#api-documentation)

#### Export methods

`qrCode.toFile(options) => Promise<void>`

| Param    | Type                                                                                                                                                                 | Default Value                                                                                                                             | Description                                                                                            |
| -------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| filePath | string                                                                                                                                                               |                                                                                                                                           | the path where the image will be saved                                                                 |
| format   | string (`"png" / "jpg" / "jpeg" / "pdf" / "svg"`) | `'png'` | File format                                                                                            |
| options  | skia-canvas RenderOptions                                                                                                                                            | undefined                                                                                                                                 | [see doc](https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline) |

`qrCode.totoDataUrl(options) => Promise<string>`

| Param    | Type                                                                                         | Default Value | Description                                                                                           |
| -------- |----------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------------|
| format   | string (`"png" / "jpg" / "jpeg" / "pdf" / "svg"`)                                            | `'png'`       | File format                                                                                           |
| options  | skia-canvas RenderOptions                                                                    | undefined     | [see doc](https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline) |

`qrCode.toBuffer(options) => Promise<Buffer>`

| Param    | Type                                                                                         | Default Value | Description                                                                                           |
| -------- |----------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------------|
| format   | string (`"png" / "jpg" / "jpeg" / "pdf" / "svg"`)                                            | `'png'`       | File format                                                                                           |
| options  | skia-canvas RenderOptions                                                                    | undefined     | [see doc](https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline) |
