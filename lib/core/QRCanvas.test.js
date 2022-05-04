import fs from 'fs';
import path from 'path';
import qrcode from 'qrcode-generator';
import QRCanvas from './QRCanvas';
import modes from '../constants/modes';
import mergeDeep from '../tools/merge';
import defaultQRCodeStylingOptions from './QROptions';
describe('Test QRCanvas class', () => {
    let qr;
    const defaultOptions = mergeDeep(defaultQRCodeStylingOptions, {
        width: 100,
        height: 100,
        data: 'TEST',
        qrOptions: {
            mode: modes.alphanumeric
        }
    });
    const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mNk+M+AARiHsiAAcCIKAYwFoQ8AAAAASUVORK5CYII=';
    beforeAll(() => {
        qr = qrcode(defaultOptions.qrOptions.typeNumber, defaultOptions.qrOptions.errorCorrectionLevel);
        qr.addData(defaultOptions.data, defaultOptions.qrOptions.mode);
        qr.make();
    });
    it('Should draw simple qr code', () => {
        const expectedQRCodeFile = fs.readFileSync(path.resolve(__dirname, '../assets/test/simple_qr.png'), 'base64');
        const canvas = new QRCanvas(defaultOptions);
        canvas.drawQR(qr);
        expect(canvas.getCanvas().toDataURL()).toEqual(expect.stringContaining(expectedQRCodeFile));
    });
    it('Should draw a qr code with image', (done) => {
        const expectedQRCodeFile = fs.readFileSync(path.resolve(__dirname, '../assets/test/simple_qr_with_image.png'), 'base64');
        const canvas = new QRCanvas({
            ...defaultOptions,
            image: defaultImage
        });
        canvas.drawQR(qr);
        //TODO remove setTimout
        setTimeout(() => {
            canvas._image.onload();
            expect(canvas.getCanvas().toDataURL()).toEqual(expect.stringContaining(expectedQRCodeFile));
            done();
        });
    });
    it('Should draw a qr code with image margin', (done) => {
        const expectedQRCodeFile = fs.readFileSync(path.resolve(__dirname, '../assets/test/simple_qr_with_image_margin.png'), 'base64');
        const canvas = new QRCanvas({
            ...defaultOptions,
            image: defaultImage,
            imageOptions: {
                ...defaultOptions.imageOptions,
                margin: 2
            }
        });
        canvas.drawQR(qr);
        //TODO remove setTimout
        setTimeout(() => {
            canvas._image.onload();
            expect(canvas.getCanvas().toDataURL()).toEqual(expect.stringContaining(expectedQRCodeFile));
            done();
        });
    });
    it('Should draw a qr code with image without dots hiding', (done) => {
        const expectedQRCodeFile = fs.readFileSync(path.resolve(__dirname, '../assets/test/simple_qr_with_image.png'), 'base64');
        const canvas = new QRCanvas({
            ...defaultOptions,
            image: defaultImage,
            imageOptions: {
                ...defaultOptions.imageOptions,
                hideBackgroundDots: false
            }
        });
        canvas.drawQR(qr);
        //TODO remove setTimout
        setTimeout(() => {
            canvas._image.onload();
            expect(canvas.getCanvas().toDataURL()).toEqual(expect.stringContaining(expectedQRCodeFile));
            done();
        });
    });
    it('Should draw a qr code with margin around canvas', () => {
        const expectedQRCodeFile = fs.readFileSync(path.resolve(__dirname, '../assets/test/simple_qr_with_margin_canvas.png'), 'base64');
        const canvas = new QRCanvas({
            ...defaultOptions,
            margin: 20
        });
        canvas.drawQR(qr);
        expect(canvas.getCanvas().toDataURL()).toEqual(expect.stringContaining(expectedQRCodeFile));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVJDYW52YXMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL1FSQ2FudmFzLnRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3BCLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLE1BQU0sTUFBTSxrQkFBa0IsQ0FBQztBQUN0QyxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFDbEMsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFDdkMsT0FBTyxTQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTywyQkFBMkIsTUFBTSxhQUFhLENBQUM7QUFFdEQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtJQUNuQyxJQUFJLEVBQUUsQ0FBQztJQUNQLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQywyQkFBMkIsRUFBRTtRQUM1RCxLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxHQUFHO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsS0FBSyxDQUFDLFlBQVk7U0FDekI7S0FDRixDQUFDLENBQUM7SUFDSCxNQUFNLFlBQVksR0FDaEIsNEhBQTRILENBQUM7SUFFL0gsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNiLEVBQUUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2hHLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNaLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtRQUNw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