import calculateImageSize from './calculateImageSize';
describe('Test calculateImageSizeForAxis function', () => {
    it('The function should return an correct result for 0 sizes', () => {
        expect(calculateImageSize({
            originalHeight: 0,
            originalWidth: 0,
            maxHiddenDots: 0,
            dotSize: 0
        })).toEqual({
            height: 0,
            width: 0,
            hideYDots: 0,
            hideXDots: 0
        });
    });
    it('The function should return an correct result for minus values', () => {
        expect(calculateImageSize({
            originalHeight: -1,
            originalWidth: 5,
            maxHiddenDots: 11,
            dotSize: -5
        })).toEqual({
            height: 0,
            width: 0,
            hideYDots: 0,
            hideXDots: 0
        });
    });
    it('The function should return an correct result for small images', () => {
        expect(calculateImageSize({
            originalHeight: 20,
            originalWidth: 10,
            maxHiddenDots: 1,
            dotSize: 10
        })).toEqual({
            height: 10,
            width: 5,
            hideYDots: 1,
            hideXDots: 1
        });
    });
    it('The function should return an correct result for small images, if height is smaller than width', () => {
        expect(calculateImageSize({
            originalHeight: 10,
            originalWidth: 20,
            maxHiddenDots: 1,
            dotSize: 10
        })).toEqual({
            height: 5,
            width: 10,
            hideYDots: 1,
            hideXDots: 1
        });
    });
    it('The function should return an correct result for large images', () => {
        expect(calculateImageSize({
            originalHeight: 1000,
            originalWidth: 2020,
            maxHiddenDots: 50,
            dotSize: 10
        })).toEqual({
            height: 45,
            width: 90,
            hideYDots: 5,
            hideXDots: 9
        });
    });
    it('Use the maxHiddenAxisDots value for x', () => {
        expect(calculateImageSize({
            originalHeight: 1000,
            originalWidth: 2020,
            maxHiddenDots: 50,
            dotSize: 10,
            maxHiddenAxisDots: 1
        })).toEqual({
            height: 5,
            width: 10,
            hideYDots: 1,
            hideXDots: 1
        });
    });
    it('Use the maxHiddenAxisDots value for y', () => {
        expect(calculateImageSize({
            originalHeight: 2020,
            originalWidth: 1000,
            maxHiddenDots: 50,
            dotSize: 10,
            maxHiddenAxisDots: 1
        })).toEqual({
            height: 10,
            width: 5,
            hideYDots: 1,
            hideXDots: 1
        });
    });
    it('Use the maxHiddenAxisDots value for y with even value', () => {
        expect(calculateImageSize({
            originalHeight: 2020,
            originalWidth: 1000,
            maxHiddenDots: 50,
            dotSize: 10,
            maxHiddenAxisDots: 2
        })).toEqual({
            height: 20,
            width: 10,
            hideYDots: 2,
            hideXDots: 1
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlSW1hZ2VTaXplLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHMvY2FsY3VsYXRlSW1hZ2VTaXplLnRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxrQkFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUV0RCxRQUFRLENBQUMseUNBQXlDLEVBQUUsR0FBRyxFQUFFO0lBQ3ZELEVBQUUsQ0FBQywwREFBMEQsRUFBRSxHQUFHLEVBQUU7UUFDbEUsTUFBTSxDQUNKLGtCQUFrQixDQUFDO1lBQ2pCLGNBQWMsRUFBRSxDQUFDO1lBQ2pCLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sRUFBRSxDQUFDO1NBQ1gsQ0FBQyxDQUNILENBQUMsT0FBTyxDQUFDO1lBQ1IsTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLFNBQVMsRUFBRSxDQUFDO1lBQ1osU0FBUyxFQUFFLENBQUM7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywrREFBK0QsRUFBRSxHQUFHLEVBQUU7UUFDdkUsTUFBTSxDQUNKLGtCQUFrQixDQUFDO1lBQ2pCLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDbEIsYUFBYSxFQUFFLENBQUM7WUFDaEIsYUFBYSxFQUFFLEVBQUU7WUFDakIsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNaLENBQUMsQ0FDSCxDQUFDLE9BQU8sQ0FBQztZQUNSLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixTQUFTLEVBQUUsQ0FBQztZQUNaLFNBQVMsRUFBRSxDQUFDO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsK0RBQStELEVBQUUsR0FBRyxFQUFFO1FBQ3ZFLE1BQU0sQ0FDSixrQkFBa0IsQ0FBQztZQUNqQixjQUFjLEVBQUUsRUFB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