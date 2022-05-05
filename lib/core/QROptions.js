import qrTypes from '../constants/qrTypes.js';
import errorCorrectionLevels from '../constants/errorCorrectionLevels.js';
const defaultOptions = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVJPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvUVJPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8scUJBQXFCLE1BQU0sdUNBQXVDLENBQUM7QUE2QjFFLE1BQU0sY0FBYyxHQUFvQjtJQUN0QyxLQUFLLEVBQUUsR0FBRztJQUNWLE1BQU0sRUFBRSxHQUFHO0lBQ1gsSUFBSSxFQUFFLEVBQUU7SUFDUixNQUFNLEVBQUUsQ0FBQztJQUNULFNBQVMsRUFBRTtRQUNULFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksRUFBRSxTQUFTO1FBQ2Ysb0JBQW9CLEVBQUUscUJBQXFCLENBQUMsQ0FBQztLQUM5QztJQUNELFlBQVksRUFBRTtRQUNaLGtCQUFrQixFQUFFLElBQUk7UUFDeEIsU0FBUyxFQUFFLEdBQUc7UUFDZCxNQUFNLEVBQUUsQ0FBQztLQUNWO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsTUFBTTtLQUNkO0lBQ0QsaUJBQWlCLEVBQUU7UUFDakIsS0FBSyxFQUFFLE1BQU07S0FDZDtDQUNGLENBQUM7QUFFRixlQUFlLGNBQWMsQ0FBQyJ9