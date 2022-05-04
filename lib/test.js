import QRCode from './index.js';
const styledQrCode = new QRCode({
    data: 'test string',
    image: 'C:\\Users\\Kilian\\Pictures\\saved.png'
});
await styledQrCode.toFile('./testWithImage.svg', 'svg');
console.log('QR code written to disk');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLFlBQVksQ0FBQztBQUVoQyxNQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQztJQUM5QixJQUFJLEVBQUUsYUFBYTtJQUNuQixLQUFLLEVBQUUsd0NBQXdDO0NBQ2hELENBQUMsQ0FBQztBQUVILE1BQU0sWUFBWSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUV4RCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUMifQ==