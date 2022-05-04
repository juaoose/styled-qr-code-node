import QROptions from './QROptions';
describe('Test default QROptions', () => {
    it('The export of the module should be an object', () => {
        expect(typeof QROptions).toBe('object');
    });
    describe('Test the content of options', () => {
        const optionsKeys = [
            'width',
            'height',
            'data',
            'margin',
            'qrOptions',
            'imageOptions',
            'dotsOptions',
            'backgroundOptions'
        ];
        it.each(optionsKeys)('The options should contain particular keys', (key) => {
            expect(Object.keys(QROptions)).toContain(key);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVJPcHRpb25zLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9RUk9wdGlvbnMudGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUM7QUFFcEMsUUFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtJQUN0QyxFQUFFLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO1FBQ3RELE1BQU0sQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7UUFDM0MsTUFBTSxXQUFXLEdBQUc7WUFDbEIsT0FBTztZQUNQLFFBQVE7WUFDUixNQUFNO1lBQ04sUUFBUTtZQUNSLFdBQVc7WUFDWCxjQUFjO1lBQ2QsYUFBYTtZQUNiLG1CQUFtQjtTQUNwQixDQUFDO1FBQ0YsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyw0Q0FBNEMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9