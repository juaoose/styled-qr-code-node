/// <reference types="node" />
import { Options } from '../types';
import { CanvasRenderingContext2D, ExportFormat, RenderOptions } from 'skia-canvas';
export default class QRCanvas {
    private _options;
    private _qr;
    private _image?;
    private _canvas;
    private _width;
    private _height;
    created: Promise<void>;
    constructor(options: Options);
    get context(): CanvasRenderingContext2D;
    get width(): number;
    get height(): number;
    private clear;
    private drawQR;
    private drawBackground;
    private drawDots;
    private drawCorners;
    private drawImage;
    private _createGradient;
    /**
     * Create a buffer object with the content of the qr code
     *
     * @param format Supported types: "png" | "jpg" | "jpeg" | "pdf" | "svg"
     * @param options export options see https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline
     */
    toBuffer(format?: ExportFormat, options?: RenderOptions): Promise<Buffer>;
    /**
     *  Create a data url with the content of the qr code
     *
     * @param format Supported types: "png" | "jpg" | "jpeg" | "pdf" | "svg"
     * @param options export options see https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline
     */
    toDataUrl(format?: ExportFormat, options?: RenderOptions): Promise<string>;
    /**
     * Create a file of the qr code and save it to disk
     *
     * @param filePath file path including extension
     * @param format Supported types: "png" | "jpg" | "jpeg" | "pdf" | "svg"
     * @param options export options see https://github.com/samizdatco/skia-canvas#tobufferformat-page-matte-density-quality-outline
     * @returns a promise that resolves once the file was written to disk
     */
    toFile(filePath: string, format?: ExportFormat, options?: RenderOptions): Promise<void>;
}
