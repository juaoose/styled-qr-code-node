import calculateImageSize from '../tools/calculateImageSize.js';
import errorCorrectionPercents from '../constants/errorCorrectionPercents.js';
import QRDot from '../figures/dot/QRDot.js';
import QRCornerSquare from '../figures/cornerSquare/QRCornerSquare.js';
import QRCornerDot from '../figures/cornerDot/QRCornerDot.js';
import defaultOptions from './QROptions.js';
import gradientTypes from '../constants/gradientTypes.js';
import getMode from '../tools/getMode.js';
import { Canvas, loadImage } from 'skia-canvas';
import qrcode from 'qrcode-generator';
import { promises as fs } from 'fs';
import mergeDeep from '../tools/merge.js';
import sanitizeOptions from '../tools/sanitizeOptions.js';
const squareMask = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
];
const dotMask = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
export default class QRCanvas {
    //TODO don't pass all options to this class
    constructor(options) {
        const mergedOptions = sanitizeOptions(mergeDeep(defaultOptions, options));
        this._width = mergedOptions.width;
        this._height = mergedOptions.height;
        this._canvas = new Canvas(this._width, this._height);
        this._options = mergedOptions;
        //Explicit cast due to type mismatch on skia canvas and qrcode types. Due to missing function definition in skia canvas renderer which is never used
        this._qr = qrcode(this._options.qrOptions.typeNumber, this._options.qrOptions.errorCorrectionLevel);
        this._qr.addData(this._options.data, this._options.qrOptions.mode || getMode(this._options.data));
        this.created = this.drawQR();
    }
    get context() {
        return this._canvas.getContext('2d');
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    clear() {
        const canvasContext = this.context;
        if (canvasContext) {
            canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }
    async drawQR() {
        this._qr.make();
        const count = this._qr.getModuleCount();
        const minSize = Math.min(this._options.width, this._options.height) - this._options.margin * 2;
        const dotSize = Math.floor(minSize / count);
        let drawImageSize = {
            hideXDots: 0,
            hideYDots: 0,
            width: 0,
            height: 0
        };
        if (this._options.image !== undefined) {
            if (typeof this._options.image === 'string' || Buffer.isBuffer(this._options.image)) {
                this._image = await loadImage(this._options.image);
            }
            else {
                this._image = this._options.image;
            }
            const { imageOptions, qrOptions } = this._options;
            const coverLevel = imageOptions.imageSize * errorCorrectionPercents[qrOptions.errorCorrectionLevel];
            const maxHiddenDots = Math.floor(coverLevel * count * count);
            drawImageSize = calculateImageSize({
                originalWidth: this._image.width,
                originalHeight: this._image.height,
                maxHiddenDots,
                maxHiddenAxisDots: count - 14,
                dotSize
            });
        }
        this.clear();
        this.drawBackground();
        this.drawDots((i, j) => {
            if (this._options.imageOptions.hideBackgroundDots) {
                if (i >= (count - drawImageSize.hideXDots) / 2 &&
                    i < (count + drawImageSize.hideXDots) / 2 &&
                    j >= (count - drawImageSize.hideYDots) / 2 &&
                    j < (count + drawImageSize.hideYDots) / 2) {
                    return false;
                }
            }
            if (squareMask[i]?.[j] || squareMask[i - count + 7]?.[j] || squareMask[i]?.[j - count + 7]) {
                return false;
            }
            if (dotMask[i]?.[j] || dotMask[i - count + 7]?.[j] || dotMask[i]?.[j - count + 7]) {
                return false;
            }
            return true;
        });
        this.drawCorners();
        if (this._options.image !== undefined) {
            this.drawImage({ width: drawImageSize.width, height: drawImageSize.height, count, dotSize });
        }
    }
    drawBackground() {
        const canvasContext = this.context;
        const options = this._options;
        if (canvasContext) {
            if (options.backgroundOptions.gradient) {
                const gradientOptions = options.backgroundOptions.gradient;
                const gradient = this._createGradient({
                    context: canvasContext,
                    options: gradientOptions,
                    additionalRotation: 0,
                    x: 0,
                    y: 0,
                    size: this._canvas.width > this._canvas.height ? this._canvas.width : this._canvas.height
                });
                gradientOptions.colorStops.forEach(({ offset, color }) => {
                    gradient.addColorStop(offset, color);
                });
                canvasContext.fillStyle = gradient;
            }
            else if (options.backgroundOptions.color) {
                canvasContext.fillStyle = options.backgroundOptions.color;
            }
            canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }
    drawDots(filter) {
        if (!this._qr) {
            throw 'QR code is not defined';
        }
        const canvasContext = this.context;
        if (!canvasContext) {
            throw 'QR code is not defined';
        }
        const options = this._options;
        const count = this._qr.getModuleCount();
        if (count > options.width || count > options.height) {
            throw 'The canvas is too small.';
        }
        const minSize = Math.min(options.width, options.height) - options.margin * 2;
        const dotSize = Math.floor(minSize / count);
        const xBeginning = Math.floor((options.width - count * dotSize) / 2);
        const yBeginning = Math.floor((options.height - count * dotSize) / 2);
        const dot = new QRDot({ context: canvasContext, type: options.dotsOptions.type });
        canvasContext.beginPath();
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                if (filter && !filter(i, j)) {
                    continue;
                }
                if (!this._qr.isDark(i, j)) {
                    continue;
                }
                dot.draw(yBeginning + j * dotSize, xBeginning + i * dotSize, dotSize, (xOffset, yOffset) => {
                    if (i + xOffset < 0 || j + yOffset < 0 || i + xOffset >= count || j + yOffset >= count)
                        return false;
                    if (filter && !filter(i + xOffset, j + yOffset))
                        return false;
                    return !!this._qr && this._qr.isDark(i + xOffset, j + yOffset);
                });
            }
        }
        if (options.dotsOptions.gradient) {
            const gradientOptions = options.dotsOptions.gradient;
            const gradient = this._createGradient({
                context: canvasContext,
                options: gradientOptions,
                additionalRotation: 0,
                x: xBeginning,
                y: yBeginning,
                size: count * dotSize
            });
            gradientOptions.colorStops.forEach(({ offset, color }) => {
                gradient.addColorStop(offset, color);
            });
            canvasContext.fillStyle = canvasContext.strokeStyle = gradient;
        }
        else if (options.dotsOptions.color) {
            canvasContext.fillStyle = canvasContext.strokeStyle = options.dotsOptions.color;
        }
        canvasContext.fill('evenodd');
    }
    drawCorners(filter) {
        if (!this._qr) {
            throw 'QR code is not defined';
        }
        const canvasContext = this.context;
        if (!canvasContext) {
            throw 'QR code is not defined';
        }
        const options = this._options;
        const count = this._qr.getModuleCount();
        const minSize = Math.min(options.width, options.height) - options.margin * 2;
        const dotSize = Math.floor(minSize / count);
        const cornersSquareSize = dotSize * 7;
        const cornersDotSize = dotSize * 3;
        const xBeginning = Math.floor((options.width - count * dotSize) / 2);
        const yBeginning = Math.floor((options.height - count * dotSize) / 2);
        [
            [0, 0, 0],
            [1, 0, Math.PI / 2],
            [0, 1, -Math.PI / 2]
        ].forEach(([column, row, rotation]) => {
            if (filter && !filter(column, row)) {
                return;
            }
            const x = xBeginning + column * dotSize * (count - 7);
            const y = yBeginning + row * dotSize * (count - 7);
            if (options.cornersSquareOptions?.type) {
                const cornersSquare = new QRCornerSquare({ context: canvasContext, type: options.cornersSquareOptions?.type });
                canvasContext.beginPath();
                cornersSquare.draw(x, y, cornersSquareSize, rotation);
            }
            else {
                const dot = new QRDot({ context: canvasContext, type: options.dotsOptions.type });
                canvasContext.beginPath();
                for (let i = 0; i < squareMask.length; i++) {
                    for (let j = 0; j < squareMask[i].length; j++) {
                        if (!squareMask[i]?.[j]) {
                            continue;
                        }
                        dot.draw(x + i * dotSize, y + j * dotSize, dotSize, (xOffset, yOffset) => !!squareMask[i + xOffset]?.[j + yOffset]);
                    }
                }
            }
            if (options.cornersSquareOptions?.gradient) {
                const gradientOptions = options.cornersSquareOptions.gradient;
                const gradient = this._createGradient({
                    context: canvasContext,
                    options: gradientOptions,
                    additionalRotation: rotation,
                    x,
                    y,
                    size: cornersSquareSize
                });
                gradientOptions.colorStops.forEach(({ offset, color }) => {
                    gradient.addColorStop(offset, color);
                });
                canvasContext.fillStyle = canvasContext.strokeStyle = gradient;
            }
            else if (options.cornersSquareOptions?.color) {
                canvasContext.fillStyle = canvasContext.strokeStyle = options.cornersSquareOptions.color;
            }
            canvasContext.fill('evenodd');
            if (options.cornersDotOptions?.type) {
                const cornersDot = new QRCornerDot({ context: canvasContext, type: options.cornersDotOptions?.type });
                canvasContext.beginPath();
                cornersDot.draw(x + dotSize * 2, y + dotSize * 2, cornersDotSize, rotation);
            }
            else {
                const dot = new QRDot({ context: canvasContext, type: options.dotsOptions.type });
                canvasContext.beginPath();
                for (let i = 0; i < dotMask.length; i++) {
                    for (let j = 0; j < dotMask[i].length; j++) {
                        if (!dotMask[i]?.[j]) {
                            continue;
                        }
                        dot.draw(x + i * dotSize, y + j * dotSize, dotSize, (xOffset, yOffset) => !!dotMask[i + xOffset]?.[j + yOffset]);
                    }
                }
            }
            if (options.cornersDotOptions?.gradient) {
                const gradientOptions = options.cornersDotOptions.gradient;
                const gradient = this._createGradient({
                    context: canvasContext,
                    options: gradientOptions,
                    additionalRotation: rotation,
                    x: x + dotSize * 2,
                    y: y + dotSize * 2,
                    size: cornersDotSize
                });
                gradientOptions.colorStops.forEach(({ offset, color }) => {
                    gradient.addColorStop(offset, color);
                });
                canvasContext.fillStyle = canvasContext.strokeStyle = gradient;
            }
            else if (options.cornersDotOptions?.color) {
                canvasContext.fillStyle = canvasContext.strokeStyle = options.cornersDotOptions.color;
            }
            canvasContext.fill('evenodd');
        });
    }
    drawImage({ width, height, count, dotSize }) {
        const canvasContext = this.context;
        if (!canvasContext) {
            throw 'canvasContext is not defined';
        }
        if (!this._image) {
            throw 'image is not defined';
        }
        const options = this._options;
        const xBeginning = Math.floor((options.width - count * dotSize) / 2);
        const yBeginning = Math.floor((options.height - count * dotSize) / 2);
        const dx = xBeginning + options.imageOptions.margin + (count * dotSize - width) / 2;
        const dy = yBeginning + options.imageOptions.margin + (count * dotSize - height) / 2;
        const dw = width - options.imageOptions.margin * 2;
        const dh = height - options.imageOptions.margin * 2;
        canvasContext.drawImage(this._image, dx, dy, dw < 0 ? 0 : dw, dh < 0 ? 0 : dh);
    }
    _createGradient({ context, options, additionalRotation, x, y, size }) {
        let gradient;
        if (options.type === gradientTypes.radial) {
            gradient = context.createRadialGradient(x + size / 2, y + size / 2, 0, x + size / 2, y + size / 2, size / 2);
        }
        else {
            const rotation = ((options.rotation || 0) + additionalRotation) % (2 * Math.PI);
            const positiveRotation = (rotation + 2 * Math.PI) % (2 * Math.PI);
            let x0 = x + size / 2;
            let y0 = y + size / 2;
            let x1 = x + size / 2;
            let y1 = y + size / 2;
            if ((positiveRotation >= 0 && positiveRotation <= 0.25 * Math.PI) ||
                (positiveRotation > 1.75 * Math.PI && positiveRotation <= 2 * Math.PI)) {
                x0 = x0 - size / 2;
                y0 = y0 - (size / 2) * Math.tan(rotation);
                x1 = x1 + size / 2;
                y1 = y1 + (size / 2) * Math.tan(rotation);
            }
            else if (positiveRotation > 0.25 * Math.PI && positiveRotation <= 0.75 * Math.PI) {
                y0 = y0 - size / 2;
                x0 = x0 - size / 2 / Math.tan(rotation);
                y1 = y1 + size / 2;
                x1 = x1 + size / 2 / Math.tan(rotation);
            }
            else if (positiveRotation > 0.75 * Math.PI && positiveRotation <= 1.25 * Math.PI) {
                x0 = x0 + size / 2;
                y0 = y0 + (size / 2) * Math.tan(rotation);
                x1 = x1 - size / 2;
                y1 = y1 - (size / 2) * Math.tan(rotation);
            }
            else if (positiveRotation > 1.25 * Math.PI && positiveRotation <= 1.75 * Math.PI) {
                y0 = y0 + size / 2;
                x0 = x0 + size / 2 / Math.tan(rotation);
                y1 = y1 - size / 2;
                x1 = x1 - size / 2 / Math.tan(rotation);
            }
            gradient = context.createLinearGradient(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1));
        }
        return gradient;
    }
    /**
     * Create a buffer object with the content of the qr code
     *
     * @param format Supported types: "png" | "jpg" | "jpeg" | "pdf" | "svg"
     * @param options export options see https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline
     */
    async toBuffer(format = 'png', options) {
        await this.created;
        return this._canvas.toBuffer(format, options);
    }
    /**
     *  Create a data url with the content of the qr code
     *
     * @param format Supported types: "png" | "jpg" | "jpeg" | "pdf" | "svg"
     * @param options export options see https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline
     */
    async toDataUrl(format = 'png', options) {
        await this.created;
        return this._canvas.toDataURL(format, options);
    }
    /**
     * Create a file of the qr code and save it to disk
     *
     * @param filePath file path including extension
     * @param format Supported types: "png" | "jpg" | "jpeg" | "pdf" | "svg"
     * @param options export options see https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline
     * @returns a promise that resolves once the file was written to disk
     */
    async toFile(filePath, format = 'png', options) {
        await this.created;
        return fs.writeFile(filePath, await this._canvas.toBuffer(format, options));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVJDYW52YXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9RUkNhbnZhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGtCQUFrQixNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sdUJBQXVCLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDNUMsT0FBTyxjQUFjLE1BQU0sMkNBQTJDLENBQUM7QUFDdkUsT0FBTyxXQUFXLE1BQU0scUNBQXFDLENBQUM7QUFDOUQsT0FBTyxjQUFtQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sYUFBYSxNQUFNLCtCQUErQixDQUFDO0FBRTFELE9BQU8sT0FBTyxNQUFNLHFCQUFxQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxNQUFNLEVBQXlELFNBQVMsRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUM5RyxPQUFPLE1BQU0sTUFBTSxrQkFBa0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxJQUFJLEVBQUUsRUFBRSxNQUFNLElBQUksQ0FBQztBQUNwQyxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLGVBQWUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRCxNQUFNLFVBQVUsR0FBRztJQUNqQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUN0QixDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUc7SUFDZCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUN0QixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8s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