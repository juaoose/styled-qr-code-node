import qrTypes from '../constants/qrTypes.js';
import drawTypes from '../constants/drawTypes.js';
import errorCorrectionLevels from '../constants/errorCorrectionLevels.js';
const defaultOptions = {
    type: drawTypes.canvas,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVJPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvUVJPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sU0FBUyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xELE9BQU8scUJBQXFCLE1BQU0sdUNBQXVDLENBQUM7QUE4QjFFLE1BQU0sY0FBYyxHQUFvQjtJQUN0QyxJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07SUFDdEIsS0FBSyxFQUFFLEdBQUc7SUFDVixNQUFNLEVBQUUsR0FBRztJQUNYLElBQUksRUFBRSxFQUFFO0lBQ1IsTUFBTSxFQUFFLENBQUM7SUFDVCxTQUFTLEVBQUU7UUFDVCxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsU0FBUztRQUNmLG9CQUFvQixFQUFFLHFCQUFxQixDQUFDLENBQUM7S0FDOUM7SUFDRCxZQUFZLEVBQUU7UUFDWixrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLFNBQVMsRUFBRSxHQUFHO1FBQ2QsTUFBTSxFQUFFLENBQUM7S0FDVjtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLE1BQU07S0FDZDtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLEtBQUssRUFBRSxNQUFNO0tBQ2Q7Q0FDRixDQUFDO0FBRUYsZUFBZSxjQUFjLENBQUMifQ==