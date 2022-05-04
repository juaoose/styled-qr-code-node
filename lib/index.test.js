import * as index from './index';
describe('Index', () => {
    it.each(['dotTypes', 'errorCorrectionLevels', 'errorCorrectionPercents', 'modes', 'qrTypes', 'default'])('The module should export certain submodules', (moduleName) => {
        expect(Object.keys(index)).toContain(moduleName);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBRWpDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3JCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsdUJBQXVCLEVBQUUseUJBQXlCLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUN0Ryw2Q0FBNkMsRUFDN0MsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==